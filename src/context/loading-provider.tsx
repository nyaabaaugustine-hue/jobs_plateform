
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isReady: boolean;
  setIsReady: (isReady: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useAppReady = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useAppReady must be used within a LoadingProvider');
  }
  return context;
};
