
import { DUMMY_COMPANIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './shared/section-header';

export default function OurPartners() {
  const partners = DUMMY_COMPANIES.slice(0, 12); 
  const firstRow = partners.slice(0, 6);
  const secondRow = partners.slice(6, 12);
  const bgImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

  return (
    <section className="relative py-16 md:py-24">
       {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0 opacity-25"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/95 z-10" />
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
        <SectionHeader
          title="Trusted By The Best"
        />
        <div className="relative mt-12 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-card/30 p-6 shadow-inner">
          <div className="space-y-4">
            <div className="animate-marquee-rtl flex min-w-full shrink-0 items-center justify-around gap-8">
              {[...firstRow, ...firstRow].map((company, index) => {
                const logo = PlaceHolderImages.find((p) => p.id === company.logo);
                return (
                    <Link key={`${company.id}-1-${index}`} href={`/companies/${company.id}`} className="flex-shrink-0" aria-label={company.name}>
                        {logo && (
                            <Image
                                src={logo.imageUrl}
                                alt={`${company.name} logo`}
                                width={160}
                                height={56}
                                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-110 rounded-lg"
                            />
                        )}
                    </Link>
                )
              })}
            </div>
            <div className="animate-marquee-ltr flex min-w-full shrink-0 items-center justify-around gap-8">
              {[...secondRow, ...secondRow].map((company, index) => {
                const logo = PlaceHolderImages.find((p) => p.id === company.logo);
                return (
                    <Link key={`${company.id}-2-${index}`} href={`/companies/${company.id}`} className="flex-shrink-0" aria-label={company.name}>
                        {logo && (
                            <Image
                                src={logo.imageUrl}
                                alt={`${company.name} logo`}
                                width={160}
                                height={56}
                                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-110 rounded-lg"
                            />
                        )}
                    </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
