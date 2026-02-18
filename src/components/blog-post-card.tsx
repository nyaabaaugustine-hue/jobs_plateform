import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ClientSideDate from './shared/client-side-date';
import { ArrowUpRight, Clock, User } from 'lucide-react';

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const postImage = PlaceHolderImages.find((img) => img.id === post.image);
  const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatar);

  return (
    <Card className="bg-[#151C2B] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group flex flex-col h-full rounded-2xl">
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-[16/10]">
          {postImage && (
              <Image
                  src={postImage.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={postImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151C2B] via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </Link>
      <CardContent className="p-6 flex flex-col flex-grow space-y-4">
        <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border border-primary/20">
                Innovation
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <Clock className="h-3 w-3" /> 12 min read
            </span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-headline text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-white/60 line-clamp-3 text-sm font-medium leading-relaxed flex-grow">
            {post.excerpt}
        </p>
        
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-white/10 ring-2 ring-primary/20">
                {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
                <AvatarFallback className="bg-secondary text-primary font-bold">{post.author.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-bold text-white">{post.author.name}</p>
                <ClientSideDate dateString={post.date} formatType="long" className="text-[10px] text-white/40 uppercase font-black tracking-tighter" />
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
                <User className="h-4 w-4 text-white/40 group-hover:text-white" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
