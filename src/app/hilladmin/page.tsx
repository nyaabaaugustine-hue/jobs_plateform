
'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // For this admin-specific login page, always redirect to the admin dashboard.
        const destination = '/admin';

        toast({
            title: 'Admin Login Successful',
            description: 'Redirecting to your dashboard...',
            variant: 'vibrant',
        });
        
        // Simulate network delay for demo
        setTimeout(() => {
            router.push(destination);
            setIsLoading(false);
        }, 1000);
    };

  return (
      <main className="flex-1 flex items-center justify-center p-4 relative">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
              priority
              sizes="100vw"
            />
          )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full">
            <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription>
                  Enter your credentials to access the Executive Dashboard.
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
                        placeholder="admin@example.com"
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
            </CardContent>
            </Card>
        </div>
      </main>
  )
}
