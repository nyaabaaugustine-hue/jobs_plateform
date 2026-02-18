
import { DUMMY_COMPANIES } from '@/lib/data';
import CompanyCard from '@/components/company-card';
import PageHero from '@/components/shared/page-hero';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CompaniesPage() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'blog-post-1');

  return (
    <>
      <PageHero
        title="Browse Companies"
        subtitle="Find your next opportunity by exploring the best companies."
      />
      <main className="relative flex-1 py-20">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={bgImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/90 z-10" />
        <div className="relative z-20 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DUMMY_COMPANIES.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
