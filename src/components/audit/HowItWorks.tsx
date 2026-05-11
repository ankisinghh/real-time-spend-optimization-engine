import { ClipboardList, Calculator, FileCheck2 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "List your seats",
    body: "Tell us which AI tools your team pays for and how many seats each plan has.",
  },
  {
    icon: Calculator,
    title: "We model the spend",
    body: "We apply 2026 list pricing, detect overlaps, and surface tier inefficiencies in seconds.",
  },
  {
    icon: FileCheck2,
    title: "Get a finance-ready report",
    body: "Download a per-tool breakdown plus a consolidation plan you can hand to procurement today.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            How it works
          </span>
          <h2 className="mt-4 text-4xl text-foreground md:text-5xl">Three steps to clarity</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-gold">Step {i + 1}</div>
              <h3 className="mt-1 text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}