import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  isCentered?: boolean;
  dark?: boolean;
};

export default function SectionHeader({ title, subtitle, className, isCentered = true, dark = false }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 section-reveal',
      isCentered && 'text-center',
      className
    )}>
      <h2 className={cn(
        "font-headline text-[48px] font-black leading-tight",
        dark ? "text-[#0B0F17]" : "text-white"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-[18px] font-medium font-headline tracking-wide',
          dark ? "text-slate-600" : "text-muted-foreground",
          isCentered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
