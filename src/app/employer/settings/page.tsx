'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, CreditCard, Bell, UserPlus, Download, PlusCircle, Save, FileText, Clock, MessageSquare, Wallet as WalletIcon, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DUMMY_USERS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const teamMembers = DUMMY_USERS.slice(1, 4).map(u => ({ ...u, role: 'Hiring Manager' }));

const transactions = [
    { id: 'inv_1', amount: 'GH₵500', date: 'May 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
    { id: 'inv_2', amount: 'GH₵500', date: 'April 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
    { id: 'inv_3', amount: 'GH₵150', date: 'April 10, 2024', status: 'Paid', description: 'Featured Job Post' },
    { id: 'inv_4', amount: 'GH₵500', date: 'March 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
];

const notificationSettings = [
  { id: 'new-applicant', icon: FileText, title: 'New Applicant Alert', description: 'Receive an email for every new application.', defaultChecked: true, color: 'blue' },
  { id: 'weekly-summary', icon: Bell, title: 'Weekly Applicant Summary', description: 'Get a weekly digest of all new applicants.', defaultChecked: false, color: 'purple' },
  { id: 'message-alert', icon: MessageSquare, title: 'New Message Alert', description: 'Get notified when a candidate sends you a message.', defaultChecked: true, color: 'green' },
  { id: 'expiration-warning', icon: Clock, title: 'Job Expiration Warning', description: 'Get a warning 3 days before a job post expires.', defaultChecked: true, color: 'yellow' },
  { id: 'billing-reminder', icon: WalletIcon, title: 'Billing Reminders', description: 'Receive reminders for upcoming subscription payments.', defaultChecked: false, color: 'orange' },
];

const recentNotifications = [
    { id: '1', icon: FileText, text: "New application for 'Senior React Developer'", time: '15 minutes ago', color: 'blue' },
    { id: '2', icon: MessageSquare, text: "New message from candidate Ama Serwaa", time: '1 hour ago', color: 'green' },
    { id: '3', icon: Clock, text: "Your job 'UI/UX Designer' will expire in 3 days.", time: '4 hours ago', color: 'yellow' },
    { id: '4', icon: FileText, text: "New application for 'Full-stack Engineer'", time: '8 hours ago', color: 'blue' },
    { id: '5', icon: WalletIcon, text: "Your Pro Plan subscription has been renewed.", time: '1 day ago', color: 'orange' },
];

const colorClasses = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-600' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
};


export default function EmployerSettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'team';

  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your employer account and notification preferences.</p>
      </div>

       <Tabs value={tab} defaultValue={tab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team"><Users className="mr-2"/> Team</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="mr-2"/> Billing</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2"/> Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>Manage who has access to this employer account.</CardDescription>
                    </div>
                    <Button><UserPlus className="mr-2"/> Invite Member</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50%]">Team Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map(member => {
                                const avatar = PlaceHolderImages.find((p) => p.id === member.avatar);
                                return (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    {avatar && <AvatarImage src={avatar.imageUrl} alt={member.name} />}
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{member.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                                    <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">Remove from Team</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your plan, payment methods, and view your billing history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Current Plan Card */}
                    <Card className="bg-primary/10 border-primary/20">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Badge variant="outline" className="text-primary border-primary bg-background">Pro Plan</Badge>
                                </CardTitle>
                                <CardDescription className="text-primary/80 mt-1">Your current subscription</CardDescription>
                            </div>
                            <Button asChild variant="outline" className="bg-background">
                                <Link href="/pricing">Change Plan</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-bold">GH₵500</p>
                                <p className="text-muted-foreground">/ month</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">Your plan renews on June 15, 2024.</p>
                        </CardContent>
                    </Card>

                    {/* Payment Method & History */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Payment Method */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Payment Method</h3>
                            <Card>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">Visa ending in 4242</p>
                                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Update</Button>
                                </CardContent>
                            </Card>
                            <Button variant="outline" className="w-full">
                                <PlusCircle className="mr-2"/> Add New Payment Method
                            </Button>
                        </div>
                        {/* Billing History */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Billing History</h3>
                            <Card>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead className="text-right">Date</TableHead>
                                                <TableHead><span className="sr-only">Download</span></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map(txn => (
                                                <TableRow key={txn.id}>
                                                    <TableCell className="font-medium">{txn.description}</TableCell>
                                                    <TableCell>{txn.amount}</TableCell>
                                                    <TableCell className="text-right">{txn.date}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Select which email notifications you should receive.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                  {notificationSettings.map((setting) => {
                    const colors = colorClasses[setting.color as keyof typeof colorClasses] || colorClasses.blue;
                    return (
                      <div key={setting.id} className="py-4 flex items-center gap-4">
                        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colors.bg)}>
                          <setting.icon className={cn("h-5 w-5", colors.text)} />
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
                  <CardDescription>A stream of your latest notifications.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[450px]">
                    <div className="p-6">
                      <div className="relative">
                        <div className="absolute left-4 top-1 h-full w-px bg-border -z-10"></div>
                        <div className="space-y-8">
                          {recentNotifications.map((notification) => {
                            const colors = colorClasses[notification.color as keyof typeof colorClasses] || colorClasses.blue;
                            return (
                              <div key={notification.id} className="flex items-start gap-4 relative">
                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full z-10 ring-4 ring-background", colors.bg)}>
                                  {React.createElement(notification.icon, { className: cn("h-4 w-4", colors.text) })}
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
        </TabsContent>

      </Tabs>
    </div>
  );
}
