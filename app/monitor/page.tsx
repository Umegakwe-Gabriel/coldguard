import type { Metadata } from "next";
import { StatusMonitor } from "@/components/site/status-monitor";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = { title: "Live Monitor", description: "Explore the ColdProof local status and outage alert experience." };
export default function MonitorPage() {
  return <main><PageIntro eyebrow="Interactive monitor" title={<>Every critical answer in one calm view.</>} text="Use the simulator to move between grid power and a backup event. This interface represents the local display and remote monitoring concept." /><section className="monitor-page wrap"><StatusMonitor full /></section><section className="monitor-explainer wrap"><article><span>01</span><h2>Immediate certainty</h2><p>The interface leads with the current operating state so the owner never has to interpret raw electrical data.</p></article><article><span>02</span><h2>Condition over current</h2><p>Temperature remains a first-class status alongside battery and load because food condition is the actual outcome.</p></article><article><span>03</span><h2>Escalation with context</h2><p>Alerts distinguish grid failure, rising temperature, low runtime, and equipment faults so the next action is clear.</p></article></section></main>;
}
