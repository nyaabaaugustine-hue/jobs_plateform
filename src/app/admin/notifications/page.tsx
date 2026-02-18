import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, CreditCard, Mail, MessageCircleQuestion, Save, ShieldAlert, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from 'react';

const notificationSettings = [
  { id: 'newUser', icon: UserPlus, title: 'New User Registration', description: 'When a new job seeker or employer signs up.', defaultChecked: true, color: 'primary' },
  { id: 'newSubscription', icon: CreditCard, title: 'New Employer Subscription', description: 'When an employer purchases or upgrades a plan.', defaultChecked: true, color: 'purple' },
  { id: 'newJobPost', icon: Briefcase, title: 'New Job Posting', description: 'When a new job is submitted by an employer.', defaultChecked: false, color: 'green' },
  { id: 'jobFlagged', icon: ShieldAlert, title: 'Job Flagged for Moderation', description: 'When a job is automatically flagged by the AI.', defaultChecked: true, color: 'yellow' },
  { id: 'newSupportTicket', icon: MessageCircleQuestion, title: 'New Support Ticket', description: 'When a user submits a new support request.', defaultChecked: true, color: 'orange' },
  { id: 'weeklySummary', icon: Mail, title: 'Weekly Summary Report', description: 'Send a weekly digest of platform activity.', defaultChecked: false, color: 'indigo' },
];

const recentNotifications = [
    { id: '1', type: 'New User', text: 'New user registered: Ama Serwaa', time: '5 minutes ago', icon: UserPlus, color: 'primary' },
    { id: '2', type: 'Support', text: 'New support ticket #1234 submitted.', time: '30 minutes ago', icon: MessageCircleQuestion, color: 'orange' },
    { id: '3', type: 'Subscription', text: 'Innovate Inc. subscribed to Pro Plan.', time: '1 hour ago', icon: CreditCard, color: 'purple' },
    { id: '4', type: 'Moderation', text: 'Job "UI/UX Intern" flagged by AI.', time: '2 hours ago', icon: ShieldAlert, color: 'yellow' },
    { id: '5', type: 'New User', text: 'New employer registered: DevWorks Ltd', time: '4 hours ago', icon: UserPlus, color: 'primary' },
    { id: '6', type: 'New Job', text: 'Synergy Corp posted a new job.', time: '6 hours ago', icon: Briefcase, color: 'green' },
];

const colorClasses = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-600' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
};


export default function AdminNotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Manage and monitor all platform-wide notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Select which email notifications admins should receive.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                   {notificationSettings.map((setting) => {
                       const colors = colorClasses[setting.color as keyof typeof colorClasses] || colorClasses.primary;
                       const Icon = setting.icon;
                       return (
                           <div key={setting.id} className="py-4 flex items-center gap-4">
                               <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colors.bg)}>
                                   <Icon className={cn("h-5 w-5", colors.text)} />
                               </div>
                               <div className="flex-1">
                                   <Label htmlFor={setting.id} className="font-semibold">{setting.title}</Label>
                                   <p className="text-sm text-muted-foreground">{setting.description}</p>
                               </div>
                               <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                           </div>
                       )
                   })}
                </CardContent>
                <CardFooter className="border-t pt-6 justify-end">
                    <Button><Save className="mr-2 h-4 w-4" /> Save Preferences</Button>
                </CardFooter>
            </Card>
        </div>
        
        <div>
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Recent Notification Log</CardTitle>
                    <CardDescription>A stream of the latest system notifications.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[450px]">
                       <div className="p-6">
                            <div className="relative">
                                <div className="absolute left-4 top-1 h-full w-px bg-border -z-10"></div>
                                <div className="space-y-8">
                                    {recentNotifications.map((notification) => {
                                        const colors = colorClasses[notification.color as keyof typeof colorClasses] || colorClasses.primary;
                                        const Icon = notification.icon;
                                        return (
                                            <div key={notification.id} className="flex items-start gap-4 relative">
                                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full z-10 ring-4 ring-background", colors.bg)}>
                                                    <Icon className={cn("h-4 w-4", colors.text)} />
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <p className="text-sm font-medium">{notification.text}</p>
                                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
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
        </div>
      </div>
    </div>
  );
}
