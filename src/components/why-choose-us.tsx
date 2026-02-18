"use client"

import Image from 'next/image';
import { Shield, Zap, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import SectionHeader from './shared/section-header';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: Zap,
    title: '2x Faster to Hire',
    description: 'Our AI-driven platform connects you with qualified candidates in under 48 hours, reducing your time-to-hire by half.',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10'
  },
  {
    icon: Shield,
    title: '98% Employer Verification',
    description: 'We manually verify every employer, ensuring you only apply to legitimate, high-quality opportunities.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10'
  },
  {
    icon: BrainCircuit,
    title: '89% Match Accuracy',
    description: 'Our AI analyzes your profile to provide job recommendations with an 89% accuracy score, so you find the right fit, faster.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-600/10'
  }
];

export default function WhyChooseUs() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt=""
          fill
          className="object-cover opacity-25 z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Why Chapel Hill?" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-none ring-2 ring-primary p-10 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <CardHeader className="items-center pb-6">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50", feature.iconBg)}>
                  <feature.icon className={cn("h-8 w-8", feature.iconColor)} />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-4 text-2xl font-bold text-foreground">{feature.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}