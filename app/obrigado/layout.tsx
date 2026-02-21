import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento Confirmado",
  description: "Seu pagamento foi confirmado. Redirecionando para sua leitura de tarot.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
