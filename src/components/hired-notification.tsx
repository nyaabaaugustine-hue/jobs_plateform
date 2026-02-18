"use client"

import { useEffect, useRef, useState, useCallback } from 'react';
import { useToast, dismiss } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PartyPopper, Sparkles } from 'lucide-react';
import { ToastAction } from './ui/toast';
import { usePathname } from 'next/navigation';

const hiredExamples = [
  { name: 'Kofi Mensah', job: 'Senior React Developer', avatarId: 'avatar-2' },
  { name: 'Ama Serwaa', job: 'UX/UI Designer', avatarId: 'avatar-1' },
  { name: 'Yaw Adjei', job: 'Product Manager', avatarId: 'avatar-4' },
  { name: 'Esi Owusu', job: 'Data Scientist', avatarId: 'avatar-5' },
  { name: 'Kwame Addo', job: 'Full-stack Engineer', avatarId: 'avatar-7' },
  { name: 'Akua Asare', job: 'Content Strategist', avatarId: 'avatar-6' },
];

export default function HiredNotification() {
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const [isStopped, setIsStopped] = useState(false);

  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer') ||
    pathname === '/hilladmin' ||
    pathname === '/login' ||
    pathname === '/register';

  const stopNotifications = useCallback(() => {
    setIsStopped(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Remove any active toast immediately
    dismiss();
  }, []);

  const showRandomHiredNotification = useCallback(() => {
    if (isDashboardPage || isStopped) return;
    
    const example = hiredExamples[Math.floor(Math.random() * hiredExamples.length)];
    const userAvatar = PlaceHolderImages.find((img) => img.id === example.avatarId);

    toast({
      variant: 'black',
      className: 'p-4 pr-10 border-l-4 border-l-gold animate-in slide-in-from-right-full duration-500',
      description: (
        <div className="flex items-center gap-3 text-left">
          <div className="relative shrink-0">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={example.name} />}
              <AvatarFallback>{example.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-0.5">
              <Sparkles className="h-3 w-3 text-black" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black font-headline text-sm flex items-center gap-1.5 text-white truncate">
              {`${example.name.split(' ')[0]} was hired!`} 
              <PartyPopper className="h-4 w-4 text-yellow-400 shrink-0" />
            </p>
            <p className="text-xs text-white/70 font-bold font-headline truncate">{`New ${example.job} role filled.`}</p>
          </div>
        </div>
      ),
      action: (
        <ToastAction
          altText="Stop alerts"
          onClick={(e) => {
            e.preventDefault();
            stopNotifications();
          }}
          className="text-xs h-7 ml-4 font-black font-headline border-white/30 text-white hover:bg-white/10"
        >
          Stop
        </ToastAction>
      ),
      duration: 6000,
    });
  }, [isDashboardPage, isStopped, toast, stopNotifications]);

  useEffect(() => {
    if (isDashboardPage || isStopped) return;

    // Fixed 50s interval per user request
    timerRef.current = setTimeout(() => {
      if (!isStopped) {
        showRandomHiredNotification();
        intervalRef.current = setInterval(showRandomHiredNotification, 50000);
      }
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDashboardPage, showRandomHiredNotification, isStopped]);

  return null;
}
