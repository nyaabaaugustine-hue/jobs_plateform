'use client';

import { useState } from 'react';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
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
import { MoreHorizontal, PlusCircle, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DUMMY_BLOG_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => statusFilter === 'all' || post.status.toLowerCase() === statusFilter);

  const getStatusBadgeClass = (status: 'Published' | 'Draft') => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Draft':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage all blog posts on the platform.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
             <Button className="bg-accent-gradient">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                 <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span>Create New Blog Post</span>
                </div>
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new draft.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input id="title" placeholder="How to Ace Your Next Interview" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" placeholder="A short summary of the post..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature-image">Feature Image</Label>
                <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                    <Button variant="link" className="p-0 h-auto">click to upload</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="e.g., React, Career, Interview (comma-separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your blog post here..." rows={10} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-accent-gradient">Save Draft</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by title or author..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex gap-4">
                 <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
      </Card>
      
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
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
                    by {post.author.name} on {format(new Date(post.date), 'MMMM dd, yyyy')}
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
                      <DropdownMenuItem>Edit Post</DropdownMenuItem>
                       {post.status === 'Published' ? (
                        <DropdownMenuItem>Unpublish</DropdownMenuItem>
                       ) : (
                        <DropdownMenuItem>Publish</DropdownMenuItem>
                       )}
                       <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </CardFooter>
            </Card>
          )})}
        </div>

        {filteredPosts.length === 0 && (
            <Card>
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">No posts found.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
