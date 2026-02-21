import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { ITarotCard } from "@/app/data/tarot-cards";
import { getSession } from "@/lib/session";
import { sendReadingEmail } from "@/lib/mailersend";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const POSITIONS = ["Passado", "Presente", "Futuro"];

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada. Adicione no arquivo .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cards } = body as { cards: ITarotCard[] };

    if (!cards || !Array.isArray(cards) || cards.length !== 3) {
      return NextResponse.json(
        { error: "É necessário enviar exatamente 3 cartas" },
        { status: 400 }
      );
    }

    const cardsContext = cards
      .map(
        (card, i) =>
          `- ${POSITIONS[i]}: ${card.name} (${card.shortMeaning}) — ${card.description}`
      )
      .join("\n\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um tarólogo experiente. Sua missão é dar leituras curtas e objetivas. Seja místico mas conciso. Use português brasileiro. IMPORTANTE: Responda em no máximo 3 ou 4 frases — nada mais.`,
        },
        {
          role: "user",
          content: `Leitura de tarot com 3 cartas (Passado, Presente, Futuro):

${cardsContext}

Gere uma leitura MUITO resumida: 3 ou 4 frases no total. Conecte as cartas em uma mensagem direta — passado, presente e o que o futuro indica. Sem enrolação.`,
        },
      ],
      max_tokens: 200,
      temperature: 0.8,
    });

    const reading = completion.choices[0]?.message?.content?.trim();

    if (!reading) {
      return NextResponse.json(
        { error: "Não foi possível gerar a leitura" },
        { status: 500 }
      );
    }

    // Enviar leitura por e-mail
    let emailSent = false;
    const ironSession = await getSession();
    const userEmail = ironSession.email;
    if (userEmail) {
      try {
        emailSent = await sendReadingEmail({ to: userEmail, cards, reading });
      } catch (err) {
        console.error("Erro ao enviar e-mail da leitura:", err);
      }
    }

    return NextResponse.json({ reading, emailSent });
  } catch (error) {
    console.error("Erro na API de leitura:", error);

    const message =
      error instanceof Error ? error.message : "Erro interno ao gerar a leitura";
    const status =
      typeof (error as { status?: number })?.status === "number"
        ? (error as { status: number }).status
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
