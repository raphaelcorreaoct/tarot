import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    const tiragens = session.tiragens ?? 0;

    if (tiragens < 1) {
      return NextResponse.json(
        { error: "Você não tem tiragens disponíveis. Faça uma compra para continuar." },
        { status: 403 }
      );
    }

    session.tiragens = tiragens - 1;
    await session.save();

    return NextResponse.json({
      tiragens: session.tiragens,
      message: "Tiragem utilizada",
    });
  } catch (err) {
    console.error("Use tiragem error:", err);
    return NextResponse.json(
      { error: "Erro ao registrar tiragem" },
      { status: 500 }
    );
  }
}
