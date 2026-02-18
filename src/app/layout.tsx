import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: '#0B0F17',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Chapel Hill - Executive Job Discovery & Recruitment',
    template: '%s | Chapel Hill',
  },
  description: 'Discover elite career opportunities and top-tier talent. Chapel Hill connects world-class developers with the most innovative companies in the ecosystem.',
  keywords: ['Jobs', 'Recruitment', 'Career', 'Ghana Tech', 'Software Engineering', 'Executive Search'],
  authors: [{ name: 'Chapel Hill Managers' }],
  metadataBase: new URL('https://chapel-hill-ltd.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://chapel-hill-ltd.com',
    siteName: 'Chapel Hill',
    images: [{
      url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771097592/lllogo_zqlrsm.png',
      width: 1200,
      height: 630,
      alt: 'Chapel Hill Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chapel Hill - Find Your Next Job, Faster.',
    description: 'The easiest way to get your new job with AI-powered matching.',
    images: ['https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771097592/lllogo_zqlrsm.png'],
  },
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
