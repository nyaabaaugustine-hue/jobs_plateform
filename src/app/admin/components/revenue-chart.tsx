'use client';

import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Users, FileBarChart } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 1860, users: 80, jobs: 120 },
  { month: 'Feb', revenue: 3050, users: 200, jobs: 180 },
  { month: 'Mar', revenue: 2370, users: 120, jobs: 150 },
  { month: 'Apr', revenue: 2730, users: 190, jobs: 210 },
  { month: 'May', revenue: 2090, users: 130, jobs: 190 },
  { month: 'Jun', revenue: 2140, users: 140, jobs: 220 },
  { month: 'Jul', revenue: 3250, users: 250, jobs: 240 },
  { month: 'Aug', revenue: 2900, users: 210, jobs: 230 },
  { month: 'Sep', revenue: 3500, users: 280, jobs: 260 },
  { month: 'Oct', revenue: 3700, users: 310, jobs: 280 },
  { month: 'Nov', revenue: 4100, users: 340, jobs: 300 },
  { month: 'Dec', revenue: 4500, users: 380, jobs: 320 },
];

const weeklyData = [
  { day: "Mon", revenue: 450, users: 20, jobs: 30 },
  { day: "Tue", revenue: 580, users: 25, jobs: 35 },
  { day: "Wed", revenue: 520, users: 22, jobs: 33 },
  { day: "Thu", revenue: 680, users: 30, jobs: 40 },
  { day: "Fri", revenue: 800, users: 35, jobs: 45 },
  { day: "Sat", revenue: 750, users: 33, jobs: 42 },
  { day: "Sun", revenue: 620, users: 28, jobs: 38 },
]

const chartConfig = {
  revenue: {
    label: 'Revenue (GH₵)',
    color: 'hsl(var(--primary))',
  },
  users: {
    label: 'New Users',
    color: 'hsl(var(--accent))',
  },
  jobs: {
    label: 'Jobs Posted',
    color: 'hsl(var(--chart-3))',
  }
};

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState('30d');

  const data = timeRange === '7d' ? weeklyData : monthlyData.slice(-6);
  const xAxisKey = timeRange === '7d' ? 'day' : 'month';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Platform Analytics</CardTitle>
          <CardDescription>Revenue, user sign-ups, and jobs posted.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => {
                    if (Number(value) === 0) return 'GH₵0';
                    return `GH₵${Number(value) / 1000}k`;
                }}
              />
              <Tooltip content={<ChartTooltipContent indicator="dot" />} />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
              <Area type="monotone" dataKey="revenue" strokeWidth={2} stroke="var(--color-revenue)" fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="users" strokeWidth={2} stroke="var(--color-users)" fill="url(#colorUsers)" />
              <Area type="monotone" dataKey="jobs" strokeWidth={2} stroke="var(--color-jobs)" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
