'use client';

import { Shield, Target, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import SectionHeader from './shared/section-header';

const features = [
  {
    icon: Shield,
    title: 'Verified Employers',
    description: 'Every organization is manually vetted to ensure enterprise-grade security and job quality.'
  },
  {
    icon: Target,
    title: '94% Match Accuracy',
    description: 'Our proprietary algorithm connects talent with roles that align with career long-term goals.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'High-touch assistance for both hiring managers and senior professionals.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Why Chapel Hill" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-none p-8 rounded-lg shadow-sm text-center">
              <CardHeader className="items-center pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-3 text-xl font-bold text-foreground">{feature.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}