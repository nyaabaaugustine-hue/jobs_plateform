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
import { useFirebase } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);

    const { auth, firestore } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
                variant: 'vibrant',
            });
            router.push('/');
        } catch (error: any) {
            console.error('Login error:', error);
            toast({
                title: 'Login Failed',
                description: error.message || 'Invalid credentials. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async (role: 'jobSeeker' | 'employer' | 'admin') => {
        let demoEmail = '';
        const demoPassword = 'password';

        if (role === 'jobSeeker') demoEmail = 'seeker@chapelhill.ltd';
        if (role === 'employer') demoEmail = 'employer@chapelhill.ltd';
        if (role === 'admin') demoEmail = 'admin@chapelhill.ltd';
        
        setIsDemoLoading(role);
        try {
            await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
            toast({
                title: 'Login Successful',
                description: `Logged in as ${role}.`,
                variant: 'vibrant',
            });
            
            if (role === 'admin') router.push('/admin');
            else if (role === 'employer') router.push('/employer');
            else router.push('/dashboard');

        } catch (error: any) {
             if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
                    const user = userCredential.user;

                    await setDoc(doc(firestore, 'users', user.uid), {
                        id: user.uid,
                        email: demoEmail,
                        firstName: role.charAt(0).toUpperCase() + role.slice(1),
                        lastName: 'User',
                        role: role,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                    
                    toast({
                        title: 'Demo Account Created',
                        description: 'Logging you in...',
                    });
                    
                    if (role === 'admin') router.push('/admin');
                    else if (role === 'employer') router.push('/employer');
                    else router.push('/dashboard');

                } catch (createError: any) {
                    toast({
                        title: 'Demo Login Failed',
                        description: createError.message || 'Could not create demo user.',
                        variant: 'destructive',
                    });
                }
            } else {
                 toast({
                    title: 'Login Failed',
                    description: error.message || 'An unexpected error occurred.',
                    variant: 'destructive',
                });
            }
        } finally {
            setIsDemoLoading(null);
        }
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
                Sign in to access your account
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
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                    </div>
                </form>
                
                <Separator className="my-6" />

                <Card className="border-dashed bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-lg text-center">Demo Accounts</CardTitle>
                    <CardDescription className="text-center">Click a button to log in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm">
                    <p className="font-bold text-center">Job Seeker</p>
                    <p className="text-muted-foreground text-xs text-center">Email: seeker@chapelhill.ltd | Pass: password</p>
                    <Button variant="secondary" className="w-full mt-2" onClick={() => handleDemoLogin('jobSeeker')} disabled={!!isDemoLoading}>
                        {isDemoLoading === 'jobSeeker' ? 'Logging in...' : 'Login as Job Seeker'}
                    </Button>
                    </div>
                    <div className="text-sm">
                    <p className="font-bold text-center">Employer</p>
                    <p className="text-muted-foreground text-xs text-center">Email: employer@chapelhill.ltd | Pass: password</p>
                    <Button variant="secondary" className="w-full mt-2" onClick={() => handleDemoLogin('employer')} disabled={!!isDemoLoading}>
                         {isDemoLoading === 'employer' ? 'Logging in...' : 'Login as Employer'}
                    </Button>
                    </div>
                    <div className="text-sm">
                    <p className="font-bold text-center">Admin</p>
                    <p className="text-muted-foreground text-xs text-center">Email: admin@chapelhill.ltd | Pass: password</p>
                    <Button variant="secondary" className="w-full mt-2" onClick={() => handleDemoLogin('admin')} disabled={!!isDemoLoading}>
                         {isDemoLoading === 'admin' ? 'Logging in...' : 'Login as Admin'}
                    </Button>
                    </div>
                </CardContent>
                </Card>

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
