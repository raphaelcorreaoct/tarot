import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tarot Online — Tiragens e Interpretações no Celular",
  description:
    "Descubra o que as cartas do tarot revelam para você. Tiragens diárias, consultas personalizadas e interpretações detalhadas. Gratuito e discreto no seu celular.",
  keywords: [
    "tarot online",
    "tiragem de tarot",
    "tarot grátis",
    "consultar tarot",
    "cartas do tarot",
    "tarot no celular",
    "tarot amor",
    "tarot trabalho",
  ],
  authors: [{ name: "Tarot App" }],
  openGraph: {
    title: "Tarot Online — Tiragens e Interpretações",
    description:
      "Descubra o que as cartas do tarot revelam para você. Tiragens diárias e consultas personalizadas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Online — Tiragens e Interpretações",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tarot Online",
    description:
      "App de tarot para tiragens e interpretações de cartas no celular.",
    applicationCategory: "LifestyleApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
