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
      'mb-10',
      isCentered && 'text-center',
      className
    )}>
      <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg text-muted-foreground',
          isCentered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
