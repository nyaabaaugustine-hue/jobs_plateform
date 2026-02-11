import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import HiredNotification from '@/components/hired-notification';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Chapel Hill Ltd - Find Your Next Job',
  description: 'The Easiest Way to Get Your New Job',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`} suppressHydrationWarning>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <HiredNotification />
      </body>
    </html>
  );
}
