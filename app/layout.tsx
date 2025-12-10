import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nexus",
  description:
    "nexus Media & Communications Inc. is a pan-African media and communications company bringing brands and stories to life online. We design and develop engaging corporate websites that seamlessly integrate with dynamic digital platforms. Our flagship online publication, Business Weekly Review, delivers authoritative business insights and multimedia features, including YouTube video inserts, to connect audiences with Africa’s fast-growing business landscape.",

  alternates: {
    canonical: "https://nexusmedia.com",
  },

  openGraph: {
    title: "nexus Media & Communications Inc.",
    description:
      "Pan-African media company powering brands online through corporate websites, digital platforms, and Business Weekly Review magazine.",
    url: "https://nexusmedia.com",
    siteName: "nexus Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nexus Media & Communications Inc.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
