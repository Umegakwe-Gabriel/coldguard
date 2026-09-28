import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="ColdGuard home">
    <svg className="brand-mark" viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 3 57 13v18c0 17-9.8 29.5-25 38C16.8 60.5 7 48 7 31V13L32 3Z" fill="currentColor" />
      <path d="M32 10 50 17v14c0 12.4-6.6 22-18 29-11.4-7-18-16.6-18-29V17l18-7Z" fill="none" stroke="currentColor" className="brand-inner-shield" strokeWidth="2" />
      <g stroke="#25C4F4" strokeWidth="3" strokeLinecap="round"><path d="M32 20v28M20 27l24 14M20 41l24-14" /><path d="m27.5 23.5 4.5-3.5 4.5 3.5M27.5 44.5 32 48l4.5-3.5M22 31l-1.5-5.5 5.5 1.5M38 41l5.5 1.5L42 37M22 37l-1.5 5.5L26 41M38 27l5.5-1.5L42 31" /></g>
      <circle cx="32" cy="34" r="3.5" fill="#fff" />
    </svg>
    <span className="brand-word">Cold<span>Guard</span></span>
  </Link>;
}
