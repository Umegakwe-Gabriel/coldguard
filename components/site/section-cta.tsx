import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionCta() {
  return <section className="section-cta"><div className="wrap section-cta-inner"><span className="eyebrow">Show us where it is needed</span><h2>Want ColdGuard for your home or business?</h2><p>Tell us where you live and what you need to keep cold. No payment is required.</p><Link href="/pilot" className="button button-light">I want ColdGuard <ArrowRight /></Link></div></section>;
}
