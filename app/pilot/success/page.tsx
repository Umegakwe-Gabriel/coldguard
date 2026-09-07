import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, TimerReset } from "lucide-react";

export const metadata: Metadata = { title: "You’re on the pilot list", description: "Your ColdProof pilot application has been received." };

export default function PilotSuccessPage() {
  return <main className="success-page"><section className="success-panel"><div className="success-mark"><Check /></div><span className="eyebrow">Application received</span><h1>You’re on the list.</h1><p>Thank you for helping shape ColdProof. Your response will help us understand where automatic refrigerator protection matters most and what the first pilot must prove.</p><div className="success-next"><TimerReset /><div><b>What happens next</b><span>As the concept moves toward testing, pilot invitations will be prioritized by outage experience, use case, region, and product fit.</span></div></div><div className="success-actions"><Link href="/monitor" className="button button-primary">Explore the monitor <ArrowRight /></Link><Link href="/" className="button button-outline">Return home</Link></div></section></main>;
}
