import Image from "next/image";
import { SunMoon } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function Card({
  onClick,
  image,
  className,
  alt,
  ...props
}: {
  onClick?: () => void;
  image?: string;
  className?: string;
  alt?: string;
} & DivProps) {
  return (
    <div
      onClick={onClick}
      className={`aspect-[9/16] w-full container rounded-lg bg-main justify-center items-center flex border-4 cursor-pointer ${className}`}
      {...props}
    >
      {image ? (
        <Image
          width={180}
          height={38}
          priority
          className="w-full h-full object-cover"
          src={image}
          alt={alt || ""}
        />
      ) : (
        <SunMoon size={55} />
      )}
    </div>
  );
}
