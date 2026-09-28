import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { PilotForm } from "@/components/site/pilot-form";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = { title: "I want ColdGuard", description: "Tell the ColdGuard team where refrigerator protection is needed." };
export default function PilotPage() {
  return <main><PageIntro eyebrow="Tell us you want it" title={<>Could ColdGuard help you?</>} text="Tell us where you live and what you need to keep cold. We will use your answer to decide where ColdGuard should be tested first." /><section className="pilot-page wrap"><aside className="pilot-aside"><span className="aside-icon"><ShieldCheck /></span><h2>This may be for you if:</h2><ul><li><Check /> Your power can go out for hours</li><li><Check /> You have lost food during an outage</li><li><Check /> You are often away from the refrigerator</li><li><Check /> You want backup to start by itself</li><li><Check /> You want to know the temperature</li></ul><p>This form is free. It is not an order and does not require payment.</p></aside><PilotForm /></section></main>;
}
