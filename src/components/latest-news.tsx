'use client';

import type { BlogPost } from '@/lib/types';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LatestNews({ posts }: { posts: BlogPost[] }) {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'latest-news-bg');

  return (
    <section className="relative py-20">
      {/* Background Image at 25% Opacity */}
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0 opacity-25"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/20 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Our News and Stories</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${200 + index * 100}ms` }}>
                <BlogPostCard post={post} />
              </div>
            ))}
        </div>
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
            <Button asChild size="lg" variant="outline">
                <Link href="/blog">
                    Show More
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
