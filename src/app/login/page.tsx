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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function LoginPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast();
    const { auth, firestore } = useFirebase();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            toast({
                title: 'Login Successful',
                description: 'Redirecting to your dashboard...',
                variant: 'vibrant',
            });

            // Fetch user role from Firestore to redirect correctly
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            let destination = '/dashboard'; // Default
            if (userDoc.exists()) {
                const userData = userDoc.data();
                switch (userData.role) {
                    case 'admin':
                        destination = '/admin';
                        break;
                    case 'employer':
                    case 'recruiter':
                    case 'hiringManager':
                        destination = '/employer';
                        break;
                    case 'jobSeeker':
                    default:
                        destination = '/dashboard';
                }
            } else {
                 // Check if user is an admin by looking in roles_admin collection
                const adminDocRef = doc(firestore, "roles_admin", user.uid);
                const adminDoc = await getDoc(adminDocRef);
                if (adminDoc.exists()) {
                    destination = '/admin';
                }
            }
            
            setIsLoading(false);
            router.push(destination);

        } catch (error: any) {
            console.error("Login failed:", error);
            let errorMessage = "An unknown error occurred.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password. Please try again.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Please enter a valid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.';
                        break;
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

    const handleOneClickLogin = async (role: 'jobSeeker' | 'employer' | 'admin') => {
        if (!auth || !firestore) {
            toast({
                title: 'Error',
                description: 'Firebase is not initialized. Please try again later.',
                variant: 'destructive',
            });
            return;
        }
    
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
            case 'jobSeeker':
            default:
                demoEmail = 'jobseeker@example.com';
                roleName = 'Job Seeker';
                destination = '/dashboard';
                break;
        }
        
        setEmail(demoEmail);
        setPassword('password');
        setIsLoading(true);
    
        try {
            // First, try to sign in
            await signInWithEmailAndPassword(auth, demoEmail, 'password');
            toast({
                title: `Logged in as ${roleName}`,
                description: 'Redirecting to your dashboard...',
                variant: 'vibrant',
            });
            setIsLoading(false);
            router.push(destination);
        } catch (error: any) {
            // If sign-in fails because the user doesn't exist, create the user
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    toast({
                        title: 'Creating Demo User...',
                        description: `The ${roleName} demo user doesn't exist yet. Creating it for you.`,
                    });
                    const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, 'password');
                    const user = userCredential.user;
    
                    // Create user document in Firestore
                    const userDocRef = doc(firestore, "users", user.uid);
                    await setDoc(userDocRef, {
                        email: user.email,
                        firstName: roleName,
                        lastName: "User",
                        name: `${roleName} User`,
                        role: role,
                        createdAt: new Date().toISOString(),
                        avatar: `avatar-${role === 'admin' ? 2 : (role === 'employer' ? 4 : 1)}`
                    });
    
                    // If admin, also create admin role document
                    if (role === 'admin') {
                        const adminDocRef = doc(firestore, "roles_admin", user.uid);
                        await setDoc(adminDocRef, {
                            userId: user.uid,
                            permissions: ['all'] 
                        });
                    }
                    
                    toast({
                        title: `Logged in as ${roleName}`,
                        description: 'Redirecting to your dashboard...',
                        variant: 'vibrant',
                    });
                    setIsLoading(false);
                    router.push(destination);
    
                } catch (creationError: any) {
                    toast({
                        title: 'Demo Login Failed',
                        description: `Could not create the demo user. Error: ${creationError.message}`,
                        variant: 'destructive',
                    });
                    setIsLoading(false);
                }
            } else {
                // Handle other login errors
                toast({
                    title: 'Demo Login Failed',
                    description: `Could not log in as ${roleName}. Error: ${error.message}`,
                    variant: 'destructive',
                });
                setIsLoading(false);
            }
        }
    };

    const handleSocialLogin = (provider: string) => {
        toast({
            title: `Login with ${provider}`,
            description: "Social login has not been implemented in this demo.",
        });
    };

    const handleForgotPassword = () => {
        toast({
            title: "Forgot Password",
            description: "Password reset functionality is not implemented in this demo.",
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
                <CardTitle className="text-2xl font-black font-headline text-white uppercase tracking-wider">Welcome Back</CardTitle>
                <CardDescription className="text-[#f6f4ee]/80 font-bold font-headline mt-2 leading-relaxed">
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
                        <Link href="#" onClick={handleForgotPassword} className="ml-auto inline-block text-sm text-primary hover:underline">
                            Forgot your password?
                        </Link>
                        </div>
                        <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full bg-primary font-black uppercase tracking-widest h-12" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    </div>
                </form>

                 <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                        <span className="bg-[#151C2B] px-2 text-muted-foreground">Or use one-click login</span>
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

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                        <span className="bg-[#151C2B] px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 font-bold h-12" type="button" disabled={isLoading} onClick={() => handleSocialLogin('Google')}>
                    Login with Google
                </Button>

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
