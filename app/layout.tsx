import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteStateProvider } from "@/components/site/SiteState";
import { Nav } from "@/components/site/Nav";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "div · from a particle to a galaxy",
  description:
    "divyalakshmi prem sudha. shipyard, revy, moodmelody.ai. art, music, physics and fintech, told one scale of the universe at a time.",
  metadataBase: new URL("https://divya-bice.vercel.app"),
  openGraph: {
    title: "div · from a particle to a galaxy",
    description: "hi, i'm div. like the ones from html.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080f",
};

// Runs before first paint, so there's no flash of the wrong theme or mode.
// Mirrors themeForHour() in components/site/SiteState.tsx.
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('div-theme');if(!t){var h=new Date().getHours();t=h>=5&&h<8?'dawn':h>=8&&h<17?'day':h>=17&&h<20?'dusk':'night'}d.dataset.theme=t;var m=localStorage.getItem('div-mode');if(!m){m=matchMedia('(prefers-reduced-motion: reduce)').matches?'skip':'story'}d.dataset.mode=m}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteStateProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
          >
            skip to content
          </a>
          <Nav />
          {children}
        </SiteStateProvider>
      </body>
    </html>
  );
}
