"use client";

import { ArrowRight, BatteryCharging, CircleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";

type Estimate = { hours: number; conservativeHours: number; usableEnergyWh: number; message: string };

export function RuntimeCalculator() {
  const [capacity, setCapacity] = useState(2200); const [load, setLoad] = useState(126); const [efficiency, setEfficiency] = useState(88);
  const [estimate, setEstimate] = useState<Estimate | null>(null); const [loading, setLoading] = useState(false);
  const quick = useMemo(() => (capacity * efficiency / 100 * .8) / load, [capacity, efficiency, load]);
  async function calculate() {
    setLoading(true);
    try {
      const response = await fetch("/api/runtime-estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ capacityWh: capacity, averageLoadW: load, inverterEfficiency: efficiency / 100 }) });
      if (!response.ok) throw new Error(); setEstimate(await response.json());
    } catch { toast.error("We couldn't calculate that estimate. Please try again."); }
    finally { setLoading(false); }
  }
  const hours = estimate?.hours ?? quick;
  return <div className="calculator-shell"><Toaster position="top-center" richColors /><section className="calculator-controls"><span className="eyebrow">Your assumptions</span><h2>Build a planning estimate</h2><p>Start with your refrigerator’s measured average load whenever possible.</p>
    <div className="control"><div><Label>Battery capacity</Label><b>{capacity.toLocaleString()} Wh</b></div><Slider value={[capacity]} min={800} max={3000} step={100} onValueChange={(v) => setCapacity(v[0])} /><small>800 Wh <span>3,000 Wh</span></small></div>
    <div className="control"><div><Label>Average refrigerator load</Label><b>{load} W</b></div><Slider value={[load]} min={60} max={300} step={5} onValueChange={(v) => setLoad(v[0])} /><small>60 W <span>300 W</span></small></div>
    <div className="control"><div><Label>Inverter efficiency</Label><b>{efficiency}%</b></div><Slider value={[efficiency]} min={75} max={95} step={1} onValueChange={(v) => setEfficiency(v[0])} /><small>75% <span>95%</span></small></div>
    <Button onClick={calculate} disabled={loading} className="button button-primary calculator-submit">{loading ? "Calculating…" : "Calculate detailed estimate"}<ArrowRight /></Button>
  </section>
  <section className="calculator-result"><span>Estimated usable runtime</span><div className="result-number"><strong>{hours.toFixed(1)}</strong><b>hours</b></div><div className="result-track"><i style={{ width: `${Math.min(100, hours / 24 * 100)}%` }} /></div><div className="result-meta"><div><span>Conservative estimate</span><b>{(estimate?.conservativeHours ?? hours * .85).toFixed(1)} h</b></div><div><span>Usable energy</span><b>{Math.round(estimate?.usableEnergyWh ?? capacity * efficiency / 100 * .8)} Wh</b></div><div><span>Battery reserve</span><b>20%</b></div></div><div className="result-callout"><BatteryCharging /><p>{estimate?.message ?? "This early estimate holds a 20% battery reserve for safer planning."}</p></div><div className="estimate-warning"><CircleAlert /><span>This is a planning tool, not a product guarantee. Compressor startup surge and operating conditions must be validated.</span></div></section></div>;
}
