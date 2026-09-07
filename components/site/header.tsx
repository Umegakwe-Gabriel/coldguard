"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const links = [
  ["Product", "/product"], ["Technology", "/technology"], ["Monitor", "/monitor"],
  ["Runtime", "/runtime"], ["Pricing", "/pricing"],
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-shell"><Logo />
      <nav className={open ? "main-nav open" : "main-nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={path === href ? "active" : ""}>{label}</Link>)}
        <Link href="/pilot" onClick={() => setOpen(false)} className="nav-cta">Join the pilot <span>↗</span></Link>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
