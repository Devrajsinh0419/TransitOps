import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppProvider } from '@/providers/AppProvider';
import { APPEARANCE_INIT_SCRIPT } from '@/lib/appearance';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TransitOps | Fleet & Transport ERP',
  description: 'Enterprise-grade Fleet & Transport Management ERP platform for real-time logistics tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: APPEARANCE_INIT_SCRIPT }} />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
