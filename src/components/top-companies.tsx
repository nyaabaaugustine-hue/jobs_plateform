import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { Company } from '@/lib/types';
import SectionHeader from './shared/section-header';

export default function TopCompanies({ companies }: { companies: Company[] }) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader 
          title="Trusted Companies" 
          subtitle="Direct partnerships with world-class engineering teams."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {companies.map((company) => {
            const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
            return (
              <Link key={company.id} href={`/companies/${company.id}`} className="block group">
                <Card className="h-full p-6 text-center border-none bg-secondary/50 hover:bg-secondary transition-all rounded-lg flex flex-col items-center justify-center">
                  {companyLogo && (
                    <div className="relative mb-4 h-16 w-16 grayscale group-hover:grayscale-0 transition-all">
                        <Image
                          src={companyLogo.imageUrl}
                          alt={`${company.name} logo`}
                          fill
                          className="object-contain"
                        />
                    </div>
                  )}
                  <h3 className="font-bold text-base text-foreground mb-1">{company.name}</h3>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{company.location}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}