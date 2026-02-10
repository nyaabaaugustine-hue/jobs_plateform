import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const postImage = PlaceHolderImages.find((img) => img.id === post.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatar);

  // Simplified mapping for tags
  const getTag = (id: string) => {
    if (id === '1' || id === '3') return "Career Tips";
    if (id === '2' || id === '5') return "Tech Trends";
    return "Interview Prep";
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          {postImage && (
              <div className="relative">
                <Image
                    src={postImage.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={postImage.imageHint}
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                 <div className="absolute top-4 left-4">
                    <Badge>{getTag(post.id)}</Badge>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">Read More</span>
                </div>
              </div>
          )}
        </Link>
      <CardHeader>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-headline text-xl font-bold hover:text-primary transition-colors">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">12 min read</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
