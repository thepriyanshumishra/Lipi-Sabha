import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lipi Sabha — Collaborative Script Learning & Orthography Fieldwork',
  description: 'Duolingo-grade playful script learning, blind-first Community Mirror, and sovereign language research.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#4b4b4b] antialiased">
        {children}
      </body>
    </html>
  );
}
