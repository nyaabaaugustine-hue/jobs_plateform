
'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PartyPopper } from 'lucide-react';
import { ToastAction } from './ui/toast';

const hiredExamples = [
  { name: 'Kofi Mensah', job: 'Senior React Developer', avatarId: 'avatar-2' },
  { name: 'Ama Serwaa', job: 'UX/UI Designer', avatarId: 'avatar-1' },
  { name: 'Yaw Adjei', job: 'Product Manager', avatarId: 'avatar-4' },
  { name: 'Esi Owusu', job: 'Data Scientist', avatarId: 'avatar-5' },
];

export default function HiredNotification() {
  const { toast, dismiss } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopNotifications = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    sessionStorage.setItem('hiredNotificationsStopped', 'true');
    dismiss();
  };

  useEffect(() => {
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
        className: 'bg-gold text-background border-yellow-300/50 shadow-lg',
        description: (
          <div className="flex items-center gap-3">
            <PartyPopper className="h-6 w-6 shrink-0" />
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-background/50">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={example.name} />}
                <AvatarFallback>{example.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{`${example.name.split(' ')[0]} was hired!`} 🇬🇭</p>
                <p className="text-xs">{`For the ${example.job} role.`}</p>
              </div>
            </div>
          </div>
        ),
        action: (
          <ToastAction
            altText="Stop notifications"
            onClick={stopNotifications}
            className="border-background/30 text-background/70 hover:bg-background/20 hover:text-background"
          >
            Stop alerts
          </ToastAction>
        ),
        duration: 10000,
      });
    };

    const initialTimeout = setTimeout(() => {
      if (sessionStorage.getItem('hiredNotificationsStopped') !== 'true') {
        showRandomHiredNotification();
        intervalRef.current = setInterval(showRandomHiredNotification, 50000);
      }
    }, 8000); // 3s for ad panel + 5s wait = 8s total

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, dismiss]);

  return null;
}
