import ReactMarkdown from "react-markdown";
import type { ISeoContentSectionProps } from "./types";

export function SeoContentSection({
  id,
  headingId,
  heading,
  markdown,
  bordered = false,
}: ISeoContentSectionProps) {
  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 ${
        bordered ? "border-y border-white/5" : ""
      } ${bordered ? "px-4 sm:px-6" : "px-4 sm:px-6"}`}
      aria-labelledby={headingId}
    >
      <article className="mx-auto max-w-3xl">
        <h2
          id={headingId}
          className="mb-6 font-[family-name:var(--font-cormorant)] text-2xl font-bold text-white sm:text-3xl"
        >
          {heading}
        </h2>
        <div className="prose prose-invert max-w-none space-y-4 text-[var(--mystic-lilac)]/90 [&_a]:text-[var(--mystic-rose)] [&_a]:underline [&_h3]:font-[family-name:var(--font-cormorant)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:my-1 [&_p]:leading-relaxed [&_strong]:text-white/90 [&_ul]:list-disc [&_ul]:pl-6">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </article>
    </section>
  );
}
