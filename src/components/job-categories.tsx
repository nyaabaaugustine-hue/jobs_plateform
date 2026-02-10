import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
  return (
    <section className="py-3 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Browse by category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find the job that’s perfect for you. about 800+ new jobs everyday.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {JOB_CATEGORIES.map((category) => (
            <Link
              href="#"
              key={category.name}
              className="group rounded-xl border bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={cn(
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-lg',
                  category.iconBgColor
                )}
              >
                <category.icon className={cn('h-4 w-4', category.color)} />
              </div>
              <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary">{category.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{category.jobCount} Jobs Available</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
