import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from "./components/GoogleTagManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tarot.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tarot Online — Leituras de Tarot com 3 Cartas e Interpretação por IA",
    template: "%s | Tarot Online",
  },
  description:
    "Leitura de tarot personalizada com 3 cartas (Passado, Presente, Futuro) e interpretação gerada por IA. Pague uma vez, receba no e-mail. Discreto no celular.",
  keywords: [
    "tarot online",
    "leitura de tarot",
    "leitura de tarot",
    "consultar tarot",
    "cartas do tarot",
    "tarot 3 cartas",
    "tarot amor",
    "tarot trabalho",
    "tarot interpretação",
    "tarot Passado Presente Futuro",
    "tarot IA",
    "tarot inteligência artificial",
  ],
  authors: [{ name: "Tarot", url: SITE_URL }],
  creator: "Tarot",
  openGraph: {
    title: "Tarot Online — Leituras de Tarot com 3 Cartas e Interpretação por IA",
    description:
      "Leitura de tarot personalizada com 3 cartas e interpretação por IA. Receba no e-mail. Pagamento único.",
    type: "website",
    url: SITE_URL,
    locale: "pt_BR",
    siteName: "Tarot Online",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Online — Leituras de Tarot com 3 Cartas",
    description: "Leitura de tarot personalizada com 3 cartas e interpretação por IA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#webapp`,
        name: "Tarot Online",
        description:
          "Leitura de tarot personalizada com 3 cartas (Passado, Presente, Futuro) e interpretação gerada por IA. Receba no e-mail.",
        applicationCategory: "LifestyleApplication",
        url: SITE_URL,
        offers: [
          {
            "@type": "Offer",
            name: "Leitura de Tarot - 3 Cartas",
            price: "9.90",
            priceCurrency: "BRL",
            description: "Uma leitura de tarot exclusiva com 3 cartas e interpretação personalizada.",
          },
          {
            "@type": "Offer",
            name: "Pacote 3 Leituras de Tarot",
            price: "24.90",
            priceCurrency: "BRL",
            description: "Três leituras completas para usar quando quiser.",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Tarot Online",
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Tarot Online",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <GoogleTagManagerScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${cormorant.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-lg bg-[var(--mystic-purple)] px-4 py-2 font-medium text-white shadow-lg transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--mystic-lilac)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
