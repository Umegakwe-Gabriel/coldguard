import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleGauge, PlugZap, Radio, ShieldCheck, ThermometerSnowflake } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { SectionCta } from "@/components/site/section-cta";

export const metadata: Metadata = { title: "Product", description: "Explore the ColdProof refrigerator backup concept, product experience, and protection model." };

export default function ProductPage() {
  return <main><PageIntro eyebrow="Product" title={<>A refrigerator-first backup system.</>} text="ColdProof is designed around the appliance and the condition you care about—not around a generic battery specification."><Link href="/pilot" className="text-link">Apply for pilot access <ArrowRight /></Link></PageIntro>
    <section className="product-showcase wrap"><div className="showcase-image"><Image src="/coldproof-unit.webp" alt="ColdProof concept unit" width={1400} height={788} priority /><span className="image-caption">Concept enclosure · final industrial design subject to development</span></div><div className="showcase-copy"><span className="eyebrow">Plug in. Stay cold. Stay informed.</span><h2>One appliance between the refrigerator and the wall.</h2><p>The refrigerator plugs into ColdProof. ColdProof plugs into the wall, charges continuously, watches the grid, and transfers the load to its LiFePO₄ battery when power fails.</p><ul className="check-list"><li><Check /> No manual outage setup</li><li><Check /> Pure-sine output sized for compressor surge</li><li><Check /> Independent refrigerator and freezer probes</li><li><Check /> Local display, alarm, logging, and decisions</li></ul></div></section>
    <section className="product-principles"><div className="wrap"><div className="section-heading"><span className="eyebrow">Designed around the outcome</span><h2>Four promises. No guesswork.</h2></div><div className="principle-grid"><article><PlugZap /><h3>It switches</h3><p>Automatic transfer bridges the moment between grid failure and backup operation.</p><b>Power continuity</b></article><article><ThermometerSnowflake /><h3>It watches</h3><p>Wired probes provide direct evidence of actual compartment temperature.</p><b>Condition awareness</b></article><article><CircleGauge /><h3>It predicts</h3><p>Load, capacity, and battery state combine into a useful runtime estimate.</p><b>Decision support</b></article><article><Radio /><h3>It reaches you</h3><p>Cellular alerts stay independent of the home router and broadband connection.</p><b>Remote awareness</b></article></div></div></section>
    <section className="comparison-section wrap"><div className="section-heading centered"><span className="eyebrow">Why customers choose it</span><h2>A complete protection loop.</h2></div><div className="comparison-table"><div className="comparison-head"><span>Capability</span><span>Power station</span><span>Wi‑Fi sensor</span><span>ColdProof</span></div>{[
      ["Automatic refrigerator transfer", "Varies", "No", "Yes"], ["Actual compartment temperature", "No", "Yes", "Yes"], ["Works when home Wi‑Fi fails", "Yes", "No", "Yes"], ["Food-condition alerts", "No", "Varies", "Yes"], ["Local safety decisions", "No", "Varies", "Yes"],
    ].map((row) => <div className="comparison-row" key={row[0]}>{row.map((cell, index) => <span key={cell} className={index === 3 ? "winner" : ""}>{index === 3 && <ShieldCheck />}{cell}</span>)}</div>)}</div></section>
    <SectionCta />
  </main>;
}
