import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    const tiragens = session.tiragens ?? 0;
    return NextResponse.json({ tiragens });
  } catch (err) {
    console.error("Tiragem status error:", err);
    return NextResponse.json({ tiragens: 0 });
  }
}
