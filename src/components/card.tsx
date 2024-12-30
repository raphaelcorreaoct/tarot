import Image from "next/image";
import { SunMoon } from "lucide-react";

export default function Card({
  onClick,
  image,
  className
}: {
  onClick?: () => void;
  image?: string;
  className?: string
}) {
  return (
    <div
      onClick={onClick}
      className={`aspect-[9/16] w-full container rounded-lg bg-main justify-center items-center flex border-4 ${className}`}
    >
      {image ? (
        <Image width={180} height={38} priority src={image} alt={''} />
      ) : (
        <SunMoon size={55}/>
      )}
    </div>
  );
}
