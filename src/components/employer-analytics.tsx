'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', applications: 186, interviews: 80 },
  { month: 'February', applications: 305, interviews: 200 },
  { month: 'March', applications: 237, interviews: 120 },
  { month: 'April', applications: 273, interviews: 190 },
  { month: 'May', applications: 209, interviews: 130 },
  { month: 'June', applications: 214, interviews: 140 },
];

const chartConfig = {
  applications: {
    label: 'Applications',
    color: 'hsl(var(--primary))',
  },
  interviews: {
    label: 'Interviews',
    color: 'hsl(var(--accent))',
  },
};

export default function EmployerAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Funnel Analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} accessibilityLayer>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
              <Bar dataKey="interviews" fill="var(--color-interviews)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
