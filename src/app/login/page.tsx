'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('jobseeker@example.com');
    const [password, setPassword] = useState('password');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Demo logic: redirect based on email
        let destination = '/dashboard'; // Default to job seeker
        if (email.toLowerCase().includes('employer')) {
            destination = '/employer';
        }

        toast({
            title: 'Login Successful',
            description: 'Redirecting to your dashboard...',
            variant: 'vibrant',
        });
        
        // Simulate network delay for demo
        setTimeout(() => {
            router.push(destination);
            setIsLoading(false);
        }, 1000);
    };

    const handleOneClickLogin = (role: 'jobSeeker' | 'employer' | 'admin') => {
        setIsLoading(true);
        let destination = '/dashboard';
        let roleName = 'Job Seeker';

        if (role === 'employer') {
            destination = '/employer';
            roleName = 'Employer';
        } else if (role === 'admin') {
            destination = '/admin';
            roleName = 'Admin';
        }

        toast({
            title: `Logged in as ${roleName}`,
            description: 'Redirecting to your dashboard...',
            variant: 'vibrant',
        });

        setTimeout(() => {
            router.push(destination);
            setIsLoading(false);
        }, 1000);
    };

  return (
     <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 relative">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full">
            <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your dashboard. Use the form below or the one-click login buttons for demo purposes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline">
                            Forgot your password?
                        </Link>
                        </div>
                        <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full bg-accent-gradient" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    </div>
                </form>

                 <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or use one-click login</span>
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Button variant="outline" onClick={() => handleOneClickLogin('jobSeeker')} disabled={isLoading}>
                            Job Seeker
                        </Button>
                        <Button variant="outline" onClick={() => handleOneClickLogin('employer')} disabled={isLoading}>
                            Employer
                        </Button>
                        <Button variant="outline" onClick={() => handleOneClickLogin('admin')} disabled={isLoading}>
                            Admin
                        </Button>
                    </div>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                
                <Button variant="outline" className="w-full" disabled={isLoading}>
                    Login with Google
                </Button>

                <div className="mt-6 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                    Sign Up
                </Link>
                </div>
            </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
