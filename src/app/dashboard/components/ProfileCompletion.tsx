
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';

const completionItems = [
    { label: 'Add Work Experience', completed: true, href: '/dashboard/profile' },
    { label: 'Upload Your Resume', completed: false, href: '/dashboard/profile' },
    { label: 'Add Your Skills', completed: true, href: '/dashboard/profile' },
    { label: 'Write a Professional Summary', completed: false, href: '/dashboard/profile' },
]

export default function ProfileCompletion() {
    const completedCount = completionItems.filter(item => item.completed).length;
    const totalCount = completionItems.length;
    const progress = (completedCount / totalCount) * 100;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Profile Strength</CardTitle>
        <CardDescription>Complete your profile to attract more employers.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">Overall Completion</span>
                <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
        </div>
        <div className="space-y-3 mt-4">
            {completionItems.map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                    {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/30 shrink-0" />
                    )}
                    <span className={item.completed ? 'text-muted-foreground line-through' : 'font-medium'}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
        <div className="mt-6">
            <Button asChild className="w-full bg-primary">
                <Link href="/dashboard/profile">Complete Your Profile <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
