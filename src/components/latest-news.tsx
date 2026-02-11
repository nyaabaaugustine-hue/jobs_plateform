import { DUMMY_BLOG_POSTS } from '@/lib/data';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LatestNews() {
  const latestPosts = DUMMY_BLOG_POSTS.slice(0, 3);
  const bgImage = PlaceHolderImages.find((p) => p.id === 'latest-news-bg');

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
          {latestPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
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
