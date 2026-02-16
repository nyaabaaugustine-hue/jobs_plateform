
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, Loader2, Building, Globe, Facebook, Linkedin, Twitter, Info } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from '@/hooks/use-toast';
import CompanyCard from '@/components/company-card';
import type { Company } from '@/lib/types';

export default function CompanyProfilePage() {
    const { toast } = useToast();
    
    // State for form fields
    const [companyName, setCompanyName] = useState('Innovate Inc.');
    const [website, setWebsite] = useState('https://innovateinc.com');
    const [industry, setIndustry] = useState('Technology');
    const [location, setLocation] = useState('Accra, Ghana');
    const [description, setDescription] = useState("Innovate Inc. is a leading tech company focused on building next-generation web applications. We are passionate about creating a collaborative and inclusive environment where everyone can thrive.");
    const [logo, setLogo] = useState('company-logo-1');
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const currentLogoIndex = PlaceHolderImages.findIndex(p => p.id === logo && p.id.startsWith('company-logo-'));
            const nextLogoIndex = (currentLogoIndex + 1) % 24; // Assuming 24 company logos
            const nextLogo = PlaceHolderImages.find(p => p.id === `company-logo-${nextLogoIndex + 1}`);
            if (nextLogo) {
                setLogo(nextLogo.id);
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

    // Create a mock company object for the preview card
    const previewCompany: Company = {
        id: 'preview-1',
        name: companyName,
        logo: logo,
        industry: industry,
        location: location,
        description: description,
        website: website,
        employerId: 'preview-employer',
        activeJobs: 5, // example data
        rating: 4.5, // example data
    };
    
    const logoUrl = PlaceHolderImages.find(p => p.id === logo)?.imageUrl;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Company Profile</h1>
                <p className="text-muted-foreground">This information will be visible on your company page and job listings to attract top talent.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building /> Company Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-website">Website</Label>
                                    <Input id="company-website" value={website} onChange={e => setWebsite(e.target.value)} />
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" value={industry} onChange={e => setIndustry(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={location} onChange={e => setLocation(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-description">About Your Company</Label>
                                <Textarea id="company-description" placeholder="Describe your company culture, mission, and values..." rows={8} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Globe /> Branding & Socials</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label>Company Logo</Label>
                                <div className="flex items-center gap-6 mt-2">
                                    {logoUrl && <Image src={logoUrl} alt="Company Logo" width={80} height={80} className="rounded-lg border p-2 bg-white" />}
                                    <div className="flex-1 flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg">
                                        {isUploading ? (
                                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                        )}
                                        <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                                        <Button variant="link" className="p-0 h-auto" onClick={handleLogoUpload} disabled={isUploading}>click to upload</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Social Media Links</Label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Linkedin className="h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="https://linkedin.com/company/..." />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Twitter className="h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="https://twitter.com/..." />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Facebook className="h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="https://facebook.com/..." />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sticky Column */}
                <div className="lg:sticky lg:top-24 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Info /> Live Preview</CardTitle>
                            <CardDescription>This is how your company card will appear to candidates.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CompanyCard company={previewCompany} />
                        </CardContent>
                    </Card>

                    <Button size="lg" className="w-full bg-primary" onClick={handleSaveChanges}>
                        <Save className="mr-2 h-4 w-4" /> Save All Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
