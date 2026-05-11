import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "Where does the pricing come from?",
    a: "We use 2026 published list prices: Cursor Pro $20/mo and Teams $40/user/mo, GitHub Copilot Pro $10/mo and Business $19/user/mo, Claude Pro $20/mo and Team Premium $150/user/mo (includes Claude Code), ChatGPT Plus $20/mo, Pro $100/mo, and Business $20/seat. Negotiated enterprise discounts will lower your real spend.",
  },
  {
    q: "How is overlap calculated?",
    a: "We compare your total coding-assistant seats (Cursor + Copilot) and total chat seats (Claude + ChatGPT variants) against your team size. Anything above headcount is flagged as overlap and costed at a conservative blended rate.",
  },
  {
    q: "Do you store my inputs?",
    a: "Only when you submit your email to unlock the detailed report. We use it to send your audit and at most two follow-ups. Never sold, never shared.",
  },
  {
    q: "Is this an official audit?",
    a: "It's a directional self-serve estimate. For a hard-numbers procurement review with vendor negotiations, book a 30-minute call with a consultant.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-4xl text-foreground md:text-5xl">Questions</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything you'd ask a procurement consultant.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border bg-card px-2"
      >
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="px-4">
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
