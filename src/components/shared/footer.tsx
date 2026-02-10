'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Logo from './logo';
import { Button } from '../ui/button';

export default function Footer() {
  const navSections = [
    {
      title: 'For Candidates',
      links: [
        { href: '/jobs', label: 'Browse Jobs' },
        { href: '/dashboard', label: 'Candidate Dashboard' },
        { href: '/dashboard/profile', label: 'Job Alerts' },
        { href: '/dashboard/applications', label: 'My Applications' },
      ],
    },
    {
      title: 'For Employers',
      links: [
        { href: '/employer', label: 'Employer Dashboard' },
        { href: '/employer/jobs/new', label: 'Post a Job' },
        { href: '/employer/applicants', label: 'Browse Candidates' },
        { href: '#', label: 'Pricing' },
      ],
    },
    {
      title: 'Community',
      links: [
        { href: '/blog', label: 'News & Blog' },
        { href: '#', label: 'Help Center' },
        { href: '#', label: 'Guidelines' },
        { href: '#', label: 'Careers' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-4">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              JobBox is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
            </p>
            <div className="mt-6 flex space-x-2">
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
          <div className="grid gap-8 md:col-span-12 lg:col-span-8 md:grid-cols-3">
            {navSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-headline font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-4 space-y-2">
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
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 JobBox. All rights reserved.</p>
          <div className='flex gap-4'>
             <Link href="#" className="hover:text-primary">Terms & Conditions</Link>
             <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
