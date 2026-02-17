
'use client';

import PageHero from '@/components/shared/page-hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import { DUMMY_USERS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SectionHeader from '@/components/shared/section-header';
import Image from 'next/image';
import OurPartners from '@/components/our-partners';
import Faq from '@/components/faq';
import { 
    Search, 
    ShieldCheck, 
    Star, 
    Building, 
    GraduationCap, 
    DollarSign, 
    Handshake, 
    BarChart, 
    PieChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const teamMembers = DUMMY_USERS.slice(0, 4);
  const missionLogo = PlaceHolderImages.find((p) => p.id === 'main-logo');
  const categoryBgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  const services = [
    {
      icon: Search,
      title: "Recruitment",
      description: "Leverage our extensive network and advanced tools to find the perfect candidates for your roles.",
    },
    {
      icon: ShieldCheck,
      title: "Reference Checking",
      description: "Ensure candidate integrity with our thorough and confidential reference checking services.",
    },
    {
      icon: Star,
      title: "Talent Assessment",
      description: "Utilize industry-leading assessment tools to evaluate candidate skills and fit for your team.",
    },
    {
      icon: Building,
      title: "Full-Service HR Outsourcing for Companies",
      description: "Let us handle your HR needs, from onboarding to compliance, so you can focus on your core business.",
    },
    {
      icon: GraduationCap,
      title: "Corporate Training, Employee and Organizational Development.",
      description: "Invest in your team's growth with our customized corporate training and development programs.",
    },
    {
      icon: DollarSign,
      title: "Pay-roll Services",
      description: "Streamline your payroll with our accurate, compliant, and timely payroll processing services.",
    },
    {
      icon: Handshake,
      title: "Employee Relations Services",
      description: "Foster a positive workplace environment with our expert guidance on employee relations.",
    },
    {
      icon: BarChart,
      title: "Market Research Strategy",
      description: "Gain a competitive edge with our in-depth market research and strategic business insights.",
    },
    {
      icon: PieChart,
      title: "People Analytics And Insights",
      description: "Make data-driven decisions about your workforce with our powerful people analytics and insights.",
    }
  ];

  return (
    <>
      <PageHero
        title="About Chapel Hill"
        subtitle="Connecting top talent with the best opportunities in the React ecosystem."
      />
      <main className="flex-1 py-16 md:py-24 bg-background space-y-20">
        
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <Card className="relative overflow-hidden shadow-lg animate-in fade-in-up duration-500 bg-card/80 backdrop-blur-sm">
                {missionLogo && (
                    <Image
                        src={missionLogo.imageUrl}
                        alt="Chapel Hill Logo Watermark"
                        width={200}
                        height={200}
                        className="absolute inset-0 m-auto h-full w-auto object-contain opacity-5 z-0"
                    />
                )}
                <CardContent className="relative z-10 p-10 text-center">
                    <h2 className="font-headline text-3xl font-bold text-foreground">Our Mission</h2>
                    <p className="mt-4 text-2xl font-bold text-foreground font-headline leading-relaxed">
                        At Chapel Hill, our mission is to empower developers and companies by creating a specialized platform for React-focused careers. We believe that by connecting the right talent with the right opportunities, we can help build the future of web technology. We are committed to fostering a community built on trust, transparency, and professional growth.
                    </p>
                </CardContent>
            </Card>
        </div>
        
        <section className="relative py-16 md:py-24">
            {categoryBgImage && (
                <Image
                    src={categoryBgImage.imageUrl}
                    alt={categoryBgImage.description}
                    fill
                    className="object-cover z-0"
                    data-ai-hint={categoryBgImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-background/90 z-10" />
            <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive Human Capital Management solutions."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in-up bg-card/70 backdrop-blur-sm border-t-4 border-transparent hover:border-primary">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2 text-xl">{service.title}</CardTitle>
                  <CardContent className="text-card-foreground/80 flex-grow p-0">
                    <p>{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />

        <OurPartners />

        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <SectionHeader
                title="Meet Our Team"
                subtitle="The passionate individuals behind Chapel Hill."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => {
                    const avatar = PlaceHolderImages.find(p => p.id === member.avatar);
                    return (
                        <Card 
                          key={member.id} 
                          className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in-up duration-500"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={member.name} />}
                                <AvatarFallback className="text-3xl">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm text-primary">{member.professionalTitle}</p>
                        </Card>
                    )
                })}
            </div>
        </div>

        <Testimonials />

        <Faq />

      </main>
    </>
  );
}
