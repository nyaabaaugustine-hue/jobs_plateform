'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Briefcase, Building, ShieldCheck, UserPlus, FileWarning, Clock } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

const activities = [
  { icon: Briefcase, text: 'New job posted: "Senior Backend Dev"', time: '2 minutes ago', color: 'primary' },
  { icon: Building, text: 'New company registered: DevWorks Ltd', time: '15 minutes ago', color: 'green' },
  { icon: ShieldCheck, text: 'New employer subscription: Pro Plan', time: '1 hour ago', color: 'purple' },
  { icon: FileWarning, text: 'Job awaiting moderation: "UI/UX Intern"', time: '3 hours ago', color: 'yellow' },
  { icon: UserPlus, text: 'New user registered: Ama Serwaa', time: '5 hours ago', color: 'indigo' },
  { icon: Clock, text: 'Job expired: "Marketing Manager"', time: '1 day ago', color: 'red' },
  { icon: UserPlus, text: 'New user registered: Kofi Mensah', time: '2 days ago', color: 'indigo' },
  { icon: Building, text: 'New company registered: Ghana Tech Hub', time: '3 days ago', color: 'green' },
];

const colorClasses = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
    red: { bg: 'bg-red-500/10', text: 'text-red-500' },
}

export default function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Platform Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-1 h-full w-px bg-border"></div>
              <div className="space-y-8">
                {activities.map((activity, index) => {
                  const colors = colorClasses[activity.color as keyof typeof colorClasses] || colorClasses.primary;
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 relative">
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full z-10 ring-4 ring-background", colors.bg)}>
                        <Icon className={cn("h-4 w-4", colors.text)} />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
