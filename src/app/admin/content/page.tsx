'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Palmtree } from 'lucide-react';
import HeroEditor from './components/hero-editor';
import WhyChooseUsEditor from './components/why-choose-us-editor';

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Website Content Management</h1>
        <p className="text-muted-foreground">
          Edit content for various sections of the public-facing website.
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">
            <Palmtree className="mr-2" /> Hero Section
          </TabsTrigger>
          <TabsTrigger value="why-choose-us">
            <LayoutDashboard className="mr-2" /> 'Why Choose Us' Section
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hero">
          <HeroEditor />
        </TabsContent>
        <TabsContent value="why-choose-us">
          <WhyChooseUsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
