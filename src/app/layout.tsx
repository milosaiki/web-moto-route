import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MotoRoute AI - Intelligent Motorcycle Navigation',
  description: 'The first navigation system built exclusively for motorcyclists. AI-driven routes, real-time weather intelligence, and seamless group tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
