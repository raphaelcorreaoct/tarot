"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Moon } from "@/app/components/Moon";
import { Star } from "@/app/components/Star";
import { StarsDecoration } from "@/app/components/StarsDecoration";

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Sessão de pagamento não encontrada.");
      return;
    }

    fetch("/api/verify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
      credentials: "include",
    })
      .then(async (res) => {
        const data = (await res.json()) as { tiragens?: number; error?: string };
        if (!res.ok) {
          throw new Error(data.error ?? "Erro ao verificar pagamento");
        }
        const tiragens = data.tiragens ?? 1;
        setStatus("success");
        setTimeout(() => {
          window.location.href = `/tiragem?tiragens=${tiragens}`;
        }, 1500);
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Erro ao verificar pagamento");
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-mystic-gradient">
      <StarsDecoration />

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[var(--foreground)]"
          >
            <Moon size={28} variant="crescent" />
            <span>Tarot</span>
          </Link>
        </div>
      </header>

      <main className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-16">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-6">
            <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[var(--mystic-lilac)] border-t-transparent" />
            <p className="text-[var(--mystic-lilac)]/90">
              Confirmando sua compra...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] p-4">
              <Star size={48} />
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl">
              Pagamento confirmado!
            </h1>
            <p className="max-w-sm text-[var(--mystic-lilac)]/90">
              Redirecionando para sua leitura...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex max-w-md flex-col items-center gap-6 text-center">
            <p className="text-[var(--mystic-rose)]/90">{errorMsg}</p>
            <Link
              href="/#precos"
              className="rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Ir para preços
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-mystic-gradient">
          <StarsDecoration />
          <div className="flex min-h-screen items-center justify-center">
            <span className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[var(--mystic-lilac)] border-t-transparent" />
          </div>
        </div>
      }
    >
      <ObrigadoContent />
    </Suspense>
  );
}
