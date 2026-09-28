import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, TimerReset } from "lucide-react";

export const metadata: Metadata = { title: "We heard you", description: "Your interest in ColdGuard has been received." };

export default function PilotSuccessPage() {
  return <main className="success-page"><section className="success-panel"><div className="success-mark"><Check /></div><span className="eyebrow">Your answer was received</span><h1>We heard you.</h1><p>Thank you. Your answer helps us understand where ColdGuard is needed and what it must protect.</p><div className="success-next"><TimerReset /><div><b>What happens next</b><span>We will contact people whose outage experience and location are a good fit for the first real-world tests.</span></div></div><div className="success-actions"><Link href="/monitor" className="button button-primary">See the monitor <ArrowRight /></Link><Link href="/" className="button button-outline">Return home</Link></div></section></main>;
}
