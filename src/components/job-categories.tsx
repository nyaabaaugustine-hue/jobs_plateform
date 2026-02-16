import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function JobCategories() {

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      <div className="relative z-20">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find the job that’s perfect for you. Over 800+ new jobs posted every day.
          </p>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {JOB_CATEGORIES.map((category, index) => (
                  <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${200 + index * 50}ms` }}>
                    <Link
                      href="#"
                      className="group rounded-xl border bg-card p-4 flex items-center gap-4 text-left transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg h-full"
                    >
                      <div className={cn('h-14 w-14 flex items-center justify-center rounded-lg shrink-0 p-2', category.iconBgColor)}>
                        {typeof category.icon === 'string' ? (
                            <Image src={category.icon} alt={category.name} width={40} height={40} className="object-contain" />
                        ) : (
                            <category.icon className={cn('h-7 w-7', category.color)} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary leading-tight">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{category.jobCount}</p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
