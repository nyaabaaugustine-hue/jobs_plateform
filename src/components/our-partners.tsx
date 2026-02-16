import { DUMMY_COMPANIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './shared/section-header';

export default function OurPartners() {
  const partners = DUMMY_COMPANIES.slice(0, 12); // Use first 12 companies as partners
  const firstRow = partners.slice(0, 6);
  const secondRow = partners.slice(6, 12);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Trusted By The Best"
          subtitle="We are proud to partner with leading companies and organizations to connect talent with opportunity."
        />
        <div className="relative mt-12 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-card/50 p-6 shadow-inner">
          <div className="pointer-events-none absolute -top-1 z-10 h-full w-full bg-gradient-to-b from-secondary via-transparent to-secondary" />
          <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-secondary to-transparent" />

          <div className="space-y-8">
            <div className="animate-marquee-rtl flex min-w-full shrink-0 items-center justify-around gap-16">
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
                                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-110"
                            />
                        )}
                    </Link>
                )
              })}
            </div>
            <div className="animate-marquee-ltr flex min-w-full shrink-0 items-center justify-around gap-16">
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
                                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-110"
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
