import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  if (!logoImage) {
    // Fallback to text if image is not found
    return (
      <div className={cn('flex items-center', className)}>
        <span className="text-xl font-bold text-foreground font-headline">Chapel Hill</span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={logoImage.imageUrl}
        alt="Chapel Hill Logo"
        width={150}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
}
