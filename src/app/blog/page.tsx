import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import BlogPostCard from '@/components/blog-post-card';
import PageHero from '@/components/shared/page-hero';

export default function BlogPage() {
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
