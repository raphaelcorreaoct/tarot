"use client";

import Image from "next/image";
import { useState } from "react";
import type { ITarotCard } from "@/app/data/tarot-cards";
import { getTarotCardImageUrl } from "@/app/data/tarot-card-images";
import { Pentagram } from "@/app/components/Pentagram";

interface ITarotCardProps {
  card: ITarotCard;
  position?: string;
  isRevealed?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function TarotCard({
  card,
  position,
  isRevealed = false,
  isSelected = false,
  onSelect,
  className = "",
}: ITarotCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = getTarotCardImageUrl(card.id);
  const showFallback = !imageUrl || imageError;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mystic-lilac)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${className}`}
      aria-label={isRevealed ? `${card.name} - ${card.shortMeaning}` : "Carta virada"}
      aria-pressed={isSelected}
    >
      <div
        className={`relative flex w-[180px] flex-col overflow-hidden rounded-xl border-2 shadow-xl transition-all aspect-[2/3] ${
          isRevealed
            ? "border-[var(--mystic-lilac)]/50 bg-gradient-to-br from-[var(--surface-light)] to-[var(--mystic-violet)]/20"
            : "border-[var(--mystic-lilac)]/30 bg-gradient-to-br from-[var(--mystic-violet)] to-[var(--mystic-purple)]"
        } ${isSelected ? "ring-2 ring-[var(--mystic-rose)] ring-offset-2 ring-offset-[var(--background)]" : ""}`}
        style={{
          transform: isRevealed ? "none" : "rotateY(0)",
          boxShadow: isRevealed
            ? "0 10px 40px rgba(124, 58, 237, 0.25)"
            : "0 8px 30px rgba(124, 58, 237, 0.4)",
        }}
      >
        {isRevealed ? (
          <>
            {imageUrl && !showFallback ? (
              <>
                <Image
                  src={imageUrl}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="200px 300px"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="block text-center font-[family-name:var(--font-cormorant)] text-sm font-semibold text-white drop-shadow-lg">
                    {card.name}
                  </span>
                  {position && (
                    <span className="block text-center text-xs text-[var(--mystic-lilac)] drop-shadow-md">
                      {position}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                <div className="relative flex flex-1 flex-col items-center justify-center p-4">
                  <Pentagram size={28} />
                  <span className="mt-2 text-center font-[family-name:var(--font-cormorant)] text-sm font-semibold text-white sm:text-base">
                    {card.name}
                  </span>
                  {position && (
                    <span className="mt-1 text-xs text-[var(--mystic-lilac)]/70">
                      {position}
                    </span>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl opacity-50">✦</span>
          </div>
        )}
      </div>
    </button>
  );
}
