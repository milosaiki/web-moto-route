import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotoRoute AI - Built For The Ride",
  description:
    "The first navigation system built exclusively for riders. No cars. No compromises. AI routing, weather, and group tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Oswald:wght@300;500;700&family=Roboto+Condensed:wght@300;400;700&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-roboto-condensed">{children}</body>
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
