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
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DesktopAuthButtons = () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button
        asChild
        className="rounded-xl bg-accent-gradient px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105"
      >
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );

  const MobileAuthButtons = () => (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button variant="outline" asChild size="lg">
        <Link href="/login">Login</Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="bg-accent-gradient font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home, color: 'text-sky-500' },
    { href: '/jobs', label: 'Find a Job', icon: Briefcase, color: 'text-emerald-500' },
    { href: '/browse-candidates', label: 'Browse Candidates', icon: Users, color: 'text-indigo-500' },
    { href: '/opportunities', label: 'Opportunities', icon: Sparkles, color: 'text-yellow-500' },
    { href: '/companies', label: 'Companies', icon: Building2, color: 'text-orange-500' },
    { href: '/pricing', label: 'Pricing', icon: CreditCard, color: 'text-rose-500' },
    { href: '/blog', label: 'Blog', icon: PenSquare, color: 'text-blue-500' },
    { href: '/contacts', label: 'Contacts', icon: Mail, color: 'text-purple-500' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6 lg:px-12">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
                <Logo />
            </Link>
        </div>

        {/* Center: Nav (Desktop) */}
        <div className="hidden flex-1 justify-center md:flex">
            <TooltipProvider>
                <nav className="flex w-full items-center justify-center gap-1 lg:gap-2">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                        const Icon = link.icon;
                        return (
                        <Tooltip key={link.href}>
                            <TooltipTrigger asChild>
                            <Link
                                href={link.href}
                                className={cn(
                                'flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors hover:bg-secondary',
                                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <Icon className={cn('h-5 w-5', link.color)} />
                                <span className="hidden lg:inline whitespace-nowrap">{link.label}</span>
                            </Link>
                            </TooltipTrigger>
                            <TooltipContent className="block lg:hidden">
                            <p>{link.label}</p>
                            </TooltipContent>
                        </Tooltip>
                        );
                    })}
                </nav>
            </TooltipProvider>
        </div>

        {/* Right: Auth & Mobile Menu */}
        <div className="flex flex-shrink-0 items-center justify-end">
            <div className="hidden md:flex">
              <DesktopAuthButtons />
            </div>
            {isMounted && (
            <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col bg-card p-0">
                  <SheetHeader className="p-6 pb-4">
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetDescription className="sr-only">
                      Main navigation links
                      </SheetDescription>
                      <Link href="/">
                      <Logo />
                      </Link>
                  </SheetHeader>
                  <nav className="flex-1 space-y-2 p-4">
                      {navLinks.map((link) => {
                      const isActive =
                          link.href === '/'
                          ? pathname === '/'
                          : pathname.startsWith(link.href);
                      const Icon = link.icon;
                      return (
                          <Link
                          key={link.href + link.label}
                          href={link.href}
                          className={cn(
                              'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-primary/10 hover:text-primary',
                              isActive
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground'
                          )}
                          >
                          <Icon className={cn('h-5 w-5', link.color)} />
                          {link.label}
                          </Link>
                      );
                      })}
                  </nav>
                  <SheetFooter className="mt-auto border-t bg-background/30 p-4">
                      <MobileAuthButtons />
                  </SheetFooter>
                  </SheetContent>
              </Sheet>
            </div>
            )}
        </div>

      </div>
    </header>
  );
}
