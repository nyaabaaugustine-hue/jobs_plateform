'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import Image from "next/image"
  import { PlaceHolderImages } from "@/lib/placeholder-images"
  
  const faqs = [
    {
      question: "How do I apply for a job?",
      answer:
        "Simply find a job you're interested in, click 'Apply Now', and submit your profile. You can also add an optional cover letter to make your application stand out.",
    },
    {
      question: "Is Chapel Hill free for job seekers?",
      answer:
        "Yes! Our platform is completely free for job seekers. You can browse jobs, create a profile, and apply to as many positions as you like without any cost.",
    },
    {
      question: "How does employer verification work?",
      answer:
        "We manually review every company that signs up to ensure they are legitimate businesses offering real job opportunities. This helps protect our community from scams and spam.",
    },
    {
      question: "What are the benefits of the Pro plan for employers?",
      answer:
        "The Pro plan offers enhanced features like more active job posts, AI candidate matching to find the best talent faster, and detailed hiring analytics to optimize your recruitment process.",
    },
     {
      question: "How can I make my profile stand out?",
      answer:
        "Complete your profile with detailed work experience, a professional summary, and a list of your key skills. Uploading a tailored resume for each application also significantly increases your chances.",
    },
  ]
  
  export default function Faq() {
    const faqImage = PlaceHolderImages.find((p) => p.id === 'contact-form-bg');
  
    return (
      <section className="py-20 bg-background relative">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="animate-in fade-in slide-in-from-left-12 duration-1000 hidden lg:block">
              {faqImage && (
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] border border-border/50">
                  <Image
                    src={faqImage.imageUrl}
                    alt="FAQ illustration"
                    fill
                    className="object-cover"
                    data-ai-hint={faqImage.imageHint}
                  />
                </div>
              )}
            </div>
            
            {/* Content Column */}
            <div className="animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="mb-8">
                <h2 className="font-headline text-[48px] font-black text-foreground leading-tight">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg text-muted-foreground font-medium">Have questions? We're here to help you navigate your journey.</p>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-border/50 px-6 rounded-xl bg-card">
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    )
  }