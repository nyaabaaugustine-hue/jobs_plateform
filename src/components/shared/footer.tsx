import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Logo from './logo';

export default function Footer() {
  const navSections = [
    {
      title: 'For Job Seekers',
      links: [
        { href: '/jobs', label: 'Find Jobs' },
        { href: '/dashboard/profile', label: 'Create Profile' },
        { href: '/dashboard/applications', label: 'My Applications' },
        { href: '#', label: 'Salary Estimator' },
      ],
    },
    {
      title: 'For Employers',
      links: [
        { href: '/employer/jobs/new', label: 'Post a Job' },
        { href: '/employer/applicants', label: 'Browse Applicants' },
        { href: '#', label: 'Pricing' },
        { href: '#', label: 'Employer Dashboard' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '#', label: 'About Us' },
        { href: '#', label: 'Contact' },
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              The modern React job platform for top talent.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin />
              </Link>
            </div>
          </div>
          <div className="grid gap-8 md:col-span-9 md:grid-cols-3">
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
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ReactHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
