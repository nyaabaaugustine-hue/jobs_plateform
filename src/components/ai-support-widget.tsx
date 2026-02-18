'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bot, SendHorizonal, X, Sparkles, User, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.8.48 3.55 1.38 5.06L2 22l5.2-1.52c1.46.84 3.15 1.31 4.84 1.31h.01c5.46 0 9.9-4.44 9.9-9.9c0-5.45-4.44-9.9-9.9-9.9zM12.04 20.15h-.01c-1.5 0-2.98-.4-4.29-1.15l-.3-.18l-3.18.93l.95-3.1l-.2-.31c-.83-1.3-1.28-2.83-1.28-4.43c0-4.54 3.7-8.24 8.24-8.24c4.54 0 8.24 3.7 8.24 8.24c0 4.54-3.7 8.24-8.23 8.24zM17.39 14.15c-.2-.11-.7-.35-1.18-.59c-.48-.24-.83-.42-1.07-.42c-.24 0-.48.11-.66.35c-.18.24-.7.83-.86 1c-.16.18-.3.2-.48.1c-.18-.11-1.13-.42-2.15-1.32c-.8-.7-1.34-1.58-1.52-1.85c-.18-.28-.01-.43.1-.57c.1-.11.24-.3.36-.45c.12-.15.16-.24.24-.42c.08-.18.04-.35-.02-.46c-.06-.11-.48-1.15-.66-1.6c-.17-.43-.35-.37-.48-.37c-.12 0-.27 0-.42 0c-.15 0-.39.06-.6.3c-.2.24-.82.8-1.01 1.95c-.2 1.15.24 2.54.36 2.73c.12.2 1.57 2.45 3.8 3.35c.54.22.95.35 1.27.45c.56.17 1.07.15 1.47.09c.45-.07 1.35-.55 1.54-1.07c.2-.52.2-1 .14-1.12c-.07-.1-.2-.17-.4-.28z"
        />
    </svg>
);

type MessageAction = { label: string; onClick: () => void; };
type Message = { id: number; sender: 'user' | 'ai'; text?: string; imageUrl?: string; actions?: MessageAction[]; };

export default function AISupportWidget() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const router = useRouter();

    const abenaAvatar = PlaceHolderImages.find(p => p.id === 'ai-support-button');
    const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/employer') || pathname === '/hilladmin';

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

    const quickActions = [
        { label: 'Popular Jobs', icon: Zap, onClick: () => handleAction('Show me popular jobs', "Our top remote roles are currently at mPharma and Hubtel. Would you like to browse them?") },
        { label: 'Pricing', icon: MessageCircle, onClick: () => handleAction('Explain pricing', "We have Basic (Free), Pro (GH₵99/mo), and Enterprise tiers. Pro is our most popular for AI-driven matching.") },
        { label: 'WhatsApp', icon: WhatsAppIcon, onClick: () => {
            const link = `https://wa.me/233541988383?text=Hello%20Chapel%20Hill`;
            window.open(link, '_blank');
        }}
    ];

    const handleAction = (userText: string, aiText: string) => {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
            setIsTyping(false);
        }, 1200);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const text = inputValue;
        setInputValue('');
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "I'm processing that for you. As an AI demo, I'm currently focused on helping you find jobs and understand our platform features!" }]);
            setIsTyping(false);
        }, 1500);
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([{ id: 1, sender: 'ai', text: "Hello! I'm Abena, your AI executive assistant. How can I accelerate your career today?" }]);
                setIsTyping(false);
            }, 800);
        }
    }, [isOpen, messages.length]);

    useEffect(scrollToBottom, [messages, isTyping]);

    if (!mounted || isDashboardPage) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Box */}
            <div className={cn(
                "mb-4 w-[380px] h-[600px] flex flex-col bg-[#0B0F17]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 origin-bottom-right overflow-hidden",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
            )}>
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-primary/20 via-transparent to-accent/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 p-1 bg-white/5">
                                {abenaAvatar && <Image src={abenaAvatar.imageUrl} alt="Abena" width={40} height={40} className="object-contain" />}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F17] animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-headline font-black text-white text-lg tracking-tight">Abena AI</h3>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Executive Assistant</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full text-white/40 hover:text-white hover:bg-white/5">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {messages.map((m) => (
                        <div key={m.id} className={cn("flex", m.sender === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                                m.sender === 'user' 
                                    ? "bg-primary text-primary-foreground rounded-tr-none font-bold shadow-lg" 
                                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                            )}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-6 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={action.onClick}
                            className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all px-4 py-2 rounded-full text-xs font-black text-slate-300 uppercase tracking-widest"
                        >
                            <action.icon className="h-3 w-3 text-primary" />
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 bg-black/20">
                    <div className="relative">
                        <Input 
                            placeholder="Message Abena..." 
                            className="bg-white/5 border-white/10 h-12 pl-4 pr-12 rounded-xl text-white placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-white transition-colors">
                            <SendHorizonal className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                    isOpen ? "rotate-90" : "hover:scale-110"
                )}
            >
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full shadow-[0_0_20px_rgba(147,197,253,0.5)]" />
                <div className="relative z-10 text-black">
                    {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                </div>
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-background rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-[10px] font-black text-white">1</span>
                    </div>
                )}
            </button>
        </div>
    );
}
