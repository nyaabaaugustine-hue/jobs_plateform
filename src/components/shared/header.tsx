'use client';

import Link from 'next/link';
import { Menu, LogOut, LayoutDashboard } from 'lucide-react';
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
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  // For demo purposes, we will assume the user is always logged out on public pages.
  // The dashboard layouts will handle their own "logged in" state.
  const user = null; 

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find a Job' },
    { href: '/opportunities', label: 'Opportunities' },
    { href: '/companies', label: 'Companies' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacts', label: 'Contacts' },
  ];
  
  const renderAuthButtons = () => {
    return (
      <div className="hidden items-center gap-2 md:flex">
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
  };
  
   const renderMobileAuthButtons = () => {
    return (
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
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {renderAuthButtons()}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col bg-card p-0">
            <SheetHeader className="p-6 pb-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation links</SheetDescription>
              <Link href="/">
                <Logo />
              </Link>
            </SheetHeader>
            <nav className="flex-1 space-y-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <SheetFooter className="mt-auto border-t bg-background/30 p-4">
              {renderMobileAuthButtons()}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
