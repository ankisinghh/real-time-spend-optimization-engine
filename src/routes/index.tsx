import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/audit/SiteHeader";
import { Hero } from "@/components/audit/Hero";
import { AuditApp } from "@/components/audit/AuditApp";
import { HowItWorks } from "@/components/audit/HowItWorks";
import { Faq } from "@/components/audit/Faq";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <AuditApp />
        <Faq />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} AI procurement, simplified.</span>
          <span>Built for finance and engineering leaders.</span>
        </div>
      </footer>
    </div>
  );
}
