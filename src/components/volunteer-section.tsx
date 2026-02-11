import { GraduationCap, Handshake, Lightbulb } from 'lucide-react';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const opportunities = [
  {
    icon: GraduationCap,
    title: 'Student Attachments',
    description: 'Gain real-world experience with leading companies in your field of study. Bridge the gap between theory and practice.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500'
  },
  {
    icon: Handshake,
    title: 'Volunteer Programs',
    description: 'Make an impact by contributing your skills to NGOs and community projects. Build your network and character.',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Challenges',
    description: 'Participate in student-focused innovation challenges and hackathons sponsored by top tech firms.',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500'
  }
];

export default function VolunteerSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Kickstart Your Career"
          subtitle="Explore volunteer and attachment opportunities designed for students to gain hands-on experience and make a difference."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="items-center">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-full", opportunity.iconBg)}>
                  <opportunity.icon className={cn("h-8 w-8", opportunity.iconColor)} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">{opportunity.title}</CardTitle>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/opportunities">Explore Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
