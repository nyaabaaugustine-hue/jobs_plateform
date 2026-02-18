"use client"

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { Company } from '@/lib/types';
import SectionHeader from './shared/section-header';
import StarRating from './shared/star-rating';
import { Badge } from './ui/badge';

export default function TopCompanies({ companies }: { companies: Company[] }) {
  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader 
          title="Top Companies Hiring" 
          subtitle="Direct partnerships with world-class engineering teams."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {companies.map((company) => {
            const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
            return (
              <Link key={company.id} href={`/companies/${company.id}`} className="block group">
                <Card className="h-full p-6 text-center border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-secondary/50 transition-all rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-lg">
                  {companyLogo && (
                    <div className="relative mb-4 h-16 w-16">
                        <Image
                          src={companyLogo.imageUrl}
                          alt={`${company.name} logo`}
                          fill
                          className="object-contain"
                        />
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{company.name}</h3>
                  <div className="mb-2">
                    <StarRating rating={company.rating || 5} />
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{company.location}</span>
                  </div>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20 text-[10px] font-black uppercase tracking-wider">
                      {company.activeJobs || 0} Openings
                    </Badge>
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