"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { ITarotCard } from "@/app/data/tarot-cards";
import { getTarotCardImageUrl } from "@/app/data/tarot-card-images";

interface ICardModalProps {
  card: ITarotCard;
  position: string;
  onClose: () => void;
}

export function CardModal({ card, position, onClose }: ICardModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const imageUrl = getTarotCardImageUrl(card.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar"
      />

      {/* Modal content - max-height + overflow para mobile */}
      <div className="relative z-10 flex max-h-[90dvh] w-full max-w-md animate-modal-in flex-col rounded-t-2xl border border-b-0 border-[var(--mystic-lilac)]/30 bg-[var(--surface)] shadow-2xl sm:max-h-[85vh] sm:rounded-2xl sm:border">
        <div className="card-modal-scroll flex-1 overflow-y-auto overscroll-contain">
          {/* Carta em destaque */}
          <div className="relative mx-auto mt-4 h-48 w-32 shrink-0 overflow-hidden rounded-xl border-2 border-[var(--mystic-lilac)]/50 shadow-lg sm:mt-6 sm:h-64 sm:w-44">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={card.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 176px 256px, 192px 288px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--mystic-violet)] to-[var(--mystic-purple)]">
              <span className="text-5xl opacity-50">✦</span>
            </div>
          )}
          </div>

          {/* Nome e informações */}
          <div className="p-4 sm:p-6">
          <h2
            id="card-modal-title"
            className="mb-1 font-[family-name:var(--font-cormorant)] text-2xl font-bold text-white"
          >
            {card.name}
          </h2>
          <p className="mb-4 text-sm text-[var(--mystic-lilac)]/80">
            {position} · {card.shortMeaning}
          </p>
          <p className="leading-relaxed text-[var(--mystic-lilac)]/95">
            {card.description}
          </p>
          </div>
        </div>

        {/* Botão fechar - fixo no rodapé */}
        <div className="shrink-0 border-t border-white/5 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-[var(--mystic-lilac)]/40 py-3 text-sm font-medium text-[var(--mystic-lilac)] transition hover:border-[var(--mystic-lilac)]/60 hover:bg-[var(--mystic-lilac)]/10"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
