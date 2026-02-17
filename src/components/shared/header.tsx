'use client';

import Link from 'next/link';
import {
  Menu,
  Home,
  Briefcase,
  Users,
  Sparkles,
  Building2,
  CreditCard,
  PenSquare,
  Mail,
  Info,
  ChevronDown,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  UserCircle,
  Settings,
} from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from '../theme-toggle';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


const DesktopAuthButtons = () => (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button variant="outline" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        className="rounded-xl px-5 py-2.5 font-semibold shadow-sm transition-transform hover:scale-105"
      >
        <Link href="/auth/login?screen_hint=signup">Register</Link>
      </Button>
    </div>
  );

  const MobileAuthButtons = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button variant="outline" asChild size="lg">
        <Link href="/auth/login" onClick={onLinkClick}>Login</Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        size="lg"
        className="font-semibold shadow-lg transition-transform hover:scale-105"
      >
        <Link href="/auth/login?screen_hint=signup" onClick={onLinkClick}>Register</Link>
      </Button>
    </div>
  );

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isLoading: isAuthUserLoading } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  if (isDashboardPage) {
    return null;
  }

  // NOTE: Role-based routing is simplified as Auth0 user does not have role by default.
  const getDashboardLink = () => '/dashboard';
  const getProfileLink = () => '/dashboard/profile';
  const getSettingsLink = () => '/dashboard/settings';

  const handleLogout = () => {
    router.push('/auth/logout');
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home, color: 'text-sky-500' },
    {
      label: 'For Job Seekers',
      icon: Users,
      color: 'text-emerald-500',
      subLinks: [
        { href: '/jobs', label: 'Find a Job', icon: Briefcase, color: 'text-emerald-500' },
        { href: '/companies', label: 'Browse Companies', icon: Building2, color: 'text-orange-500' },
        { href: '/opportunities', label: 'Student Opportunities', icon: Sparkles, color: 'text-yellow-500' },
      ]
    },
    {
      label: 'For Employers',
      icon: Building2,
      color: 'text-indigo-500',
      subLinks: [
        { href: '/browse-candidates', label: 'Browse Candidates', icon: Users, color: 'text-indigo-500' },
        { href: '/employer/jobs/new', label: 'Post a Job', icon: PlusCircle, color: 'text-primary' },
        { href: '/pricing', label: 'Pricing', icon: CreditCard, color: 'text-rose-500' },
      ]
    },
    {
      label: 'Resources',
      icon: Info,
      color: 'text-gray-500',
      subLinks: [
        { href: '/blog', label: 'Our News & Stories', icon: PenSquare, color: 'text-blue-500' },
        { href: '/features', label: 'Feature Showcase', icon: LayoutDashboard, color: 'text-teal-500' },
        { href: '/about', label: 'About Us', icon: Info, color: 'text-gray-500' },
        { href: '/contacts', label: 'Contact', icon: Mail, color: 'text-purple-500' },
      ]
    },
  ];

  const DesktopAuthDisplay = () => {
    if (isAuthUserLoading) {
      return (
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      );
    }

    if (user) {
      const profileLink = getProfileLink();
      const settingsLink = getSettingsLink();

      return (
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-transform hover:scale-110">
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  {user.picture && <AvatarImage src={user.picture} alt={user.name || 'User'} />}
                  <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                {profileLink && (
                  <DropdownMenuItem asChild>
                    <Link href={profileLink}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {settingsLink && (
                  <DropdownMenuItem asChild>
                    <Link href={settingsLink}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
    
    return <DesktopAuthButtons />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6 lg:px-12">
        
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            {isMounted && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col bg-card p-0 w-[300px]">
                  <SheetHeader className="p-6 pb-4">
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetDescription className="sr-only">
                      Main navigation links
                      </SheetDescription>
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Logo />
                      </Link>
                  </SheetHeader>
                  <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        if (link.subLinks) {
                           return (
                              <Accordion key={link.label} type="single" collapsible className="w-full">
                                <AccordionItem value="item-1" className="border-b-0">
                                  <AccordionTrigger className={cn(
                                    'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:no-underline [&>svg.lucide-chevron-down]:h-5 [&>svg.lucide-chevron-down]:w-5',
                                    'hover:bg-muted font-medium'
                                  )}>
                                    <div className='flex items-center gap-4'>
                                      <Icon className={cn('h-4 w-4', link.color)} />
                                      {link.label}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-0 pl-8">
                                    <nav className="flex flex-col space-y-1">
                                      {link.subLinks.map(subLink => {
                                        const isSubActive = subLink.href === '/' ? pathname === '/' : pathname.startsWith(subLink.href);
                                        const SubIcon = subLink.icon;
                                        return (
                                          <Link
                                            key={subLink.href}
                                            href={subLink.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                              'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted',
                                              isSubActive ? 'text-foreground font-semibold bg-muted' : 'text-muted-foreground'
                                            )}
                                          >
                                            <SubIcon className={cn('h-4 w-4', subLink.color)} />
                                            {subLink.label}
                                          </Link>
                                        )
                                      })}
                                    </nav>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                           )
                        }
                        const isActive =
                            link.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(link.href!);
                        return (
                          <Link
                          key={link.href! + link.label}
                          href={link.href!}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                              'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted',
                              isActive
                              ? 'text-foreground font-semibold bg-muted'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                          >
                          <Icon className={cn('h-4 w-4', link.color)} />
                          {link.label}
                          </Link>
                      );
                      })}
                  </nav>
                  <SheetFooter className="mt-auto border-t bg-background/30 p-4 flex flex-col items-center gap-4">
                      {isAuthUserLoading ? (
                          <Skeleton className="h-24 w-full" />
                      ) : user ? (
                          <>
                              {user && (
                                <div className="w-full p-2 text-center border-b mb-2">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              )}
                              <div className="w-full space-y-2">
                                  <Button asChild size="lg" className="w-full">
                                      <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                                          <LayoutDashboard className="mr-2 h-4 w-4" />
                                          Go to Dashboard
                                      </Link>
                                  </Button>
                                  <Button variant="outline" size="lg" className="w-full" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                                      <LogOut className="mr-2 h-4 w-4" />
                                      Log Out
                                  </Button>
                              </div>
                          </>
                      ) : (
                          <MobileAuthButtons onLinkClick={() => setMobileMenuOpen(false)} />
                      )}
                      <ThemeToggle />
                  </SheetFooter>
                  </SheetContent>
              </Sheet>
            )}
          </div>
          <Link href="/" className="flex items-center gap-2">
              <Logo />
          </Link>
        </div>

        <div className="hidden md:flex">
            <TooltipProvider>
                <nav className="flex items-center gap-1 lg:gap-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;

                        if (link.subLinks) {
                            const isDropdownActive = link.subLinks.some(subLink => subLink.href === '/' ? pathname === '/' : pathname.startsWith(subLink.href));
                            return (
                                <DropdownMenu key={link.label}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className={cn(
                                                    'flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors',
                                                    isDropdownActive ? 'text-foreground font-bold' : 'text-foreground/80 hover:text-foreground'
                                                )}>
                                                    <Icon className={cn('h-4 w-4', link.color)} />
                                                    <span className="hidden xl:inline whitespace-nowrap">{link.label}</span>
                                                    <ChevronDown className="h-4 w-4 hidden xl:inline opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <DropdownMenuContent className="bg-background/90 backdrop-blur-sm border-border">
                                        {link.subLinks.map(subLink => {
                                            const SubIcon = subLink.icon;
                                            return (
                                                <DropdownMenuItem key={subLink.href} asChild className="focus:bg-muted">
                                                    <Link href={subLink.href} className="flex items-center gap-2">
                                                        <SubIcon className={cn('h-4 w-4', subLink.color)} />
                                                        {subLink.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }
                        
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href!);
                        return (
                        <Tooltip key={link.href}>
                            <TooltipTrigger asChild>
                            <Link
                                href={link.href!}
                                className={cn(
                                'flex items-center gap-2 rounded-md p-2 text-sm transition-colors',
                                isActive ? 'text-foreground font-bold' : 'text-foreground/80 hover:text-foreground'
                                )}
                            >
                                <Icon className={cn('h-4 w-4', link.color)} />
                                <span className="hidden xl:inline whitespace-nowrap">{link.label}</span>
                            </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>{link.label}</p>
                            </TooltipContent>
                        </Tooltip>
                        );
                    })}
                </nav>
            </TooltipProvider>
        </div>

        <div className="hidden md:flex items-center">
          <DesktopAuthDisplay />
        </div>

      </div>
    </header>
  );
}
