import { firestore } from "@/services/firebaseAdmin";
import { Consults } from "@/types/interfaces";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const secret = process.env.STRIPE_SECRET_KEY_WEBHOOK;

const getConsultaById = async (docId: string) => {
  try {
    const docRef = firestore.collection("consulta").doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log(`Documento com ID ${docId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    throw new Error("Erro ao buscar documento");
  }
};

const updateConsultaById = async (
  docId: string,
  data: Partial<Consults>
) => {
  try {
    const docRef = firestore.collection("consulta").doc(docId);
    await docRef.update(data);
    return { message: "Documento atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    throw new Error("Erro ao atualizar documento");
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const header = await headers();
    
    const signature = header.get("stripe-signature");

    if (!secret || !signature) {
      throw new Error("Missing secret or signature");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        if (event.data.object.payment_status === "paid") {
          const consultaId = event.data.object.metadata?.consultaId;
          if (!consultaId) throw new Error("Missing secret or signature");

          const userEmail = event.data.object.customer_details?.email;
          const document = await getConsultaById(consultaId);

          if (!document) throw new Error("Missing secret or signature");

          updateConsultaById(consultaId, {
            paymentAccept: true,
          });

          console.log(
            `pagamento por cartão com sucesso id do currículo: ${consultaId} - email do cliente: ${userEmail}`
          );
        }
        break;
      case "checkout.session.async_payment_failed":
        if (event.data.object.payment_status === "unpaid") {
          console.log("pagamento do boleto falhou");
        }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: `webhook error ${e}`,
        ok: false,
      },
      { status: 500 }
    );
  }
}
