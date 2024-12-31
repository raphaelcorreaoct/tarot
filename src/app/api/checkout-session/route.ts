import { NextResponse } from "next/server";
import Stripe from "stripe";
import {firestore} from '@/services/firebaseAdmin';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const createUser = async ({name, email, newsletter}: {name: string; email: string; newsletter:boolean}) => {
  // Procurar por um usuário com o email fornecido
  const checkUser = await firestore.collection('user').where('email', '==', email).limit(1).get();
  
  // Se o usuário existir, retorná-lo
  if (!checkUser.empty) {
    const user = checkUser.docs[0];
    return {
      id: user.id,
      ...user.data(),
    };
  }

  // Se o usuário não existir, criar um novo
  const userRef = await firestore.collection('user').add({ name, email, newsletter });
  const newUser = await userRef.get();

  return {
    id: newUser.id,
    ...newUser.data(),
  };
};

const createConsulta = async(userId:string)=> {
  const consultaRef = await firestore.collection('consulta').add({ 
    userId,
    paymentAccept: false,
  });
  const newConsulta = await consultaRef.get();

  return {
    id: newConsulta.id,
    ...newConsulta.data(),
  };

}


export async function POST(request: Request) {
  const { email, name, newsletter } = await request.json();

  const user = await createUser({email, name, newsletter});
  const consulta = await createConsulta(user.id);


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${request.headers.get("origin")}/jogar/${consulta.id}`,
    cancel_url: `${request.headers.get("origin")}`,
    metadata: {
      userId: user.id,
      consultaId: consulta.id,
    },
  });

  return NextResponse.json({ url: session.url, sessionId: session.id });
}
