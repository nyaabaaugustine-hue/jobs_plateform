'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { 
      label: 'Home', 
      href: '/',
      subItems: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contacts' },
        { label: 'Community Guidelines', href: '/guidelines' },
        { label: 'FAQ', href: '/#faq' },
      ]
    },
    { 
      label: 'For Job Seekers', 
      href: '/jobs',
      subItems: [
        { label: 'Browse Jobs', href: '/jobs' },
        { label: 'Top Companies', href: '/companies' },
        { label: 'Student Opportunities', href: '/opportunities' },
        { label: 'My Dashboard', href: '/dashboard' },
      ]
    },
    { 
      label: 'For Employers', 
      href: '/pricing',
      subItems: [
        { label: 'Post a Job', href: '/employer/jobs/new' },
        { label: 'Browse Candidates', href: '/browse-candidates' },
        { label: 'Pricing Plans', href: '/pricing' },
        { label: 'Employer Portal', href: '/employer' },
      ]
    },
    { 
      label: 'Resources', 
      href: '/blog',
      subItems: [
        { label: 'News & Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Homepage Features', href: '/features' },
        { label: 'API Status', href: '/admin/api-status' },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-12">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'text-sm font-black transition-all relative py-1 flex items-center gap-1 group font-headline uppercase tracking-widest',
                      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full',
                      pathname === link.href ? 'text-[#f6f4ee]' : 'text-slate-300 hover:text-[#f6f4ee]'
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-card/95 backdrop-blur-xl border-white/10 p-2 rounded-xl shadow-2xl">
                  {link.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} asChild>
                      <Link 
                        href={subItem.href} 
                        className="cursor-pointer w-full text-slate-300 hover:text-[#f6f4ee] hover:bg-white/5 font-bold py-2.5 px-4 rounded-lg transition-colors text-xs uppercase tracking-wider"
                      >
                        {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" className="text-slate-300 hover:text-[#f6f4ee] font-black uppercase tracking-widest text-[10px]" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="bg-primary text-white font-black rounded-lg px-6 hover:brightness-110 transition-all uppercase tracking-widest text-[10px] h-10 shadow-lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
