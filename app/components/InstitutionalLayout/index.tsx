import Link from "next/link";
import { Moon } from "../Moon";

interface IInstitutionalLayoutProps {
  children: React.ReactNode;
}

export function InstitutionalLayout({ children }: IInstitutionalLayoutProps) {
  return (
    <div className="min-h-screen bg-mystic-gradient">
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[var(--foreground)]"
            aria-label="Tarot Online - Página inicial"
          >
            <Moon size={28} variant="crescent" />
            <span>Tarot</span>
          </Link>
          <nav aria-label="Navegação institucional">
            <Link
              href="/"
              className="text-sm text-[var(--mystic-lilac)]/80 transition hover:text-[var(--mystic-lilac)]"
            >
              Voltar ao início
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="relative px-4 py-12 sm:px-6 sm:py-16">{children}</main>

      <footer
        className="mt-auto border-t border-white/5 px-4 py-8 sm:px-6"
        role="contentinfo"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Moon size={20} variant="crescent" />
            <span className="font-[family-name:var(--font-cormorant)] font-semibold text-white">
              Tarot
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/politica-privacidade"
              className="text-[var(--mystic-lilac)]/60 transition hover:text-[var(--mystic-lilac)]"
            >
              Política de Privacidade
            </Link>
            <span className="text-[var(--mystic-lilac)]/40" aria-hidden="true">|</span>
            <Link
              href="/termos-de-uso"
              className="text-[var(--mystic-lilac)]/60 transition hover:text-[var(--mystic-lilac)]"
            >
              Termos de Uso
            </Link>
            <span className="text-[var(--mystic-lilac)]/40" aria-hidden="true">|</span>
            <Link
              href="/"
              className="text-[var(--mystic-lilac)]/60 transition hover:text-[var(--mystic-lilac)]"
            >
              Início
            </Link>
          </div>
          <p className="text-sm text-[var(--mystic-lilac)]/60">
            © {new Date().getFullYear()} Tarot.
          </p>
        </div>
      </footer>
    </div>
  );
}
