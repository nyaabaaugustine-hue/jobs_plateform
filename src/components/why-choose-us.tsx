import { Shield, Zap, BrainCircuit } from 'lucide-react';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500'
  }
];

export default function WhyChooseUs() {
    const bgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');
  return (
    <section className="relative py-16 md:py-24">
       {bgImage && (
        <>
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </>
      )}
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">Why Chapel Hill?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                We're more than just a job board. We're your career partner.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center bg-card/80 backdrop-blur-sm border-white/20">
              <CardHeader className="items-center">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-full", feature.iconBg)}>
                  <feature.icon className={cn("h-8 w-8", feature.iconColor)} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl text-card-foreground">{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
