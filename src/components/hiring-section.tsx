import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

export default function HiringSection() {
  const hiringImage = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  const bgImage = PlaceHolderImages.find((p) => p.id === 'top-companies-bg');
  
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Section Background Image */}
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/75 z-10" />

      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <h2 className="font-headline text-4xl font-extrabold tracking-tight !leading-tight text-white sm:text-5xl lg:text-6xl">
                  Hire Top-Tier React Talent in 48 Hours
                </h2>
                <p className="text-xl text-gray-100 font-medium max-w-xl">
                  Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.
                </p>
                <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-4 group">
                            <CheckCircle className="h-6 w-6 text-gold shrink-0 transition-transform group-hover:scale-110" />
                            <span className="text-gray-200 font-semibold text-lg">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-6 flex flex-wrap items-center gap-4">
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="font-bold border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white transition-all scale-105 shadow-xl"
                    >
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="font-bold border-white/20 text-gray-300 hover:text-white transition-colors"
                    >
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                     <Button asChild variant="link" className="text-gold hover:text-gold/80 font-semibold">
                      <Link href="/contacts">Advertise with us</Link>
                    </Button>
                </div>
            </div>
            <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right duration-1000">
                {hiringImage && (
                  <div className="relative group w-full max-w-[600px]">
                    <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-4 border-white/10 transition-transform duration-500 group-hover:scale-[1.03]">
                      <Image
                          src={hiringImage.imageUrl}
                          alt={hiringImage.description}
                          width={600}
                          height={750}
                          className="object-cover w-full aspect-[4/5]"
                          data-ai-hint={hiringImage.imageHint}
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-10 bg-primary/30 blur-[100px] -z-10 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
