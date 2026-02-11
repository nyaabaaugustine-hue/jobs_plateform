import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Join Our Team"
        subtitle="Help us build the future of professional networking and job discovery."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="font-headline text-2xl font-bold">No Open Positions Currently</h2>
              <p className="mt-4 text-muted-foreground">
                We are not actively hiring at the moment, but we are always on the lookout for passionate and talented individuals. 
                If you believe you have what it takes to contribute to our mission, feel free to send your resume to our team.
              </p>
              <Button size="lg" className="mt-6" asChild>
                <Link href="/contacts">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
