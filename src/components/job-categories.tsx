
'use client';

import { JOB_CATEGORIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function JobCategories() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {bgImage && (
        <>
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </>
      )}
      <div className="relative z-20">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-headline">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
            Find the job that’s perfect for you. Over 800+ new jobs posted every day.
          </p>
        </div>
        
        <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black/80 to-transparent" />

          <div className="flex animate-marquee-ltr whitespace-nowrap py-4">
            {[...JOB_CATEGORIES, ...JOB_CATEGORIES].map((category, index) => (
              <div key={index} className="flex-shrink-0 mx-3" style={{ width: '300px' }}>
                <Link
                  href="#"
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/10 hover:border-primary hover:-translate-y-1 hover:shadow-lg h-full"
                >
                  <div className={cn('h-14 w-14 flex items-center justify-center rounded-lg shrink-0 p-2', category.iconBgColor)}>
                    {typeof category.icon === 'string' ? (
                        <Image src={category.icon} alt={category.name} width={40} height={40} className="object-contain" />
                    ) : (
                        <category.icon className={cn('h-7 w-7', category.color)} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-300">{category.jobCount}</p>
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
