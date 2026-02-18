
'use client';

import { Card } from '@/components/ui/card';

export default function ContactMap() {
  return (
    <Card className="shadow-2xl overflow-hidden group border-2 border-white/10 bg-card/50 backdrop-blur-xl rounded-3xl animate-in fade-in duration-1000">
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
            <div className="absolute bottom-6 left-6 pointer-events-none bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl animate-in slide-in-from-left duration-700 delay-300">
                <h3 className="font-headline text-2xl font-black text-white tracking-tight">Chapel Hill Managers</h3>
                <p className="text-white/80 text-xs font-bold font-headline uppercase tracking-[0.2em] mt-1">Consulting & Recruitment HQ</p>
            </div>
        </div>
    </Card>
  );
}
