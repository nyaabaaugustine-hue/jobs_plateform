import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

export default function HiringSection() {
  const hiringImage = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="relative bg-secondary py-16 md:py-24">
       <div className="absolute inset-0 bg-background/97 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl !leading-tight">
              Hire Top-Tier React Talent in 48 Hours
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex items-center gap-4">
              <Button asChild size="lg" className="bg-shiny-white-gradient">
                <Link href="/employer/jobs/new">Post a Job</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {hiringImage && (
              <Image
                src={hiringImage.imageUrl}
                alt={hiringImage.description}
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
                data-ai-hint={hiringImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
