
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, Building } from 'lucide-react';

type Location = {
    name: string;
    jobs: number;
    companies: number;
    imageId: string;
};

export default function JobsByLocation({ locations }: { locations: Location[] }) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Jobs by Location</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => {
            const locationImage = PlaceHolderImages.find((img) => img.id === location.imageId);
            return (
              <Link key={location.name} href="#" className="block group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${200 + index * 75}ms` }}>
                <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card">
                  {locationImage && (
                    <Image
                      src={locationImage.imageUrl}
                      alt={location.name}
                      width={600}
                      height={400}
                      className="w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={locationImage.imageHint}
                    />
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{location.name}</h3>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                       <span className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" /> {location.jobs} Jobs
                       </span>
                        <span className="flex items-center gap-2">
                            <Building className="h-4 w-4" /> {location.companies} Companies
                        </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
