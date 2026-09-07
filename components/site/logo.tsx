import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="ColdProof home">
    <svg className="brand-mark" viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 3 58 13v19c0 17-10 29-26 37C16 61 6 49 6 32V13L32 3Z" fill="currentColor" />
      <path d="M32 9 52 17v15c0 13-7 23-20 30-13-7-20-17-20-30V17L32 9Z" fill="none" stroke="#fff" strokeWidth="2.4" />
      <g stroke="#25C4F4" strokeWidth="2.6" strokeLinecap="round"><path d="M32 17v25M21 23l22 13M21 36l22-13" /><path d="m28 20 4-3 4 3M28 39l4 3 4-3M22 27l-1-5 5 1M38 36l5 1-1-5M22 32l-1 5 5-1M38 23l5-1-1 5" /></g>
      <path d="m22 47 7 7 14-15" fill="none" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="brand-word">Cold<span>Proof</span></span>
  </Link>;
}
