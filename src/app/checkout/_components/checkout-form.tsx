'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { tiers } from '@/components/pricing-grid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutFormSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card className="bg-card/80 backdrop-blur-sm border-white/20">
            <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                </div>
                <Separator className="bg-white/20" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Separator className="bg-white/20"/>
                    <Skeleton className="h-6 w-full" />
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm border-white/20">
            <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
            </CardContent>
             <CardFooter className="flex-col gap-4 text-center">
                 <Separator className="bg-white/20" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-10 w-1/2" />
            </CardFooter>
        </Card>
    </div>
);

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State to hold values derived from client-side searchParams
  const [selectedTier, setSelectedTier] = useState<(typeof tiers)[0] | undefined>();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | null>(null);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const paystackLogo = PlaceHolderImages.find(p => p.id === 'paystack-logo');
  const visaLogo = PlaceHolderImages.find(p => p.id === 'visa-logo');
  const mastercardLogo = PlaceHolderImages.find(p => p.id === 'mastercard-logo');
  const sslBadge = PlaceHolderImages.find(p => p.id === 'ssl-badge');

  useEffect(() => {
    const planId = searchParams.get('plan');
    const billing = searchParams.get('billing') as 'monthly' | 'yearly' | null;
    const tier = tiers.find(t => t.id === planId);

    if (!tier || !billing) {
      router.push('/pricing');
      return;
    }
    
    setSelectedTier(tier);
    setBillingCycle(billing);

    const getPrice = () => {
      if (typeof tier.price.monthly !== 'number' || typeof tier.price.yearly !== 'number') {
        return 0;
      }
      return billing === 'yearly' ? tier.price.yearly : tier.price.monthly;
    };

    const currentPrice = getPrice();
    const currentTax = currentPrice > 0 ? currentPrice * 0.1 : 0;
    const currentTotal = currentPrice + currentTax;

    setPrice(currentPrice);
    setTax(currentTax);
    setTotal(currentTotal);
  }, [searchParams, router]);
  
  const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        const reference = `mock_ref_${Date.now()}`;
        if (price === 0) {
           toast({
            title: 'Setup Complete!',
            description: `Your ${selectedTier?.name} plan is now active.`,
            variant: 'vibrant'
           });
        } else {
            toast({
                title: 'Payment Successful!',
                description: `Your transaction reference: ${reference}. Welcome to ${selectedTier?.name}!`,
                variant: 'vibrant'
            });
        }
        router.push('/dashboard');
      }, 2000);
  }

  if (!selectedTier || !billingCycle) {
    return <CheckoutFormSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card className="bg-card/80 backdrop-blur-sm border-white/20">
            <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
                <CardDescription className="text-gray-300">Review your subscription details before payment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="p-6 rounded-lg border-2 border-primary bg-primary/20">
                        <h3 className="font-headline text-2xl font-bold text-primary">{selectedTier.name} Plan</h3>
                        <p className="text-4xl font-bold mt-2 text-white">
                           GH₵{price}
                           <span className="text-lg font-normal text-gray-300">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                        </p>
                         {billingCycle === 'yearly' && (
                             <p className="text-sm text-primary font-medium">Billed annually</p>
                         )}
                    </div>
                     <ul className="space-y-3 text-sm">
                        {selectedTier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Separator className="bg-white/20" />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Subtotal</span>
                            <span className="font-medium text-white">GH₵{price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Taxes (10%)</span>
                            <span className="font-medium text-white">GH₵{tax.toFixed(2)}</span>
                        </div>
                         <Separator className="bg-white/20"/>
                        <div className="flex justify-between text-base font-bold text-white">
                            <span>Total</span>
                            <span>GH₵{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm border-white/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><CreditCard /> Payment Details</CardTitle>
                <CardDescription className="text-gray-300">Securely complete your purchase with Paystack.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                        <Input id="fullName" placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary" />
                    </div>

                    {price > 0 && (
                      <div className="space-y-2">
                        <Label className="text-gray-300">Card Details</Label>
                         <div className="border border-white/20 rounded-md p-4 space-y-3 bg-black/20">
                           <div className="relative">
                               <Input placeholder="Card Number" className="pr-20 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary"/>
                               <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                                   {visaLogo && <Image src={visaLogo.imageUrl} alt="Visa" width={32} height={20} />}
                                   {mastercardLogo && <Image src={mastercardLogo.imageUrl} alt="Mastercard" width={32} height={20} />}
                               </div>
                           </div>
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="MM / YY" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary" />
                              <Input placeholder="CVC" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary" />
                            </div>
                         </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-300 text-center pt-2 flex items-center justify-center gap-2">
                         {paystackLogo && <Image src={paystackLogo.imageUrl} alt="Paystack" width={80} height={20} />}
                        <span>| This is a simulated payment for demo purposes.</span>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent-gradient" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 animate-spin" /> : (price > 0 ? `Pay GH₵${total.toFixed(2)} Now` : 'Complete Setup')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 text-center">
                <Separator className="bg-white/20" />
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Lock className="h-4 w-4 text-green-500"/>
                    <span>SSL Secure Payment</span>
                </div>
                 {sslBadge && (
                    <Image src={sslBadge.imageUrl} alt="SSL Secure" width={100} height={50} />
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
