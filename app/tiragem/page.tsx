"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Moon } from "@/app/components/Moon";
import { Star } from "@/app/components/Star";
import { StarsDecoration } from "@/app/components/StarsDecoration";
import { TAROT_CARDS } from "@/app/data/tarot-cards";
import type { ITarotCard } from "@/app/data/tarot-cards";
import { CardCarousel } from "./components/CardCarousel";
import { CardModal } from "./components/CardModal";
import { ShuffleDeck } from "./components/ShuffleDeck";
import { TarotCard } from "./components/TarotCard";
import { useTypingEffect } from "./hooks/useTypingEffect";

type TTiragemState = "shuffling" | "revealing" | "revealed";

const POSITIONS = ["Passado", "Presente", "Futuro"];

function pickRandomCards(count: number): ITarotCard[] {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function fetchTarotReading(cards: ITarotCard[]): Promise<string> {
  const res = await fetch("/api/tarot-reading", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cards }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro ao gerar leitura");
  return data.reading;
}

export default function TiragemPage() {
  const [state, setState] = useState<TTiragemState>("shuffling");
  const [drawnCards, setDrawnCards] = useState<ITarotCard[]>([]);
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<{
    card: ITarotCard;
    position: string;
  } | null>(null);
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const revealedCards = useMemo(
    () =>
      drawnCards.map((card, i) => ({ card, position: POSITIONS[i] })),
    [drawnCards]
  );

  const handleEmbaralhar = useCallback(() => {
    const cards = pickRandomCards(3);
    setDrawnCards(cards);
    setState("revealing");
    setAiReading(null);
    setAiError(null);
    setTimeout(() => setState("revealed"), 800);
  }, []);

  const handleNovaTiragem = useCallback(() => {
    setState("shuffling");
    setDrawnCards([]);
    setCarouselActiveIndex(0);
    setSelectedCard(null);
    setAiReading(null);
    setAiLoading(false);
    setAiError(null);
  }, []);

  useEffect(() => {
    if (state !== "revealed" || drawnCards.length !== 3) return;

    setAiLoading(true);
    setAiError(null);
    fetchTarotReading(drawnCards)
      .then(setAiReading)
      .catch((err) => setAiError(err instanceof Error ? err.message : "Erro ao gerar leitura"))
      .finally(() => setAiLoading(false));
  }, [state, drawnCards]);


  const displayedReading = useTypingEffect(
    aiReading,
    22,
    !!aiReading && !aiLoading
  );

  return (
    <div className="min-h-screen bg-mystic-gradient">
      <StarsDecoration />

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[var(--foreground)]"
          >
            <Moon size={28} variant="crescent" />
            <span>Tarot</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--mystic-lilac)]/80 transition hover:text-[var(--mystic-lilac)]"
          >
            Voltar
          </Link>
        </div>
      </header>

      <main className="relative px-4 pb-6 pt-4 sm:px-6 sm:pt-12 sm:pb-20">
        {state === "shuffling" && (
          <section className="mx-auto flex max-w-lg flex-col items-center py-16 sm:py-24">
            <h1 className="mb-6 text-center font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl">
              Concentre sua energia
            </h1>
            <p className="mb-10 max-w-sm text-center text-[var(--mystic-lilac)]/90">
              Pense na sua pergunta ou no que deseja saber. Quando sentir que
              está pronto, toque no baralho para revelar suas cartas.
            </p>
            <ShuffleDeck className="mb-12" />
            <button
              type="button"
              onClick={handleEmbaralhar}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-[var(--mystic-purple)]/30 transition hover:opacity-95"
            >
              Embaralhar e revelar
              <Star size={18} />
            </button>
          </section>
        )}

        {(state === "revealing" || state === "revealed") && (
          <section className="mx-auto max-w-5xl">
            <h2 className="mb-1 text-center font-[family-name:var(--font-cormorant)] text-xl font-bold text-white sm:mb-2 sm:text-3xl">
              Sua tiragem
            </h2>
            <p className="mb-4 text-center text-xs text-[var(--mystic-lilac)]/80 sm:mb-8 sm:text-sm">
              Passado · Presente · Futuro
            </p>

            {/* 1. Cartas sempre no topo */}
            {/* Desktop: 3 cards side by side */}
            <div className="hidden md:block">
              <div className="flex justify-center gap-6 lg:gap-8">
                {revealedCards.map(({ card, position }, index) => (
                  <div
                    key={card.id}
                    className={
                      state === "revealing" ? "animate-reveal" : ""
                    }
                    style={
                      state === "revealing"
                        ? { animationDelay: `${index * 0.15}s` }
                        : undefined
                    }
                  >
                    <TarotCard
                      card={card}
                      position={position}
                      isRevealed
                      onSelect={() => setSelectedCard({ card, position })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: carousel */}
            <div className="relative md:hidden">
              <CardCarousel
                cards={revealedCards}
                activeCardIndex={carouselActiveIndex}
                onActiveCardChange={setCarouselActiveIndex}
                onCardClick={(card, position) =>
                  setSelectedCard({ card, position })
                }
              />
            </div>

            {/* Modal da carta */}
            {selectedCard && (
              <CardModal
                card={selectedCard.card}
                position={selectedCard.position}
                onClose={() => setSelectedCard(null)}
              />
            )}

            {/* 2. Leitura interpretativa logo abaixo das cartas */}
            <div className="reading-card-scroll mt-4 max-h-32 overflow-y-auto rounded-2xl border border-[var(--mystic-rose)]/30 bg-gradient-to-br from-[var(--mystic-violet)]/20 to-[var(--mystic-rose)]/10 p-4 backdrop-blur-sm sm:mt-10 sm:max-h-56 sm:p-8">
              <h3 className="mb-2 flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-base font-semibold text-white sm:mb-4 sm:text-lg">
                <Star size={18} />
                Leitura interpretativa
              </h3>
              {aiLoading && (
                <div className="flex items-center gap-3 text-[var(--mystic-lilac)]/80">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--mystic-lilac)] border-t-transparent" />
                  <span>As cartas estão sendo interpretadas...</span>
                </div>
              )}
              {aiError && (
                <p className="text-[var(--mystic-rose)]/90">
                  {aiError}
                </p>
              )}
              {aiReading && !aiLoading && (
                <p className="whitespace-pre-line leading-relaxed text-[var(--mystic-lilac)]/95">
                  {displayedReading}
                  {displayedReading.length < aiReading.length && (
                    <span
                      className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[var(--mystic-lilac)] align-middle"
                      aria-hidden
                    />
                  )}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-center sm:mt-12">
              <button
                type="button"
                onClick={handleNovaTiragem}
                className="rounded-full border border-[var(--mystic-lilac)]/40 px-6 py-3 text-sm font-medium text-[var(--mystic-lilac)] transition hover:border-[var(--mystic-lilac)]/60 hover:bg-[var(--mystic-lilac)]/5"
              >
                Nova tiragem
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
