
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Briefcase, Building, MessageSquare, PlusCircle, Settings, Users, Home, LogOut, Search, CreditCard, Bell } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DashboardHeader from '@/components/shared/dashboard-header';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const EmployerLayoutSkeleton = () => (
  <div className="flex min-h-screen w-full bg-background">
    {/* Sidebar Skeleton */}
    <div className="hidden md:flex flex-col w-64 border-r bg-sidebar p-2">
      <div className="p-2">
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex-1 p-2 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="p-2 mt-auto">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
    {/* Main Content Skeleton */}
    <div className="flex-1 flex flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur-sm md:hidden">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-32 mx-auto" />
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </main>
    </div>
  </div>
);


export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const companyLogo = PlaceHolderImages.find((img) => img.id === 'company-logo-1');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    {
      group: 'Hiring',
      items: [
        { href: '/employer', label: 'Overview', icon: <Home /> },
        { href: '/employer/jobs', label: 'Jobs', icon: <Briefcase /> },
        { href: '/employer/applicants', label: 'Applicants', icon: <Users /> },
        { href: '/browse-candidates', label: 'Browse Candidates', icon: <Search /> },
        { href: '/employer/analytics', label: 'Analytics', icon: <BarChart /> },
      ]
    },
    {
      group: 'Communication',
      items: [
        { href: '/employer/messages', label: 'Messages', icon: <MessageSquare /> },
      ]
    },
     {
      group: 'Account',
      items: [
        { href: '/employer/company-profile', label: 'Company Profile', icon: <Building /> },
        { href: '/employer/settings?tab=team', label: 'Team Members', icon: <Users /> },
        { href: '/employer/settings?tab=billing', label: 'Billing', icon: <CreditCard /> },
        { href: '/employer/settings?tab=notifications', label: 'Notifications', icon: <Bell /> },
      ]
    },
  ];

  if (!isMounted) {
    return <EmployerLayoutSkeleton />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
             <Button variant="default" className="w-full" asChild>
                <Link href="/employer/jobs/new"><PlusCircle className="mr-2 h-4 w-4" /> Post a New Job</Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((group) => (
                <SidebarGroup key={group.group}>
                  <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                  {group.items.map((item) => {
                     const isSettingsActive = pathname === '/employer/settings' && item.href.startsWith('/employer/settings');
                     const isGeneralActive = pathname === item.href || (item.href !== '/employer' && pathname.startsWith(item.href) && !item.href.startsWith('/employer/settings'));
                    return (
                     <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={isSettingsActive || isGeneralActive}>
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    )
                  })}
                </SidebarGroup>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {companyLogo && <AvatarImage src={companyLogo.imageUrl} alt="Company Logo" />}
                <AvatarFallback>II</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold">Innovate Inc.</p>
                <p className="text-xs text-muted-foreground">Employer Account</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                    <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
             <DashboardHeader />
             <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
