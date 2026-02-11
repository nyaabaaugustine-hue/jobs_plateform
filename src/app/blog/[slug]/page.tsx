import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock } from 'lucide-react';
import RelatedPosts from '@/components/related-posts';
import SocialShareButtons from '@/components/shared/social-share-buttons';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const postData = DUMMY_BLOG_POSTS.find((p) => p.slug === slug);

  if (!postData) {
    notFound();
  }
  
  const postImage = PlaceHolderImages.find((img) => img.id === postData.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === postData.author.avatar);

  const fullContent = `
    <p>Finding the right developer job or the perfect candidate can feel like searching for a needle in a haystack. The tech industry is booming, but with so many opportunities and applicants, it's easy to get lost. That's where JobBox comes in. We're dedicated to simplifying the job search and hiring process for the React ecosystem.</p>
    <h3 class="font-headline text-xl font-bold mt-6 mb-2">Why We Built This Platform</h3>
    <p>Our mission is to create a centralized hub for React developers and employers. We noticed a gap in the market for a job board that is exclusively focused on React and its ecosystem (Next.js, React Native, etc.). By focusing on this niche, we can provide a higher quality experience for both sides of the marketplace.</p>
    <ul class="list-disc list-inside space-y-2 my-4">
        <li>For developers: A curated list of high-quality React jobs, reducing noise.</li>
        <li>For employers: Access to a pool of talented, specialized React developers.</li>
    </ul>
    <h3 class="font-headline text-xl font-bold mt-6 mb-2">Key Features</h3>
    <p>We've packed the platform with features to make your experience as smooth as possible:</p>
    <blockquote class="border-l-4 border-primary pl-4 italic my-4">
    "JobBox is more than just a job board; it's a community for React professionals to connect and grow."
    </blockquote>
    <p>From advanced job filtering to AI-powered recommendations and a seamless application process, we have thought of everything. Employers can benefit from our applicant tracking system and AI-based candidate matching to find the best fit for their team quickly.</p>
    <p>Thank you for joining us on this journey. We are excited to see the connections you will make and the amazing products you will build.</p>
  `;
  
  // Create a new post object for rendering, safely combining original data with new content.
  const post = { 
    ...postData, 
    content: fullContent 
  };
  
  const tags = ['React', 'Web Development', 'Career', 'Interview Tips'];

  return (
    <div className="flex min-h-screen flex-col bg-background bg-hero-glow">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
           <header className="mb-8 text-center">
              <div className="flex justify-center gap-2 mb-4">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                ))}
              </div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">{post.title}</h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{post.excerpt}</p>
            </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <article className="lg:col-span-2">
                {postImage && (
                <Image
                    src={postImage.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full object-cover rounded-lg aspect-video mb-8 shadow-lg"
                    data-ai-hint={postImage.imageHint}
                    priority
                />
                )}
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mx-auto"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <aside className="lg:sticky lg:top-24 self-start space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                            {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
                            <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-lg">{post.author.name}</p>
                                <p className="text-sm text-muted-foreground">{post.author.role}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4"/>
                                <span>Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>12 min read</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-6">
                        <SocialShareButtons title={post.title} />
                    </CardContent>
                </Card>
                <Card>
                     <CardContent className="p-6">
                        <RelatedPosts currentPostId={post.id} />
                    </CardContent>
                </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}