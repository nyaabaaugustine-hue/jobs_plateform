
'use client';

import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactMap() {
  const mapUrl = "https://www.google.com/maps/place/Chapel+Hill+Managers+and+Consulting/@5.6644858,-0.0185091,17z/data=!3m1!4b1!4m6!3m5!1s0xfdf816a29cb20fb:0x359b1bc469c4f805!8m2!3d5.6644858!4d-0.0185091!16s%2Fg%2F11hzlk7z7z";

  return (
    <Card className="shadow-2xl overflow-hidden group border-2 border-white/10 bg-card/50 backdrop-blur-xl rounded-3xl animate-in fade-in duration-1000 relative">
        <div className="relative aspect-[16/7] w-full grayscale-[0.5] contrast-[1.1] brightness-[0.9] hover:grayscale-0 transition-all duration-700">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.335802614166!2d-0.018509100000000004!3d5.6644858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf816a29cb20fb%3A0x359b1bc469c4f805!2schapel%20Hill%20Managers%20and%20Consulting!5e0!3m2!1sen!2sgh!4v1771444554661!5m2!1sen!2sgh" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Overlay link to Google Maps */}
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label="Open location in Google Maps"
            />

            <div className="absolute bottom-6 left-6 pointer-events-none bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl animate-in slide-in-from-left duration-700 delay-300 z-20">
                <h3 className="font-headline text-2xl font-black text-white tracking-tight">Chapel Hill Managers</h3>
                <p className="text-white/80 text-xs font-bold font-headline uppercase tracking-[0.2em] mt-1">Consulting & Recruitment HQ</p>
            </div>

            <div className="absolute top-6 right-6 z-20">
                <Button asChild size="sm" className="bg-white/90 hover:bg-white text-black font-bold rounded-xl shadow-xl border border-white/20">
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open Google Maps
                    </a>
                </Button>
            </div>
        </div>
    </Card>
  );
}
