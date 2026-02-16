'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { employerTiers, jobSeekerTiers } from '@/components/pricing-grid';
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
        <Card>
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
                <Separator />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Separator />
                    <Skeleton className="h-6 w-full" />
                </div>
            </CardContent>
        </Card>
        <Card>
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
                 <Separator />
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

  const allTiers = [...employerTiers, ...jobSeekerTiers];

  // State to hold values derived from client-side searchParams
  const [selectedTier, setSelectedTier] = useState<(typeof allTiers)[0] | undefined>();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | null>(null);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const trustedPaymentImage = PlaceHolderImages.find(p => p.id === 'checkout-trusted-payment');

  useEffect(() => {
    const planId = searchParams.get('plan');
    const billing = searchParams.get('billing') as 'monthly' | 'yearly' | null;
    const tier = allTiers.find(t => t.id === planId);

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
  }, [searchParams, router, allTiers]);
  
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
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your subscription details before payment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
                        <h3 className="font-headline text-2xl font-bold text-primary">{selectedTier.name} Plan</h3>
                        <p className="text-4xl font-bold mt-2 text-foreground">
                           GH₵{price}
                           <span className="text-lg font-normal text-muted-foreground">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                        </p>
                         {billingCycle === 'yearly' && (
                             <p className="text-sm text-primary font-medium">Billed annually</p>
                         )}
                    </div>
                     <ul className="space-y-3 text-sm">
                        {selectedTier.features.map((feature: any) => (
                            <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Separator />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium text-foreground">GH₵{price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Taxes (10%)</span>
                            <span className="font-medium text-foreground">GH₵{tax.toFixed(2)}</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between text-base font-bold text-foreground">
                            <span>Total</span>
                            <span>GH₵{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Payment Details</CardTitle>
                <CardDescription>Securely complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {price > 0 && (
                      <div className="space-y-2">
                        <Label>Card Details</Label>
                         <div className="border rounded-md p-4 space-y-3 bg-secondary/50">
                           <Input placeholder="Card Number"/>
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="MM / YY" />
                              <Input placeholder="CVC" />
                            </div>
                         </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center pt-2">
                        This is a simulated payment for demo purposes. No real transaction will occur.
                    </p>
                    <Button type="submit" size="lg" className="w-full bg-primary" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 animate-spin" /> : (price > 0 ? `Pay GH₵${total.toFixed(2)} Now` : 'Complete Setup')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 text-center">
                <Separator />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 text-emerald-500"/>
                    <span>SSL Secure Payment</span>
                </div>
                 {trustedPaymentImage && (
                    <Image 
                      src={trustedPaymentImage.imageUrl} 
                      alt={trustedPaymentImage.description}
                      width={300} 
                      height={50}
                      className="object-contain" 
                      data-ai-hint={trustedPaymentImage.imageHint}
                    />
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
