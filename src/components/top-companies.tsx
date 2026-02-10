import { DUMMY_COMPANIES } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import StarRating from './shared/star-rating';
import { MapPin } from 'lucide-react';

export default function TopCompanies() {
  const topCompanies = DUMMY_COMPANIES.slice(0, 10);
  const bgImage = PlaceHolderImages.find((img) => img.id === 'top-companies-bg');

  return (
    <section className="relative py-16 md:py-24">
      {bgImage && (
        <>
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </>
      )}
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">Top Companies Hiring</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
            Discover your next career step: freelancing or training
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {topCompanies.map((company) => {
            const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
            return (
              <Link key={company.id} href={`/companies/${company.id}`} className="block group">
                <Card className="h-full p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-background/80 backdrop-blur-sm">
                  {companyLogo && (
                    <div className="flex justify-center mb-3">
                        <Image
                          src={companyLogo.imageUrl}
                          alt={`${company.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                    </div>
                  )}
                  <h3 className="font-semibold text-base leading-tight truncate transition-colors group-hover:text-primary">{company.name}</h3>
                  <div className="flex justify-center mt-1">
                    <StarRating rating={company.rating} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1 truncate">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{company.location}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {company.activeJobs > 0 ? `${company.activeJobs} Opening Job${company.activeJobs !== 1 ? 's' : ''}` : 'No opening job'}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
