import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { PilotForm } from "@/components/site/pilot-form";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = { title: "Pilot Access", description: "Apply to join the ColdProof early product pilot." };
export default function PilotPage() {
  return <main><PageIntro eyebrow="Pilot application" title={<>Tell us what cannot afford to warm up.</>} text="We are looking first for people who have experienced extended outages, protect valuable cold inventory, or need certainty while away from the property." /><section className="pilot-page wrap"><aside className="pilot-aside"><span className="aside-icon"><ShieldCheck /></span><h2>Strong first-customer signals</h2><ul><li><Check /> Experienced a 4+ hour outage</li><li><Check /> Lost $150+ in refrigerated items</li><li><Check /> Frequently away from the property</li><li><Check /> Need automatic operation</li><li><Check /> Value proof of temperature</li></ul><p>Submitting this form does not require payment or guarantee selection for a pilot.</p></aside><PilotForm /></section></main>;
}
