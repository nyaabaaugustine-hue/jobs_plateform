'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import Logo from './logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const pathname = usePathname();

  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  if (isDashboardPage) {
    return null;
  }

  const navSections = [
    {
      title: 'For Candidates',
      links: [
        { href: '/jobs', label: 'Browse Jobs' },
        { href: '/dashboard', label: 'Candidate Dashboard' },
        { href: '/dashboard/settings', label: 'Job Alerts' },
        { href: '/dashboard/applications', label: 'My Applications' },
      ],
    },
    {
      title: 'For Employers',
      links: [
        { href: '/employer', label: 'Employer Dashboard' },
        { href: '/employer/jobs/new', label: 'Post a Job' },
        { href: '/browse-candidates', label: 'Browse Candidates' },
        { href: '/pricing', label: 'Pricing' },
      ],
    },
    {
      title: 'Community',
      links: [
        { href: '/blog', label: 'News & Blog' },
        { href: '/guidelines', label: 'Guidelines' },
        { href: '/opportunities', label: 'Opportunities' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/contacts', label: 'Contact Us' },
        { href: '/careers', label: 'Careers' },
      ],
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: 'Subscription Successful!',
      description: `Thank you for subscribing, ${email}.`,
      variant: 'vibrant',
    });
    setEmail('');
  };

  return (
    <footer className="bg-card border-t border-border/5">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Logo, Description, Socials */}
          <div className="lg:col-span-3 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Chapel Hill is the heart of the professional community and the best resource to discover and connect with talent and jobs worldwide.
            </p>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter />
                </Link>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-headline font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-headline font-semibold text-foreground">Stay Updated</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to our newsletter to get the latest job postings and career tips.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-accent-gradient">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-12 bg-border/10" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Chapel Hill. All rights reserved. Developed By <span className="font-semibold text-burgundy">TGNE Solutions</span>.
          </p>
          <div className='flex gap-6'>
             <Link href="#" className="hover:text-primary">Terms & Conditions</Link>
             <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
