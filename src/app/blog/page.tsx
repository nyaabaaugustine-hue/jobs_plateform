'use client';

import { useState } from 'react';
import BlogPostCard from '@/components/blog-post-card';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import ClientSideDate from '@/components/shared/client-side-date';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Career', 'Engineering', 'Innovation', 'Leadership'];
  
  const posts: BlogPost[] = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published');
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const filteredPosts = otherPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.title.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredImage = PlaceHolderImages.find(img => img.id === featuredPost.image);
  const authorAvatar = PlaceHolderImages.find(img => img.id === featuredPost.author.avatar);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Insights for the Modern Professional"
        subtitle="Exploring the frontiers of engineering, innovation, and career growth in the React ecosystem."
      />

      {/* Innovation Bar */}
      <div className="bg-secondary/30 border-y border-border/50 py-4">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm font-black font-headline uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2 text-gold"><TrendingUp className="h-4 w-4" /> Trending Topics:</span>
                <span className="hover:text-foreground cursor-pointer transition-colors">Server Components</span>
                <span className="hover:text-foreground cursor-pointer transition-colors">AI Agents</span>
                <span className="hover:text-foreground cursor-pointer transition-colors">Career Pivot</span>
            </div>
            <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search articles..." 
                    className="pl-9 bg-background/50 border-white/10 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </div>

      <main className="flex-1 py-20">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          
          {/* Featured Post - Innovative Design */}
          {featuredPost && (
            <section className="mb-20">
                <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#151C2B] border border-white/5 shadow-2xl transition-all duration-500 hover:border-gold/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                            {featuredImage && (
                                <Image 
                                    src={featuredImage.imageUrl} 
                                    alt={featuredPost.title} 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute top-8 left-8">
                                <span className="bg-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2 shadow-xl">
                                    <Sparkles className="h-3 w-3" /> Featured Post
                                </span>
                            </div>
                        </div>
                        <div className="p-10 lg:p-16 flex flex-col justify-center space-y-6">
                            <h2 className="text-3xl lg:text-5xl font-black font-headline text-white !leading-tight tracking-tight hover:text-gold transition-colors">
                                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                            </h2>
                            <p className="text-white/70 font-medium leading-relaxed">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <Avatar className="h-12 w-12 border-2 border-gold/30">
                                    {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} />}
                                    <AvatarFallback>{featuredPost.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-white font-bold text-sm">{featuredPost.author.name}</p>
                                    <ClientSideDate dateString={featuredPost.date} formatType="long" className="text-xs text-white/50" />
                                </div>
                                <div className="ml-auto">
                                    <Button asChild variant="outline" className="rounded-xl border-white/10 hover:bg-white/5 text-white font-bold px-8">
                                        <Link href={`/blog/${featuredPost.slug}`}>Read Article</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          )}

          {/* Categories & Grid */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-border/50 pb-8">
                <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-6 py-2 rounded-xl text-sm font-bold transition-all border",
                                selectedCategory === cat
                                    ? "bg-gold text-black border-gold shadow-xl scale-105"
                                    : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border/50">
                    <Lightbulb className="h-3 w-3 text-gold" /> {filteredPosts.length + (selectedCategory === 'All' ? 1 : 0)} Innovation Insights
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                    <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                        <BlogPostCard post={post} />
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && selectedCategory !== 'All' && (
                <div className="text-center py-20 bg-secondary/20 rounded-[2rem] border border-dashed border-border/50">
                    <p className="text-muted-foreground font-bold font-headline text-xl">No articles found in this category.</p>
                    <Button variant="link" onClick={() => setSelectedCategory('All')} className="mt-2 text-gold">View all insights</Button>
                </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
