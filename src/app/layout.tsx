import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muideen Jamiu | Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 5+ years of experience building fast, accessible, and beautiful web products. Specializing in React, Next.js, TypeScript, and Vue.js. Open to remote opportunities worldwide.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Remote",
    "Nigeria",
    "Senior Developer",
    "Muideen Jamiu",
    "Vue.js",
    "Web Development",
  ],
  authors: [{ name: "Muideen Muhammed Jamiu" }],
  creator: "Muideen Muhammed Jamiu",
  openGraph: {
    title: "Muideen Jamiu | Senior Frontend Engineer",
    description:
      "5+ years building production-grade web applications. React, Next.js, TypeScript, Vue.js.",
    url: "https://muideenjamiu.dev",
    siteName: "Muideen Jamiu Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muideen Jamiu — Senior Frontend Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muideen Jamiu | Senior Frontend Engineer",
    description:
      "5+ years building production-grade web applications. React, Next.js, TypeScript, Vue.js.",
    creator: "@Muideen_M_Jamiu",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://muideenjamiu.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <style>{`
          :root { --font-display: 'Inter', system-ui, sans-serif; }
        `}</style>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
