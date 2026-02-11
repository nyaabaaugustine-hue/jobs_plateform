import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_USERS } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getRoleBadgeClass = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (['developer', 'engineer', 'scientist', 'devops'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    }
    if (['manager', 'lead', 'ceo', 'director'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
    }
    if (['design', 'architect', 'actress'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-5/10 text-chart-5 border-chart-5/20';
    }
    if (['market', 'sale'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
     if (['analyst', 'research', 'qa', 'accountant', 'student', 'intern', 'lecturer'].some(term => lowerRole.includes(term))) {
        return 'bg-accent/10 text-accent border-accent/20';
    }
    return 'bg-secondary text-secondary-foreground';
};

const CandidateCard = ({ user }: { user: User }) => {
    const avatar = PlaceHolderImages.find((p) => p.id === user.avatar);
    return (
        <Card className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <Avatar className="w-24 h-24 mb-4 border-4 border-secondary shadow-md">
              {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
              <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground mb-4 h-10">{user.role}</p>
            
            <div className="flex flex-wrap gap-1 justify-center mb-4">
                {['React', 'TypeScript', 'Next.js'].map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
            
            <div className="mt-auto w-full">
                <Button variant="outline" className="w-full">View Profile</Button>
            </div>
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
      <main className="flex-1 py-16 md:py-24">
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
