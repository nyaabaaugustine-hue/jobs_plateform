import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
  return (
    <section className="bg-secondary/50 py-4 md:py-6">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Browse by category
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-base text-muted-foreground">
            Find the job that’s perfect for you. about 800+ new jobs everyday.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {JOB_CATEGORIES.map((category) => (
            <Link
              href="#"
              key={category.name}
              className="group rounded-lg border bg-card p-1 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary"
            >
              <div
                className={cn(
                  'mx-auto flex h-5 w-5 items-center justify-center rounded-sm',
                  category.iconBgColor
                )}
              >
                <category.icon className={cn('h-2.5 w-2.5', category.color)} />
              </div>
              <h3 className="mt-1 font-semibold text-foreground group-hover:text-primary text-xs">{category.name}</h3>
              <p className="text-[10px] text-muted-foreground mt-0">{category.jobCount} Jobs Available</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
