import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fazer Tiragem de Tarot — Passado, Presente e Futuro",
  description:
    "Revele suas cartas e descubra o que o tarot tem a dizer sobre passado, presente e futuro. Tiragem de 3 cartas gratuita e personalizada.",
};

export default function TiragemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
