import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import SectionHeader from './shared/section-header';

export default function HiringSection() {
  const image = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col space-y-6">
                <SectionHeader
                    title="Hire Top-Tier React Talent in 48 Hours"
                    subtitle="Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem."
                    isCentered={false}
                    className="mb-0"
                />
                <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 flex items-center gap-4">
                    <Button asChild size="lg" className="bg-primary">
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                </div>
            </div>
             <div className="relative flex items-center justify-center">
                {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description || 'Hiring section preview'}
                    width={500}
                    height={600}
                    className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
                    data-ai-hint={image.imageHint}
                />
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
