
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Shield, Zap, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/shared/section-header';

const initialFeatures = [
  {
    icon: Zap,
    title: '2x Faster to Hire',
    description: 'Our AI-driven platform connects you with qualified candidates in under 48 hours, reducing your time-to-hire by half.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: Shield,
    title: '98% Employer Verification',
    description: 'We manually verify every employer, ensuring you only apply to legitimate, high-quality opportunities.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent'
  },
  {
    icon: BrainCircuit,
    title: '89% Match Accuracy',
    description: 'Our AI analyzes your profile to provide job recommendations with an 89% accuracy score, so you find the right fit, faster.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500'
  }
];

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
};

export default function WhyChooseUsEditor() {
  const { toast } = useToast();
  
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [isSaving, setIsSaving] = useState(false);

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    const newFeatures = [...features];
    (newFeatures[index] as any)[field] = value;
    setFeatures(newFeatures);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Content Saved',
        description: 'The "Why Choose Us" section has been updated.',
        variant: 'vibrant',
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>"Why Choose Us" Editor</CardTitle>
          <CardDescription>Update the content for the three feature cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {features.map((feature, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>Feature #{index + 1}: {feature.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`feature-title-${index}`}>Title</Label>
                    <Input
                      id={`feature-title-${index}`}
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`feature-desc-${index}`}
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      
      {/* Preview Section */}
      <div>
        <Label className="text-muted-foreground">Live Preview</Label>
        <div className="mt-2 w-full rounded-lg border bg-background p-8">
          <SectionHeader
            title="Why Demo?"
            subtitle="We're more than just a job board. We're your career partner."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader className="items-center">
                    <div className={cn("flex h-16 w-16 items-center justify-center rounded-full", feature.iconBg)}>
                      <Icon className={cn("h-8 w-8", feature.iconColor)} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
