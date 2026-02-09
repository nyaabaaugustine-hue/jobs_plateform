import Link from 'next/link';
import { BarChart, Briefcase, Building, FileText, Home, MessageSquare, PlusCircle, Settings, Users } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === 'company-logo-1');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-secondary">
        <Sidebar>
          <SidebarHeader>
             <Button variant="default" className="w-full" asChild>
                <Link href="/employer/jobs/new"><PlusCircle className="mr-2 h-4 w-4" /> Post a New Job</Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/employer">
                    <Home />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employer/jobs">
                    <Briefcase />
                    <span>Jobs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employer/applicants">
                    <Users />
                    <span>Applicants</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employer/messages">
                    <MessageSquare />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employer/analytics">
                    <BarChart />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employer/company-profile">
                    <Building />
                    <span>Company Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
             <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
