import { DUMMY_COMPANIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './shared/section-header';

export default function OurPartners() {
  const partners = DUMMY_COMPANIES.slice(0, 12); // Use first 12 companies as partners

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Trusted By The Best"
          subtitle="We are proud to partner with leading companies and organizations to connect talent with opportunity."
        />
        <div className="relative mt-12 flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <div className="w-full max-w-screen-lg">
            <div className="relative w-full overflow-hidden">
                <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-secondary to-transparent" />
                <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-secondary to-transparent" />
                <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-secondary to-transparent" />
                <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-secondary to-transparent" />

                <div className="animate-marquee-rtl flex min-w-full shrink-0 items-center justify-around gap-12">
                  {[...partners, ...partners].map((company, index) => {
                    const logo = PlaceHolderImages.find((p) => p.id === company.logo);
                    return (
                        <Link key={`${company.id}-${index}`} href={`/companies/${company.id}`} className="flex-shrink-0" aria-label={company.name}>
                            {logo && (
                                <Image
                                    src={logo.imageUrl}
                                    alt={`${company.name} logo`}
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-110"
                                />
                            )}
                        </Link>
                    )
                  })}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
