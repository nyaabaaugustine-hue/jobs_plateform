
'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase/provider';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function LoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast();
    const { auth, firestore, user: currentUser } = useFirebase();

    // Prevent "frozen" state by redirecting if already logged in
    useEffect(() => {
        if (currentUser && !isLoading) {
            router.push('/dashboard');
        }
    }, [currentUser, isLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth || !firestore) {
            toast({
                title: 'Initialization Error',
                description: 'Firebase services are not ready. Please refresh.',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            toast({
                title: 'Identity Verified',
                description: 'Authenticating your role...',
                variant: 'vibrant',
            });

            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            let destination = '/dashboard';
            if (userDoc.exists()) {
                const userData = userDoc.data();
                switch (userData.role) {
                    case 'admin': destination = '/admin'; break;
                    case 'employer':
                    case 'recruiter':
                    case 'hiringManager': destination = '/employer'; break;
                    default: destination = '/dashboard';
                }
            } else {
                const adminDocRef = doc(firestore, "roles_admin", user.uid);
                const adminDoc = await getDoc(adminDocRef);
                if (adminDoc.exists()) destination = '/admin';
            }
            
            router.push(destination);
            // We keep isLoading true until the push completes or component unmounts
        } catch (error: any) {
            console.error("Login failed:", error);
            let errorMessage = "An unknown error occurred.";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Account temporarily disabled due to many attempts.';
            }
            toast({
                title: 'Login Failed',
                description: errorMessage,
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    const handleOneClickLogin = async (role: 'jobSeeker' | 'employer' | 'admin') => {
        if (!auth || !firestore) return;
    
        let demoEmail = '';
        let roleName = '';
        let destination = '';
    
        switch (role) {
            case 'employer':
                demoEmail = 'employer@example.com';
                roleName = 'Employer';
                destination = '/employer';
                break;
            case 'admin':
                demoEmail = 'admin@example.com';
                roleName = 'Admin';
                destination = '/admin';
                break;
            default:
                demoEmail = 'jobseeker@example.com';
                roleName = 'Job Seeker';
                destination = '/dashboard';
                break;
        }
        
        setIsLoading(true);
    
        try {
            await signInWithEmailAndPassword(auth, demoEmail, 'password');
            toast({
                title: `Demo Mode: ${roleName}`,
                description: 'Redirecting to your workspace...',
                variant: 'vibrant',
            });
            router.push(destination);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, 'password');
                    const user = userCredential.user;
                    await setDoc(doc(firestore, "users", user.uid), {
                        email: user.email,
                        name: `${roleName} User`,
                        role: role,
                        createdAt: new Date().toISOString(),
                        avatar: `avatar-${role === 'admin' ? 2 : (role === 'employer' ? 4 : 1)}`
                    });
                    if (role === 'admin') {
                        await setDoc(doc(firestore, "roles_admin", user.uid), { userId: user.uid, permissions: ['all'] });
                    }
                    router.push(destination);
                } catch (creationError: any) {
                    toast({ title: 'Setup Failed', description: creationError.message, variant: 'destructive' });
                    setIsLoading(false);
                }
            } else {
                toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
                setIsLoading(false);
            }
        }
    };

  return (
      <main className="flex-1 flex items-center justify-center p-4 relative min-h-[calc(100svh-120px)]">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              priority
              sizes="100vw"
            />
          )}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 w-full">
            <Card className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black font-headline text-white uppercase tracking-wider">Welcome Back</CardTitle>
                <CardDescription className="text-white/80 font-bold font-headline mt-2 leading-relaxed">
                  Sign in to access your dashboard. Use the one-click buttons for demo purposes.
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
                        disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline">
                            Forgot?
                        </Link>
                        </div>
                        <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
                    </div>
                    <Button type="submit" className="w-full bg-primary font-black uppercase tracking-widest h-12" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Login'}
                    </Button>
                    </div>
                </form>

                 <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                        <span className="bg-[#151C2B] px-2 text-muted-foreground">Demo Accounts</span>
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => handleOneClickLogin('jobSeeker')} disabled={isLoading}>
                            Job Seeker
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => handleOneClickLogin('employer')} disabled={isLoading}>
                            Employer
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => handleOneClickLogin('admin')} disabled={isLoading}>
                            Admin
                        </Button>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm font-medium text-white/60">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-black text-primary hover:underline uppercase tracking-wider">
                    Sign Up
                </Link>
                </div>
            </CardContent>
            </Card>
        </div>
      </main>
  )
}
