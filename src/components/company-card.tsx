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
    <Card className="group flex h-full flex-col overflow-hidden text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <CardHeader className="items-center p-6">
            {companyLogo && (
                <div className="relative h-20 w-20">
                    <Image
                        src={companyLogo.imageUrl}
                        alt={`${company.name} logo`}
                        fill
                        className="rounded-full object-cover border-4 border-secondary group-hover:border-primary/20 transition-colors"
                    />
                </div>
            )}
        </CardHeader>
        <CardContent className="flex-grow space-y-2 px-4 pb-4">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                <Link href={`/companies/${company.id}`}>
                    {company.name}
                </Link>
            </CardTitle>
            <CardDescription className="flex flex-col items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                    <Building className="h-4 w-4" /> {company.industry}
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {company.location}
                </div>
            </CardDescription>
             <div className="flex justify-center pt-2">
                <StarRating rating={company.rating ?? 0} />
            </div>
        </CardContent>
      <CardFooter className="flex-col gap-4 border-t bg-secondary/50 p-4">
        <Badge variant="secondary" className="font-semibold">
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
