import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrustScoreAI - Next-Gen Credit Scoring',
  description: 'AI-powered credit scoring and fraud detection system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-white font-sans antialiased dark:bg-slate-950", inter.className)}>
        {children}
      </body>
    </html>
  );
}
