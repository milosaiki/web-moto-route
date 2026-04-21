import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

/** Without this, many mobile browsers use a wide “layout” width (~980px) and media queries match desktop. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MotoRoute AI - Built For The Ride",
  description:
    "The first navigation system built exclusively for riders. No cars. No compromises. AI routing, weather, and group tracking.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Oswald:wght@300;500;700&family=Roboto+Condensed:wght@300;400;700&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-roboto-condensed" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden />
        {children}
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GN7KCTTSKM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GN7KCTTSKM');
        `}
      </Script>
    </html>
  );
}
