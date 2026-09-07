"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export function PilotForm() {
  const router = useRouter(); const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Submission failed");
      router.push("/pilot/success");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Please try again."); setSubmitting(false); }
  }
  return <form className="pilot-form" onSubmit={submit}><Toaster position="top-center" richColors /><div className="form-kicker"><span>01</span> Contact information</div><div className="form-row"><div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" autoComplete="name" required placeholder="Your name" /></div><div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div></div>
    <div className="form-kicker"><span>02</span> Your protection needs</div><div className="form-row"><div><Label htmlFor="segment">What do you need to protect?</Label><select id="segment" name="segment" required defaultValue=""><option value="" disabled>Select one</option><option>Primary home refrigerator</option><option>Medication or baby formula</option><option>Vacation or rental property</option><option>Small food business</option><option>Standalone freezer</option><option>Other</option></select></div><div><Label htmlFor="postalCode">ZIP code</Label><Input id="postalCode" name="postalCode" inputMode="numeric" pattern="[0-9]{5}" placeholder="30117" /></div></div>
    <div><Label htmlFor="outageExperience">Tell us about your outage experience <span>(optional)</span></Label><textarea id="outageExperience" name="outageExperience" rows={5} maxLength={700} placeholder="How long was the outage, what was at risk, and were you away from the property?" /></div>
    <label className="consent"><input type="checkbox" name="consent" value="yes" required /><span><Check /> I agree to receive ColdProof product and pilot updates. I can unsubscribe at any time.</span></label>
    <Button type="submit" disabled={submitting} className="button button-primary form-submit">{submitting ? "Submitting…" : "Submit pilot application"}<ArrowRight /></Button>
  </form>;
}
