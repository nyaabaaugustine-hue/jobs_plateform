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
        router.push('/employer');
      }, 2000);
  }

  if (!selectedTier || !billingCycle) {
    return (
        <Card>
            <CardContent className="p-10 text-center">
                <p>Loading your plan...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your subscription details before payment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
                        <h3 className="font-headline text-2xl font-bold text-primary">{selectedTier.name} Plan</h3>
                        <p className="text-4xl font-bold mt-2">
                           GH₵{price}
                           <span className="text-lg font-normal text-muted-foreground">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                        </p>
                         {billingCycle === 'yearly' && (
                             <p className="text-sm text-primary font-medium">Billed annually</p>
                         )}
                    </div>
                     <ul className="space-y-3 text-sm">
                        {selectedTier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Separator />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">GH₵{price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Taxes (10%)</span>
                            <span className="font-medium">GH₵{tax.toFixed(2)}</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between text-base font-bold">
                            <span>Total</span>
                            <span>GH₵{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Payment Details</CardTitle>
                <CardDescription>Securely complete your purchase with Paystack.</CardDescription>
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
                         <div className="border rounded-md p-4 space-y-3">
                           <div className="relative">
                               <Input placeholder="Card Number" className="pr-20"/>
                               <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                                   {visaLogo && <Image src={visaLogo.imageUrl} alt="Visa" width={32} height={20} />}
                                   {mastercardLogo && <Image src={mastercardLogo.imageUrl} alt="Mastercard" width={32} height={20} />}
                               </div>
                           </div>
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="MM / YY" />
                              <Input placeholder="CVC" />
                            </div>
                         </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground text-center pt-2 flex items-center justify-center gap-2">
                         {paystackLogo && <Image src={paystackLogo.imageUrl} alt="Paystack" width={80} height={20} />}
                        <span>| This is a simulated payment for demo purposes.</span>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent-gradient" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 animate-spin" /> : (price > 0 ? `Pay GH₵${total.toFixed(2)} Now` : 'Complete Setup')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 text-center">
                <Separator />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
