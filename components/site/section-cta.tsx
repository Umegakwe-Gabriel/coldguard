import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionCta() {
  return <section className="section-cta"><div className="wrap section-cta-inner"><span className="eyebrow">Early access</span><h2>Help build the standard for refrigerator resilience.</h2><p>Join the pilot list and tell us what you need ColdProof to protect.</p><Link href="/pilot" className="button button-light">Join the pilot <ArrowRight /></Link></div></section>;
}
