import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ILegalDocumentProps } from "./types";

export function LegalDocument({ title, markdown }: ILegalDocumentProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-8 font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h1>
      <div className="prose prose-invert max-w-none space-y-6 text-[var(--mystic-lilac)]/90 [&_a]:text-[var(--mystic-rose)] [&_a]:underline [&_h2]:font-[family-name:var(--font-cormorant)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h3]:font-[family-name:var(--font-cormorant)] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white/95 [&_li]:my-1 [&_p]:leading-relaxed [&_strong]:text-white/90 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-white/20 [&_td]:px-4 [&_td]:py-3 [&_th]:border [&_th]:border-white/20 [&_th]:bg-white/5 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white [&_ul]:list-disc [&_ul]:pl-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
