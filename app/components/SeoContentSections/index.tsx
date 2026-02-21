import { readFileSync } from "fs";
import { join } from "path";
import { SeoContentSection } from "../SeoContentSection";

const CONTENT_DIR = join(process.cwd(), "content", "seo");

const SECTIONS = [
  {
    id: "o-que-e-tarot",
    headingId: "oq-tarot-heading",
    heading: "O que é tarot e como funciona",
    file: "o-que-e-tarot.md",
    bordered: true,
  },
  {
    id: "tarot-online",
    headingId: "tarot-online-heading",
    heading: "Tarot online: vantagens da leitura digital",
    file: "tarot-online.md",
    bordered: false,
  },
  {
    id: "tiragem-3-cartas",
    headingId: "tiragem-heading",
    heading: "leitura de 3 cartas: Passado, Presente e Futuro",
    file: "tiragem-3-cartas.md",
    bordered: true,
  },
  {
    id: "tarot-amor-trabalho",
    headingId: "tarot-temas-heading",
    heading: "Tarot para amor, trabalho e decisões",
    file: "tarot-amor-trabalho.md",
    bordered: false,
  },
] as const;

export function SeoContentSections() {
  return (
    <>
      {SECTIONS.map(({ id, headingId, heading, file, bordered }) => {
        const filePath = join(CONTENT_DIR, file);
        let markdown = "";
        try {
          markdown = readFileSync(filePath, "utf-8");
        } catch {
          markdown = "";
        }
        // Remove comentários HTML para não aparecerem no texto
        const body = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
        if (!body) return null;

        return (
          <SeoContentSection
            key={id}
            id={id}
            headingId={headingId}
            heading={heading}
            markdown={body}
            bordered={bordered}
          />
        );
      })}
    </>
  );
}
