import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ColdProof | Smart refrigerator resilience", template: "%s | ColdProof" },
  description: "Automatic refrigerator backup power, independent temperature monitoring, and cellular outage alerts in one appliance.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
