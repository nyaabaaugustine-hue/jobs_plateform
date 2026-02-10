import { DUMMY_BLOG_POSTS } from '@/lib/data';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LatestNews() {
  const latestPosts = DUMMY_BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">News and Blog</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get the latest news, updates, and tips.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/blog">
                    Show More
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
