
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

export default function HiringSection() {
  const hiringImage = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  const bgImage = PlaceHolderImages.find((p) => p.id === 'contact-form-bg');
  
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="relative py-20">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/90 z-10" />

      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col space-y-6">
                <h2 className="font-headline text-4xl font-bold tracking-tight !leading-tight text-foreground sm:text-5xl">Hire Top-Tier React Talent in 48 Hours</h2>
                <p className="text-lg text-muted-foreground">Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.</p>
                <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button asChild size="lg" className="font-semibold">
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                     <Button asChild variant="link">
                      <Link href="/contacts">Advertise with us</Link>
                    </Button>
                </div>
            </div>
            <div className="relative flex items-center justify-center">
                {hiringImage && (
                  <div className="relative">
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                          src={hiringImage.imageUrl}
                          alt={hiringImage.description}
                          width={500}
                          height={600}
                          className="object-cover w-full aspect-[4/5]"
                          data-ai-hint={hiringImage.imageHint}
                      />
                    </div>
                    <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
                  </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
