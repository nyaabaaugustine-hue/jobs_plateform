import PageHero from '@/components/shared/page-hero';
import { Card, CardContent } from '@/components/ui/card';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import { DUMMY_USERS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const teamMembers = DUMMY_USERS.slice(0, 4);

  return (
    <>
      <PageHero
        title="About Chapel Hill"
        subtitle="Connecting top talent with the best opportunities in the React ecosystem."
      />
      <main className="flex-1 py-16 md:py-24 space-y-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <Card>
                <CardContent className="p-10 text-center">
                <h2 className="font-headline text-2xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                    At Chapel Hill, our mission is to empower developers and companies by creating a specialized platform for React-focused careers. We believe that by connecting the right talent with the right opportunities, we can help build the future of web technology. We are committed to fostering a community built on trust, transparency, and professional growth.
                </p>
                </CardContent>
            </Card>
        </div>

        <WhyChooseUs />

        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Meet Our Team</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    The passionate individuals behind Chapel Hill.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map(member => {
                    const avatar = PlaceHolderImages.find(p => p.id === member.avatar);
                    return (
                        <Card key={member.id} className="text-center p-6">
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
