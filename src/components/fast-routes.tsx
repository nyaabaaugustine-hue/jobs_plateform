
import { FileText, Video, Send, Users } from 'lucide-react';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const routes = [
  {
    icon: FileText,
    title: 'AI-Powered CV Builder',
    description: 'Create a standout CV in minutes with our AI assistant. Tailor it to specific jobs with one click.',
    href: '#',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Video,
    title: 'Mock Interview Practice',
    description: 'Build confidence and get instant feedback with AI-powered mock interviews tailored to your target roles.',
    href: '#',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Send,
    title: 'Direct-Apply to Top Companies',
    description: 'Skip the line. Apply directly to verified companies and get seen by hiring managers faster.',
    href: '/jobs',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Users,
    title: 'Exclusive Networking Events',
    description: 'Connect with industry leaders and recruiters at our exclusive online and in-person events.',
    href: '#',
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  },
];

export default function FastRoutes() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'featured-jobs-bg');

  return (
    <section className="relative py-16 md:py-24">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/90 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Fast Routes to Your Next Job"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {routes.map((route, index) => (
            <Link key={route.title} href={route.href} className="block group">
              <Card className="h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in-up" style={{ animationDelay: `${200 + index * 100}ms` }}>
                <CardHeader className="items-center">
                  <div className={cn("flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110", route.bgColor)}>
                    <route.icon className={cn("h-8 w-8", route.iconColor)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">{route.title}</CardTitle>
                  <p className="text-muted-foreground">{route.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
