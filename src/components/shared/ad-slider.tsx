'use client';

import { useState, useEffect } from 'react';
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
  
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer') ||
    pathname === '/login' ||
    pathname === '/register';

  useEffect(() => {
    if (isDashboardPage || ads.length === 0) return;

    // Initial Appearance: Strictly 5 Seconds after load
    const initialTimeout = setTimeout(() => {
      setIsPanelOpen(true);
    }, 5000);

    // Cycle every 47 seconds exactly
    const cycleInterval = setInterval(() => {
        setIsPanelOpen(false); 

        setTimeout(() => {
            setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
            setIsPanelOpen(true);
        }, 1000);

    }, 47000);

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(cycleInterval);
    };
  }, [isDashboardPage]);
  
  const handleClose = () => {
    setIsPanelOpen(false);
  };

  if (isDashboardPage || ads.length === 0) {
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