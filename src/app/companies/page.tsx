import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_COMPANIES } from '@/lib/data';
import CompanyCard from '@/components/company-card';

export default function CompaniesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-hero-glow">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Browse Companies</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Find your next opportunity by exploring the best companies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DUMMY_COMPANIES.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
