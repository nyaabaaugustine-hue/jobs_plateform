'use client';

import type { BlogPost } from '@/lib/types';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';

export default function LatestNews({ posts }: { posts: BlogPost[] }) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="relative py-16 bg-[#0B0F17]">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-[48px] font-black text-white leading-tight">Our News and Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <BlogPostCard post={post} />
              </div>
            ))}
        </div>
        
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/5 transition-all px-12 h-14 font-bold">
                <Link href="/blog">
                    View More Articles
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
