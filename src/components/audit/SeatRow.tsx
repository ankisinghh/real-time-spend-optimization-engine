import { Minus, Plus } from "lucide-react";

type Props = {
  vendor: string;
  plan: string;
  unit: number;
  seats: number;
  onChange: (n: number) => void;
  accent?: "emerald" | "gold" | "blue" | "violet";
};

const accentMap: Record<NonNullable<Props["accent"]>, string> = {
  emerald: "bg-primary/10 text-primary",
  gold: "bg-gold/15 text-gold",
  blue: "bg-[oklch(0.6_0.1_240)]/15 text-[oklch(0.4_0.12_240)]",
  violet: "bg-[oklch(0.6_0.15_300)]/15 text-[oklch(0.45_0.18_300)]",
};

export function SeatRow({ vendor, plan, unit, seats, onChange, accent = "emerald" }: Props) {
  const dec = () => onChange(Math.max(0, seats - 1));
  const inc = () => onChange(Math.min(9999, seats + 1));

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/40 px-3 py-2.5 transition hover:bg-background/80">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${accentMap[accent]}`}>
            {vendor}
          </span>
          <span className="truncate text-sm font-medium text-foreground">{plan}</span>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          ${unit}/seat · ${unit * seats}/mo
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={dec}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-secondary disabled:opacity-40"
          disabled={seats === 0}
          aria-label={`Decrease ${vendor} ${plan} seats`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          type="number"
          min={0}
          max={9999}
          value={seats}
          onChange={(e) => onChange(Math.max(0, Math.min(9999, Number(e.target.value) || 0)))}
          className="h-8 w-12 rounded-md border border-border bg-background text-center text-sm font-medium tabular-nums text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="button"
          onClick={inc}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-secondary"
          aria-label={`Increase ${vendor} ${plan} seats`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}