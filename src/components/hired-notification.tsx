
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
        variant: 'vibrant',
        description: (
          <div className="flex items-center gap-4">
            <PartyPopper className="h-10 w-10 shrink-0 text-yellow-300" />
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/50">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={example.name} />}
                <AvatarFallback>{example.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-base">{`${example.name.split(' ')[0]} was hired!`} 🇬🇭</p>
                <p className="text-sm">{`For the ${example.job} role.`}</p>
              </div>
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

    const initialTimeout = setTimeout(() => {
      if (sessionStorage.getItem('hiredNotificationsStopped') !== 'true') {
        showRandomHiredNotification();
        intervalRef.current = setInterval(showRandomHiredNotification, 30000);
      }
    }, 8000);

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
