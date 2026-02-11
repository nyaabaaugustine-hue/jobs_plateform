import Link from 'next/link';
import { Menu } from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find a Job' },
    { href: '/companies', label: 'Companies' },
    { href: '/dashboard', label: 'For Candidates' },
    { href: '/employer', label: 'For Employers' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacts', label: 'Contacts' },
  ];

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
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:bg-primary/90">
            <Link href="/register">Register</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-6">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Main navigation links</SheetDescription>
            </SheetHeader>
            <Link href="/">
              <Logo />
            </Link>
            <nav className="flex flex-1 flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
               <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
              </Button>
               <Button asChild className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm">
                  <Link href="/register">Register</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
