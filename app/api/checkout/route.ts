import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe não configurado");
  return new Stripe(key);
}

const PLANS = {
  single: process.env.STRIPE_PRICE_SINGLE,
  package: process.env.STRIPE_PRICE_PACKAGE,
} as const;

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe não está configurado" },
        { status: 500 }
      );
    }

    const { plan } = (await request.json()) as { plan?: "single" | "package" };

    if (!plan || !["single", "package"].includes(plan)) {
      return NextResponse.json(
        { error: "Plano inválido. Use 'single' ou 'package'" },
        { status: 400 }
      );
    }

    const priceId = PLANS[plan];

    if (!priceId) {
      return NextResponse.json(
        { error: `Price ID não configurado para o plano ${plan}` },
        { status: 500 }
      );
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#precos`,
      locale: "pt-BR",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento" },
      { status: 500 }
    );
  }
}
