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
  LayoutDashboard,
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
  SidebarSeparator,
  useSidebar
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/shared/dashboard-header';

function AdminNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const adminAvatar = PlaceHolderImages.find((img) => img.id === 'avatar-2');

  const handleLinkClick = () => {
    setOpenMobile(false);
  };
  
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
        { href: '/admin/content', label: 'Website Content', icon: <LayoutDashboard /> },
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
  
  return (
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
                    <Link href={item.href} onClick={handleLinkClick}>
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
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AdminNav />
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
