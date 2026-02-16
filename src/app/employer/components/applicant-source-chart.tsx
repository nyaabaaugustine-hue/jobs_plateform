
'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const sourceChartData = [
    { source: 'Direct', value: 150, fill: 'var(--color-direct)' },
    { source: 'LinkedIn', value: 120, fill: 'var(--color-linkedin)' },
    { source: 'Referrals', value: 95, fill: 'var(--color-referrals)' },
    { source: 'Job Board', value: 87, fill: 'var(--color-jobboard)' },
    { source: 'Other', value: 30, fill: 'var(--color-other)' },
];

const sourceChartConfig = {
    value: { label: 'Applicants' },
    direct: { label: 'Direct', color: 'hsl(var(--primary))' },
    linkedin: { label: 'LinkedIn', color: 'hsl(var(--accent))' },
    referrals: { label: 'Referrals', color: 'hsl(var(--chart-3))' },
    jobboard: { label: 'Job Board', color: 'hsl(var(--chart-4))' },
    other: { label: 'Other', color: 'hsl(var(--chart-5))' },
};

export default function ApplicantSourceChart() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Applicant Sources</CardTitle>
                <CardDescription>Where your candidates are coming from.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
            <ChartContainer config={sourceChartConfig} className="mx-auto aspect-square max-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent nameKey="source" hideLabel />} />
                    <Pie data={sourceChartData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={100} innerRadius={60} strokeWidth={5}>
                    {sourceChartData.map((entry) => (<Cell key={`cell-${entry.source}`} fill={entry.fill} />))}
                    </Pie>
                    <Legend content={({ payload }) => (
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-4">
                        {payload?.map((entry: any, index: number) => (
                        <li key={`item-${index}`} className="flex items-center gap-2 text-xs">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.payload.source}
                        </li>
                        ))}
                    </ul>
                    )} />
                </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
            </CardContent>
        </Card>
    )
};

