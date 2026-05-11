import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingDown,
  Users,
  Loader2,
} from "lucide-react";
import { SeatRow } from "./SeatRow";
import { DEFAULT_INPUTS, runAudit, formatUSD, type AuditInputs } from "@/lib/audit";
import { submitLead } from "@/lib/leads.functions";

export function AuditApp() {
  const [inputs, setInputs] = useState<AuditInputs>(DEFAULT_INPUTS);
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ email: "", full_name: "", company: "", role: "" });

  const result = useMemo(() => runAudit(inputs), [inputs]);

  const submit = useServerFn(submitLead);
  const mutation = useMutation({
    mutationFn: async () =>
      submit({
        data: {
          email: form.email,
          full_name: form.full_name || null,
          company: form.company || null,
          role: form.role || null,
          team_size: inputs.teamSize,
          inputs: inputs as unknown as Record<string, number>,
          monthly_spend: result.monthlySpend,
          annual_spend: result.annualSpend,
          potential_savings: result.potentialSavings,
        },
      }),
    onSuccess: () => setUnlocked(true),
  });

  const set = <K extends keyof AuditInputs>(key: K, v: number) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  return (
    <section id="audit" className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" /> Step 1 — Tell us your stack
        </span>
        <h2 className="mt-4 text-4xl text-foreground md:text-5xl">
          Your AI subscriptions, in one view
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Enter how many seats you currently pay for. Pricing reflects 2026 vendor list rates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* LEFT — INPUT */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 rounded-lg bg-secondary/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Team size</span>
            </div>
            <input
              type="number"
              min={1}
              max={100000}
              value={inputs.teamSize}
              onChange={(e) => set("teamSize", Math.max(1, Number(e.target.value) || 1))}
              className="h-9 w-24 rounded-md border border-border bg-background text-center text-sm font-medium tabular-nums text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-6">
            <ToolGroup title="Coding assistants">
              <SeatRow
                vendor="Cursor"
                plan="Pro"
                unit={20}
                seats={inputs.cursorPro}
                onChange={(n) => set("cursorPro", n)}
                accent="violet"
              />
              <SeatRow
                vendor="Cursor"
                plan="Teams"
                unit={40}
                seats={inputs.cursorTeams}
                onChange={(n) => set("cursorTeams", n)}
                accent="violet"
              />
              <SeatRow
                vendor="Copilot"
                plan="Pro"
                unit={10}
                seats={inputs.copilotPro}
                onChange={(n) => set("copilotPro", n)}
                accent="blue"
              />
              <SeatRow
                vendor="Copilot"
                plan="Business"
                unit={19}
                seats={inputs.copilotBusiness}
                onChange={(n) => set("copilotBusiness", n)}
                accent="blue"
              />
            </ToolGroup>
            <ToolGroup title="Chat & reasoning">
              <SeatRow
                vendor="Claude"
                plan="Pro"
                unit={20}
                seats={inputs.claudePro}
                onChange={(n) => set("claudePro", n)}
                accent="gold"
              />
              <SeatRow
                vendor="Claude"
                plan="Team Premium"
                unit={150}
                seats={inputs.claudeTeamPremium}
                onChange={(n) => set("claudeTeamPremium", n)}
                accent="gold"
              />
              <SeatRow
                vendor="ChatGPT"
                plan="Plus"
                unit={20}
                seats={inputs.chatgptPlus}
                onChange={(n) => set("chatgptPlus", n)}
                accent="emerald"
              />
              <SeatRow
                vendor="ChatGPT"
                plan="Pro"
                unit={100}
                seats={inputs.chatgptPro}
                onChange={(n) => set("chatgptPro", n)}
                accent="emerald"
              />
              <SeatRow
                vendor="ChatGPT"
                plan="Business"
                unit={20}
                seats={inputs.chatgptBusiness}
                onChange={(n) => set("chatgptBusiness", n)}
                accent="emerald"
              />
            </ToolGroup>
          </div>
        </div>

        {/* RIGHT — RESULTS */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-elegant md:p-7">
            <div className="text-xs uppercase tracking-wider opacity-70">
              Estimated annual spend
            </div>
            <div className="mt-2 font-display text-5xl tabular-nums">
              {formatUSD(result.annualSpend)}
            </div>
            <div className="mt-1 text-sm opacity-80">
              {formatUSD(result.monthlySpend)}/mo · {formatUSD(result.perSeatMonthly)}/seat/mo
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-black/15 px-4 py-3 backdrop-blur-sm">
              <TrendingDown className="h-5 w-5 text-gold" />
              <div>
                <div className="text-xs uppercase tracking-wider opacity-70">
                  Potential annual savings
                </div>
                <div className="font-display text-2xl text-gold tabular-nums">
                  {formatUSD(result.potentialSavings)}
                </div>
              </div>
            </div>

            {result.overlapSeats > 0 && (
              <p className="mt-4 text-xs leading-relaxed opacity-85">
                We detected{" "}
                <strong>
                  {result.overlapSeats} overlapping seat{result.overlapSeats > 1 ? "s" : ""}
                </strong>{" "}
                across coding & chat tools. The detailed breakdown is below.
              </p>
            )}
          </div>

          {/* Gated detailed breakdown */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-7">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold">
                Step 2
              </span>
              <h3 className="text-lg font-medium text-foreground">Unlock detailed report</h3>
            </div>

            {!unlocked ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Get the full line-item breakdown, personalized consolidation plan, and a PDF you
                  can send to finance.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!form.email) return;
                    mutation.mutate();
                  }}
                  className="mt-5 space-y-3"
                >
                  <Field
                    placeholder="Work email *"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      placeholder="Full name"
                      value={form.full_name}
                      onChange={(v) => setForm({ ...form, full_name: v })}
                    />
                    <Field
                      placeholder="Company"
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                    />
                  </div>
                  <Field
                    placeholder="Your role (e.g. CTO, Head of Eng)"
                    value={form.role}
                    onChange={(v) => setForm({ ...form, role: v })}
                  />

                  {mutation.error && (
                    <p className="text-xs text-destructive">{(mutation.error as Error).message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={mutation.isPending || !form.email}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-gold to-[oklch(0.88_0.1_85)] text-sm font-medium text-gold-foreground shadow-gold transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" /> Reveal detailed breakdown{" "}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    No spam. We'll only email you the report + 2 follow-ups.
                  </p>
                </form>
              </>
            ) : (
              <UnlockedReport
                lineItems={result.lineItems}
                recommendations={result.recommendations}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

function UnlockedReport({
  lineItems,
  recommendations,
}: {
  lineItems: ReturnType<typeof runAudit>["lineItems"];
  recommendations: string[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-foreground">
        <CheckCircle2 className="h-4 w-4 text-success" />
        Report unlocked. Sent a copy to your inbox.
      </div>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Line items
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Tool</th>
                <th className="px-3 py-2 text-right font-medium">Seats</th>
                <th className="px-3 py-2 text-right font-medium">Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lineItems.map((i) => (
                <tr key={`${i.vendor}-${i.plan}`}>
                  <td className="px-3 py-2 text-foreground">
                    <div className="font-medium">{i.vendor}</div>
                    <div className="text-xs text-muted-foreground">{i.plan}</div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">{i.seats}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">
                    {formatUSD(i.monthly)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recommendations
        </div>
        <ul className="space-y-2.5">
          {recommendations.map((r, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 rounded-lg border border-border/60 bg-background/50 p-3 text-sm text-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-accent"
      >
        Talk to a consultant <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
