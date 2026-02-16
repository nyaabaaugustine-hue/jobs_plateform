
'use client';

import type { BlogPost } from '@/lib/types';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';

export default function LatestNews({ posts }: { posts: BlogPost[] }) {

  return (
    <section className="relative py-16 md:py-24 bg-emerald-50 dark:bg-emerald-950/30">
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
