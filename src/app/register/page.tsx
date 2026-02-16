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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const { toast } = useToast();
    const { auth, firestore } = useFirebase();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            toast({
                title: 'Registration Failed',
                description: 'Password must be at least 6 characters long.',
                variant: 'destructive',
            });
            return;
        }
        if (!auth || !firestore) {
            toast({
                title: 'Error',
                description: 'Firebase is not initialized. Please try again later.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Update user profile
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });

            // Create user document in Firestore
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                name: `${firstName} ${lastName}`,
                role: 'jobSeeker', // Default role for new signups
                createdAt: new Date().toISOString(),
                avatar: `avatar-${Math.floor(Math.random() * 15) + 1}`
            });

            toast({
                title: 'Account Created!',
                description: "You've been successfully registered. Redirecting...",
                variant: 'vibrant',
            });
            
            setIsLoading(false);
            router.push('/dashboard');

        } catch (error: any) {
            console.error("Registration failed:", error);
            let errorMessage = "An unknown error occurred.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email address is already in use by another account.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Please enter a valid email address.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak. Please use at least 6 characters.';
            }
            toast({
                title: 'Registration Failed',
                description: errorMessage,
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    const handleSocialSignUp = (provider: string) => {
        toast({
            title: `Sign up with ${provider}`,
            description: "Social sign-up has not been implemented in this demo.",
        });
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
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 w-full">
            <Card className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                Join our community of professionals and employers
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create an account'}
                        </Button>
                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialSignUp('Google')} disabled={isLoading}>
                            Sign up with Google
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                </Link>
                </div>
            </CardContent>
            </Card>
        </div>
      </main>
  )
}
