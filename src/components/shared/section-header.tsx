
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  isCentered?: boolean;
  dark?: boolean;
  silver?: boolean;
};

export default function SectionHeader({ title, subtitle, className, isCentered = true, dark = false, silver = false }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 section-reveal',
      isCentered && 'text-center',
      className
    )}>
      <h2 className={cn(
        "font-headline text-[48px] font-black leading-tight",
        silver ? "text-slate-400 dark:text-slate-300" : (dark ? "text-[#0B0F17]" : "text-foreground")
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-[18px] font-medium font-headline tracking-wide',
          silver ? "text-slate-500 dark:text-slate-400" : (dark ? "text-slate-600" : "text-muted-foreground"),
          isCentered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
