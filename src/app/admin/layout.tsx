'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Briefcase,
  Building,
  FileCode,
  Home,
  LifeBuoy,
  LogOut,
  Bell,
  Settings,
  Shield,
  Users,
  Wallet,
  PenSquare,
} from 'lucide-react';
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
  SidebarSeparator
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/shared/dashboard-header';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const AdminLayoutSkeleton = () => (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col w-64 border-r bg-sidebar p-2">
        <div className="p-2">
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="flex-1 p-2 space-y-6">
          {/* Group 1 */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          {/* Group 2 */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
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


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const adminAvatar = PlaceHolderImages.find((img) => img.id === 'avatar-2');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    {
      group: 'Dashboard',
      items: [
        { href: '/admin', label: 'Overview', icon: <Home /> },
        { href: '/admin/analytics', label: 'Analytics', icon: <BarChart /> },
      ],
    },
    {
      group: 'Management',
      items: [
        { href: '/admin/moderation', label: 'Moderation', icon: <Shield /> },
        { href: '/admin/users', label: 'Users', icon: <Users /> },
        { href: '/admin/jobs', label: 'Jobs', icon: <Briefcase /> },
        { href: '/admin/companies', label: 'Companies', icon: <Building /> },
        { href: '/admin/blog', label: 'Blog', icon: <PenSquare /> },
        { href: '/admin/financials', label: 'Financials', icon: <Wallet /> },
      ],
    },
    {
        group: 'Platform',
        items: [
            { href: '/admin/settings', label: 'Settings', icon: <Settings /> },
            { href: '/admin/notifications', label: 'Notifications', icon: <Bell /> },
            { href: '/admin/support', label: 'Support', icon: <LifeBuoy /> },
            { href: '/admin/api-status', label: 'API Status', icon: <FileCode /> },
        ]
    }
  ];
  
  if (!isMounted) {
    return <AdminLayoutSkeleton />;
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
                      <SidebarMenuButton asChild isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}>
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroup>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
             <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {adminAvatar && <AvatarImage src={adminAvatar.imageUrl} alt="Admin Avatar" />}
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <LogOut />
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
