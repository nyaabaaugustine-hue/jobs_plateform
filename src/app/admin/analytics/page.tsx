
'use client';

import dynamic from 'next/dynamic';
import { DollarSign, Users, Briefcase, Shield } from 'lucide-react';
import KpiCard, { KpiCardSkeleton } from '@/app/admin/components/kpi-card';
import JobInsights from '@/app/admin/components/job-insights';
import LocationBreakdown from '@/app/admin/components/location-breakdown';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

const RevenueChart = dynamic(() => import('@/app/admin/components/revenue-chart'), { 
  ssr: false, 
  loading: () => <Skeleton className="h-[400px] w-full" /> 
});
const UserDistributionChart = dynamic(() => import('@/app/admin/components/user-distribution-chart'), { 
  ssr: false, 
  loading: () => <Skeleton className="h-[400px] w-full" /> 
});


export default function AdminAnalyticsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">A deep dive into your platform's performance metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {!isClient ? (
            <>
                <KpiCardSkeleton />
                <KpiCardSkeleton />
                <KpiCardSkeleton />
                <KpiCardSkeleton />
            </>
        ) : (
            <>
                <KpiCard
                  title="Total Revenue"
                  value="GH₵12,450"
                  trend="+15.2% from last month"
                  icon={<DollarSign />}
                />
                <KpiCard
                  title="Active Users"
                  value="2,834"
                  trend="+5.8% from last month"
                  icon={<Users />}
                />
                <KpiCard
                  title="Active Jobs"
                  value="842"
                  trend="-2.1% from last month"
                  trendDirection="down"
                  icon={<Briefcase />}
                />
                <KpiCard
                  title="Pending Moderation"
                  value="8"
                  trend="3 new today"
                  icon={<Shield />}
                />
            </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>
        <div className="lg:col-span-4">
          <UserDistributionChart />
        </div>
      </div>

      {/* Insights and Breakdowns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <JobInsights />
        </div>
        <div className="lg:col-span-5">
          <LocationBreakdown />
        </div>
      </div>
    </div>
  );
}
