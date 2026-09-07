import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, text, children }: { eyebrow: string; title: ReactNode; text: string; children?: ReactNode }) {
  return <section className="page-intro"><div className="wrap page-intro-grid"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div><div className="page-intro-copy"><p>{text}</p>{children}</div></div></section>;
}
