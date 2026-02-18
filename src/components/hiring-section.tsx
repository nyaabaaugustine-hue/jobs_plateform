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
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0B0F17]">
      {/* Background Image at 20% Opacity */}
      {hiringImage && (
        <Image
          src={hiringImage.imageUrl}
          alt={hiringImage.description}
          fill
          className="object-cover z-0 opacity-20"
          data-ai-hint={hiringImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-[#0B0F17]/80 z-10" />

      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <h2 className="font-headline text-4xl font-extrabold tracking-tight !leading-tight text-white sm:text-5xl lg:text-6xl">
                  Hire Senior React Developers. Fast.
                </h2>
                <p className="text-xl font-bold max-w-xl text-[#F3F4F6]">
                  Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.
                </p>
                <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-4 group">
                            <CheckCircle className="h-6 w-6 text-gold shrink-0 transition-transform group-hover:scale-110" />
                            <span className="font-bold text-lg text-[#F3F4F6]">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-6 flex flex-wrap items-center gap-4">
                    <Button 
                      asChild 
                      size="lg" 
                      className="font-headline font-black bg-[#f6f4ee] text-slate-800 border-2 border-gold hover:bg-white hover:scale-105 transition-all shadow-xl rounded-xl"
                    >
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="font-headline font-black bg-[#f6f4ee]/10 text-white border-2 border-gold hover:border-gold hover:bg-white/10 transition-all rounded-xl"
                    >
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                </div>
            </div>
            
            <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right duration-1000">
                {hiringImage && (
                  <div className="relative group w-full max-w-[600px]">
                    <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-4 border-white/10 transition-transform duration-500 group-hover:scale-[1.03]">
                      <Image
                          src={hiringImage.imageUrl}
                          alt={hiringImage.description}
                          width={600}
                          height={750}
                          className="object-cover w-full aspect-[4/5]"
                          data-ai-hint={hiringImage.imageHint}
                      />
                    </div>
                    <div className="absolute -inset-10 bg-gold/10 blur-[100px] -z-10 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}