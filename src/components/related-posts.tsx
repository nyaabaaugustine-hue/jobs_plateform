import { DUMMY_BLOG_POSTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

type RelatedPostsProps = {
    currentPostId: string;
};

export default function RelatedPosts({ currentPostId }: RelatedPostsProps) {
    const relatedPosts = DUMMY_BLOG_POSTS
        .filter(post => post.id !== currentPostId)
        .slice(0, 3);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h4 className="font-semibold">Related Posts</h4>
            <div className="space-y-4">
                {relatedPosts.map(post => {
                    const postImage = PlaceHolderImages.find(img => img.id === post.image);
                    return (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="flex items-center gap-4 group">
                            {postImage && (
                                <Image
                                    src={postImage.imageUrl}
                                    alt={post.title}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover aspect-square"
                                />
                            )}
                            <div>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{post.title}</p>
                                <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
