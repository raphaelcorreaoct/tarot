import Image from "next/image";

import { SunMoon } from "lucide-react";
import Button from "@/components/button";
import { Inknut_Antiqua } from "next/font/google";
import Link from "next/link";

const InknutAntiqua = Inknut_Antiqua({
  variable: "--font-inknut-antiqua",
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  return (
    <>
      <main className="max-w-lg  w-full h-screen m-auto flex flex-col items-center p-5 text-center ">
        <SunMoon size={150} className=" mb-8" />

        <h1 className={`text-4xl mb-8 ${InknutAntiqua.className}`}>
          Tarot Online
        </h1>
        <p className="mb-8">Descubra o que o universo quer te dizer</p>

        <Link href="/start">
          <Button className="w-full max-w-[250px]">Começar agora!</Button>
        </Link>
      </main>
      <Image
        alt=""
        width={500}
        height={500}
        src="/cards-botton.png"
        className="w-full max-h-[200px] fixed bottom-0 object-scale-down"
      />
    </>
  );
}
