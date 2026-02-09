import Image from 'next/image';
import Link from 'next/link';
import { Building } from 'lucide-react';
import type { Company } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type CompanyCardProps = {
  company: Company;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);

  return (
    <Card className="flex h-full flex-col text-center">
      <CardHeader className="items-center">
        {companyLogo && (
          <Image
            src={companyLogo.imageUrl}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg">{company.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2 mt-2">
            <Building className="h-4 w-4" /> {company.industry}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            {company.activeJobs} Active Jobs
        </div>
        <Button asChild variant="link">
          <Link href={`/companies/${company.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
