'use client';

import { useState } from 'react';
import { DUMMY_COMPANIES } from '@/lib/data';
import type { Company } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Upload, Loader2, Edit, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
import { useToast } from '@/hooks/use-toast';


type CompanyWithStatus = Company & { status: 'Verified' | 'Pending' };

export default function AdminCompaniesPage() {
  const { toast } = useToast();
  const companiesWithStatus: CompanyWithStatus[] = DUMMY_COMPANIES.map((company, index) => ({
    ...company,
    status: index % 4 === 0 ? 'Pending' : 'Verified',
  }));

  const [companies, setCompanies] = useState<CompanyWithStatus[]>(companiesWithStatus);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  // Create Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('');
  const [newCompanyLocation, setNewCompanyLocation] = useState('');

  // Edit Dialog State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyWithStatus | null>(null);
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editCompanyIndustry, setEditCompanyIndustry] = useState('');
  const [editCompanyLocation, setEditCompanyLocation] = useState('');


  const handleImageUpload = () => {
      setIsUploading(true);
      setTimeout(() => {
          const randomImage = PlaceHolderImages.find(p => p.id === `company-logo-${Math.floor(Math.random() * 24) + 1}`);
          if(randomImage) {
              setUploadedImageUrl(randomImage.imageUrl);
          }
          setIsUploading(false);
      }, 1500);
  };
  
  const resetCreateForm = () => {
    setNewCompanyName('');
    setNewCompanyIndustry('');
    setNewCompanyLocation('');
    setUploadedImageUrl(null);
  };
  
  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const newCompany: CompanyWithStatus = {
      id: `company-${Date.now()}`,
      name: newCompanyName,
      industry: newCompanyIndustry,
      location: newCompanyLocation,
      logo: uploadedImageUrl ? (PlaceHolderImages.find(p => p.imageUrl === uploadedImageUrl)?.id || 'company-logo-1') : 'company-logo-1',
      description: 'A newly added company.',
      website: `${newCompanyName.toLowerCase().replace(/\s+/g, '')}.com`,
      employerId: `employer-${Date.now()}`,
      activeJobs: 0,
      rating: 0,
      status: 'Pending',
    };
    setCompanies(prev => [newCompany, ...prev]);
    toast({
      title: 'Company Added',
      description: `${newCompany.name} has been added and is pending verification.`,
      variant: 'vibrant'
    });
    setIsCreateDialogOpen(false);
    resetCreateForm();
  };

  const handleOpenEditDialog = (company: CompanyWithStatus) => {
    setEditingCompany(company);
    setEditCompanyName(company.name);
    setEditCompanyIndustry(company.industry);
    setEditCompanyLocation(company.location);
    const companyLogo = PlaceHolderImages.find(p => p.id === company.logo);
    setUploadedImageUrl(companyLogo?.imageUrl || null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    const updatedCompanies = companies.map(c => 
      c.id === editingCompany.id 
      ? { 
          ...c, 
          name: editCompanyName,
          industry: editCompanyIndustry,
          location: editCompanyLocation,
          logo: uploadedImageUrl ? (PlaceHolderImages.find(img => img.imageUrl === uploadedImageUrl)?.id || c.logo) : c.logo
        }
      : c
    );
    setCompanies(updatedCompanies);
    toast({
      title: 'Company Updated',
      description: `The details for "${editCompanyName}" have been successfully updated.`,
      variant: 'vibrant'
    });
    setIsEditDialogOpen(false);
    setEditingCompany(null);
  };

  const handleVerifyCompany = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, status: 'Verified' } : c));
    toast({ title: "Company Verified!", variant: "vibrant" });
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    toast({ title: "Company Deleted", variant: "destructive" });
  };

  const filteredCompanies = companies
    .filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusBadgeClass = (status: 'Verified' | 'Pending') => {
    switch (status) {
      case 'Verified':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Company Management</h1>
          <p className="text-muted-foreground">Manage all companies on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast({ title: 'Exporting Companies...', description: 'This would trigger a CSV download.' })}><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button variant="outline" onClick={() => toast({ title: 'Importing Companies...', description: 'This would open a file upload dialog.' })}><Upload className="mr-2 h-4 w-4" /> Import</Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary" onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Company
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleCreateCompany}>
                <DialogHeader>
                    <DialogTitle>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <PlusCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span>Add New Company</span>
                    </div>
                    </DialogTitle>
                    <DialogDescription>
                    Fill in the details below to add a new company to the platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" placeholder="Innovate Inc." value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                        ) : uploadedImageUrl ? (
                            <Image src={uploadedImageUrl} alt="Uploaded preview" width={60} height={60} className="rounded-md object-cover" />
                        ) : (
                            <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                        <p className="mt-2 text-sm text-muted-foreground">
                            {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Logo selected. ' : 'Drag & drop or '}
                            {!uploadedImageUrl && !isUploading && (
                                <Button variant="link" className="p-0 h-auto" type="button" onClick={handleImageUpload}>click to upload</Button>
                            )}
                            {uploadedImageUrl && !isUploading && (
                                <Button variant="link" className="p-0 h-auto text-destructive" type="button" onClick={() => setUploadedImageUrl(null)}>Remove</Button>
                            )}
                        </p>
                    </div>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="e.g., Tech, Finance" value={newCompanyIndustry} onChange={e => setNewCompanyIndustry(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Accra, Ghana" value={newCompanyLocation} onChange={e => setNewCompanyLocation(e.target.value)} required />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-primary">Add Company</Button>
                </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
        </div>
      </div>

       {/* Edit Company Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleUpdateCompany}>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Edit className="h-5 w-5 text-primary" />
                                </div>
                                <span>Edit Company</span>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Update the details for {editingCompany?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Company Name</Label>
                            <Input id="edit-name" value={editCompanyName} onChange={e => setEditCompanyName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-logo">Company Logo</Label>
                            <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                                {isUploading ? (
                                    <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                                ) : uploadedImageUrl ? (
                                    <Image src={uploadedImageUrl} alt="Uploaded preview" width={60} height={60} className="rounded-md object-cover" />
                                ) : (
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                )}
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Logo selected. ' : 'Drag & drop or '}
                                    {!uploadedImageUrl && !isUploading && (
                                        <Button variant="link" className="p-0 h-auto" type="button" onClick={handleImageUpload}>click to upload</Button>
                                    )}
                                    {uploadedImageUrl && !isUploading && (
                                        <Button variant="link" className="p-0 h-auto text-destructive" type="button" onClick={() => setUploadedImageUrl(null)}>Remove</Button>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-industry">Industry</Label>
                            <Input id="edit-industry" value={editCompanyIndustry} onChange={e => setEditCompanyIndustry(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Input id="edit-location" value={editCompanyLocation} onChange={e => setEditCompanyLocation(e.target.value)} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-primary">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by company name..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
        </CardHeader>
      </Card>
      
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => {
          const logo = PlaceHolderImages.find((p) => p.id === company.logo);
          return (
            <Card key={company.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                {logo && (
                  <Image
                    src={logo.imageUrl}
                    alt={`${company.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-lg border p-1"
                  />
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription>{company.industry}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 pt-0">
                <Separator />
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className={cn("font-semibold", getStatusBadgeClass(company.status))}>
                        {company.status}
                    </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Jobs</span>
                  <span className="font-semibold">{company.activeJobs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-semibold">{company.rating ?? 0} / 5.0</span>
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <MoreHorizontal className="mr-2 h-4 w-4" />
                            Actions
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild><Link href={`/companies/${company.id}`}>View Profile</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenEditDialog(company)}>Edit Company</DropdownMenuItem>
                       {company.status === 'Pending' && <DropdownMenuItem onClick={() => handleVerifyCompany(company.id)}>Verify Company</DropdownMenuItem>}
                       <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCompany(company.id)}>Delete Company</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          );
        })}
      </div>

        {filteredCompanies.length === 0 && (
            <Card>
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">No companies found.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
