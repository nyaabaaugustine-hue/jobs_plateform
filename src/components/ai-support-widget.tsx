
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bot, SendHorizonal, X, Sparkles, User, Zap, Loader2, Target, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirebase } from '@/firebase/provider';
import { runCareerAssistant } from '@/lib/actions';

type Message = { id: number; sender: 'user' | 'ai'; text: string; };

export default function AISupportWidget() {
    const [mounted, setMounted] = useState(false);
    const { user } = useFirebase();
    const pathname = usePathname();
    const { toast } = useToast();
    
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [suggestedActions, setSuggestedActions] = useState<string[]>(['Analyze my skills', 'Find jobs', 'Optimize CV']);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abenaAvatar = PlaceHolderImages.find(p => p.id === 'ai-support-button');
    
    const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/employer') || pathname === '/hilladmin';

    useEffect(() => { setMounted(true); }, []);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;
        
        const userMsg: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        const history = messages.map(m => ({ role: m.sender, text: m.text }));

        try {
            const response = await runCareerAssistant({
                query: text,
                isLoggedIn: !!user,
                userData: user ? {
                    name: user.displayName || undefined,
                    professionalTitle: 'Senior Professional', // Fallback for demo
                    skills: ['React', 'Next.js', 'TypeScript'], // Fallback for demo
                } : undefined,
                history
            });

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response.text }]);
            if (response.suggestedActions) {
                setSuggestedActions(response.suggestedActions);
            }
        } catch (error) {
            toast({
                title: "Assistant Error",
                description: "Failed to connect to AI services.",
                variant: "destructive"
            });
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeText = user 
                ? `Hello ${user.displayName || 'there'}! I'm Abena, your AI executive assistant. How can I accelerate your career today?`
                : "Welcome to Chapel Hill! I'm Abena. Sign in to unlock my personalized career features, or ask me for general career advice!";
            
            setMessages([{ id: 1, sender: 'ai', text: welcomeText }]);
        }
    }, [isOpen, user, messages.length]);

    useEffect(scrollToBottom, [messages, isTyping]);

    if (!mounted || isDashboardPage) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Glass Chat Box */}
            <div className={cn(
                "mb-4 w-[380px] h-[600px] flex flex-col bg-[#0B0F17]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] transition-all duration-500 origin-bottom-right overflow-hidden",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
            )}>
                {/* Executive Header */}
                <div className="p-8 bg-gradient-to-br from-primary/20 via-transparent to-accent/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 p-1 bg-white/5">
                                {abenaAvatar && <Image src={abenaAvatar.imageUrl} alt="Abena" width={48} height={48} className="object-contain" />}
                            </div>
                            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-[#0B0F17] animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-headline font-black text-white text-xl tracking-tight">Abena AI</h3>
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-gold" />
                                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Executive Assistant</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full text-white/40 hover:text-white hover:bg-white/5 h-10 w-10">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Intelligent Feed */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    {messages.map((m) => (
                        <div key={m.id} className={cn("flex", m.sender === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed",
                                m.sender === 'user' 
                                    ? "bg-primary text-primary-foreground rounded-tr-none font-bold shadow-xl border border-white/10" 
                                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-medium"
                            )}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] rounded-tl-none flex items-center gap-2">
                                <Loader2 className="h-4 w-4 text-primary animate-spin" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-primary animate-pulse">Abena is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Innovation Chips */}
                <div className="px-8 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                    {suggestedActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => handleSendMessage(action)}
                            className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/10 transition-all px-5 py-2.5 rounded-full text-[10px] font-black text-slate-300 uppercase tracking-widest"
                        >
                            <TrendingUp className="h-3 w-3 text-gold" />
                            {action}
                        </button>
                    ))}
                </div>

                {/* Command Input */}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="p-8 border-t border-white/5 bg-black/40">
                    <div className="relative">
                        <Input 
                            placeholder="Ask Abena for career advice..." 
                            className="bg-white/5 border-white/10 h-14 pl-6 pr-14 rounded-2xl text-white placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary text-base font-medium transition-all"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isTyping}
                        />
                        <button 
                            type="submit" 
                            disabled={!inputValue.trim() || isTyping}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-primary hover:text-gold transition-all disabled:opacity-30"
                        >
                            <SendHorizonal className="h-6 w-6" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Living Orb Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700",
                    isOpen ? "rotate-90" : "hover:scale-110 active:scale-95"
                )}
            >
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow opacity-40 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-gold rounded-full shadow-[0_0_40px_rgba(147,197,253,0.6)]" />
                <div className="relative z-10 text-black">
                    {isOpen ? <X className="h-10 w-10 stroke-[3]" /> : <Bot className="h-10 w-10 stroke-[2]" />}
                </div>
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-[3px] border-[#0B0F17] rounded-full flex items-center justify-center animate-bounce shadow-xl">
                        <span className="text-[10px] font-black text-white">1</span>
                    </div>
                )}
            </button>
        </div>
    );
}
