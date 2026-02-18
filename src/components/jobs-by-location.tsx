
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
  const bgTexture = PlaceHolderImages.find((p) => p.id === 'location-accra');

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {bgTexture && (
        <Image
          src={bgTexture.imageUrl}
          alt=""
          fill
          className="object-cover opacity-25 z-0"
          data-ai-hint={bgTexture.imageHint}
        />
      )}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-[48px] font-black text-foreground leading-tight">Jobs by Location</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => {
            const locationImage = PlaceHolderImages.find((img) => img.id === location.imageId);
            return (
              <Link key={location.name} href="#" className="block group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 75}ms` }}>
                <Card className="overflow-hidden transition-all duration-300 border-none bg-card/90 backdrop-blur-sm rounded-2xl shadow-xl">
                  {locationImage && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                        src={locationImage.imageUrl}
                        alt={location.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={locationImage.imageHint}
                        />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{location.name}</h3>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mt-3">
                       <span className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" /> {location.jobs} Jobs
                       </span>
                        <span className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-primary" /> {location.companies} Companies
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
