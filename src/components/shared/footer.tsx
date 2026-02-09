import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Logo from './logo';
import { Button } from '../ui/button';

export default function Footer() {
  const navSections = [
    {
      title: 'Resources',
      links: [
        { href: '#', label: 'About Us' },
        { href: '#', label: 'Our Team' },
        { href: '#', label: 'Products' },
        { href: '#', label: 'Contact' },
      ],
    },
    {
      title: 'Community',
      links: [
        { href: '#', label: 'Feature' },
        { href: '#', label: 'Pricing' },
        { href: '#', label: 'Credit' },
        { href: '#', label: 'FAQ' },
      ],
    },
    {
      title: 'Quick links',
      links: [
        { href: '#', label: 'iOS' },
        { href: '#', label: 'Android' },
        { href: '#', label: 'Microsoft' },
        { href: '#', label: 'Desktop' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              JobBox is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter />
              </Link>
            </div>
          </div>
          <div className="grid gap-8 md:col-span-8 lg:col-span-6 md:grid-cols-3">
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
          <div className="md:col-span-12 lg:col-span-3">
            <h3 className="font-headline font-semibold text-foreground">Download App</h3>
            <p className="mt-4 text-sm text-muted-foreground">Get the app for a better experience.</p>
            <div className="mt-4 flex flex-col space-y-2">
                <Button variant="outline">App Store</Button>
                <Button variant="outline">Google Play</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ReactHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
