
"use client"

import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  isCentered?: boolean;
};

export default function SectionHeader({ title, subtitle, className, isCentered = true }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700',
      isCentered && 'text-center',
      className
    )}>
      <h2 className="font-headline text-[40px] md:text-[48px] font-black leading-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-[16px] md:text-[18px] font-medium font-headline tracking-wide text-muted-foreground',
          isCentered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
