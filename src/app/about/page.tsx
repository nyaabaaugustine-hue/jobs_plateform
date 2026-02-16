
import PageHero from '@/components/shared/page-hero';
import { Card, CardContent } from '@/components/ui/card';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import { DUMMY_USERS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SectionHeader from '@/components/shared/section-header';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = DUMMY_USERS.slice(0, 4);
  const missionLogo = PlaceHolderImages.find((p) => p.id === 'main-logo');

  return (
    <>
      <PageHero
        title="About Chapel Hill"
        subtitle="Connecting top talent with the best opportunities in the React ecosystem."
      />
      <main className="flex-1 py-16 md:py-24 bg-secondary/30 space-y-20">
        
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <Card className="relative overflow-hidden shadow-lg animate-in fade-in-up duration-500">
                {missionLogo && (
                    <Image
                        src={missionLogo.imageUrl}
                        alt="Chapel Hill Logo Watermark"
                        width={200}
                        height={200}
                        className="absolute inset-0 m-auto h-full w-auto object-contain opacity-20 z-0"
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

        <WhyChooseUs />

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

      </main>
    </>
  );
}
