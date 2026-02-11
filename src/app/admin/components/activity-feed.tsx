'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, ShieldCheck, UserPlus, FileWarning, Clock } from 'lucide-react';
import React from 'react';

const activities = [
  { icon: <Briefcase className="h-4 w-4 text-blue-500" />, text: 'New job posted: "Senior Backend Dev"', time: '2 minutes ago', category: 'Jobs' },
  { icon: <Building className="h-4 w-4 text-green-500" />, text: 'New company registered: DevWorks Ltd', time: '15 minutes ago', category: 'Companies' },
  { icon: <ShieldCheck className="h-4 w-4 text-purple-500" />, text: 'New employer subscription: Pro Plan', time: '1 hour ago', category: 'Billing' },
  { icon: <FileWarning className="h-4 w-4 text-yellow-500" />, text: 'Job awaiting moderation: "UI/UX Intern"', time: '3 hours ago', category: 'Moderation' },
  { icon: <UserPlus className="h-4 w-4 text-indigo-500" />, text: 'New user registered: Ama Serwaa', time: '5 hours ago', category: 'Users' },
  { icon: <Clock className="h-4 w-4 text-red-500" />, text: 'Job expired: "Marketing Manager"', time: '1 day ago', category: 'Jobs' },
  { icon: <UserPlus className="h-4 w-4 text-indigo-500" />, text: 'New user registered: Kofi Mensah', time: '2 days ago', category: 'Users' },
  { icon: <Building className="h-4 w-4 text-green-500" />, text: 'New company registered: Ghana Tech Hub', time: '3 days ago', category: 'Companies' },
];

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
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary z-10 ring-4 ring-background">
                      {activity.icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
