'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save, Loader2 } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useToast } from '@/hooks/use-toast';


export default function CompanyProfilePage() {
    const { toast } = useToast();
    const [logoUrl, setLogoUrl] = useState(PlaceHolderImages.find((img) => img.id === 'company-logo-1')?.imageUrl);
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const currentLogoIndex = PlaceHolderImages.findIndex(p => p.imageUrl === logoUrl && p.id.startsWith('company-logo-'));
            const nextLogoIndex = (currentLogoIndex + 1) % 24; // Assuming 24 company logos
            const nextLogo = PlaceHolderImages.find(p => p.id === `company-logo-${nextLogoIndex + 1}`);
            if (nextLogo) {
                setLogoUrl(nextLogo.imageUrl);
            }
            setIsUploading(false);
            toast({
                title: "Logo Updated",
                description: "Your new company logo has been uploaded.",
                variant: 'vibrant'
            });
        }, 1500);
    };

    const handleSaveChanges = () => {
      toast({
        title: "Changes Saved",
        description: "Your company profile has been updated.",
        variant: "vibrant",
      });
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground">Keep your company profile updated to attract top talent.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>This information will be visible on your company page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Innovate Inc." />
              </div>
               <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" defaultValue="https://innovateinc.com" />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="company-description">About Your Company</Label>
                    <Textarea id="company-description" placeholder="Describe your company culture, mission, and values..." rows={8} defaultValue="Innovate Inc. is a leading tech company focused on building next-generation web applications. We are passionate about creating a collaborative and inclusive environment where everyone can thrive." />
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8 lg:sticky lg:top-24 self-start">
             <Card>
                <CardHeader>
                    <CardTitle>Company Logo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {logoUrl && (
                        <div className="flex justify-center">
                            <Image src={logoUrl} alt="Company Logo" width={128} height={128} className="rounded-lg border p-2" />
                        </div>
                    )}
                  <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                    <Button variant="link" className="p-0 h-auto" onClick={handleLogoUpload} disabled={isUploading}>click to upload</Button>
                  </div>
                </CardContent>
            </Card>
             <Button size="lg" className="w-full" onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
        </div>
      </div>
    </div>
  )
}
