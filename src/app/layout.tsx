import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Abir Dey | Computer Science & AI Research",
  description:
    "Portfolio of Abir Dey, a Computer Science graduate from BRAC University working on machine learning, computational analysis, and systems engineering.",
  keywords: [
    "Abir Dey",
    "BRAC University",
    "Machine Learning",
    "AI Research",
    "Computer Science",
    "Portfolio",
  ],
  authors: [{ name: "Abir Dey" }],
  openGraph: {
    title: "Abir Dey | Computer Science & AI Research",
    description:
      "Computer Science graduate from BRAC University, focused on machine learning, computational analysis, and systems engineering.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{`.reveal { opacity: 1; transform: none; }`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
