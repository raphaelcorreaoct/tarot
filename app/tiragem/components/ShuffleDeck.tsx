"use client";

interface IShuffleDeckProps {
  className?: string;
}

export function ShuffleDeck({ className = "" }: IShuffleDeckProps) {
  const cards = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      className={`relative flex h-32 w-24 items-center justify-center sm:h-40 sm:w-28 ${className}`}
      aria-hidden
    >
      {cards.map((i) => (
        <div
          key={i}
          className="absolute h-full w-full animate-shuffle rounded-xl border-2 border-[var(--mystic-lilac)]/30 bg-gradient-to-br from-[var(--mystic-violet)] to-[var(--mystic-purple)] shadow-lg"
          style={{
            zIndex: cards.length - i,
            transform: `translateX(${(i - cards.length / 2) * 3}px) rotate(${-6 + i * 1.5}deg)`,
            animationDelay: `${i * 0.05}s`,
            boxShadow: `0 4px 20px rgba(124, 58, 237, 0.3)`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl opacity-40">✦</span>
          </div>
        </div>
      ))}
    </div>
  );
}
