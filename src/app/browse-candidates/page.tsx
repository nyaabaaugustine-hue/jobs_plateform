'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_USERS } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Briefcase, Calendar, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CandidateCard = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const avatar = PlaceHolderImages.find((p) => p.id === user.avatar);
    
    const [matchScore, setMatchScore] = useState(0);
    const [experience, setExperience] = useState(0);

    useEffect(() => {
        // Generate random data on mount to avoid hydration mismatch
        setMatchScore(Math.floor(Math.random() * (98 - 75 + 1)) + 75);
        setExperience(Math.floor(Math.random() * 10) + 1);
    }, []);

    const handleQuickInvite = () => {
        toast({
            title: `Invitation Sent!`,
            description: `${user.name} has been invited to apply for your open roles.`,
            variant: 'vibrant',
        });
    };
    
    const getMatchScoreBadgeClass = (score: number) => {
        if (score > 90) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
        if (score > 80) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
        return 'bg-secondary text-secondary-foreground';
    };

    return (
        <Card className="group relative flex flex-col overflow-hidden text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-transparent hover:border-primary">
             <div className="absolute top-4 right-4 z-10">
                <Badge variant="outline" className={cn('font-semibold', getMatchScoreBadgeClass(matchScore))}>
                    <Zap className="mr-1.5 h-3 w-3" /> {matchScore}% Match
                </Badge>
             </div>
            <CardContent className="p-6 pb-2 flex flex-col items-center flex-grow">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md ring-2 ring-primary/20">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
                  <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Link href={`/candidate-profile/${user.id}`} className="font-bold text-lg hover:text-primary transition-colors">{user.name}</Link>
                <p className="text-sm text-muted-foreground mb-4 h-10">{user.role}</p>
                
                <div className="flex w-full justify-around text-xs text-muted-foreground mb-4 border-y py-3">
                    <div className="flex flex-col items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{experience} Yrs Exp.</span>
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
                    <Button onClick={handleQuickInvite} size="sm" className="w-full bg-accent-gradient">
                        <Mail className="mr-2 h-4 w-4" /> Quick Invite
                    </Button>
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
    !['Employer', 'Admin', 'Hiring Manager', 'CEO', 'Director of Engineering'].includes(user.role)
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Browse Top Candidates"
        subtitle="Discover the best talent for your team from our community of skilled professionals."
      />
      <main className="flex-1 py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidates.map((user) => (
              <CandidateCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
