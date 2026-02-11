'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Briefcase, Building, MessageSquare, PlusCircle, Settings, Users, Home, LogOut } from 'lucide-react';
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

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const companyLogo = PlaceHolderImages.find((img) => img.id === 'company-logo-1');
  
  const menuItems = [
    {
      group: 'Hiring',
      items: [
        { href: '/employer', label: 'Overview', icon: <Home /> },
        { href: '/employer/jobs', label: 'Jobs', icon: <Briefcase /> },
        { href: '/employer/applicants', label: 'Applicants', icon: <Users /> },
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
        { href: '/employer/settings', label: 'Settings', icon: <Settings /> },
      ]
    },
  ];

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
                  {group.items.map((item) => (
                     <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={pathname === item.href || (item.href !== '/employer' && pathname.startsWith(item.href))}>
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
             <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
