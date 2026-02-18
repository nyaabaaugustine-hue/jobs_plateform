import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  isCentered?: boolean;
};

export default function SectionHeader({ title, subtitle, className, isCentered = true }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 section-reveal',
      isCentered && 'text-center',
      className
    )}>
      <h2 className="font-headline text-[48px] font-black text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-[18px] text-muted-foreground font-medium font-headline tracking-wide',
          isCentered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}