import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ColdProof | Smart refrigerator backup and temperature proof",
  description: "Automatic refrigerator backup power, independent temperature monitoring, and cellular outage alerts in one appliance.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
