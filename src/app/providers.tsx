
'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { LoadingProvider } from '@/context/loading-provider';
import { LoadingManager } from '@/components/global-loader/loading-manager';
import GlobalLoader from '@/components/global-loader';
import MainLayoutWrapper from '@/components/shared/main-layout-wrapper';
import { Toaster } from '@/components/ui/toaster';
import DynamicWidgetsWrapper from '@/components/shared/dynamic-widgets-wrapper';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
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
