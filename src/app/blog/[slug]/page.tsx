import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = DUMMY_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  const postImage = PlaceHolderImages.find((img) => img.id === post.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatar);

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
  
  post.content = fullContent;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8 text-center">
               <Badge>React</Badge>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">{post.title}</h1>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Avatar className="h-12 w-12">
                  {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </header>

            {postImage && (
              <Image
                src={postImage.imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full object-cover rounded-lg aspect-video mb-8"
                data-ai-hint={postImage.imageHint}
                priority
              />
            )}

            <div 
                className="prose prose-lg dark:prose-invert max-w-none mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
