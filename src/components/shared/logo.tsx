import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Home className="h-7 w-7 text-accent" />
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-primary leading-tight">CHAPEL HILL</span>
          <span className="text-[10px] text-primary/80 leading-none">MANAGERS & CONSULTING</span>
        </div>
      )}
    </div>
  );
}
