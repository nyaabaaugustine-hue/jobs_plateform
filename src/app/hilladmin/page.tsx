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
import { useFirebase } from '@/firebase/provider';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AdminLoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast();
    const { auth, firestore } = useFirebase();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth || !firestore) {
             toast({
                title: 'Error',
                description: 'Firebase is not initialized.',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const adminDocRef = doc(firestore, "roles_admin", user.uid);
            const adminDoc = await getDoc(adminDocRef);

            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (adminDoc.exists() || (userDoc.exists() && userDoc.data().role === 'admin')) {
                toast({
                    title: 'Admin Login Successful',
                    description: 'Redirecting to your dashboard...',
                    variant: 'vibrant',
                });
                router.push('/admin');
            } else {
                 toast({
                    title: 'Login Failed',
                    description: 'You do not have administrative privileges.',
                    variant: 'destructive',
                });
                 setIsLoading(false);
                 await signOut(auth);
            }

        } catch (error: any) {
            console.error("Login failed:", error);
            let errorMessage = "An unknown error occurred.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password.';
                        break;
                    default:
                        errorMessage = "An error occurred during login."
                }
            }
            toast({
                title: 'Login Failed',
                description: errorMessage,
                variant: 'destructive',
            });
            setIsLoading(false);
        }
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
