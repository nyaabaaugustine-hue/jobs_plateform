
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  DollarSign,
  Users,
  Briefcase,
  Shield,
  UserPlus,
  Download,
} from 'lucide-react';
import KpiCard, { KpiCardSkeleton } from './components/kpi-card';
import ActivityFeed from './components/activity-feed';
import JobInsights from './components/job-insights';
import ModerationCenter from './components/moderation-center';
import LocationBreakdown from './components/location-breakdown';
import SystemHealth from './components/system-health';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const RevenueChart = dynamic(() => import('./components/revenue-chart'), { 
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />
});
const UserDistributionChart = dynamic(() => import('./components/user-distribution-chart'), { 
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />
});


export default function AdminDashboard() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCompany, setInviteCompany] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAction = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: 'vibrant',
    });
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName || !inviteCompany) {
        toast({
            title: "Missing Information",
            description: "Please fill out all fields to send an invitation.",
            variant: "destructive",
        });
        return;
    }
    handleAction('Invite Sent', `An invitation has been sent to ${inviteName} at ${inviteCompany}.`);
    setIsInviteDialogOpen(false);
    // Reset form
    setInviteEmail('');
    setInviteName('');
    setInviteCompany('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Executive Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin. Here is the platform's performance overview.</p>
        </div>
        <div className="flex items-center gap-2">
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                      <UserPlus /> Invite Employer
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSendInvite}>
                        <DialogHeader>
                            <DialogTitle>Invite New Employer</DialogTitle>
                            <DialogDescription>
                                Send an invitation to a new employer to join the platform.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="invite-name">Contact Name</Label>
                                <Input id="invite-name" placeholder="e.g., Esi Owusu" value={inviteName} onChange={e => setInviteName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invite-company">Company Name</Label>
                                <Input id="invite-company" placeholder="e.g., Ghana Tech Solutions" value={inviteCompany} onChange={e => setInviteCompany(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invite-email">Email Address</Label>
                                <Input id="invite-email" type="email" placeholder="contact@ghtech.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Send Invite</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Button onClick={() => handleAction('Exporting Reports', 'Your reports are being generated.')}>
              <Download /> Export Reports
            </Button>
        </div>
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
