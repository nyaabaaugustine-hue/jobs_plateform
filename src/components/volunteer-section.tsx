
import { DUMMY_OPPORTUNITIES } from '@/lib/data';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function VolunteerSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Kickstart Your Career"
          subtitle="Explore volunteer and attachment opportunities designed for students to gain hands-on experience and make a difference."
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
            <Card key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-card" style={{ animationDelay: `${200 + index * 100}ms` }}>
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
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
          <Button asChild size="lg" variant="outline">
            <Link href="/opportunities">Explore Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
