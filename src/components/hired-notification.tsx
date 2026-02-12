'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_USERS, DUMMY_JOBS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PartyPopper } from 'lucide-react';

export default function HiredNotification() {
  const { toast } = useToast();
  const [randomUser, setRandomUser] = useState<any>(null);
  const [randomJob, setRandomJob] = useState<any>(null);

  useEffect(() => {
    setRandomUser(DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]);
    setRandomJob(DUMMY_JOBS[Math.floor(Math.random() * DUMMY_JOBS.length)]);
  }, []);

  useEffect(() => {
    const showRandomHiredNotification = () => {
      const user = DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)];
      const job = DUMMY_JOBS[Math.floor(Math.random() * DUMMY_JOBS.length)];
      setRandomUser(user);
      setRandomJob(job);
      const userAvatar = PlaceHolderImages.find((img) => img.id === user.avatar);

      toast({
        variant: 'vibrant',
        description: (
          <div className="flex items-center gap-4">
            <PartyPopper className="h-8 w-8 shrink-0 text-yellow-300" />
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/50">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{`${user.name.split(' ')[0]} was hired!`} 🇬🇭</p>
                <p>{`For the ${job.title} role.`}</p>
              </div>
            </div>
          </div>
        ),
      });
    };

    const initialTimeout = setTimeout(showRandomHiredNotification, 20000);
    const interval = setInterval(showRandomHiredNotification, 20000); 

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [toast]);

  return null;
}
