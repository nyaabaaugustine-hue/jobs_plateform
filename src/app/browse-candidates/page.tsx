'use client';

import { useState, useEffect } from 'react';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_USERS, DUMMY_JOBS } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Briefcase, Calendar, Zap, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const CandidateCard = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const [matchScore, setMatchScore] = useState<number | null>(null);
    const [experience, setExperience] = useState<number | null>(null);

    // New state for invite dialog
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    // For demo, assume the employer is "Innovate Inc." (company.id '1')
    const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');

    useEffect(() => {
        // Generate random data on mount to avoid hydration mismatch
        setMatchScore(Math.floor(Math.random() * (98 - 75 + 1)) + 75);
        setExperience(Math.floor(Math.random() * 10) + 1);
    }, []);

    const handleSendInvite = () => {
        if (!selectedJobId) {
            toast({
                title: 'No Job Selected',
                description: 'Please select a job to send an invitation.',
                variant: 'destructive',
            });
            return;
        }

        const selectedJob = employerJobs.find(j => j.id === selectedJobId);

        toast({
            title: `Invitation Sent!`,
            description: `${user.name} has been invited to apply for the ${selectedJob?.title} role.`,
            variant: 'vibrant',
        });
        setIsInviteOpen(false); // Close dialog
        setSelectedJobId(null); // Reset selection
    };
    
    const getMatchScoreBadgeClass = (score: number) => {
        if (score > 90) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
        if (score > 80) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
        return 'bg-secondary text-secondary-foreground';
    };

    return (
        <Card className="group relative flex flex-col overflow-hidden text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-transparent hover:border-primary">
             <div className="absolute top-4 right-4 z-10 h-6">
                {matchScore !== null ? (
                    <Badge variant="outline" className={cn('font-semibold', getMatchScoreBadgeClass(matchScore))}>
                        <Zap className="mr-1.5 h-3 w-3" /> {matchScore}% Match
                    </Badge>
                ) : (
                    <Skeleton className="h-full w-24" />
                )}
             </div>
            <CardContent className="p-6 pb-2 flex flex-col items-center flex-grow">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md ring-2 ring-primary/20">
                  {PlaceHolderImages.find((p) => p.id === user.avatar) && <AvatarImage src={PlaceHolderImages.find((p) => p.id === user.avatar)?.imageUrl} alt={user.name} />}
                  <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Link href={`/candidate-profile/${user.id}`} className="font-bold text-lg hover:text-primary transition-colors">{user.name}</Link>
                <p className="text-sm text-muted-foreground mb-4 h-10">{user.professionalTitle}</p>
                
                <div className="flex w-full justify-around text-xs text-muted-foreground mb-4 border-y py-3">
                    <div className="flex flex-col items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {experience !== null ? (
                            <span>{experience} Yrs Exp.</span>
                        ) : (
                            <Skeleton className="h-4 w-16 mt-1" />
                        )}
                    </div>
                     <div className="flex flex-col items-center gap-1">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Available</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'].slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
                    ))}
                </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-2 flex flex-col items-stretch">
                 <div className="mt-auto w-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="w-full bg-accent-gradient">
                                <Mail className="mr-2 h-4 w-4" /> Quick Invite
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Invite {user.name} to a Job</DialogTitle>
                                <DialogDescription>
                                    Select one of your open positions to invite this candidate to apply for.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <RadioGroup onValueChange={setSelectedJobId} value={selectedJobId || ''}>
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                        {employerJobs.map(job => (
                                            <Label key={job.id} htmlFor={job.id} className="flex items-center gap-4 rounded-md border p-3 hover:bg-secondary cursor-pointer">
                                                <RadioGroupItem value={job.id} id={job.id} />
                                                <div className="flex-1">
                                                    <p className="font-semibold">{job.title}</p>
                                                    <p className="text-xs text-muted-foreground">{job.location}</p>
                                                </div>
                                            </Label>
                                        ))}
                                    </div>
                                </RadioGroup>
                                 {employerJobs.length === 0 && (
                                    <p className="text-center text-sm text-muted-foreground py-8">You have no open jobs to send an invitation for.</p>
                                )}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="button" onClick={handleSendInvite} disabled={!selectedJobId}>
                                    <Send className="mr-2 h-4 w-4"/> Send Invite
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                 <div className="mt-auto w-full group-hover:opacity-0 transition-opacity duration-300">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={`/candidate-profile/${user.id}`}>View Profile</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};


export default function BrowseCandidatesPage() {
  // We'll only show users who are job seekers, not employers or admins from the dummy data.
  const candidates = DUMMY_USERS.filter(user => 
    user.role === 'jobSeeker'
  );
  const bgImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

  return (
    <>
      <PageHero
        title="Browse Top Candidates"
        subtitle="Discover the best talent for your team from our community of skilled professionals."
      />
      <main className="relative flex-1 py-16 md:py-24">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={bgImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="relative z-20 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidates.map((user) => (
              <CandidateCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
