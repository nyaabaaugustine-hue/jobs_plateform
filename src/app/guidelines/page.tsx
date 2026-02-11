import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, UserCheck, MessageSquareWarning } from 'lucide-react';

export default function GuidelinesPage() {
  const guidelines = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Be Authentic and Professional',
      description: 'Represent yourself and your company truthfully. Ensure all information on your profile and in job postings is accurate and up-to-date. Misleading information undermines the integrity of our community.',
    },
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: 'Respect and Inclusivity',
      description: 'Treat all users with respect, regardless of their background, role, or experience level. We have a zero-tolerance policy for harassment, discrimination, and any form of hate speech.',
    },
    {
      icon: <MessageSquareWarning className="h-8 w-8 text-primary" />,
      title: 'No Spam or Fraudulent Activity',
      description: 'Do not post spam, fake job offers, or any content that is fraudulent or deceptive. This includes pyramid schemes, multi-level marketing, and any jobs that require payment from the applicant.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Community Guidelines"
        subtitle="Fostering a safe, professional, and trustworthy environment for everyone."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="space-y-8">
            {guidelines.map((guideline, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                  {guideline.icon}
                  <CardTitle>{guideline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{guideline.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
