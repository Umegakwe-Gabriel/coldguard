"use client";

import { Activity, BatteryCharging, BellRing, Check, Gauge, Radio, RotateCw, ShieldCheck, ThermometerSnowflake, WifiOff, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";

type Status = { mode: "grid" | "backup"; batteryPercent: number; runtimeHours: number; temperatureF: number; loadWatts: number; cellular: "connected"; events: { label: string; time: string; detail: string }[] };
const initial: Status = { mode: "backup", batteryPercent: 78, runtimeHours: 17, temperatureF: 37, loadWatts: 126, cellular: "connected", events: [
  { label: "Backup active", time: "8:42 PM", detail: "Automatic transfer completed" },
  { label: "Owner notified", time: "8:42 PM", detail: "Cellular alert delivered" },
  { label: "Temperature safe", time: "Now", detail: "Holding at 37°F" },
] };

export function StatusMonitor({ full = false }: { full?: boolean }) {
  const [status, setStatus] = useState(initial);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch(`/api/status?mode=${status.mode === "backup" ? "grid" : "outage"}`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      setStatus(await response.json());
    } catch { toast.error("The simulated device could not refresh."); }
    finally { setLoading(false); }
  }

  return <div className={`monitor ${full ? "monitor-full" : ""}`}>
    <Toaster position="top-center" richColors />
    <div className="monitor-bar"><div><span className={status.mode === "backup" ? "status-dot alert" : "status-dot"} />{status.mode === "backup" ? "Backup active" : "Grid power normal"}</div><span>Kitchen refrigerator · CP-0217</span><button onClick={refresh} disabled={loading}><RotateCw className={loading ? "spinning" : ""} /> {status.mode === "backup" ? "Restore grid" : "Simulate outage"}</button></div>
    <div className="monitor-body">
      <div className="monitor-primary"><span>Battery remaining</span><div><strong>{status.batteryPercent}</strong><sup>%</sup></div><Progress value={status.batteryPercent} className="monitor-progress" /><p><BatteryCharging /> <b>{status.runtimeHours} hours</b> estimated runtime</p></div>
      <div className="monitor-stats">
        <article><ThermometerSnowflake /><span>Fridge temperature</span><strong>{status.temperatureF}°F</strong><small className="safe"><Check /> Safe range</small></article>
        <article><Gauge /><span>Current load</span><strong>{status.loadWatts} W</strong><small>Compressor cycling</small></article>
        <article><Radio /><span>Cellular link</span><strong>LTE</strong><small className="safe"><Check /> Connected</small></article>
        <article><ShieldCheck /><span>Local control</span><strong>Ready</strong><small>Cloud-independent</small></article>
      </div>
    </div>
    {full && <div className="monitor-lower">
      <section className="event-panel"><div className="panel-heading"><div><span>Event timeline</span><h2>What ColdGuard knows</h2></div><Activity /></div>{status.events.map((event, index) => <div className="event-row" key={event.label}><span className="event-check"><Check /></span><div><b>{event.label}</b><p>{event.detail}</p></div><time>{event.time}</time></div>)}</section>
      <section className="rules-panel"><div className="panel-heading"><div><span>Automatic rules</span><h2>What triggers an alert</h2></div><BellRing /></div><div className="rule"><Zap /><div><b>Grid power fails</b><p>Immediate outage alert</p></div><span>Armed</span></div><div className="rule"><ThermometerSnowflake /><div><b>Temperature rises</b><p>Escalation above threshold</p></div><span>Armed</span></div><div className="rule"><BatteryCharging /><div><b>Battery falls below 20%</b><p>Low-runtime warning</p></div><span>Armed</span></div><div className="rule"><WifiOff /><div><b>Cellular link drops</b><p>Local decisions continue</p></div><span>Local</span></div></section>
    </div>}
  </div>;
}
