'use client';

import { useState } from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tiers = [
  {
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

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Flexible Pricing for Every Team"
        subtitle="Choose the plan that's right for you. Get started for free or unlock powerful features with our Pro plan."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-center items-center gap-4 mb-12">
            <Label htmlFor="billing-cycle" className={!isYearly ? 'text-primary font-bold' : ''}>Monthly</Label>
            <Switch
              id="billing-cycle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-cycle" className={isYearly ? 'text-primary font-bold' : ''}>
              Annual <span className="text-accent font-normal">(Save 20%)</span>
            </Label>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
            {tiers.map((tier) => (
              <Card key={tier.name} className={cn(
                'flex flex-col h-full',
                tier.isPopular && 'border-primary shadow-2xl relative'
              )}>
                {tier.isPopular && (
                    <div className="absolute top-0 right-4 -mt-4 bg-accent-gradient text-white px-3 py-1 text-sm font-semibold rounded-full">
                        Most Popular
                    </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-6">
                    <span className="font-headline text-5xl font-bold">
                        {typeof tier.price.monthly === 'number'
                          ? `GH₵${isYearly ? tier.price.yearly / 12 : tier.price.monthly}`
                          : 'Custom'}
                    </span>
                    <span className="text-muted-foreground">
                        {typeof tier.price.monthly === 'number' ? '/month' : ''}
                    </span>
                    {isYearly && typeof tier.price.yearly === 'number' && tier.price.yearly > 0 && (
                        <p className="text-sm text-muted-foreground">Billed as GH₵{tier.price.yearly}/year</p>
                    )}
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className={cn('w-full', tier.isPopular ? 'bg-accent-gradient' : 'bg-primary')}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
