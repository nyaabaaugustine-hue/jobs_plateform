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
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-left-12 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl !leading-tight">
              Hire Top-Tier React Talent in 48 Hours
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="outline" className="rounded-xl transform transition-transform hover:scale-105 border-accent text-accent hover:text-accent-foreground">
                <Link href="/employer/jobs/new">Post a Job</Link>
              </Button>
               <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-primary">
                <Link href="/contacts">Advertise with us</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-700">
            {hiringImage && (
              <Image
                src={hiringImage.imageUrl}
                alt={hiringImage.description}
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl object-contain h-[70%] w-auto"
                data-ai-hint={hiringImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
