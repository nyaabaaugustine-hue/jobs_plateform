import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const postImage = PlaceHolderImages.find((img) => img.id === post.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatar);

  return (
    <Card className="overflow-hidden">
        <Link href={`/blog/${post.slug}`}>
          {postImage && (
              <Image
                src={postImage.imageUrl}
                alt={post.title}
                width={600}
                height={400}
                className="w-full object-cover aspect-[3/2]"
                data-ai-hint={postImage.imageHint}
              />
          )}
        </Link>
      <CardHeader>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-headline text-xl font-bold hover:text-primary transition-colors">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
