import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find the job that’s perfect for you. Over 800+ new jobs posted every day.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {JOB_CATEGORIES.map((category) => (
            <Link
              href="#"
              key={category.name}
              className="group rounded-xl border bg-card p-3 text-center transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={cn(
                  'mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg',
                  category.iconBgColor
                )}
              >
                <category.icon className={cn('h-4 w-4', category.color)} />
              </div>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{category.jobCount} Jobs Available</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
