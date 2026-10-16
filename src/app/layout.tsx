import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/siteConfig";
import { MotionProvider } from "@/components/motion";
import { AppLayoutShell } from "@/components/layout/AppLayoutShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#101B2B",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Professional Software Development & Digital Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development Kenya",
    "custom web applications",
    "school management systems Kenya",
    "business management software",
    "M-Pesa payment integration",
    "Next.js developer Nairobi",
    "Lebby Software Solutions",
    "Lebby software development",
    "website design and development",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteConfig.url,
    title: `${siteConfig.name} | Professional Software Development`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223",
    },
    priceRange: "$$",
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#101B2B] text-white antialiased selection:bg-[#19B6A4] selection:text-[#101B2B]">
        <MotionProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
        </MotionProvider>
      </body>
    </html>
  );
}
