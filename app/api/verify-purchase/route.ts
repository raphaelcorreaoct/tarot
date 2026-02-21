import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession, trimCreditedSessions } from "@/lib/session";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe não configurado");
  return new Stripe(key);
}

function getTiragensByPriceId(priceId: string): number {
  if (priceId === process.env.STRIPE_PRICE_SINGLE) return 1;
  if (priceId === process.env.STRIPE_PRICE_PACKAGE) return 3;
  return 0;
}

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe não configurado" },
        { status: 500 }
      );
    }

    const { session_id } = (await request.json()) as { session_id?: string };

    if (!session_id) {
      return NextResponse.json(
        { error: "session_id obrigatório" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price"],
    });

    if (session.payment_status !== "paid" || !session.line_items?.data?.length) {
      return NextResponse.json(
        { error: "Pagamento não confirmado" },
        { status: 400 }
      );
    }

    const priceId = session.line_items.data[0].price?.id;
    const tiragensToAdd = priceId ? getTiragensByPriceId(priceId) : 0;

    if (!tiragensToAdd) {
      return NextResponse.json(
        { error: "Produto não reconhecido" },
        { status: 400 }
      );
    }

    const ironSession = await getSession();

    // Evitar crédito duplo
    if (ironSession.creditedSessions?.includes(session_id)) {
      return NextResponse.json({
        tiragens: ironSession.tiragens ?? 0,
        message: "Compra já creditada",
      });
    }

    const customerEmail =
      session.customer_details?.email ?? session.customer_email;

    const currentTiragens = ironSession.tiragens ?? 0;
    const currentCredited = ironSession.creditedSessions ?? [];
    ironSession.tiragens = currentTiragens + tiragensToAdd;
    ironSession.creditedSessions = trimCreditedSessions([
      ...currentCredited,
      session_id,
    ]);
    if (customerEmail) {
      ironSession.email = customerEmail;
    }
    await ironSession.save();

    return NextResponse.json({
      tiragens: ironSession.tiragens,
      message: "Compra creditada com sucesso",
    });
  } catch (err) {
    console.error("Verify purchase error:", err);
    return NextResponse.json(
      { error: "Erro ao verificar compra" },
      { status: 500 }
    );
  }
}
