'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { LoadingProvider } from '@/context/loading-provider';
import { LoadingManager } from '@/components/global-loader/loading-manager';
import GlobalLoader from '@/components/global-loader';
import MainLayoutWrapper from '@/components/shared/main-layout-wrapper';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

// Use dynamic import with ssr: false to fix hydration issues for floating client widgets
const DynamicWidgetsWrapper = dynamic(() => import('@/components/shared/dynamic-widgets-wrapper'), { 
  ssr: false 
});

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="midnight"
          themes={['light', 'dark', 'midnight']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <LoadingProvider>
              <LoadingManager />
              <GlobalLoader />
              <div className="flex flex-col min-h-screen">
                <MainLayoutWrapper>{children}</MainLayoutWrapper>
              </div>
              <Toaster />
              <DynamicWidgetsWrapper />
            </LoadingProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
    );
}
