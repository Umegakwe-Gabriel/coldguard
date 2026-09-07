import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Radio } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = { title: "Pricing", description: "Review the early ColdProof pricing hypotheses being tested with pilot customers." };
const plans = [
  { name: "Monitoring add-on", price: "$149–$299", description: "Independent temperature proof and cellular-aware monitoring for a compatible backup setup.", features: ["Refrigerator and freezer probes", "Local alarm and logging", "Cellular-ready notifications", "Runtime prediction"], note: "Best for product discovery" },
  { name: "1 kWh integrated", price: "$799–$999", description: "A smaller-capacity automatic backup for efficient refrigerators and shorter outages.", features: ["Automatic grid transfer", "Pure-sine inverter", "Temperature monitoring", "Expandable concept"], note: "Shorter-outage concept" },
  { name: "2 kWh integrated", price: "$1,299–$1,599", description: "The complete ColdProof concept sized around the ≈24-hour design target.", features: ["2–2.5 kWh LiFePO₄ pack", "Compressor-surge capability", "Complete monitoring suite", "Local display and LTE"], note: "Primary concept", featured: true },
];
export default function PricingPage() {
  return <main><PageIntro eyebrow="Pricing hypotheses" title={<>A serious product starts by testing value.</>} text="These ranges come from the current Lean Canvas and preliminary cost model. They are customer-discovery targets—not final retail offers." /><section className="pricing-page wrap"><div className="pricing-cards">{plans.map((plan) => <article key={plan.name} className={plan.featured ? "pricing-card featured" : "pricing-card"}>{plan.featured && <span className="featured-label">Most complete concept</span>}<span className="plan-note">{plan.note}</span><h2>{plan.name}</h2><strong>{plan.price}</strong><p>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><Link href="/pilot" className={plan.featured ? "button button-primary" : "button button-outline"}>Join the pilot <ArrowRight /></Link></article>)}</div><div className="service-banner"><Radio /><div><b>Cellular service hypothesis: $3–$8 per month</b><p>Subscription structure, carrier model, support, and messaging allowances still require pilot validation.</p></div></div><div className="pricing-disclaimer"><CircleAlert /><p><b>Concept-stage disclosure:</b> Final pricing, capacity, runtime, safety certifications, warranty, cellular coverage, and availability may change through engineering and pilot testing.</p></div></section></main>;
}
