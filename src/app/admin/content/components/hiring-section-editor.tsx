
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Save, Image as ImageIcon, Loader2, CheckCircle, PlusCircle, Trash2 } from 'lucide-react';

const initialBenefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
];

export default function HiringSectionEditor() {
  const { toast } = useToast();
  
  const [title, setTitle] = useState('Hire Top-Tier React Talent in 48 Hours');
  const [subtitle, setSubtitle] = useState('Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.');
  const [benefits, setBenefits] = useState<string[]>(initialBenefits);
  const [image, setImage] = useState(PlaceHolderImages.find((p) => p.id === 'hiring-main'));
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };
  
  const addBenefit = () => {
    setBenefits([...benefits, 'New benefit']);
  }
  
  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Content Saved',
        description: 'The Hiring Section has been updated successfully.',
        variant: 'vibrant',
      });
    }, 1500);
  };
  
  const handleImageChange = () => {
    setIsUploading(true);
    setTimeout(() => {
        const otherImage = PlaceHolderImages.find(p => p.id === 'subscription-1');
        setImage(otherImage);
        setIsUploading(false);
        toast({ title: 'Image Updated', variant: 'vibrant' });
    }, 1500);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Hiring Section Editor</CardTitle>
          <CardDescription>Update the content for the "Hiring" section on the homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hiring-title">Title</Label>
            <Textarea id="hiring-title" value={title} onChange={(e) => setTitle(e.target.value)} rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hiring-subtitle">Subtitle</Label>
            <Textarea id="hiring-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={4} />
          </div>
          <div className="space-y-2">
            <Label>Benefits List</Label>
            <div className="space-y-2">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} />
                        <Button variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                            <Trash2 className="text-destructive h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button variant="outline" size="sm" onClick={addBenefit}><PlusCircle className="mr-2 h-4 w-4" /> Add Benefit</Button>
          </div>
          <div className="space-y-2">
            <Label>Section Image</Label>
            <div className="flex items-center gap-4">
                {image && <Image src={image.imageUrl} alt="Current hiring section image" width={120} height={70} className="rounded-md object-cover" />}
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
        <div className="mt-2 w-full rounded-lg border bg-secondary p-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col space-y-6">
                    <h2 className="font-headline text-3xl font-bold tracking-tight !leading-tight">{title}</h2>
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                    <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="relative flex items-center justify-center">
                    {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description || 'Hiring section preview'}
                        width={500}
                        height={600}
                        className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
                        data-ai-hint={image.imageHint}
                    />
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
