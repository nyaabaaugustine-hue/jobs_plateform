
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import Logo from './shared/logo';

export default function HiringSection() {
  const sectionBgImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const hiringImage = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="relative py-16 md:py-24">
      {sectionBgImage && (
        <Image
          src={sectionBgImage.imageUrl}
          alt="Office background"
          fill
          className="object-cover z-0"
        />
      )}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col space-y-6 text-white">
                <h2 className="font-headline text-4xl font-bold tracking-tight !leading-tight text-white sm:text-5xl">Hire Top-Tier React Talent in 48 Hours</h2>
                <p className="text-lg text-gray-200">Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.</p>
                <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-gray-200">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                     <Button asChild variant="link" className="text-white hover:underline">
                      <Link href="/contacts">Advertise with us</Link>
                    </Button>
                </div>
            </div>
             <div className="relative flex items-center justify-center">
                {hiringImage && (
                    <div className="relative">
                        <Image
                            src={hiringImage.imageUrl}
                            alt="A smiling woman in a call center"
                            width={500}
                            height={600}
                            className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
                            data-ai-hint="call center"
                        />
                         <div className="absolute bottom-4 right-4">
                            <Logo />
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
