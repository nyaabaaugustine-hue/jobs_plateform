import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import DynamicWidgetsWrapper from '@/components/shared/dynamic-widgets-wrapper';
import ConditionalLiveActivityBar from '@/components/shared/conditional-live-activity-bar';
import { FirebaseClientProvider } from '@/firebase';

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
              <div className="sticky top-0 z-50">
                <Header />
                <ConditionalLiveActivityBar />
              </div>
              {children}
              <Footer />
            </div>
            <Toaster />
            <DynamicWidgetsWrapper />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
