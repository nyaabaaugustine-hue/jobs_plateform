'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const funnelChartData = [
  { month: 'Jan', applications: 186, interviews: 80, offers: 25 },
  { month: 'Feb', applications: 305, interviews: 200, offers: 45 },
  { month: 'Mar', applications: 237, interviews: 120, offers: 30 },
  { month: 'Apr', applications: 273, interviews: 190, offers: 55 },
  { month: 'May', applications: 209, interviews: 130, offers: 35 },
  { month: 'Jun', applications: 214, interviews: 140, offers: 40 },
];
const funnelChartConfig = {
  applications: { label: 'Applications', color: 'hsl(var(--primary))' },
  interviews: { label: 'Interviews', color: 'hsl(var(--accent))' },
  offers: { label: 'Offers', color: 'hsl(var(--chart-3))' },
};

export default function HiringFunnelChart() {
    return (
        <Card>
            <CardHeader>
            <CardTitle>Hiring Funnel Analytics</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={funnelChartConfig} className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelChartData} accessibilityLayer>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Legend />
                    <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
                    <Bar dataKey="interviews" fill="var(--color-interviews)" radius={4} />
                    <Bar dataKey="offers" fill="var(--color-offers)" radius={4} />
                </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
            </CardContent>
        </Card>
    );
}
