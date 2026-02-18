'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/jobs', label: 'Find Jobs' },
    { href: '/companies', label: 'Companies' },
    { href: '/browse-candidates', label: 'Browse Candidates' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-12">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-all relative py-1',
                  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full',
                  pathname === link.href ? 'text-white' : 'text-muted-foreground hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" className="text-muted-foreground hover:text-white font-medium" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="bg-primary text-white font-bold rounded-lg px-6 hover:brightness-110 transition-all" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
