'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

export default function HeroEditor() {
  const { toast } = useToast();
  
  // Initial state from the homepage
  const [title, setTitle] = useState('Find Your Next Job, <span className="text-primary">Faster.</span>');
  const [subtitle, setSubtitle] = useState('Discover your next career move with verified employers and salary transparency.');
  const [heroImage, setHeroImage] = useState(PlaceHolderImages.find((p) => p.id === 'hero-main'));
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Content Saved',
        description: 'The Hero Section has been updated successfully.',
        variant: 'vibrant',
      });
    }, 1500);
  };
  
  const handleImageChange = () => {
    setIsUploading(true);
    setTimeout(() => {
        // Simulate changing to another image
        const otherImage = PlaceHolderImages.find(p => p.id === 'find-job-1');
        setHeroImage(otherImage);
        setIsUploading(false);
        toast({ title: 'Image Updated', variant: 'vibrant' });
    }, 1500);
  }

  // Sanitize the title for live preview to prevent XSS while allowing styling spans
  const sanitizedTitle = DOMPurify.sanitize(title.replace(/class="text-primary"/g, 'style="color:hsl(var(--primary))"'), {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['style']
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Editor</CardTitle>
          <CardDescription>Update the title, subtitle, and background image for the main hero section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Title</Label>
            <Textarea id="hero-title" value={title} onChange={(e) => setTitle(e.target.value)} rows={2} />
            <p className="text-xs text-muted-foreground">Tip: Use `&lt;span className="text-primary"&gt;Your Text&lt;/span&gt;` to apply primary color.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Textarea id="hero-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <div className="flex items-center gap-4">
                {heroImage && <Image src={heroImage.imageUrl} alt="Current hero image" width={120} height={70} className="rounded-md object-cover" />}
                <Button variant="outline" onClick={handleImageChange} disabled={isUploading} className="flex-1">
                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <ImageIcon className="mr-2 h-4 w-4" />}
                    {isUploading ? 'Changing...' : 'Change Image'}
                </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      
      {/* Preview Section */}
      <div>
        <Label className="text-muted-foreground">Live Preview</Label>
        <div className="mt-2 relative w-full aspect-[16/10] rounded-lg overflow-hidden border">
           {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Hero Preview"
              fill
              className="object-cover z-0"
            />
          )}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 flex flex-col h-full items-center justify-center text-center p-4">
            <h1 className="text-4xl font-extrabold text-white !leading-tight font-headline" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
            <p className="max-w-md mx-auto text-lg text-gray-200 mt-4">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
