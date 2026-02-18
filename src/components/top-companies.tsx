
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import StarRating from './shared/star-rating';
import { MapPin, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Company } from '@/lib/types';

export default function TopCompanies({ companies }: { companies: Company[] }) {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'top-companies-bg');

  return (
    <section className="relative py-20">
       {/* Background Image at 25% Opacity */}
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

      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Top Companies Hiring</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {companies.map((company, index) => {
            const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
            return (
              <Link key={company.id} href={`/companies/${company.id}`} className="block group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${'200' + index * 50}ms` }}>
                <Card className="h-full p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/70 backdrop-blur-sm flex flex-col items-center justify-center">
                  {companyLogo && (
                    <div className="relative mb-4 h-20 w-20 rounded-full shadow-inner border overflow-hidden bg-white">
                        <Image
                          src={companyLogo.imageUrl}
                          alt={`${company.name} logo`}
                          fill
                          className="object-cover scale-110"
                          sizes="5rem"
                        />
                    </div>
                  )}
                  <h3 className="font-semibold text-base leading-tight truncate transition-colors group-hover:text-primary">{company.name}</h3>
                  <div className="flex justify-center mt-1">
                    <StarRating rating={company.rating ?? 0} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1 truncate">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{company.location}</span>
                  </div>
                   <Badge variant="outline" className="mt-3 bg-primary/10 border-primary/20 text-primary font-semibold flex items-center gap-1.5">
                     <Briefcase className="h-3 w-3"/>
                     {company.activeJobs} Openings
                   </Badge>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
