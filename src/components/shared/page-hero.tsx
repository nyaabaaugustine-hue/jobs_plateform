import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type PageHeroProps = {
  title: string;
  subtitle: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

  return (
    <section className="relative w-full py-16 md:py-20 flex items-center justify-center text-center bg-hero-glow">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={heroImage.imageHint}
          priority
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl !leading-tight font-headline">
            {title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
