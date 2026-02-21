import { Star } from "./Star";

interface IStarsDecorationProps {
  className?: string;
}

const STARS = [
  { top: "5%", left: "10%", size: 10, delay: 0 },
  { top: "15%", left: "85%", size: 8, delay: 0.5 },
  { top: "25%", left: "25%", size: 12, delay: 1 },
  { top: "35%", left: "70%", size: 6, delay: 0.2 },
  { top: "55%", left: "15%", size: 9, delay: 0.8 },
  { top: "65%", left: "90%", size: 11, delay: 1.2 },
  { top: "80%", left: "40%", size: 7, delay: 0.4 },
  { top: "90%", left: "60%", size: 10, delay: 1.5 },
];

export function StarsDecoration({ className = "" }: IStarsDecorationProps) {

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
          }}
        >
          <Star size={star.size} delay={star.delay} />
        </span>
      ))}
    </div>
  );
}
