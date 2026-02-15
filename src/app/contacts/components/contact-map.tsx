import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function ContactMap() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'contact-map');

  return (
    <Link href="https://maps.app.goo.gl/CcyvL8M57nU5gWpe7" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="shadow-lg overflow-hidden group">
        {mapImage && (
            <div className="relative aspect-[16/6]">
            <Image
                src={mapImage.imageUrl}
                alt="Our Location"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={mapImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
                    <h3 className="font-headline text-2xl font-bold text-white">Find Us Here</h3>
                    <p className="text-gray-200 text-sm">123 Job Seeker Lane, Accra, Ghana</p>
            </div>
            </div>
        )}
        </Card>
    </Link>
  );
}
