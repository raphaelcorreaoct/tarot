interface IStarProps {
  className?: string;
  size?: number;
  delay?: number;
}

export function Star({ className = "", size = 12, delay = 0 }: IStarProps) {
  return (
    <span
      className={`inline-block animate-twinkle ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[var(--mystic-lilac)]/60"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}
