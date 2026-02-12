'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Building, FileText, Home, UserCircle, Settings, LogOut, PenSquare } from 'lucide-react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/shared/dashboard-header';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardLayoutSkeleton = () => (
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


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    {
      group: 'Main',
      items: [
        { href: '/dashboard', label: 'Overview', icon: <Home /> },
        { href: '/dashboard/profile', label: 'My Profile', icon: <UserCircle /> },
        { href: '/dashboard/applications', label: 'My Applications', icon: <FileText /> },
      ]
    },
    {
      group: 'Explore',
      items: [
        { href: '/jobs', label: 'Find Jobs', icon: <Briefcase /> },
        { href: '/companies', label: 'Companies', icon: <Building /> },
      ]
    },
    {
      group: 'Community',
      items: [
        { href: '/dashboard/posts', label: 'My Blog Posts', icon: <PenSquare /> },
      ]
    },
  ];

  if (!isMounted) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((group) => (
                <SidebarGroup key={group.group}>
                  <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                  {group.items.map((item) => (
                     <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}>
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroup>
              ))}
               <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
                   <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/dashboard/settings'}>
                        <Link href="/dashboard/settings">
                          <Settings />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
               </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@email.com</p>
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
