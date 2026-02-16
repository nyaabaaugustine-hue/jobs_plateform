import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import MainLayoutWrapper from '@/components/shared/main-layout-wrapper';
import dynamic from 'next/dynamic';

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
    icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771103002/klo_vappbs.png',
  },
};

const DynamicWidgetsWrapper = dynamic(
  () => import('@/components/shared/dynamic-widgets-wrapper'),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div className="flex flex-col min-h-screen">
              <MainLayoutWrapper>{children}</MainLayoutWrapper>
            </div>
            <Toaster />
            <DynamicWidgetsWrapper />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
