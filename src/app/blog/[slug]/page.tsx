
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
import ClientSideDate from '@/components/shared/client-side-date';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const postData = DUMMY_BLOG_POSTS.find((p) => p.slug === slug);

  if (!postData) {
    notFound();
  }
  
  const postImage = PlaceHolderImages.find((img) => img.id === postData.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === postData.author.avatar);

  const post = postData;
  
  const tags = ['React', 'Web Development', 'Career', 'Interview Tips'];

  return (
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
                    sizes="100vw"
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
                                <span>Published on <ClientSideDate dateString={post.date} formatType="long" /></span>
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
                        <SocialShareButtons title={post.title} description={post.excerpt} />
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
  );
}
