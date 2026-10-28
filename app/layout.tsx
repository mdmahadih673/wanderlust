import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Used for the "Wanderlast" wordmark and headings via the `font-heading` utility.
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const siteName = "Wanderlast";
const siteDescription =
  "Wanderlast is a full-service travel agency crafting curated journeys to the world's most unforgettable places — handpicked stays, expert local guides, and support every step of the way.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wanderlast.example.com"),
  title: {
    default: `${siteName} — Discover Your Next Adventure`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "travel agency",
    "curated travel",
    "holiday packages",
    "guided tours",
    "Wanderlast",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: `${siteName} — Discover Your Next Adventure`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Discover Your Next Adventure`,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
