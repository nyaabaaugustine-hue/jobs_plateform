import { Briefcase, Zap, UserCheck, X } from 'lucide-react';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const features = [
  {
    icon: Zap,
    title: 'Faster Hiring',
    description: 'Connect with top talent and make hires in record time with our streamlined process and AI-powered matching.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: Briefcase,
    title: 'Quality Opportunities',
    description: 'Access a curated selection of high-quality jobs from leading companies in the React ecosystem.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent'
  },
  {
    icon: UserCheck,
    title: 'Smarter Matching',
    description: 'Our intelligent algorithms match your skills and preferences to the most relevant job opportunities.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Why Chapel Hill?"
          subtitle="We're more than just a job board. We're your career partner."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="items-center">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.iconBg}`}>
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
