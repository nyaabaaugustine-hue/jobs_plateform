'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: { monthly: 0, yearly: 0 },
    description: 'For small teams getting started.',
    features: [
      '1 Active Job Post',
      'Basic Company Profile',
      'View up to 25 Candidates',
      'Standard Support',
    ],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 99, yearly: 990 },
    description: 'For growing teams that need more power.',
    features: [
      '10 Active Job Posts',
      'Enhanced Company Profile',
      'Unlimited Candidate Views',
      'AI Candidate Matching',
      'Hiring Analytics',
      'Priority Support',
    ],
    cta: 'Choose Pro',
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 'Custom', yearly: 'Custom' },
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited Job Posts',
      'Dedicated Account Manager',
      'API Access & Integrations',
      'Advanced Security & Compliance',
      'Custom Reporting',
      '24/7 Premium Support',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
];

export default function PricingGrid() {
  const [isYearly, setIsYearly] = useState(false);

  const getCtaLink = (tier: typeof tiers[0]) => {
    if (tier.id === 'enterprise') {
      return '/contacts';
    }
    const billingCycle = isYearly ? 'yearly' : 'monthly';
    return `/checkout?plan=${tier.id}&billing=${billingCycle}`;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-12">
            <span className={cn("font-semibold text-lg", !isYearly ? 'text-yellow-400' : 'text-gray-200')}>Monthly</span>
            <Switch
                id="billing-cycle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
            />
            <span className={cn("font-semibold text-lg", isYearly ? 'text-yellow-400' : 'text-gray-200')}>
                Annual <span className="text-green-400 font-normal text-base">(Save 20%)</span>
            </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {tiers.map((tier) => {
            return (
            <Card key={tier.name} className={cn(
                'relative flex flex-col h-full rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2',
                tier.isPopular ? 'border-2 border-yellow-400 shadow-xl bg-black/50' : 'border border-white/20 bg-card/80 backdrop-blur-sm'
            )}>
                {tier.isPopular && (
                    <div className="absolute top-0 right-6 -mt-4 bg-black text-yellow-400 px-4 py-1.5 text-sm font-semibold rounded-full shadow-lg z-10 flex items-center gap-1.5">
                        <Star className="h-4 w-4" fill="currentColor"/> Most Popular
                    </div>
                )}
                <CardHeader className="text-center pt-10">
                    <CardTitle className="font-headline text-3xl text-white">{tier.name}</CardTitle>
                    <CardDescription className="pt-1 text-gray-200">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="text-center mb-8">
                    <span className="font-headline text-5xl font-bold text-white">
                      {typeof tier.price.monthly === 'number' && typeof tier.price.yearly === 'number'
                        ? `GH₵${isYearly ? Math.round(tier.price.yearly / 12) : tier.price.monthly}`
                        : 'Custom'}
                    </span>
                    <span className="text-gray-400">
                        {typeof tier.price.monthly === 'number' ? '/month' : ''}
                    </span>
                    {isYearly && typeof tier.price.yearly === 'number' && tier.price.yearly > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Billed as GH₵{tier.price.yearly}/year</p>
                    )}
                    </div>
                    <ul className="space-y-4">
                    {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400" />
                        <span className="text-gray-200">{feature}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-6 mt-auto">
                    <Button
                    asChild
                    size="lg"
                    className={cn(
                        'w-full font-bold text-lg', 
                        tier.isPopular ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                    )}
                    >
                    <Link href={getCtaLink(tier)}>{tier.cta}</Link>
                    </Button>
                </CardFooter>
            </Card>
        )})}
        </div>
    </div>
  );
}
