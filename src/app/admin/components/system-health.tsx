'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, Zap, Database, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SectionHeader from '@/components/shared/section-header';
import { cn } from '@/lib/utils';

const metrics = [
  { name: 'API Response Time', value: '85ms', status: 'Operational', icon: <Zap /> },
  { name: 'Server Uptime', value: '99.98%', status: 'Operational', icon: <Server /> },
  { name: 'Database Usage', value: '62%', status: 'Operational', icon: <Database /> },
  { name: 'Storage Used', value: '78%', status: 'High', icon: <HardDrive /> },
];

export default function SystemHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'High':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div>
        <SectionHeader 
            title="System Health & Performance"
            subtitle="Live metrics for platform infrastructure."
            isCentered={false}
            className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
            <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="text-muted-foreground">{metric.icon}</div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(metric.status))}>{metric.status}</Badge>
                </CardContent>
            </Card>
            ))}
        </div>
    </div>
  );
}
