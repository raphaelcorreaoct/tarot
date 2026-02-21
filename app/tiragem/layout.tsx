import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fazer Leitura de Tarot — Passado, Presente e Futuro",
  description:
    "Revele suas cartas e a inteligência artificial interpreta para você. Leitura de tarot com 3 cartas (Passado, Presente, Futuro) enviada por e-mail.",
  openGraph: {
    title: "Fazer Leitura de Tarot — 3 Cartas",
    description: "Leitura de tarot com 3 cartas e interpretação personalizada. Receba no e-mail.",
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/tiragem`
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TiragemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
