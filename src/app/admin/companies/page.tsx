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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
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


type CompanyWithStatus = Company & { status: 'Verified' | 'Pending' };

export default function AdminCompaniesPage() {
  const companiesWithStatus: CompanyWithStatus[] = DUMMY_COMPANIES.map((company, index) => ({
    ...company,
    status: index % 4 === 0 ? 'Pending' : 'Verified',
  }));

  const [companies, setCompanies] = useState<CompanyWithStatus[]>(companiesWithStatus);
  const [searchTerm, setSearchTerm] = useState('');

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new company to the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" placeholder="Innovate Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="e.g., Tech, Finance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Accra, Ghana" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Company</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
                  <span className="font-semibold">{company.rating} / 5.0</span>
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
                      <DropdownMenuItem>Edit Company</DropdownMenuItem>
                       {company.status === 'Pending' && <DropdownMenuItem>Verify Company</DropdownMenuItem>}
                       <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Company</DropdownMenuItem>
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
