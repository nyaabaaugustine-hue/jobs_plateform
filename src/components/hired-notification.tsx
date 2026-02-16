'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PartyPopper } from 'lucide-react';
import { ToastAction } from './ui/toast';
import { usePathname } from 'next/navigation';

const hiredExamples = [
  { name: 'Kofi Mensah', job: 'Senior React Developer', avatarId: 'avatar-2' },
  { name: 'Ama Serwaa', job: 'UX/UI Designer', avatarId: 'avatar-1' },
  { name: 'Yaw Adjei', job: 'Product Manager', avatarId: 'avatar-4' },
  { name: 'Esi Owusu', job: 'Data Scientist', avatarId: 'avatar-5' },
];

export default function HiredNotification() {
  const { toast, dismiss } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  const stopNotifications = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    sessionStorage.setItem('hiredNotificationsStopped', 'true');
    dismiss();
  };

  useEffect(() => {
    let initialTimeout: NodeJS.Timeout | null = null;
    
    // The logic to show notifications is now wrapped inside the effect,
    // ensuring the hook itself runs on every render.
    if (!isDashboardPage) {
      const showRandomHiredNotification = () => {
        if (sessionStorage.getItem('hiredNotificationsStopped') === 'true') {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return;
        }

        const example = hiredExamples[Math.floor(Math.random() * hiredExamples.length)];
        const userAvatar = PlaceHolderImages.find((img) => img.id === example.avatarId);

        toast({
          variant: 'black',
          className: 'p-4 pr-10',
          description: (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-background/50">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={example.name} />}
                <AvatarFallback>{example.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm flex items-center gap-1.5">{`${example.name.split(' ')[0]} was hired!`} <PartyPopper className="h-4 w-4 text-yellow-400" /></p>
                <p className="text-xs opacity-80">{`For the ${example.job} role.`}</p>
              </div>
            </div>
          ),
          action: (
            <ToastAction
              altText="Stop notifications"
              onClick={stopNotifications}
            >
              Stop alerts
            </ToastAction>
          ),
          duration: 10000,
        });
      };

      initialTimeout = setTimeout(() => {
        if (sessionStorage.getItem('hiredNotificationsStopped') !== 'true') {
          showRandomHiredNotification();
          intervalRef.current = setInterval(showRandomHiredNotification, 47000);
        }
      }, 7000);
    }

    // The cleanup function runs regardless, ensuring timers are always cleared.
    return () => {
      if (initialTimeout) {
        clearTimeout(initialTimeout);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, dismiss, isDashboardPage]);

  // This component never renders anything to the DOM.
  return null;
}
