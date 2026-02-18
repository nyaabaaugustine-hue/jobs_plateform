"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import AdPanel from './ad-panel';
import { DUMMY_COMPANIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Company } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { usePathname } from 'next/navigation';

type Ad = {
  companyId: string;
  headline: string;
  description: string;
  imageId: string;
  company: Company | undefined;
  image: ImagePlaceholder | undefined;
};

const ads: Ad[] = [
    {
        companyId: '1',
        headline: 'Innovate with mPharma',
        description: 'Join a team that\'s revolutionizing healthcare access across Africa. We are hiring top tech talent now!',
        imageId: 'ad-mpharma',
        company: DUMMY_COMPANIES.find(c => c.id === '1'),
        image: PlaceHolderImages.find(p => p.id === 'ad-mpharma')
    },
    {
        companyId: '2',
        headline: 'Powering Payments at Hubtel',
        description: 'Be at the forefront of fintech innovation in Ghana. Explore exciting roles in software engineering and product.',
        imageId: 'ad-hubtel',
        company: DUMMY_COMPANIES.find(c => c.id === '2'),
        image: PlaceHolderImages.find(p => p.id === 'ad-hubtel')
    },
    {
        companyId: '3',
        headline: 'Connect Ghana with MTN',
        description: 'Work with the leading telecommunications company in Ghana and shape the future of connectivity.',
        imageId: 'ad-mtn',
        company: DUMMY_COMPANIES.find(c => c.id === '3'),
        image: PlaceHolderImages.find(p => p.id === 'ad-mtn')
    },
    {
        companyId: '11',
        headline: 'Educate Future Leaders',
        description: 'Join Ashesi University and dedicated staff committed to ethical leadership and innovation in Africa.',
        imageId: 'ad-ashesi',
        company: DUMMY_COMPANIES.find(c => c.id === '11'),
        image: PlaceHolderImages.find(p => p.id === 'ad-ashesi')
    }
].filter(ad => ad.company && ad.image);

export default function AdSlider() {
  const pathname = usePathname();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDelayRef = useRef<NodeJS.Timeout | null>(null);
  
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer') ||
    pathname === '/hilladmin' ||
    pathname === '/login' ||
    pathname === '/register';

  const startCycle = useCallback(() => {
    if (isStopped || isDashboardPage) return;

    setIsPanelOpen(true);
    
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    cycleTimerRef.current = setTimeout(() => {
      setIsPanelOpen(false);
      setTimeout(() => {
        if (!isStopped) {
            setCurrentAdIndex(prev => (prev + 1) % ads.length);
            startCycle();
        }
      }, 2000);
    }, 20000); // 20s display time for reviews
  }, [isDashboardPage, isStopped]);

  useEffect(() => {
    if (isDashboardPage || ads.length === 0 || isStopped) return;

    // Start running quickly
    initialDelayRef.current = setTimeout(startCycle, 1000);

    return () => {
        if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
        if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [isDashboardPage, isStopped, startCycle]);
  
  const handleClose = () => {
    setIsPanelOpen(false);
    setIsStopped(true);
  };

  if (isDashboardPage || ads.length === 0 || isStopped) {
      return null;
  }

  return (
    <AdPanel
      isOpen={isPanelOpen}
      onClose={handleClose}
      ad={ads[currentAdIndex]}
    />
  );
}
