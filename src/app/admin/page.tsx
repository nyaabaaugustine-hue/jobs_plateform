import {
  DollarSign,
  Users,
  Briefcase,
  Shield,
  FileBarChart,
  Building,
  UserPlus,
  Download,
} from 'lucide-react';
import KpiCard from './components/kpi-card';
import RevenueChart from './components/revenue-chart';
import UserDistributionChart from './components/user-distribution-chart';
import ActivityFeed from './components/activity-feed';
import JobInsights from './components/job-insights';
import ModerationCenter from './components/moderation-center';
import LocationBreakdown from './components/location-breakdown';
import SystemHealth from './components/system-health';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/shared/section-header';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Executive Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin. Here is the platform's performance overview.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><UserPlus /> Invite Employer</Button>
            <Button><Download /> Export Reports</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      </div>

      <SystemHealth />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Chart */}
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* User Distribution */}
        <div className="lg:col-span-5">
            <UserDistributionChart />
        </div>

        {/* Job Insights */}
        <div className="lg:col-span-7">
            <JobInsights />
        </div>
      </div>
      
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Moderation Center */}
        <div className="lg:col-span-7">
            <ModerationCenter />
        </div>
        
        {/* Location Breakdown */}
        <div className="lg:col-span-5">
            <LocationBreakdown />
        </div>
      </div>

    </div>
  );
}
