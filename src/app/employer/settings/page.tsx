'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, CreditCard, Bell, UserPlus } from 'lucide-react';
import { DUMMY_USERS } from '@/lib/data';

const teamMembers = DUMMY_USERS.slice(1, 4).map(u => ({ ...u, role: 'Hiring Manager' }));

export default function EmployerSettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your employer account and notification preferences.</p>
      </div>

       <Tabs value={tab} defaultValue={tab} className="space-y-6">
        <TabsList>
            <TabsTrigger value="profile"><Building className="mr-2"/> Company Profile</TabsTrigger>
            <TabsTrigger value="team"><Users className="mr-2"/> Team</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="mr-2"/> Billing</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2"/> Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>This information is visible to candidates on your company page and job listings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-muted-foreground">Manage your main company profile, including name, logo, description, and website.</p>
                     <Button asChild>
                         <Link href="/employer/company-profile">Edit Company Profile</Link>
                     </Button>
                </CardContent>
            </Card>
        </TabsContent>
        
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
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>Manage your subscription and payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card className="bg-secondary/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Pro Plan</CardTitle>
                                <CardDescription>Billed at GH₵500/month</CardDescription>
                            </div>
                            <Button variant="outline">Change Plan</Button>
                        </CardHeader>
                         <CardContent>
                            <p className="text-sm text-muted-foreground">Your plan renews on June 15, 2024.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="flex items-center justify-between p-4 border rounded-lg">
                                <p>Visa ending in 4242</p>
                                <Button variant="outline" size="sm">Update</Button>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how you receive notifications from the platform.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="new-applicant">New Applicant Alert</Label>
                        <p className="text-xs text-muted-foreground">Receive an email for every new application to your jobs.</p>
                        </div>
                        <Switch id="new-applicant" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="weekly-summary">Weekly Applicant Summary</Label>
                        <p className="text-xs text-muted-foreground">Get a weekly digest of all new applicants.</p>
                        </div>
                        <Switch id="weekly-summary" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="message-alert">New Message Alert</Label>
                        <p className="text-xs text-muted-foreground">Get notified when a candidate sends you a message.</p>
                        </div>
                        <Switch id="message-alert" defaultChecked />
                    </div>
                 </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
