// 2026 reference pricing (USD / month). Source: vendor public pricing pages.
export const PRICING = {
  cursor: { pro: 20, teams: 40 },
  copilot: { pro: 10, business: 19 },
  claude: { pro: 20, teamPremium: 150 }, // Team Premium includes Claude Code
  chatgpt: { plus: 20, pro: 100, business: 20 }, // Business per seat
} as const;

export type AuditInputs = {
  teamSize: number;
  // Per-tool seat counts (how many people on each tool)
  cursorPro: number;
  cursorTeams: number;
  copilotPro: number;
  copilotBusiness: number;
  claudePro: number;
  claudeTeamPremium: number;
  chatgptPlus: number;
  chatgptPro: number;
  chatgptBusiness: number;
};

export const DEFAULT_INPUTS: AuditInputs = {
  teamSize: 10,
  cursorPro: 4,
  cursorTeams: 0,
  copilotPro: 3,
  copilotBusiness: 0,
  claudePro: 5,
  claudeTeamPremium: 0,
  chatgptPlus: 6,
  chatgptPro: 1,
  chatgptBusiness: 0,
};

export type LineItem = {
  vendor: string;
  plan: string;
  seats: number;
  unit: number;
  monthly: number;
  /** Recommendation key for upsell logic */
  note?: string;
};

export type AuditResult = {
  lineItems: LineItem[];
  monthlySpend: number;
  annualSpend: number;
  /** Conservative consolidation savings estimate (annual) */
  potentialSavings: number;
  overlapSeats: number;
  recommendations: string[];
  perSeatMonthly: number;
};

export function runAudit(input: AuditInputs): AuditResult {
  const items: LineItem[] = [
    { vendor: "Cursor", plan: "Pro", seats: input.cursorPro, unit: PRICING.cursor.pro, monthly: input.cursorPro * PRICING.cursor.pro },
    { vendor: "Cursor", plan: "Teams", seats: input.cursorTeams, unit: PRICING.cursor.teams, monthly: input.cursorTeams * PRICING.cursor.teams },
    { vendor: "GitHub Copilot", plan: "Pro", seats: input.copilotPro, unit: PRICING.copilot.pro, monthly: input.copilotPro * PRICING.copilot.pro },
    { vendor: "GitHub Copilot", plan: "Business", seats: input.copilotBusiness, unit: PRICING.copilot.business, monthly: input.copilotBusiness * PRICING.copilot.business },
    { vendor: "Claude", plan: "Pro", seats: input.claudePro, unit: PRICING.claude.pro, monthly: input.claudePro * PRICING.claude.pro },
    { vendor: "Claude", plan: "Team Premium (incl. Claude Code)", seats: input.claudeTeamPremium, unit: PRICING.claude.teamPremium, monthly: input.claudeTeamPremium * PRICING.claude.teamPremium },
    { vendor: "ChatGPT", plan: "Plus", seats: input.chatgptPlus, unit: PRICING.chatgpt.plus, monthly: input.chatgptPlus * PRICING.chatgpt.plus },
    { vendor: "ChatGPT", plan: "Pro", seats: input.chatgptPro, unit: PRICING.chatgpt.pro, monthly: input.chatgptPro * PRICING.chatgpt.pro },
    { vendor: "ChatGPT", plan: "Business", seats: input.chatgptBusiness, unit: PRICING.chatgpt.business, monthly: input.chatgptBusiness * PRICING.chatgpt.business },
  ].filter((i) => i.seats > 0);

  const monthlySpend = items.reduce((s, i) => s + i.monthly, 0);
  const annualSpend = monthlySpend * 12;

  // --- Overlap & savings logic ---
  // Coding assistant overlap: Cursor + Copilot on the same person is wasted spend.
  const codingSeats = input.cursorPro + input.cursorTeams + input.copilotPro + input.copilotBusiness;
  const codingOverlap = Math.max(0, codingSeats - input.teamSize);

  // Chat overlap: Claude Pro + ChatGPT Plus + ChatGPT Pro on same seats.
  const chatSeats = input.claudePro + input.claudeTeamPremium + input.chatgptPlus + input.chatgptPro + input.chatgptBusiness;
  const chatOverlap = Math.max(0, chatSeats - input.teamSize);

  const overlapSeats = codingOverlap + chatOverlap;

  // Conservative blended cost of an overlapping seat (~$25/mo)
  const blendedSeatCost = 25;
  const overlapAnnual = overlapSeats * blendedSeatCost * 12;

  // Plan-tier inefficiency: individual Pro plans for >5 seats should consolidate to a Team/Business plan.
  let tierInefficiencyAnnual = 0;
  if (input.cursorPro >= 5) {
    // Pro $20 vs Teams $40 — but Teams adds admin/SSO; assume 15% blended saving via consolidation+admin.
    tierInefficiencyAnnual += input.cursorPro * PRICING.cursor.pro * 12 * 0.15;
  }
  if (input.copilotPro >= 5) {
    tierInefficiencyAnnual += input.copilotPro * PRICING.copilot.pro * 12 * 0.20;
  }
  if (input.claudePro >= 5 && input.claudeTeamPremium === 0) {
    // Likely better off on a single Team Premium plan with Claude Code.
    const proCost = input.claudePro * PRICING.claude.pro * 12;
    const teamCost = PRICING.claude.teamPremium * 12; // single team plan
    tierInefficiencyAnnual += Math.max(0, proCost - teamCost) * 0.5;
  }

  const potentialSavings = Math.round(overlapAnnual + tierInefficiencyAnnual);

  const recommendations: string[] = [];
  if (codingOverlap > 0) {
    recommendations.push(
      `${codingOverlap} engineer${codingOverlap > 1 ? "s" : ""} appear${codingOverlap > 1 ? "" : "s"} to have both Cursor and Copilot. Pick one — most teams standardize on Cursor for autonomy or Copilot for IDE depth.`,
    );
  }
  if (chatOverlap > 0) {
    recommendations.push(
      `${chatOverlap} seat${chatOverlap > 1 ? "s" : ""} of overlap across Claude / ChatGPT subscriptions. Run a 30-day usage audit and cut the lowest-utilized.`,
    );
  }
  if (input.cursorPro >= 5) {
    recommendations.push(
      `You have ${input.cursorPro} individual Cursor Pro seats — consolidating to Cursor Teams ($40/seat) unlocks SSO, central billing, and pooled usage analytics.`,
    );
  }
  if (input.copilotPro >= 5) {
    recommendations.push(
      `${input.copilotPro} Copilot Pro seats should move to Copilot Business ($19/seat) for policy controls and IP indemnity.`,
    );
  }
  if (input.claudePro >= 5 && input.claudeTeamPremium === 0) {
    recommendations.push(
      `Claude Team Premium ($150/mo flat) includes Claude Code and replaces ${input.claudePro} individual Pro seats once you hit ~8 users.`,
    );
  }
  if (input.chatgptPlus > 0 && input.chatgptBusiness === 0 && input.teamSize >= 5) {
    recommendations.push(
      `Move scattered ChatGPT Plus seats to ChatGPT Business ($20/seat) for shared workspace, admin, and zero-data-training by default.`,
    );
  }
  if (recommendations.length === 0) {
    recommendations.push("Your AI stack is well-consolidated. Focus on usage analytics to validate ROI per seat.");
  }

  return {
    lineItems: items,
    monthlySpend: Math.round(monthlySpend),
    annualSpend: Math.round(annualSpend),
    potentialSavings,
    overlapSeats,
    recommendations,
    perSeatMonthly: input.teamSize > 0 ? Math.round(monthlySpend / input.teamSize) : 0,
  };
}

export const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);