import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '@/components/providers/session-provider';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white" suppressHydrationWarning>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
