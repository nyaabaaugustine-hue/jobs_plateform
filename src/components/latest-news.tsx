'use client';

import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import type { BlogPost } from '@/lib/types';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';

export default function LatestNews() {
  const { firestore } = useFirebase();
  const bgImage = PlaceHolderImages.find((p) => p.id === 'latest-news-bg');

  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blogPosts'), 
      where('isPublished', '==', true), 
      orderBy('publishedDate', 'desc'), 
      limit(3)
    );
  }, [firestore]);

  const { data: latestPosts, isLoading } = useCollection<BlogPost>(postsQuery);

  return (
    <section className="relative py-16 md:py-24">
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
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">Our News and Stories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
            Explore articles, tips, and insights to help you grow your career and stay ahead.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full aspect-[3/2]" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                   <div className="mt-4 pt-4 border-t flex items-center justify-between">
                     <Skeleton className="h-4 w-16" />
                     <Skeleton className="h-10 w-10 rounded-full" />
                   </div>
                </CardContent>
              </Card>
            ))
          ) : (
            latestPosts?.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          )}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="secondary">
                <Link href="/blog">
                    Show More
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
