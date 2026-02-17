
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Star, Users, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const employerTiers = [
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

export const jobSeekerTiers = [
  {
    id: 'seeker-basic',
    name: 'Basic',
    price: { monthly: 0, yearly: 0 },
    description: 'Essential tools to get your job search started.',
    features: [
      'Unlimited Job Applications',
      'Public Profile',
      'Standard Job Alerts',
      'Save Unlimited Jobs',
    ],
    cta: 'Register for Free',
    isPopular: false,
  },
  {
    id: 'seeker-pro',
    name: 'Pro',
    price: { monthly: 15, yearly: 150 },
    description: 'Supercharge your job search with AI.',
    features: [
      'Everything in Basic, plus:',
      'AI Resume Optimization & Builder',
      'AI-Generated Cover Letters',
      'AI Mock Interview Practice',
      'Salary Negotiation Tools',
      'Advanced Career Insights',
    ],
    cta: 'Go Pro',
    isPopular: true,
  },
];


export default function PricingGrid() {
  const [isYearly, setIsYearly] = useState(false);
  const [userType, setUserType] = useState<'seekers' | 'employers'>('employers');
  const kenteImage = PlaceHolderImages.find(p => p.id === 'kente-corner-art');

  const tiers = userType === 'seekers' ? jobSeekerTiers : employerTiers;

  const getCtaLink = (tier: typeof tiers[0]) => {
    if (tier.id === 'enterprise') {
      return '/contacts';
    }
    if (tier.price.monthly === 0) {
      return '/register';
    }
    const billingCycle = isYearly ? 'yearly' : 'monthly';
    return `/checkout?plan=${tier.id}&billing=${billingCycle}`;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="seekers"><Users className="mr-2" /> For Job Seekers</TabsTrigger>
                <TabsTrigger value="employers"><Building className="mr-2"/> For Employers</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-4">
                <span className={cn("font-semibold text-lg", !isYearly ? 'text-primary' : 'text-muted-foreground')}>Monthly</span>
                <Switch
                    id="billing-cycle"
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                />
                <span className={cn("font-semibold text-lg", isYearly ? 'text-primary' : 'text-muted-foreground')}>
                    Annual <span className="text-emerald-600 font-normal text-base">(Save 20%)</span>
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-end pt-8">
        {(tiers as any[]).map((tier, index) => {
            const isSeekerPro = tier.id === 'seeker-pro' && userType === 'seekers';

            return (
            <div key={tier.name} className={cn(
                "relative transition-transform duration-300",
                tier.isPopular && 'lg:scale-105'
            )}>
                {tier.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg z-20 flex items-center gap-1.5">
                        <Star className="h-4 w-4" fill="currentColor"/> Most Popular
                    </div>
                )}
                <Card className={cn(
                    'relative flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700',
                     tier.isPopular
                        ? 'border-2 border-yellow-400 shadow-2xl bg-background'
                        : 'hover:shadow-xl hover:-translate-y-1',
                     tier.id === 'basic' && userType === 'employers' && 'border-2 border-red-400',
                     isSeekerPro && 'border-2 border-green-400',
                     tier.id === 'enterprise' && 'border-2 border-green-400'
                )} style={{ animationDelay: `${200 + index * 100}ms` }}>
                     {kenteImage && (
                        <Image
                            src={kenteImage.imageUrl}
                            alt={kenteImage.description}
                            width={96}
                            height={96}
                            className="absolute top-0 right-0 h-16 w-16 lg:h-24 lg:w-24 pointer-events-none z-0 rounded-bl-full"
                        />
                     )}
                     <div className="relative z-10 flex flex-col h-full">
                        <CardHeader className="text-center pt-10">
                            <CardTitle className="font-headline text-3xl text-foreground">{tier.name}</CardTitle>
                            <CardDescription className="pt-1">{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="text-center mb-8">
                            <span className="font-headline text-5xl font-bold text-foreground">
                            {typeof tier.price.monthly === 'number'
                                ? `GH₵${isYearly && tier.price.yearly > 0 ? Math.round(tier.price.yearly / 12) : tier.price.monthly}`
                                : 'Custom'}
                            </span>
                            <span className="text-muted-foreground">
                                {typeof tier.price.monthly === 'number' && tier.price.monthly > 0 ? '/month' : ''}
                            </span>
                            {isYearly && typeof tier.price.yearly === 'number' && tier.price.yearly > 0 && (
                                <p className="text-sm text-muted-foreground mt-1">Billed as GH₵{tier.price.yearly}/year</p>
                            )}
                             {tier.price.monthly === 0 && (
                                <p className="text-sm text-muted-foreground mt-1 h-5">&nbsp;</p>
                             )}
                            </div>
                            <ul className="space-y-4">
                            {tier.features.map((feature: string) => (
                                <li key={feature} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground">{feature}</span>
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
                                tier.isPopular ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''
                            )}
                            variant={tier.isPopular ? undefined : 'outline'}
                            >
                            <Link href={getCtaLink(tier)}>{tier.cta}</Link>
                            </Button>
                        </CardFooter>
                     </div>
                </Card>
            </div>
        )})}
        </div>
    </div>
  );
}
