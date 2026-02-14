'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Briefcase, Users, Shield, KeyRound, Bell, Save } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const artImage = PlaceHolderImages.find((img) => img.id === 'find-job-1');
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your platform settings have been updated.",
      variant: "vibrant"
    });
  }

  const handleSwitchChange = (feature: string, enabled: boolean) => {
    toast({
      title: `${feature} Setting Updated`,
      description: `${feature} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Platform Settings</h1>
        <p className="text-muted-foreground">Manage global settings for the Chapel Hill platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
                  <TabsTrigger value="general"><Globe className="mr-2"/> General</TabsTrigger>
                  <TabsTrigger value="jobs"><Briefcase className="mr-2"/> Jobs</TabsTrigger>
                  <TabsTrigger value="users"><Users className="mr-2"/> Users</TabsTrigger>
                  <TabsTrigger value="security"><Shield className="mr-2"/> Security</TabsTrigger>
                  <TabsTrigger value="integrations"><KeyRound className="mr-2"/> Integrations</TabsTrigger>
                  <TabsTrigger value="notifications"><Bell className="mr-2"/> Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                  <Card>
                      <CardHeader>
                          <CardTitle>General Settings</CardTitle>
                          <CardDescription>Manage basic platform information and branding.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="site-name">Platform Name</Label>
                              <Input id="site-name" defaultValue="Chapel Hill" />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="tagline">Tagline</Label>
                              <Input id="tagline" defaultValue="Find Your Next Job, Faster." />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                                  <p className="text-xs text-muted-foreground">Temporarily take the site offline for visitors.</p>
                              </div>
                              <Switch id="maintenance-mode" onCheckedChange={(checked) => handleSwitchChange('Maintenance Mode', checked)} />
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>
              
              <TabsContent value="jobs">
                  <Card>
                      <CardHeader>
                          <CardTitle>Job Settings</CardTitle>
                          <CardDescription>Configure how job listings are managed on the platform.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="job-expiration">Default Job Expiration (Days)</Label>
                              <Input id="job-expiration" type="number" defaultValue="30" />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="require-approval">Require Admin Approval</Label>
                                  <p className="text-xs text-muted-foreground">All new job posts must be approved before going live.</p>
                              </div>
                              <Switch id="require-approval" defaultChecked onCheckedChange={(checked) => handleSwitchChange('Require Admin Approval', checked)}/>
                          </div>
                           <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="enable-ai-flagging">Enable AI-Powered Flagging</Label>
                                  <p className="text-xs text-muted-foreground">Automatically flag suspicious jobs for manual review.</p>
                              </div>
                              <Switch id="enable-ai-flagging" defaultChecked onCheckedChange={(checked) => handleSwitchChange('Enable AI Flagging', checked)}/>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="users">
                  <Card>
                      <CardHeader>
                          <CardTitle>User Settings</CardTitle>
                          <CardDescription>Manage user registration and roles.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="allow-registration">Allow Public Registration</Label>
                                  <p className="text-xs text-muted-foreground">Enable or disable new user sign-ups.</p>
                              </div>
                              <Switch id="allow-registration" defaultChecked onCheckedChange={(checked) => handleSwitchChange('Allow Public Registration', checked)} />
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="verify-employers">Require Employer Verification</Label>
                                  <p className="text-xs text-muted-foreground">New employer accounts must be verified before they can post jobs.</p>
                              </div>
                              <Switch id="verify-employers" defaultChecked onCheckedChange={(checked) => handleSwitchChange('Require Employer Verification', checked)} />
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="security">
                  <Card>
                      <CardHeader>
                          <CardTitle>Security Settings</CardTitle>
                          <CardDescription>Configure security policies for the platform.</CardDescription>
                      </CardHeader>
                       <CardContent className="space-y-6">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <Label htmlFor="enforce-2fa">Enforce Two-Factor Authentication</Label>
                                  <p className="text-xs text-muted-foreground">Require all admin and employer accounts to use 2FA.</p>
                              </div>
                              <Switch id="enforce-2fa" onCheckedChange={(checked) => handleSwitchChange('Two-Factor Authentication', checked)} />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                              <Input id="session-timeout" type="number" defaultValue="60" />
                          </div>
                       </CardContent>
                  </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                  <Card>
                      <CardHeader>
                          <CardTitle>API & Integrations</CardTitle>
                          <CardDescription>Manage third-party service API keys.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="google-maps-key">Google Maps API Key</Label>
                              <Input id="google-maps-key" type="password" placeholder="••••••••••••••••••••" />
                              <p className="text-xs text-muted-foreground">Used for location-based job searches and maps.</p>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="stripe-key">Stripe API Key</Label>
                              <Input id="stripe-key" type="password" placeholder="••••••••••••••••••••" />
                              <p className="text-xs text-muted-foreground">Used for processing payments for job postings and subscriptions.</p>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="notifications">
                  <Card>
                      <CardHeader>
                          <CardTitle>Admin Notifications</CardTitle>
                          <CardDescription>Configure where system notifications are sent.</CardDescription>
                      </CardHeader>
                       <CardContent className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="admin-email">Primary Admin Email</Label>
                              <Input id="admin-email" type="email" defaultValue="admin@demo.com" />
                              <p className="text-xs text-muted-foreground">This address receives alerts for new user registrations, support tickets, and system errors.</p>
                          </div>
                       </CardContent>
                  </Card>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-8">
              <Button size="lg" onClick={handleSave}><Save className="mr-2" /> Save All Settings</Button>
            </div>
        </div>
        <div className="hidden lg:block">
           {artImage && (
            <div className="sticky top-24">
              <Image
                src={artImage.imageUrl}
                alt={artImage.description}
                width={500}
                height={600}
                className="rounded-2xl shadow-lg w-full h-full object-cover aspect-[4/5]"
                data-ai-hint={artImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
