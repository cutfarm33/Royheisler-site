import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roy Heisler | Custom Internal Tools & Software Consulting",
  description:
    "I help operations leaders replace messy spreadsheets and expensive SaaS with lean, custom software they actually own. Software unbundling for modern teams.",
  keywords: [
    "custom internal tools",
    "software consulting",
    "SaaS replacement",
    "internal tool development",
    "spreadsheet replacement",
    "custom dashboards",
    "legacy migration",
  ],
  authors: [{ name: "Roy Heisler" }],
  openGraph: {
    title: "Roy Heisler | Stop Renting Your Software",
    description:
      "Stop renting features you don't use. I build the exact tools you need to run your business.",
    url: "https://royheisler.com",
    siteName: "Roy Heisler",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roy Heisler | Custom Internal Tools",
    description:
      "I build lean, custom software that replaces bloated enterprise SaaS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
