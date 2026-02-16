'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DUMMY_BLOG_POSTS, DUMMY_USERS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function UserPostsPage() {
  const { toast } = useToast();
  // For demo, assuming current user is the first user in DUMMY_USERS
  const currentUser = DUMMY_USERS[0];
  const [posts, setPosts] = useState<BlogPost[]>(
    DUMMY_BLOG_POSTS.filter(post => post.author.id === currentUser.id)
  );

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    toast({
        title: "Post Deleted",
        description: "Your blog post has been deleted.",
        variant: 'destructive'
    });
  };

  const handleSubmitForReview = (title: string) => {
    toast({
        title: "Post Submitted",
        description: `"${title}" has been submitted for admin review.`,
        variant: 'vibrant'
    });
  };

  const getStatusBadgeClass = (status: BlogPost['status']) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Pending Review':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Draft':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">My Blog Posts</h1>
          <p className="text-muted-foreground">Create and manage your articles.</p>
        </div>
        <Button asChild className="bg-primary">
          <Link href="/dashboard/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const postImage = PlaceHolderImages.find((img) => img.id === post.image);
          return (
            <Card key={post.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {postImage && (
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={postImage.imageUrl}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full object-cover aspect-video rounded-t-lg"
                    data-ai-hint={postImage.imageHint}
                  />
                </Link>
              )}
              <CardHeader>
                  <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-xs pt-1">
                    Created on {format(new Date(post.date), 'MMMM dd, yyyy')}
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <Separator />
              <CardFooter className="p-4 flex justify-between items-center">
                  <Badge variant="outline" className={cn("font-medium", getStatusBadgeClass(post.status))}>{post.status}</Badge>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><Link href={`/blog/${post.slug}`}>View Post</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "Feature not implemented" })}>Edit Post</DropdownMenuItem>
                       {post.status === 'Draft' && <DropdownMenuItem onClick={() => handleSubmitForReview(post.title)}>Submit for Review</DropdownMenuItem>}
                       <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post.id)}>Delete Post</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </CardFooter>
            </Card>
          )})}
        </div>

        {posts.length === 0 && (
            <Card>
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">You haven't created any posts yet.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
