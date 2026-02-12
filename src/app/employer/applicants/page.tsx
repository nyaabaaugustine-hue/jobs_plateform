'use client';

import { useState, useEffect } from 'react';
import { DUMMY_APPLICANTS, DUMMY_JOBS } from '@/lib/data';
import type { Applicant } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, User, Download, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

type ApplicantStatus = 'New' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

const getStatusBadgeClass = (status: ApplicantStatus) => {
    switch (status) {
        case 'New': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
        case 'Reviewed': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
        case 'Shortlisted': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
        case 'Interview': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
        case 'Offer': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
        case 'Hired': return 'bg-green-500/10 text-green-600 border-green-500/20';
        case 'Rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
        default: return 'bg-secondary text-secondary-foreground';
    }
};

const getSkillMatchBadgeClass = (score: number) => {
    if (score > 85) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (score > 70) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-secondary text-secondary-foreground';
};


export default function ApplicantsPage() {
  const { toast } = useToast();
  const [allApplicants, setAllApplicants] = useState<Applicant[]>(DUMMY_APPLICANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let storedApplicants: Applicant[] = [];
    try {
      const storedData = localStorage.getItem('job-applicants-data');
      if (storedData) {
        storedApplicants = JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Failed to parse applicants from localStorage", error);
    }
    
    const combinedApplicants = [...DUMMY_APPLICANTS];
    if (storedApplicants.length > 0) {
        storedApplicants.forEach(storedApp => {
            if (!combinedApplicants.find(a => a.id === storedApp.id)) {
                combinedApplicants.push(storedApp);
            }
        });
    }
    setAllApplicants(combinedApplicants);
  }, []);

  const handleStatusChange = (applicantId: string, newStatus: ApplicantStatus) => {
    setAllApplicants(allApplicants.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    ));
    toast({
        title: "Status Updated",
        description: `Applicant status changed to "${newStatus}".`,
        variant: 'vibrant'
    });
  };

  const handleAction = (title: string, description: string) => {
    toast({ title, description, variant: 'vibrant' });
  };

  const filteredApplicants = allApplicants
    .filter(applicant => 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(applicant => jobFilter === 'all' || applicant.jobId === jobFilter)
    .filter(applicant => statusFilter === 'all' || applicant.status.toLowerCase() === statusFilter);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">All Applicants</h1>
        <p className="text-muted-foreground">Manage all candidates for your job listings.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search applicants by name or email..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
             <div className="flex gap-4">
                 <Select value={jobFilter} onValueChange={setJobFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by job" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Jobs</SelectItem>
                        {DUMMY_JOBS.map(job => (
                            <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="all">All Statuses</SelectItem>
                        {['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'].map(status => (
                            <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead className="text-center">Experience</TableHead>
                <TableHead className="text-center">Skill Match</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => {
                const job = DUMMY_JOBS.find((j) => j.id === applicant.jobId);
                const avatar = PlaceHolderImages.find((p) => p.id === applicant.avatar);
                return (
                  <TableRow key={applicant.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {avatar && <AvatarImage src={avatar.imageUrl} alt={applicant.name} />}
                          <AvatarFallback>{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <p className="font-medium">{job?.title}</p>
                        <p className="text-xs text-muted-foreground">{job?.company.name}</p>
                    </TableCell>
                    <TableCell className="text-center font-medium">{applicant.experience} yrs</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn('font-semibold', getSkillMatchBadgeClass(applicant.skillMatch))}>
                        {applicant.skillMatch}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Select 
                          value={applicant.status}
                          onValueChange={(newStatus) => handleStatusChange(applicant.id, newStatus as ApplicantStatus)}
                        >
                        <SelectTrigger className={cn("text-xs h-8 font-medium w-[130px]", getStatusBadgeClass(applicant.status))}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'].map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                       </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/candidate-profile/${applicant.userId}`}><User className="mr-2" /> View Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Downloading CV...", `Downloading CV for ${applicant.name}`)}>
                            <Download className="mr-2" /> Download CV
                          </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                            <Link href={`/employer/messages`}><Send className="mr-2" /> Message Candidate</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
               {filteredApplicants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No applicants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
