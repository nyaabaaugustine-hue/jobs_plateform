'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_COMPANIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './shared/section-header';

const adData = [
  {
    companyId: '1', // mPharma
    headline: 'Revolutionize Healthcare in Africa',
    description: "Join mPharma and build the future of medicine. We're hiring top tech talent to improve access to healthcare across the continent.",
    imageId: 'ad-mpharma',
  },
  {
    companyId: '2', // Hubtel
    headline: 'Powering the Digital Economy',
    description: 'At Hubtel, you will build the payment and messaging solutions used by millions. Ready to make a massive impact?',
    imageId: 'ad-hubtel',
  },
  {
    companyId: '3', // MTN Ghana
    headline: 'Connect Ghana to the World',
    description: 'Be part of the team building the largest network in Ghana. Explore exciting careers in telecommunications and digital services.',
    imageId: 'ad-mtn',
  },
  {
    companyId: '11', // Ashesi University
    headline: 'Shape the Next Generation of Leaders',
    description: 'Educating ethical, entrepreneurial leaders in Africa. Join our world-class faculty and staff and inspire young innovators.',
    imageId: 'ad-ashesi',
  },
  {
    companyId: '4', // GCB Bank
    headline: 'Innovating Banking for All Ghanaians',
    description: 'We are looking for bright minds in tech and finance to drive our digital transformation. Build the future of banking with GCB.',
    imageId: 'ad-gcb',
  },
];

const ads = adData.map(ad => {
    const company = DUMMY_COMPANIES.find(c => c.id === ad.companyId);
    const image = PlaceHolderImages.find(p => p.id === ad.imageId);
    return { ...ad, company, image };
});

export default function CompanyAds() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % ads.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const currentAd = ads[currentIndex];
  if (!currentAd || !currentAd.company || !currentAd.image) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Sponsored by Industry Leaders" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out">
            {ads.map((ad, index) => (
                ad.image && (
                    <Image
                        key={ad.companyId}
                        src={ad.image.imageUrl}
                        alt={ad.headline}
                        fill
                        className={cn(
                            'object-cover transition-opacity duration-1000',
                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        )}
                        data-ai-hint={ad.image.imageHint}
                    />
                )
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20" />
            <div className="relative z-30 p-8 md:p-12 flex flex-col justify-end min-h-[450px]">
                <div className="max-w-2xl text-white">
                    {currentAd.company.logo && (
                        <div className="bg-white/90 rounded-xl p-2 w-20 h-20 mb-4 flex items-center justify-center">
                            <Image
                                src={PlaceHolderImages.find(p => p.id === currentAd.company!.logo)!.imageUrl}
                                alt={`${currentAd.company.name} logo`}
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                    )}
                    <h3 className="font-headline text-3xl md:text-4xl font-bold !leading-tight">{currentAd.headline}</h3>
                    <p className="mt-2 text-lg text-gray-200">{currentAd.description}</p>
                    <Button asChild size="lg" className="mt-6 bg-accent-gradient font-semibold">
                        <Link href={`/companies/${currentAd.company.id}`}>
                            View Careers at {currentAd.company.name}
                            <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
