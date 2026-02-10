import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
  return (
    <section className="py-8 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
            Browse by category
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            Find the job that’s perfect for you. about 800+ new jobs everyday.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
          {JOB_CATEGORIES.map((category) => (
            <Link
              href="#"
              key={category.name}
              className="group rounded-lg border bg-card p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={cn(
                  'mx-auto flex h-6 w-6 items-center justify-center rounded-md',
                  category.iconBgColor
                )}
              >
                <category.icon className={cn('h-3 w-3', category.color)} />
              </div>
              <h3 className="mt-1 font-semibold text-foreground group-hover:text-primary text-sm">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.jobCount} Jobs Available</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
