import Link from "next/link";
import { Moon } from "./components/Moon";
import { Pentagram } from "./components/Pentagram";
import { Star } from "./components/Star";
import { StarsDecoration } from "./components/StarsDecoration";

export default function Home() {
  return (
    <div className="min-h-screen bg-mystic-gradient">
      <StarsDecoration />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[var(--foreground)]"
          >
            <Moon size={28} variant="crescent" />
            <span>Tarot</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="#como-funciona"
              className="hidden text-sm text-[var(--mystic-lilac)]/80 transition hover:text-[var(--mystic-lilac)] sm:block"
            >
              Como funciona
            </Link>
            <Link
              href="#faq"
              className="hidden text-sm text-[var(--mystic-lilac)]/80 transition hover:text-[var(--mystic-lilac)] sm:block"
            >
              FAQ
            </Link>
            <Link
              href="#comecar"
              className="rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Começar agora
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative px-4 pb-16 pt-12 sm:px-6 sm:pt-20 md:pt-28"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center gap-1">
              <Star size={14} delay={0} />
              <Star size={12} delay={0.3} />
              <Star size={16} delay={0.6} />
            </div>
            <h1
              id="hero-heading"
              className="font-[family-name:var(--font-cormorant)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Descubra o que as{" "}
              <span className="bg-gradient-to-r from-[var(--mystic-lilac)] to-[var(--mystic-rose)] bg-clip-text text-transparent">
                cartas
              </span>{" "}
              revelam para você
            </h1>
            <p className="mt-6 text-lg text-[var(--mystic-lilac)]/90 sm:text-xl">
              Tiragens diárias, consultas personalizadas e interpretações
              detalhadas. Tudo no seu celular, de forma gratuita e discreta.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="#comecar"
                className="rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[var(--mystic-purple)]/30 transition hover:opacity-95"
              >
                Fazer minha primeira tiragem
              </Link>
              <Link
                href="#como-funciona"
                className="rounded-full border border-[var(--mystic-lilac)]/40 px-8 py-4 text-lg font-medium text-[var(--mystic-lilac)] transition hover:border-[var(--mystic-lilac)]/60 hover:bg-[var(--mystic-lilac)]/5"
              >
                Ver como funciona
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          className="relative border-y border-white/5 px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="features-heading"
              className="mb-12 text-center font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl"
            >
              Feito para quem busca respostas
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Moon size={32} variant="crescent" />,
                  title: "Tiragem do dia",
                  desc: "Receba sua tiragem diária personalizada ao acordar. Um insight para orientar seu dia.",
                },
                {
                  icon: <Pentagram size={32} />,
                  title: "Consultas ilimitadas",
                  desc: "Tire suas dúvidas sobre amor, trabalho ou espiritualidade quantas vezes precisar.",
                },
                {
                  icon: <Star size={28} />,
                  title: "100% discreto",
                  desc: "Ninguém precisa saber. Suas consultas ficam só entre você e as cartas.",
                },
              ].map((feature, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-white/5 bg-[var(--surface)]/50 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--mystic-lilac)]/80">
                    {feature.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="como-funciona"
          className="relative px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="how-heading"
        >
          <div className="mx-auto max-w-4xl">
            <h2
              id="how-heading"
              className="mb-12 text-center font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl"
            >
              Como funciona
            </h2>
            <ol className="space-y-8 sm:space-y-12">
              {[
                {
                  step: "1",
                  title: "Escolha seu tipo de tiragem",
                  desc: "Tiragem do dia, três cartas, cruz celta ou spread personalizado.",
                },
                {
                  step: "2",
                  title: "Concentre-se na sua pergunta",
                  desc: "Pense no que deseja saber. O tarot responde melhor quando há intenção clara.",
                },
                {
                  step: "3",
                  title: "Receba sua interpretação",
                  desc: "Cada carta traz uma mensagem detalhada e personalizada para o seu momento.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="flex flex-col gap-4 sm:flex-row sm:items-start"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] font-[family-name:var(--font-cormorant)] text-2xl font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[var(--mystic-lilac)]/80">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Social proof / CTA block */}
        <section
          className="relative border-y border-white/5 px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[var(--mystic-lilac)]">
              ✦ Milhares já descobriram respostas através das cartas ✦
            </p>
            <h2
              id="cta-heading"
              className="mb-6 font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl"
            >
              Sua jornada começa aqui
            </h2>
            <p className="mb-10 text-lg text-[var(--mystic-lilac)]/90">
              Gratuito. Sem cadastro obrigatório. Comece em segundos.
            </p>
            <Link
              href="#comecar"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-[var(--mystic-purple)]/30 transition hover:opacity-95"
            >
              Fazer minha tiragem grátis
              <Star size={18} />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="relative px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="mb-12 text-center font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl"
            >
              Perguntas frequentes
            </h2>
            <dl className="space-y-8">
              {[
                {
                  q: "O tarot online funciona?",
                  a: "Sim. O tarot é uma ferramenta de reflexão e introspecção. A energia da sua intenção e o momento presente são o que importam — não o formato físico ou digital das cartas.",
                },
                {
                  q: "É realmente gratuito?",
                  a: "Sim. Nossa tiragem básica e consultas diárias são 100% gratuitas. Oferecemos opções premium para quem deseja aprofundar, mas nunca cobramos pelo essencial.",
                },
                {
                  q: "Preciso saber interpretar as cartas?",
                  a: "Não. Cada tiragem vem com interpretação detalhada e personalizada. Explicamos o significado de cada carta no contexto da sua pergunta.",
                },
                {
                  q: "Posso consultar várias vezes ao dia?",
                  a: "Sim. Não há limite de consultas. Recomendamos dar um intervalo entre tiragens sobre o mesmo tema para assimilação.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-[var(--surface)]/30 p-6">
                  <dt className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-white">
                    {faq.q}
                  </dt>
                  <dd className="mt-3 text-[var(--mystic-lilac)]/90">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="comecar"
          className="relative px-4 py-20 sm:px-6 sm:py-28"
          aria-labelledby="final-cta-heading"
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--mystic-lilac)]/20 bg-gradient-to-br from-[var(--mystic-violet)]/20 to-[var(--mystic-rose)]/10 p-8 text-center sm:p-12">
            <Moon size={48} variant="crescent" className="mx-auto mb-6" />
            <h2
              id="final-cta-heading"
              className="mb-4 font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl"
            >
              Pronto para descobrir?
            </h2>
            <p className="mb-8 text-[var(--mystic-lilac)]/90">
              As cartas estão esperando por você.
            </p>
            <Link
              href="/tiragem"
              className="inline-flex rounded-full bg-gradient-to-r from-[var(--mystic-purple)] to-[var(--mystic-rose)] px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-[var(--mystic-purple)]/30 transition hover:opacity-95"
            >
              Começar agora
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Moon size={20} variant="crescent" />
            <span className="font-[family-name:var(--font-cormorant)] font-semibold text-white">
              Tarot
            </span>
          </div>
          <p className="text-sm text-[var(--mystic-lilac)]/60">
            © {new Date().getFullYear()} Tarot. Feito com ✦ para sua jornada.
          </p>
        </div>
      </footer>
    </div>
  );
}
