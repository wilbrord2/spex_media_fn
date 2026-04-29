import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inamacom",
  description:
    "Inama Media & Communications Inc. is a pan-African media and communications company bringing brands and stories to life online. We design and develop engaging corporate websites that seamlessly integrate with dynamic digital platforms. Our flagship online publication, Business Weekly Review, delivers authoritative business insights and multimedia features, including YouTube video inserts, to connect audiences with Africa’s fast-growing business landscape.",

  alternates: {
    canonical: "https://inamacom.com",
  },

  openGraph: {
    title: "Inama Media & Communications Inc.",
    description:
      "Pan-African media company powering brands online through corporate websites, digital platforms, and Business Weekly Review magazine.",
    url: "https://inamacom.com",
    siteName: "Inama Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inama Media & Communications Inc.",
    description:
      "Driving Africa’s digital media future with Business Weekly Review, corporate websites, and multimedia storytelling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
