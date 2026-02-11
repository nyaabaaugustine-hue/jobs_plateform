'use client';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import BlogPostCard from '@/components/blog-post-card';
import PageHero from '@/components/shared/page-hero';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { BlogPost } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPage() {
  const { firestore } = useFirebase();

  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blogPosts'), 
      where('isPublished', '==', true), 
      orderBy('publishedDate', 'desc')
    );
  }, [firestore]);

  const { data: posts, isLoading } = useCollection<BlogPost>(postsQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Our News and Stories"
        subtitle="Explore articles, tips, and insights to help you grow your career and stay ahead."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
               Array.from({ length: 6 }).map((_, i) => (
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
              posts?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            )}
          </div>
           {!isLoading && posts?.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">No blog posts found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
