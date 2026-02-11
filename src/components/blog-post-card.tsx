import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // We'll use a placeholder for author avatar for now
  const authorAvatar = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col">
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          {post.imageUrl && (
              <div className="relative">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={post.imageHint}
                />
              </div>
          )}
        </Link>
      <CardContent className="p-6 flex flex-col flex-grow bg-card">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-headline text-lg font-bold hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 text-sm mt-2 flex-grow">{post.excerpt}</p>
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <p className="text-xs text-muted-foreground">12 min read</p>
           <div className="flex items-center gap-3 text-right">
             <div>
                <p className="font-semibold text-xs">{post.authorName}</p>
                <p className="text-xs text-muted-foreground">{format(new Date(post.publishedDate), "MMMM dd, yyyy")}</p>
              </div>
              <Avatar className="h-8 w-8">
                {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.authorName} />}
                <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
