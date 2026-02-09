import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import BlogPostCard from '@/components/blog-post-card';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">From the Blog</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Insights and advice for your career and hiring journey.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DUMMY_BLOG_POSTS.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
