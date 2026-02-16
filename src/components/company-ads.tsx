
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_COMPANIES } from '@/lib/data';
import { ArrowRight, ServerCrash } from 'lucide-react';
import SectionHeader from './shared/section-header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

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

// Process ad data at the module level to filter out any invalid entries upfront.
const validAds = adData.map(ad => {
    const company = DUMMY_COMPANIES.find(c => c.id === ad.companyId);
    const image = PlaceHolderImages.find(p => p.id === ad.imageId);
    if (!company || !image) {
        console.warn(`Ad data for companyId ${ad.companyId} or imageId ${ad.imageId} is incomplete.`);
        return null;
    }
    return { ...ad, company, image };
}).filter(ad => ad !== null);


export default function CompanyAds() {
  const plugin = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // This is the "error test": If no valid ads can be constructed, show an error message.
  if (validAds.length === 0) {
    return (
        <section className="py-16 md:py-24 bg-secondary">
             <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                <SectionHeader title="Sponsored by Industry Leaders" />
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <ServerCrash /> Ad Slider Error
                        </CardTitle>
                        <CardDescription>
                            The ad slider could not be loaded. This is a test to check for data consistency errors. It indicates that the data required for the advertisements is missing or incorrect.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Sponsored by Industry Leaders" />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="relative"
        >
          <CarouselContent>
            {validAds.map((ad, index) => {
              if (!ad) return null; // Should not happen due to pre-filtering, but as a safeguard.
              return (
                <CarouselItem key={index}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/40">
                    <Image
                      src={ad.image.imageUrl}
                      alt={ad.headline}
                      fill
                      className={'object-cover'}
                      data-ai-hint={ad.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20" />
                    <div className="relative z-30 p-8 md:p-12 flex flex-col justify-end min-h-[450px]">
                      <div className="max-w-2xl">
                        {ad.company.logo && (
                          <div className="bg-white/90 rounded-xl p-2 w-20 h-20 mb-4 flex items-center justify-center">
                            <Image
                              src={PlaceHolderImages.find(p => p.id === ad.company!.logo)!.imageUrl}
                              alt={`${ad.company.name} logo`}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <h3 className="font-headline text-3xl md:text-4xl font-bold !leading-tight text-gray-100">{ad.headline}</h3>
                        <p className="mt-2 text-lg text-gray-300">{ad.description}</p>
                        <Button asChild size="lg" className="mt-6">
                          <Link href={`/companies/${ad.company.id}`}>
                            View Careers at {ad.company.name}
                            <ArrowRight className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-40 text-white bg-black/30 hover:bg-black/50" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-40 text-white bg-black/30 hover:bg-black/50" />
        </Carousel>
      </div>
    </section>
  );
}
