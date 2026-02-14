
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const MobileAuthButtons = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button variant="outline" asChild size="lg">
        <Link href="/login" onClick={onLinkClick}>Login</Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="bg-accent-gradient font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Link href="/register" onClick={onLinkClick}>Register</Link>
      </Button>
    </div>
  );

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    {
      label: 'Home',
      icon: Home,
      color: 'text-sky-500',
      subLinks: [
        { href: '/', label: 'Homepage', icon: Home, color: 'text-sky-500' },
        { href: '/about', label: 'About Us', icon: Info, color: 'text-gray-500' },
      ]
    },
    { 
      label: 'Candidates',
      icon: Users,
      color: 'text-indigo-500',
      subLinks: [
        { href: '/browse-candidates', label: 'Browse Candidates', icon: Users, color: 'text-indigo-500' },
        { href: '/opportunities', label: 'Opportunities', icon: Sparkles, color: 'text-yellow-500' },
      ]
    },
    { href: '/jobs', label: 'Find a Job', icon: Briefcase, color: 'text-emerald-500' },
    { href: '/companies', label: 'Companies', icon: Building2, color: 'text-orange-500' },
    { href: '/pricing', label: 'Pricing', icon: CreditCard, color: 'text-rose-500' },
    { href: '/blog', label: 'Blog', icon: PenSquare, color: 'text-blue-500' },
    { href: '/contacts', label: 'Contact', icon: Mail, color: 'text-purple-500' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6 lg:px-12">
        
        {/* Left: Logo & Mobile Trigger */}
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
                  <nav className="flex-1 space-y-1 p-4">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        if (link.subLinks) {
                           return (
                              <Accordion key={link.label} type="single" collapsible className="w-full">
                                <AccordionItem value="item-1" className="border-b-0">
                                  <AccordionTrigger className={cn(
                                    'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:no-underline [&>svg.lucide-chevron-down]:h-5 [&>svg.lucide-chevron-down]:w-5',
                                    'text-white hover:bg-white/10 font-medium'
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
                                              'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-white/10 hover:text-white',
                                              isSubActive ? 'text-white font-semibold bg-white/10' : 'text-neutral-300'
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
                              'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-white/10',
                              isActive
                              ? 'text-white font-semibold bg-white/10'
                              : 'text-neutral-300 hover:text-white'
                          )}
                          >
                          <Icon className={cn('h-4 w-4', link.color)} />
                          {link.label}
                          </Link>
                      );
                      })}
                  </nav>
                  <SheetFooter className="mt-auto border-t bg-background/30 p-4">
                      <MobileAuthButtons onLinkClick={() => setMobileMenuOpen(false)} />
                  </SheetFooter>
                  </SheetContent>
              </Sheet>
            )}
          </div>
          <Link href="/" className="flex items-center gap-2">
              <Logo />
          </Link>
        </div>

        {/* Center: Nav (Desktop) */}
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
                                                    isDropdownActive ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'
                                                )}>
                                                    <Icon className={cn('h-4 w-4', link.color)} />
                                                    <span className="hidden xl:inline whitespace-nowrap">{link.label}</span>
                                                    <ChevronDown className="h-4 w-4 hidden xl:inline opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent className="block xl:hidden">
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <DropdownMenuContent className="bg-sky-800/90 backdrop-blur-sm border-sky-600">
                                        {link.subLinks.map(subLink => {
                                            const SubIcon = subLink.icon;
                                            return (
                                                <DropdownMenuItem key={subLink.href} asChild className="focus:bg-sky-700">
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
                                isActive ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'
                                )}
                            >
                                <Icon className={cn('h-4 w-4', link.color)} />
                                <span className="hidden xl:inline whitespace-nowrap">{link.label}</span>
                            </Link>
                            </TooltipTrigger>
                            <TooltipContent className="block xl:hidden">
                            <p>{link.label}</p>
                            </TooltipContent>
                        </Tooltip>
                        );
                    })}
                </nav>
            </TooltipProvider>
        </div>

        {/* Right: Auth (Desktop) */}
        <div className="hidden md:flex items-center">
          <DesktopAuthButtons />
        </div>

      </div>
    </header>
  );
}
