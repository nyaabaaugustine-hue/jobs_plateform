
import BlogPostCard from '@/components/blog-post-card';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';

export default function BlogPage() {
  const posts: BlogPost[] = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published');

  return (
    <>
      <PageHero
        title="Our News and Stories"
        subtitle=""
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
           {posts?.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">No blog posts found.</p>
          )}
        </div>
      </main>
    </>
  );
}
