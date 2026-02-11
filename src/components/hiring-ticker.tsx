'use client';

import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_APPLICANTS } from '@/lib/data';
import { Briefcase, Building, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

type TickerMessage = {
  icon: React.ReactNode;
  text: React.ReactNode;
};

export default function HiringTicker() {
  const [tickerMessages, setTickerMessages] = useState<TickerMessage[]>([]);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  useEffect(() => {
    // This effect should only run on the client side
    const generateMessages = () => {
        const messages: TickerMessage[] = [];

        // Recent hires
        const hiredApplicants = DUMMY_APPLICANTS.filter(a => a.status === 'Hired').slice(0, 3);
        hiredApplicants.forEach(app => {
          const job = DUMMY_JOBS.find(j => j.id === app.jobId);
          if (job) {
            messages.push({
              icon: <Briefcase className="h-4 w-4 text-primary" />,
              text: (
                <>
                  <strong>{app.name.split(' ')[0]}</strong> just got hired as a{' '}
                  {job.title}!
                </>
              ),
            });
          }
        });

        // New companies
        const newCompanies = DUMMY_COMPANIES.slice(0, 3);
        newCompanies.forEach(company => {
            messages.push({
                icon: <Building className="h-4 w-4 text-accent" />,
                text: (
                    <>
                    <strong>{company.name}</strong> just joined to hire talent!
                    </>
                )
            })
        });
        
        // Generic message
        messages.push({
            icon: <CheckCircle className="h-4 w-4 text-green-500" />,
            text: (
                <>
                    Over <strong>{DUMMY_JOBS.length}+</strong> jobs are available now. <Link href="/jobs" className="underline font-semibold">Find yours!</Link>
                </>
            )
        });

        // Shuffle the messages for variety
        return messages.sort(() => Math.random() - 0.5);
    };
    
    setTickerMessages(generateMessages());

  }, []);

  if (tickerMessages.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary border-y">
      <Carousel
        plugins={[plugin.current]}
        opts={{
            loop: true,
            align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {tickerMessages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center py-3 text-sm text-muted-foreground">
                <div className="mr-3 shrink-0">{message.icon}</div>
                <p>{message.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
