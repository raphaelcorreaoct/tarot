"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TarotCard } from "./TarotCard";
import type { ITarotCard } from "@/app/data/tarot-cards";

interface IRevealedCard {
  card: ITarotCard;
  position: string;
}

interface ICardCarouselProps {
  cards: IRevealedCard[];
  onActiveCardChange: (index: number) => void;
  activeCardIndex: number;
  onCardClick?: (card: ITarotCard, position: string) => void;
}

export function CardCarousel({
  cards,
  onActiveCardChange,
  activeCardIndex,
  onCardClick,
}: ICardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || cards.length === 0) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.75;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    const clampedIndex = Math.max(0, Math.min(index, cards.length - 1));
    onActiveCardChange(clampedIndex);
  }, [cards.length, onActiveCardChange]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="w-full overflow-hidden"
      role="region"
      aria-label="Cartas da leitura - deslize para navegar"
    >
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto overflow-y-hidden px-[12.5vw] pb-2 scroll-smooth scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards.map(({ card, position }, index) => (
          <div
            key={card.id}
            className="shrink-0 flex flex-col items-center"
            style={{
              scrollSnapAlign: "center",
              width: "75vw",
              maxWidth: "220px",
            }}
          >
            <TarotCard
              card={card}
              position={position}
              isRevealed
              isSelected={activeCardIndex === index}
              onSelect={() => {
                onActiveCardChange(index);
                onCardClick?.(card, position);
                const container = scrollRef.current;
                if (container) {
                  const cardWidth = container.offsetWidth * 0.75;
                  container.scrollTo({
                    left: index * (cardWidth + 16),
                    behavior: "smooth",
                  });
                }
              }}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
