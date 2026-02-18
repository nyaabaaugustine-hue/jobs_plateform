import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

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
  title: 'Chapel Hill - Find Your Next Job',
  description: 'The Easiest Way to Get Your New Job',
  icons: {
    icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771358781/favicon.png',
    shortcut: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771358781/favicon.png',
    apple: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771358781/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
