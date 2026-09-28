import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div className="footer-brand"><Logo /><p>Automatic refrigerator backup, independent temperature proof, and cellular alerts in one appliance.</p></div>
      <div><b>Product</b><Link href="/product">Overview</Link><Link href="/technology">Technology</Link><Link href="/monitor">Live monitor</Link></div>
      <div><b>Plan</b><Link href="/runtime">Runtime estimator</Link><Link href="/pricing">Pricing hypotheses</Link><Link href="/pilot">Pilot access</Link></div>
      <div className="footer-status"><b>Development status</b><span><i /> Concept prototype</span><p>Specifications, pricing, certifications, and availability remain subject to engineering validation and pilot testing.</p></div>
    </div>
    <div className="wrap footer-base"><span>© 2026 ColdProof concept project</span><span>Plug in. Stay cold. Stay informed.</span><Link href="/pilot">Join the pilot <ArrowUpRight /></Link></div>
  </footer>;
}
