import type { Metadata } from "next";
import { RuntimeCalculator } from "@/components/site/runtime-calculator";
import { PageIntro } from "@/components/site/page-intro";
import { SectionCta } from "@/components/site/section-cta";

export const metadata: Metadata = { title: "Runtime Estimator", description: "Estimate refrigerator backup runtime based on capacity, load, and inverter efficiency." };
export default function RuntimePage() {
  return <main><PageIntro eyebrow="Runtime estimator" title={<>How long could your refrigerator stay protected?</>} text="Translate battery capacity and refrigerator load into a practical planning estimate. Final selection still requires measured energy and compressor-surge data." /><section className="calculator-page wrap"><RuntimeCalculator /></section><section className="assumption-section wrap"><div className="section-heading"><span className="eyebrow">What changes runtime</span><h2>The number is a starting point—not the whole story.</h2></div><div className="assumption-grid"><article><b>Compressor cycling</b><p>A refrigerator does not draw its rated running wattage continuously.</p></article><article><b>Startup surge</b><p>The inverter must supply the compressor’s brief but substantial starting demand.</p></article><article><b>Ambient temperature</b><p>Hot rooms and frequent door openings increase compressor runtime.</p></article><article><b>Battery condition</b><p>Temperature, age, state of charge, and reserve settings affect usable energy.</p></article></div></section><SectionCta /></main>;
}
