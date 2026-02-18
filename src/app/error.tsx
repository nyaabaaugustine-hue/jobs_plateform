'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Platform Error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
      <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center mb-8">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground font-medium">
          An unexpected error occurred while processing your request. Our engineering team has been notified.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Button 
          onClick={() => reset()} 
          size="lg" 
          className="rounded-xl font-black uppercase tracking-widest px-8 h-14 bg-primary"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-xl font-black uppercase tracking-widest px-8 h-14">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Return Home
          </Link>
        </Button>
      </div>
      
      <p className="mt-8 text-xs text-muted-foreground/50 font-mono">
        Error ID: {error.digest || 'system-critical-error'}
      </p>
    </main>
  );
}
