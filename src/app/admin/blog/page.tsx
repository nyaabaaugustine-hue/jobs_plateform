'use client';

import { useState } from 'react';
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
import { MoreHorizontal, PlusCircle, Upload, Loader2, Check, X, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
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
import { useToast } from '@/hooks/use-toast';

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>(DUMMY_BLOG_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for new/edit post dialogs
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  // Create dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostExcerpt, setEditPostExcerpt] = useState('');
  const [editPostContent, setEditPostContent] = useState('');

  const handleImageUpload = () => {
      setIsUploading(true);
      setTimeout(() => {
          const randomImage = PlaceHolderImages.find(p => p.id === `blog-post-${Math.floor(Math.random() * 6) + 1}`);
          if(randomImage) {
              setUploadedImageUrl(randomImage.imageUrl);
          }
          setIsUploading(false);
      }, 1500);
  };

  const resetCreateForm = () => {
    setNewPostTitle('');
    setNewPostExcerpt('');
    setNewPostContent('');
    setUploadedImageUrl(null);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      excerpt: newPostExcerpt,
      content: newPostContent,
      slug: newPostTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      author: DUMMY_USERS[2], // Assume admin is user 3
      date: new Date().toISOString(),
      image: uploadedImageUrl ? (PlaceHolderImages.find(p => p.imageUrl === uploadedImageUrl)?.id || 'blog-post-1') : 'blog-post-1',
      status: 'Draft'
    };
    setPosts(prev => [newPost, ...prev]);
    toast({
      title: 'Draft Created',
      description: `The post "${newPost.title}" has been saved as a draft.`,
      variant: 'vibrant'
    });
    setIsCreateDialogOpen(false);
    resetCreateForm();
  };

  const handleOpenEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setEditPostTitle(post.title);
    setEditPostExcerpt(post.excerpt);
    setEditPostContent(post.content);
    const postImage = PlaceHolderImages.find(p => p.id === post.image);
    setUploadedImageUrl(postImage?.imageUrl || null);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const updatedPosts = posts.map(p => 
      p.id === editingPost.id 
      ? { 
          ...p, 
          title: editPostTitle,
          excerpt: editPostExcerpt,
          content: editPostContent,
          slug: editPostTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          image: uploadedImageUrl ? (PlaceHolderImages.find(img => img.imageUrl === uploadedImageUrl)?.id || p.image) : p.image
        }
      : p
    );
    setPosts(updatedPosts);
    toast({
      title: 'Post Updated',
      description: `The post "${editPostTitle}" has been successfully updated.`,
      variant: 'vibrant'
    });
    setIsEditDialogOpen(false);
    setEditingPost(null);
  };

  const handleStatusChange = (postId: string, newStatus: BlogPost['status']) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, status: newStatus } : p));
    toast({
      title: 'Post Updated',
      description: `The post has been set to "${newStatus}".`,
      variant: 'vibrant'
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
     toast({
      title: 'Post Deleted',
      variant: 'destructive'
    });
  }

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => statusFilter === 'all' || post.status.toLowerCase().replace(' ', '-') === statusFilter);

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
          <h1 className="font-headline text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage all blog posts on the platform.</p>
        </div>
        {/* Create Post Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
             <Button className="bg-accent-gradient" onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <form onSubmit={handleCreatePost}>
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
                  <Input id="title" placeholder="How to Ace Your Next Interview" value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" placeholder="A short summary of the post..." rows={3} value={newPostExcerpt} onChange={e => setNewPostExcerpt(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feature-image">Feature Image</Label>
                  <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                      {isUploading ? (
                          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                      ) : uploadedImageUrl ? (
                          <Image src={uploadedImageUrl} alt="Uploaded preview" width={100} height={60} className="rounded-md object-cover" />
                      ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                          {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Image selected. ' : 'Drag & drop or '}
                          {!uploadedImageUrl && !isUploading && (
                              <Button variant="link" className="p-0 h-auto" onClick={handleImageUpload} type="button">click to upload</Button>
                          )}
                          {uploadedImageUrl && !isUploading && (
                              <Button variant="link" className="p-0 h-auto text-destructive" onClick={() => setUploadedImageUrl(null)} type="button">Remove</Button>
                          )}
                      </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown supported)</Label>
                  <Textarea id="content" placeholder="Write your blog post here..." rows={10} value={newPostContent} onChange={e => setNewPostContent(e.target.value)} required />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-accent-gradient">Save Draft</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

       {/* Edit Post Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <form onSubmit={handleUpdatePost}>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Edit className="h-5 w-5 text-primary" />
                    </div>
                    <span>Edit Blog Post</span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Make changes to your post and save them.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Post Title</Label>
                  <Input id="edit-title" value={editPostTitle} onChange={e => setEditPostTitle(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea id="edit-excerpt" rows={3} value={editPostExcerpt} onChange={e => setEditPostExcerpt(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-feature-image">Feature Image</Label>
                  <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                      {isUploading ? (
                          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                      ) : uploadedImageUrl ? (
                          <Image src={uploadedImageUrl} alt="Uploaded preview" width={100} height={60} className="rounded-md object-cover" />
                      ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                          {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Image selected. ' : 'Drag & drop or '}
                          {!uploadedImageUrl && !isUploading && (
                              <Button variant="link" className="p-0 h-auto" onClick={handleImageUpload} type="button">click to upload</Button>
                          )}
                          {uploadedImageUrl && !isUploading && (
                              <Button variant="link" className="p-0 h-auto text-destructive" onClick={() => setUploadedImageUrl(null)} type="button">Remove</Button>
                          )}
                      </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-content">Content (Markdown supported)</Label>
                  <Textarea id="edit-content" rows={10} value={editPostContent} onChange={e => setEditPostContent(e.target.value)} required />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-accent-gradient">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

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
                        <SelectItem value="pending-review">Pending Review</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                      <DropdownMenuItem onClick={() => handleOpenEditDialog(post)}>Edit Post</DropdownMenuItem>
                       <DropdownMenuSeparator />
                       {post.status === 'Pending Review' && (
                        <>
                          <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'Published')} className="text-emerald-600 focus:bg-emerald-500/10 focus:text-emerald-700"><Check className="mr-2 h-4 w-4" /> Approve</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'Rejected')} className="text-destructive focus:bg-destructive/10 focus:text-destructive"><X className="mr-2 h-4 w-4" /> Reject</DropdownMenuItem>
                        </>
                       )}
                       {post.status === 'Published' && <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'Draft')}>Unpublish (Set to Draft)</DropdownMenuItem>}
                       {(post.status === 'Draft' || post.status === 'Rejected') && <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'Published')}>Publish</DropdownMenuItem>}
                       <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post.id)}>Delete Post</DropdownMenuItem>
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
