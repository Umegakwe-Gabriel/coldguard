import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div className="footer-brand"><Logo /><p>Automatic refrigerator backup, independent temperature proof, and cellular alerts in one appliance.</p></div>
      <div><b>Understand</b><Link href="/about">About ColdGuard</Link><Link href="/monitor">See the monitor</Link></div>
      <div><b>Explore</b><Link href="/runtime">Runtime estimator</Link><Link href="/pilot">Tell us you want it</Link></div>
      <div className="footer-status"><b>Development status</b><span><i /> Concept being tested</span><p>Specifications, certifications, runtime, price, and availability still require engineering validation and real-world testing.</p></div>
    </div>
    <div className="wrap footer-base"><span>© 2026 ColdGuard concept project</span><span>Power goes. Cold stays.</span><Link href="/pilot">I want ColdGuard <ArrowUpRight /></Link></div>
  </footer>;
}
