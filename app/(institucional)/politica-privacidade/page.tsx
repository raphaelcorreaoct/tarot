import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import { LegalDocument } from "@/app/components/LegalDocument";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tarot.app";

const CONTENT_PATH = join(process.cwd(), "content", "legal", "politica-privacidade.md");

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade do Tarot Online. Saiba como coletamos, usamos e protegemos suas informações.",
  alternates: {
    canonical: `${SITE_URL}/politica-privacidade`,
  },
};

export default function PoliticaPrivacidade() {
  let markdown = "";
  try {
    markdown = readFileSync(CONTENT_PATH, "utf-8");
  } catch {
    markdown = "*Conteúdo não disponível.*";
  }

  return (
    <LegalDocument
      title="Política de Privacidade"
      markdown={markdown}
    />
  );
}
