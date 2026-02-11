'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Eye, Bookmark, MessageSquare } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { DUMMY_USERS, DUMMY_JOBS } from '@/lib/data';

const activities = [
  { icon: FileText, text: `You applied for "${DUMMY_JOBS[0].title}"`, time: '2 minutes ago', color: 'blue' },
  { icon: Eye, text: `Innovate Inc. viewed your profile`, time: '1 hour ago', color: 'green' },
  { icon: Bookmark, text: `You saved the job "${DUMMY_JOBS[4].title}"`, time: '3 hours ago', color: 'purple' },
  { icon: MessageSquare, text: `New message from QuantumLeap HR`, time: '5 hours ago', color: 'yellow' },
  { icon: FileText, text: `You applied for "${DUMMY_JOBS[2].title}"`, time: '1 day ago', color: 'blue' },
];

const colorClasses = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
}

export default function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of recent events on your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-1 h-full w-px bg-border"></div>
              <div className="space-y-8">
                {activities.map((activity, index) => {
                  const colors = colorClasses[activity.color as keyof typeof colorClasses] || colorClasses.blue;
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
