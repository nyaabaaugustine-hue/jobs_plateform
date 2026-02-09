import { DUMMY_APPLICANTS, DUMMY_JOBS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ApplicantsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">All Applicants</h1>
        <p className="text-muted-foreground">Manage all candidates for your job listings.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input placeholder="Search applicants..." className="max-w-sm" />
             <div className="flex gap-4">
                 <Select>
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
                 <Select>
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
                <TableHead>Experience</TableHead>
                <TableHead>Skill Match</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_APPLICANTS.map((applicant) => {
                const job = DUMMY_JOBS.find((j) => j.id === applicant.jobId);
                const avatar = PlaceHolderImages.find((p) => p.id === applicant.avatar);
                return (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {avatar && <AvatarImage src={avatar.imageUrl} />}
                          <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{applicant.experience} years</TableCell>
                    <TableCell>
                      <Badge variant={applicant.skillMatch > 85 ? 'default' : 'secondary'}>
                        {applicant.skillMatch}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Select defaultValue={applicant.status}>
                        <SelectTrigger className="w-[120px] text-xs h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'].map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                       </Select>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                           <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
