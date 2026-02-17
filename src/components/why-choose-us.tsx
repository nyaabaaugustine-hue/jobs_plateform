'use client';

import { Shield, Zap, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Zap,
    title: '2x Faster to Hire',
    description: 'Our AI-driven platform connects you with qualified candidates in under 48 hours, reducing your time-to-hire by half.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: Shield,
    title: '98% Employer Verification',
    description: 'We manually verify every employer, ensuring you only apply to legitimate, high-quality opportunities.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent'
  },
  {
    icon: BrainCircuit,
    title: '89% Match Accuracy',
    description: 'Our AI analyzes your profile to provide job recommendations with an 89% accuracy score, so you find the right fit, faster.',
    iconBg: 'bg-chart-4/10',
    iconColor: 'text-chart-4'
  }
];

export default function WhyChooseUs() {
  return (
    <section 
      className="py-24 relative overflow-hidden" 
      style={{ backgroundColor: 'hsla(210, 10%, 98%, 0.5)' }}
    >
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Why Chapel Hill?</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-card/80 backdrop-blur-md border border-border shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1" style={{ animationDelay: `${200 + index * 100}ms` }}>
              <CardHeader className="items-center pb-2">
                <div className={cn("flex h-20 w-20 items-center justify-center rounded-2xl shadow-inner", feature.iconBg)}>
                  <feature.icon className={cn("h-10 w-10", feature.iconColor)} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="mb-3 text-2xl font-bold text-card-foreground">{feature.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}