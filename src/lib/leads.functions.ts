import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  email: z.string().trim().email().max(255),
  full_name: z.string().trim().min(1).max(120).optional().nullable(),
  company: z.string().trim().min(1).max(180).optional().nullable(),
  role: z.string().trim().min(1).max(120).optional().nullable(),
  team_size: z.number().int().min(1).max(100000),
  inputs: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()])),
  monthly_spend: z.number().min(0).max(1_000_000_000),
  annual_spend: z.number().min(0).max(1_000_000_000),
  potential_savings: z.number().min(0).max(1_000_000_000),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      email: data.email,
      full_name: data.full_name ?? null,
      company: data.company ?? null,
      role: data.role ?? null,
      team_size: data.team_size,
      inputs: data.inputs,
      monthly_spend: data.monthly_spend,
      annual_spend: data.annual_spend,
      potential_savings: data.potential_savings,
    });
    if (error) {
      console.error("[leads.submit]", error);
      throw new Error("Could not save your audit. Please try again.");
    }
    return { ok: true as const };
  });