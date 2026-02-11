'use client';

import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_APPLICANTS } from '@/lib/data';
import { Briefcase, Building, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TickerMessage = {
  icon: React.ReactNode;
  text: React.ReactNode;
};

export default function HiringTicker() {
  const [tickerMessages, setTickerMessages] = useState<TickerMessage[]>([]);

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

  // Duplicate the messages to create a seamless loop
  const duplicatedMessages = [...tickerMessages, ...tickerMessages, ...tickerMessages, ...tickerMessages];

  return (
    <div className="bg-secondary border-y">
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee group-hover:paused whitespace-nowrap py-3">
          {duplicatedMessages.map((message, index) => (
            <div key={index} className="flex items-center mx-8 text-sm text-muted-foreground shrink-0">
              <div className="mr-3 shrink-0">{message.icon}</div>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
