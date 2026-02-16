
'use client';

import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Users, Download, Receipt } from 'lucide-react';
import KpiCard, { KpiCardSkeleton } from '@/app/admin/components/kpi-card';
import RevenueChart from '@/app/admin/components/revenue-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const transactions = [
    { id: 'txn_1', company: 'Innovate Inc.', amount: 'GH₵500', date: '2024-05-28', status: 'Paid', type: 'Subscription' },
    { id: 'txn_2', company: 'QuantumLeap', amount: 'GH₵150', date: '2024-05-27', status: 'Paid', type: 'Job Post' },
    { id: 'txn_3', company: 'Synergy Corp', amount: 'GH₵500', date: '2024-05-26', status: 'Paid', type: 'Subscription' },
    { id: 'txn_4', company: 'DataDriven', amount: 'GH₵50', date: '2024-05-25', status: 'Refunded', type: 'Job Boost' },
    { id: 'txn_5', company: 'PixelPerfect', amount: 'GH₵500', date: '2024-05-24', status: 'Pending', type: 'Subscription' },
    { id: 'txn_6', company: 'HealthFirst', amount: 'GH₵150', date: '2024-05-23', status: 'Paid', type: 'Job Post' },
];

export default function AdminFinancialsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExport = () => {
    toast({
      title: "Exporting Report...",
      description: "Your financial report is being generated and will be downloaded shortly.",
      variant: 'vibrant'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Financials</h1>
            <p className="text-muted-foreground">Track revenue, subscriptions, and transactions.</p>
        </div>
        <Button onClick={handleExport}><Download className="mr-2" /> Export Financial Report</Button>
      </div>

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
                  title="Monthly Recurring Revenue"
                  value="GH₵8,500"
                  trend="+5.8% from last month"
                  icon={<CreditCard />}
                />
                <KpiCard
                  title="Active Subscriptions"
                  value="125"
                  trend="+12 since last month"
                  icon={<Users />}
                />
                <KpiCard
                  title="Avg. Revenue Per User"
                  value="GH₵99.60"
                  trend="-1.1% from last month"
                  trendDirection="down"
                  icon={<Receipt />}
                />
            </>
        )}
      </div>

       <div className="grid grid-cols-1 gap-6">
          <RevenueChart />
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A log of all recent financial activities on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map(txn => (
                        <TableRow key={txn.id}>
                            <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                            <TableCell className="font-medium">{txn.company}</TableCell>
                            <TableCell>{txn.amount}</TableCell>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>{txn.type}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    txn.status === 'Paid' ? 'default' 
                                    : txn.status === 'Pending' ? 'secondary' 
                                    : 'destructive'
                                } className={txn.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ''}>
                                    {txn.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
