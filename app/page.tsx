import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, Check, Cpu, Radio, ShieldCheck, Snowflake, ThermometerSnowflake, Zap } from "lucide-react";
import { StatusMonitor } from "@/components/site/status-monitor";
import { SectionCta } from "@/components/site/section-cta";

export default function Home() {
  return <main>
    <section className="home-hero"><div className="wrap hero-grid"><div className="hero-copy"><span className="eyebrow"><i /> Refrigerator resilience, rethought</span><h1>Cold that keeps its promise.</h1><p className="hero-tagline">Know it stayed cold—even when the power and Wi‑Fi went out.</p><p className="hero-description">ColdGuard combines automatic backup power, independent temperature sensing, cellular alerts, and local decision-making in one refrigerator-first appliance.</p><div className="hero-actions"><Link href="/pilot" className="button button-primary">Tell us you’re interested <ArrowRight /></Link><Link href="/about" className="button button-ghost">Learn about ColdGuard</Link></div><div className="hero-facts"><span><b>24+ hours</b> design target</span><span><b>Automatic</b> transfer</span><span><b>Cellular</b> awareness</span></div></div>
      <div className="product-stage"><div className="stage-glow" /><div className="product-stage-image"><Image src="/coldguard-unit.webp" alt="ColdGuard concept backup unit" width={1400} height={788} priority /></div><div className="stage-label label-top"><ShieldCheck /><span><b>Local decisions</b>Cloud-independent</span></div><div className="stage-label label-bottom"><ThermometerSnowflake /><span><b>37°F</b>Temperature safe</span></div></div>
    </div></section>

    <section className="signal-band"><div className="wrap signal-grid"><span>The power went out.</span><i /><span>ColdGuard switched over.</span><i /><span>You already know.</span></div></section>

    <section className="home-monitor wrap"><div className="section-heading"><span className="eyebrow">The proof is in the condition</span><h2>See the refrigerator—not just the battery.</h2><p>A single view answers the five outage questions that matter: Is backup active? How much battery remains? How long will it last? Is the refrigerator still cold? Will I be alerted?</p><Link href="/monitor" className="text-link">Open the complete monitor <ArrowRight /></Link></div><StatusMonitor /></section>

    <section className="promise-section"><div className="wrap"><div className="oversized-statement">Power is only half<br />the <em>protection.</em></div><div className="promise-grid"><article><Zap /><span>01</span><h3>Automatic backup</h3><p>Grid loss triggers an immediate transfer. No extension cords, no late-night setup, no one required at the property.</p></article><article><ThermometerSnowflake /><span>02</span><h3>Temperature proof</h3><p>Food-safe wired probes track the refrigerator and freezer—not merely the electricity flowing into them.</p></article><article><Radio /><span>03</span><h3>Independent alerts</h3><p>LTE notifications continue when the home router loses power and ordinary smart-home devices go silent.</p></article><article><Cpu /><span>04</span><h3>Local intelligence</h3><p>Safety rules, alarms, and decisions remain on the device even when every external connection disappears.</p></article></div></div></section>

    <section className="lifestyle-section"><Image src="/coldproof-home.webp" alt="ColdProof unit protecting a refrigerator during an evening outage" fill sizes="100vw" /><div className="lifestyle-overlay"><div className="wrap"><span className="eyebrow">Designed for the moment you are not there</span><h2>The house can go dark.<br />Your confidence doesn’t have to.</h2><Link href="/technology" className="button button-light">See how it works <ArrowRight /></Link></div></div></section>

    <section className="customer-section wrap"><div className="section-heading centered"><span className="eyebrow">Who needs ColdGuard</span><h2>Protection for what matters after the lights go out.</h2></div><div className="customer-grid"><article><Snowflake /><b>Outage-prone homes</b><p>Hurricane, wildfire, rural, and unreliable-grid regions.</p></article><article><ShieldCheck /><b>Essential cold storage</b><p>Medication, baby formula, high-value food, and specialty diets.</p></article><article><BatteryCharging /><b>Properties without you</b><p>Vacation homes, rentals, second refrigerators, and freezers.</p></article><article><Check /><b>Small food businesses</b><p>Valuable cold inventory that cannot wait for a manual response.</p></article></div></section>
    <SectionCta />
  </main>;
}
