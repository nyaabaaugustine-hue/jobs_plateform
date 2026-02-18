import Image from 'next/image';
import Link from 'next/link';
import { Building, MapPin, Briefcase } from 'lucide-react';
import type { Company } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from './shared/star-rating';
import { Badge } from './ui/badge';

type CompanyCardProps = {
  company: Company;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg">
        <CardHeader className="flex-row items-center gap-4 p-6">
            {companyLogo && (
                <div className="relative h-16 w-16 shrink-0 rounded-lg border p-1 bg-white">
                    <Image
                        src={companyLogo.imageUrl}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                        sizes="4rem"
                    />
                </div>
            )}
            <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-primary transition-colors mb-1">
                    <Link href={`/companies/${company.id}`}>
                        {company.name}
                    </Link>
                </CardTitle>
                 <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Building className="h-4 w-4" /> {company.industry}
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 px-6 pb-4">
             <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {company.location}
            </div>
            <div className="flex justify-start">
                <StarRating rating={company.rating ?? 0} />
            </div>
        </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t bg-secondary/50 p-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-semibold w-full justify-center">
           <Briefcase className="mr-2 h-4 w-4 text-primary" /> {company.activeJobs} Open Positions
        </Badge>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/companies/${company.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
