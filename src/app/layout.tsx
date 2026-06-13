import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickFix Plumbing Bristol | 24/7 Emergency Plumbers | 30 Min Response",
  description:
    "Bristol's fastest emergency plumbers. 24/7 service, 30-minute response, Gas Safe registered. Serving Bristol & Bath. Call now for immediate assistance.",
  openGraph: {
    title: "QuickFix Plumbing Bristol | 24/7 Emergency Plumbers",
    description:
      "30-minute emergency response. Gas Safe registered. Serving all Bristol & Bath.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
