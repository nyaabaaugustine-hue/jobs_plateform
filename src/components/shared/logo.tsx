import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Briefcase className="h-7 w-7 text-primary" />
      {!iconOnly && (
        <span className="text-xl font-bold text-foreground font-headline">Demo</span>
      )}
    </div>
  );
}
