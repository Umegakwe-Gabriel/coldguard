"use client";

import { FormEvent, useMemo, useState } from "react";
import { Activity, ArrowRight, BatteryCharging, Check, ChevronRight, Cpu, Gauge, HousePlug, Menu, Radio, ShieldCheck, Snowflake, ThermometerSnowflake, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";

type Estimate = { hours: number; conservativeHours: number; usableEnergyWh: number; message: string };
type Status = { mode: "grid" | "backup"; batteryPercent: number; runtimeHours: number; temperatureF: number; loadWatts: number; cellular: "connected"; events: { label: string; time: string; detail: string }[] };

const defaultStatus: Status = {
  mode: "backup", batteryPercent: 78, runtimeHours: 17, temperatureF: 37, loadWatts: 126, cellular: "connected",
  events: [
    { label: "Backup active", time: "8:42 PM", detail: "Transfer completed automatically" },
    { label: "Owner notified", time: "8:42 PM", detail: "Cellular alert delivered" },
    { label: "Temperature safe", time: "Now", detail: "Holding at 37°F" },
  ],
};

function Logo() {
  return <span className="brand" aria-label="ColdProof">
    <svg className="brand-mark" viewBox="0 0 64 72" role="img" aria-hidden="true">
      <path d="M32 3 58 13v19c0 17-10 29-26 37C16 61 6 49 6 32V13L32 3Z" fill="#072B4F" />
      <path d="M32 9 52 17v15c0 13-7 23-20 30-13-7-20-17-20-30V17L32 9Z" fill="none" stroke="#fff" strokeWidth="2.4" />
      <g stroke="#25C4F4" strokeWidth="2.6" strokeLinecap="round"><path d="M32 17v25M21 23l22 13M21 36l22-13" /><path d="m28 20 4-3 4 3M28 39l4 3 4-3M22 27l-1-5 5 1M38 36l5 1-1-5M22 32l-1 5 5-1M38 23l5-1-1 5" /></g>
      <path d="m22 47 7 7 14-15" fill="none" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="brand-word">Cold<span>Proof</span></span>
  </span>;
}

function StatusConsole({ status, loading, onRefresh }: { status: Status; loading: boolean; onRefresh: () => void }) {
  return <div className="status-console" id="demo">
    <div className="console-topline"><span className="live-label"><i /> BACKUP ACTIVE</span><button onClick={onRefresh} disabled={loading} aria-label="Refresh simulated status"><Activity size={17} /> {loading ? "Updating" : "Live demo"}</button></div>
    <div className="console-primary"><div><span className="metric-label">Battery remaining</span><strong>{status.batteryPercent}%</strong></div><div className="runtime-pill"><BatteryCharging size={18} /><span><b>{status.runtimeHours} h</b> estimated runtime</span></div></div>
    <Progress value={status.batteryPercent} className="battery-progress" />
    <div className="console-metrics"><div><ThermometerSnowflake /><strong>{status.temperatureF}°F</strong><span>Fridge</span></div><div><Gauge /><strong>{status.loadWatts} W</strong><span>Current load</span></div><div><Radio /><strong>LTE</strong><span>Connected</span></div></div>
    <div className="event-log">{status.events.map((event, index) => <div className="event" key={`${event.label}-${index}`}><span className={index === 0 ? "event-icon active" : "event-icon"}><Check size={13} /></span><div><b>{event.label}</b><small>{event.detail}</small></div><time>{event.time}</time></div>)}</div>
  </div>;
}

export default function ColdProofSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [capacity, setCapacity] = useState(2200);
  const [load, setLoad] = useState(126);
  const [efficiency, setEfficiency] = useState(88);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const [statusLoading, setStatusLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const quickEstimate = useMemo(() => Math.max(0, (capacity * (efficiency / 100) * 0.8) / load), [capacity, efficiency, load]);

  async function calculateRuntime() {
    setEstimateLoading(true);
    try {
      const response = await fetch("/api/runtime-estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ capacityWh: capacity, averageLoadW: load, inverterEfficiency: efficiency / 100 }) });
      if (!response.ok) throw new Error("Calculator unavailable");
      setEstimate(await response.json());
    } catch { toast.error("We couldn't calculate that estimate. Please try again."); }
    finally { setEstimateLoading(false); }
  }

  async function refreshStatus() {
    setStatusLoading(true);
    try {
      const response = await fetch("/api/status?mode=outage", { cache: "no-store" });
      if (!response.ok) throw new Error("Status unavailable");
      setStatus(await response.json());
    } catch { toast.error("The demo status could not refresh."); }
    finally { setStatusLoading(false); }
  }

  async function submitPilot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Submission failed");
      setSubmitted(true); toast.success("You're on the ColdProof pilot list.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Please try again."); }
    finally { setSubmitting(false); }
  }

  return <div className="site-shell">
    <Toaster position="top-center" richColors />
    <header className="site-header"><a href="#top" className="logo-link"><Logo /></a><nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation"><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#technology" onClick={() => setMenuOpen(false)}>Technology</a><a href="#runtime" onClick={() => setMenuOpen(false)}>Runtime</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a><Button asChild className="nav-cta"><a href="#pilot" onClick={() => setMenuOpen(false)}>Join the pilot</a></Button></nav><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy"><div className="eyebrow"><Snowflake size={15} /> Refrigerator resilience, rethought</div><h1>Know it stayed cold.<br /><span>Even when the power didn’t.</span></h1><p className="hero-lede">ColdProof automatically backs up your refrigerator, watches its actual temperature, and keeps you informed through cellular alerts—even when the grid and Wi‑Fi are down.</p><div className="hero-actions"><Button asChild size="lg" className="primary-button"><a href="#pilot">Reserve pilot access <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="secondary-button"><a href="#demo">View outage demo</a></Button></div><div className="hero-proof"><span><b>≈24 h</b> design target</span><span><b>Automatic</b> grid transfer</span><span><b>LTE</b> outage alerts</span></div></div>
        <StatusConsole status={status} loading={statusLoading} onRefresh={refreshStatus} />
      </section>

      <section className="trust-strip"><div className="section-wrap trust-inner"><span>Built for what cannot afford to warm up</span><div><ShieldCheck /> Food</div><div><ThermometerSnowflake /> Medication</div><div><HousePlug /> Second homes</div><div><Snowflake /> Freezers</div></div></section>

      <section className="problem-section section-wrap">
        <div className="section-heading split-heading"><div><span className="kicker">The difference</span><h2>Backup power tells you it is running.<br />ColdProof tells you the food is safe.</h2></div><p>Outages create two problems at once: the refrigerator loses power, and the owner loses visibility. ColdProof solves both in one appliance.</p></div>
        <div className="comparison-grid"><article className="comparison ordinary"><span className="card-number">01</span><h3>Ordinary backup</h3><ul><li>Shows battery and power flow</li><li>May depend on home Wi‑Fi</li><li>Leaves temperature uncertain</li><li>Often requires manual setup</li></ul></article><article className="comparison coldproof"><span className="card-number">02</span><h3>ColdProof protection</h3><ul><li>Transfers automatically during an outage</li><li>Measures refrigerator and freezer temperature</li><li>Alerts through an independent cellular link</li><li>Keeps safety decisions local</li></ul></article></div>
      </section>

      <section className="how-section" id="how"><div className="section-wrap"><div className="section-heading centered"><span className="kicker">One appliance. Four systems.</span><h2>Plug it in once. Let it take over when it matters.</h2></div><div className="steps-grid">{[
        ["01", Zap, "UPS power", "Charges continuously, detects an outage, and transfers the refrigerator automatically."],
        ["02", Radio, "Cellular link", "Sends alerts through LTE when home Wi‑Fi and grid power are unavailable."],
        ["03", ThermometerSnowflake, "Temperature sensing", "Tracks the refrigerator and freezer with food-safe wired probes."],
        ["04", Cpu, "Local intelligence", "Combines power, battery, and temperature data to trigger the right response."],
      ].map(([number, Icon, title, copy]) => { const StepIcon = Icon as typeof Zap; return <article className="step-card" key={String(number)}><div className="step-top"><span>{String(number)}</span><StepIcon /></div><h3>{String(title)}</h3><p>{String(copy)}</p></article>; })}</div><div className="local-banner"><ShieldCheck /><div><b>Protection does not wait for the cloud.</b><span>If cellular service disappears, backup power and safety decisions continue locally.</span></div></div></div></section>

      <section className="runtime-section section-wrap" id="runtime">
        <div className="runtime-copy"><span className="kicker">Explore your coverage</span><h2>Estimate backup runtime for your refrigerator.</h2><p>Adjust the assumptions below. Real runtime varies with compressor cycling, startup surge, ambient temperature, battery condition, and refrigerator efficiency.</p>
          <div className="control-group"><div className="control-label"><Label>Battery capacity</Label><b>{capacity.toLocaleString()} Wh</b></div><Slider value={[capacity]} min={800} max={3000} step={100} onValueChange={(value) => setCapacity(value[0])} /></div>
          <div className="control-group"><div className="control-label"><Label>Average refrigerator load</Label><b>{load} W</b></div><Slider value={[load]} min={60} max={300} step={5} onValueChange={(value) => setLoad(value[0])} /></div>
          <div className="control-group"><div className="control-label"><Label>Inverter efficiency</Label><b>{efficiency}%</b></div><Slider value={[efficiency]} min={75} max={95} step={1} onValueChange={(value) => setEfficiency(value[0])} /></div>
          <Button onClick={calculateRuntime} disabled={estimateLoading} size="lg" className="primary-button calculator-button">{estimateLoading ? "Calculating…" : "Calculate detailed estimate"}<ArrowRight /></Button>
        </div>
        <div className="runtime-result" aria-live="polite"><span className="result-label">Estimated usable runtime</span><div className="hours"><strong>{(estimate?.hours ?? quickEstimate).toFixed(1)}</strong><span>hours</span></div><div className="range"><span>Conservative planning estimate</span><b>{(estimate?.conservativeHours ?? quickEstimate * 0.85).toFixed(1)} h</b></div><div className="energy-orbit"><div><BatteryCharging /><span>{Math.round(estimate?.usableEnergyWh ?? capacity * (efficiency / 100) * 0.8)} Wh<br /><small>usable energy</small></span></div></div><p>{estimate?.message ?? "This early estimate holds a 20% battery reserve for safer planning."}</p></div>
      </section>

      <section className="technology-section" id="technology"><div className="section-wrap technology-inner"><div className="section-heading"><span className="kicker">Built to be serviceable</span><h2>Eight modules. One clear job.</h2><p>The concept separates high-voltage power hardware from low-voltage monitoring and control, making development, testing, and repair more practical.</p></div><div className="module-list">{[
        ["Enclosure", "Vented metal shell"], ["Energy", "2–2.5 kWh LiFePO₄ + BMS"], ["Power stage", "Pure-sine inverter + charger"], ["Protection", "Transfer switch + breakers"], ["Controller", "Local monitoring and decisions"], ["Cellular", "LTE modem + antenna"], ["Interface", "Display + audible alarm"], ["Probe", "Food-safe temperature sensing"],
      ].map(([name, detail], index) => <div className="module-row" key={name}><span>{String(index + 1).padStart(2, "0")}</span><b>{name}</b><p>{detail}</p><ChevronRight /></div>)}</div></div></section>

      <section className="pricing-section section-wrap" id="pricing"><div className="section-heading centered"><span className="kicker">Pricing hypotheses</span><h2>Protection sized to the refrigerator you rely on.</h2><p>These ranges are early targets to test with pilot customers—not final retail offers.</p></div><div className="pricing-grid">
        <article className="price-card"><span>Monitoring add-on</span><h3>$149–$299</h3><p>Temperature proof and cellular-aware monitoring for an existing compatible power setup.</p><ul><li><Check /> Independent probes</li><li><Check /> Local alarms</li><li><Check /> Runtime prediction</li></ul></article>
        <article className="price-card featured"><div className="recommended">Most complete concept</div><span>2 kWh integrated unit</span><h3>$1,299–$1,599</h3><p>Automatic refrigerator backup with monitoring, transfer, display, and cellular capability.</p><ul><li><Check /> ≈24-hour design target</li><li><Check /> Compressor-surge capable</li><li><Check /> Full ColdProof monitoring</li></ul></article>
        <article className="price-card"><span>1 kWh integrated unit</span><h3>$799–$999</h3><p>A smaller-capacity option for efficient refrigerators, secondary units, and shorter outages.</p><ul><li><Check /> Automatic transfer</li><li><Check /> Temperature sensing</li><li><Check /> Expandable concept</li></ul></article>
      </div><p className="cellular-note"><Radio /> Estimated cellular service: $3–$8/month. Final pricing, specifications, certifications, and availability remain subject to development and validation.</p></section>

      <section className="pilot-section" id="pilot"><div className="section-wrap pilot-inner"><div className="pilot-copy"><span className="kicker">Help shape the first pilot</span><h2>Have you lost food—or peace of mind—to an outage?</h2><p>Join the early-access list if you have experienced a four-hour outage, lost valuable refrigerated items, manage a second property, or need automatic cold protection while away.</p><div className="pilot-points"><span><Check /> No payment required</span><span><Check /> Early product updates</span><span><Check /> Pilot invitations by fit and region</span></div></div>
        {submitted ? <div className="success-card"><div className="success-icon"><Check /></div><h3>You’re on the list.</h3><p>Thank you for helping shape ColdProof. We’ll use your answers to understand where automatic refrigerator protection matters most.</p><Button variant="outline" onClick={() => setSubmitted(false)}>Submit another response</Button></div> :
          <form className="pilot-form" onSubmit={submitPilot}><div className="form-row"><div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" autoComplete="name" required placeholder="Your name" /></div><div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div></div><div className="form-row"><div><Label htmlFor="segment">What do you need to protect?</Label><select id="segment" name="segment" required defaultValue=""><option value="" disabled>Select one</option><option>Primary home refrigerator</option><option>Medication or baby formula</option><option>Vacation or rental property</option><option>Small food business</option><option>Standalone freezer</option><option>Other</option></select></div><div><Label htmlFor="postalCode">ZIP code</Label><Input id="postalCode" name="postalCode" inputMode="numeric" pattern="[0-9]{5}" placeholder="30117" /></div></div><div><Label htmlFor="outageExperience">Tell us about your outage experience <span>(optional)</span></Label><textarea id="outageExperience" name="outageExperience" rows={4} maxLength={700} placeholder="How long was the outage, and what did you need to protect?" /></div><label className="consent"><input type="checkbox" name="consent" value="yes" required /><span>I agree to receive ColdProof product and pilot updates. I can unsubscribe at any time.</span></label><Button type="submit" disabled={submitting} size="lg" className="primary-button form-submit">{submitting ? "Joining…" : "Join the pilot list"}<ArrowRight /></Button></form>}
      </div></section>
    </main>

    <footer><div className="section-wrap footer-main"><div><Logo /><p>Automatic refrigerator backup, independent temperature proof, and cellular alerts in one appliance.</p></div><div><b>Explore</b><a href="#how">How it works</a><a href="#runtime">Runtime estimator</a><a href="#pricing">Pricing hypotheses</a></div><div><b>Development status</b><p>ColdProof is a concept prototype. Product specifications and pricing are subject to engineering validation, certification, and pilot testing.</p></div></div><div className="section-wrap footer-bottom"><span>© 2026 ColdProof concept project</span><span>Plug in. Stay cold. Stay informed.</span></div></footer>
  </div>;
}
