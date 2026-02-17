
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import SectionHeader from "./shared/section-header"
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
    const faqImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  
    return (
      <section className="py-28 bg-background">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-12 duration-700">
              {faqImage && (
                <Image
                  src={faqImage.imageUrl}
                  alt={faqImage.description}
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
                  data-ai-hint={faqImage.imageHint}
                />
              )}
            </div>
            <div className="animate-in fade-in slide-in-from-right-12 duration-700">
              <SectionHeader
                title="Frequently Asked Questions"
                subtitle="Have questions? We're here to help. If you don't see your question here, feel free to contact us."
                isCentered={false}
                className="mb-8"
              />
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
