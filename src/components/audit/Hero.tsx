import { ArrowRight, ShieldCheck, Timer } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--gold), transparent)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          2026 pricing — updated monthly
        </div>

        <h1 className="mx-auto max-w-3xl text-balance text-5xl leading-[1.05] text-foreground md:text-7xl">
          How much is your team{" "}
          <span className="text-gradient-gold italic">overspending</span>{" "}
          on AI tools?
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          A 60-second audit of your Cursor, Copilot, Claude and ChatGPT subscriptions.
          See your real annual spend — and the seats you can cut today.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#audit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-gold to-[oklch(0.88_0.1_85)] px-7 text-base font-medium text-gold-foreground shadow-gold transition hover:brightness-105"
          >
            Start free audit
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-7 text-base font-medium text-foreground transition hover:bg-secondary"
          >
            How it works
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Timer className="h-3.5 w-3.5" /> Takes ~60 seconds</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No card, no spam</span>
          <span className="inline-flex items-center gap-1.5">Avg. team finds <strong className="text-foreground">$11k/yr</strong> in waste</span>
        </div>
      </div>
    </section>
  );
}