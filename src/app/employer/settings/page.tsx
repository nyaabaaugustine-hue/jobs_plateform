import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const dynamic = "force-dynamic";

const SettingsPageSkeleton = () => (
  <div className="space-y-8">
      <Skeleton className="h-10 w-full rounded-md" />
      <Card>
          <CardHeader>
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
          </CardContent>
      </Card>
  </div>
);

const SettingsTabs = dynamic(() => import('./components/settings-tabs'), {
  ssr: false,
  loading: () => <SettingsPageSkeleton />,
});

export default function EmployerSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your employer account and notification preferences.</p>
      </div>
      <Suspense fallback={<SettingsPageSkeleton />}>
        <SettingsTabs />
      </Suspense>
    </div>
  );
}
