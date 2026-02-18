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
    <footer className="bg-[#0B0F17] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Logo className="w-40" />
            <p className="text-muted-foreground leading-relaxed font-medium">
              Chapel Hill is the heart of the professional community and the premier resource to discover top talent and elite opportunities globally.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5 text-white" asChild>
                <Link href="#"><Facebook className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5 text-white" asChild>
                <Link href="#"><Linkedin className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5 text-white" asChild>
                <Link href="#"><Twitter className="h-5 w-5" /></Link>
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase text-xs tracking-widest">Candidates</h3>
              <ul className="space-y-3">
                <li><Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse Jobs</Link></li>
                <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/opportunities" className="text-sm text-muted-foreground hover:text-primary transition-colors">Opportunities</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase text-xs tracking-widest">Employers</h3>
              <ul className="space-y-3">
                <li><Link href="/employer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Employer Portal</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing Plans</Link></li>
                <li><Link href="/employer/jobs/new" className="text-sm text-muted-foreground hover:text-primary transition-colors">Post a Job</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase text-xs tracking-widest">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contacts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">News</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                placeholder="Email address" 
                className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl h-12">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Chapel Hill. Developed By <span className="text-yellow-500 font-bold">TGNE Solutions</span>
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs text-muted-foreground hover:text-yellow-500 underline underline-offset-4">Terms & Conditions</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-yellow-500 underline underline-offset-4">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
