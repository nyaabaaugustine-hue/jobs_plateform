'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import PageHero from '@/components/shared/page-hero';
import ContactMap from './components/contact-map';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactsPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const contactFormBg = PlaceHolderImages.find(p => p.id === 'contact-form-bg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: 'Message Sent!',
        description: "Thank you for contacting us. We'll get back to you shortly.",
        variant: 'vibrant',
      });
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Fill out the form below or use our contact details."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          <ContactMap />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            <div className="lg:col-span-3 relative rounded-xl overflow-hidden shadow-lg">
              {contactFormBg && (
                <Image
                  src={contactFormBg.imageUrl}
                  alt="Contact us background"
                  fill
                  className="object-cover z-0"
                  data-ai-hint={contactFormBg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-black/60 z-10" />

              <Card className="relative z-20 bg-transparent border-none shadow-none h-full">
                <CardHeader>
                  <CardTitle className="text-white">Send a Message</CardTitle>
                  <CardDescription className="text-gray-300">Our team will get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-200">Your Name</Label>
                            <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200">Your Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20" />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-200">Subject</Label>
                      <Input id="subject" placeholder="Regarding a job posting..." value={subject} onChange={(e) => setSubject(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-200">Message</Label>
                      <Textarea id="message" placeholder="Your message..." rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20" />
                    </div>
                    <Button type="submit" variant="secondary" className="w-full" size="lg" disabled={isSending}>
                      {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      {isSending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Reach out to us directly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Address</h4>
                                <p className="text-muted-foreground">123 Job Seeker Lane, Accra, Ghana</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                                <h4 className="font-semibold">Call Us</h4>
                                <p className="text-muted-foreground">+233 54 198 8383</p>
                            </div>
                            <Button asChild size="sm" variant="secondary">
                                <a href="tel:+233541988383">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Now
                                </a>
                            </Button>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <p className="text-muted-foreground">support@demo.com</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Business Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
