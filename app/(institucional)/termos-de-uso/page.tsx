import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import { LegalDocument } from "@/app/components/LegalDocument";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tarot.app";

const CONTENT_PATH = join(process.cwd(), "content", "legal", "termos-de-uso.md");

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do Tarot Online. Condições para utilização do serviço de leitura de tarot.",
  alternates: {
    canonical: `${SITE_URL}/termos-de-uso`,
  },
};

export default function TermosDeUso() {
  let markdown = "";
  try {
    markdown = readFileSync(CONTENT_PATH, "utf-8");
  } catch {
    markdown = "*Conteúdo não disponível.*";
  }

  return (
    <LegalDocument
      title="Termos de Uso"
      markdown={markdown}
    />
  );
}
