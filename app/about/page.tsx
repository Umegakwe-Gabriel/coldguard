import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, BellRing, PlugZap, ThermometerSnowflake } from "lucide-react";

export const metadata = { title: "About", description: "The problem ColdGuard solves and how the refrigerator protection concept works." };

export default function AboutPage() {
  return <main className="about-page">
    <section className="about-hero"><div className="wrap"><span className="eyebrow">About ColdGuard</span><h1>Food should not become waste because the power went out.</h1><p>ColdGuard is a refrigerator backup and warning system for homes and small food businesses. It is being designed for places where electricity is unreliable and every hour without cooling matters.</p></div></section>
    <section className="problem-story wrap"><div className="story-number">01</div><div><span className="eyebrow">The problem</span><h2>A blackout creates two problems.</h2><p>First, the refrigerator stops cooling. Second, you may not know how warm it became—especially when you are away. A normal battery can provide electricity, but it may not tell you whether the food stayed at a safe temperature.</p></div></section>
    <section className="solution-story"><div className="wrap solution-grid"><div className="solution-visual"><Image src="/coldguard-unit.webp" alt="ColdGuard concept device" width={1400} height={788} unoptimized /></div><div><span className="eyebrow">The solution</span><h2>One guard between the wall and your refrigerator.</h2><p>The refrigerator plugs into ColdGuard. ColdGuard plugs into the wall. It charges while electricity is available, notices when the power fails, and supplies backup power automatically.</p><Link className="button button-primary" href="/pilot">I want ColdGuard <ArrowRight /></Link></div></div></section>
    <section className="how-section wrap"><div className="section-heading"><span className="eyebrow">How it works</span><h2>Four simple jobs. One clear result.</h2></div><div className="how-grid"><article><PlugZap /><b>1. Watch</b><p>ColdGuard watches the electricity supply.</p></article><article><BatteryCharging /><b>2. Power</b><p>When power fails, the battery takes over.</p></article><article><ThermometerSnowflake /><b>3. Check</b><p>Temperature probes check the refrigerator and freezer.</p></article><article><BellRing /><b>4. Tell</b><p>Cellular alerts tell you when action may be needed.</p></article></div></section>
    <section className="truth-section"><div className="wrap"><span className="eyebrow">Where the project stands</span><h2>ColdGuard is a concept being tested—not a finished appliance for sale.</h2><p>Runtime, capacity, safety certification, cellular coverage, final design, availability, and price still need engineering validation and real-world testing. Expressions of interest help us learn where the need is strongest before we invest in full production.</p></div></section>
  </main>;
}
