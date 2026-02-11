'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Building, FileText, Home, UserCircle, Settings, LogOut } from 'lucide-react';
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
  ];

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
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
