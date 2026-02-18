'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
    Bot, 
    SendHorizonal, 
    X, 
    Sparkles, 
    Loader2, 
    TrendingUp, 
    ChevronUp, 
    ChevronDown, 
    Briefcase, 
    FileText, 
    Target, 
    MessageCircle, 
    Zap, 
    Award,
    Plus,
    LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirebase } from '@/firebase/provider';
import { runCareerAssistant } from '@/lib/actions';

type Message = { id: number; sender: 'user' | 'ai'; text: string; };

const QUICK_ACTIONS = [
    { label: 'Smart Job Match', icon: SearchIcon, category: 'Search' },
    { label: 'Optimize My CV', icon: FileText, category: 'Resume' },
    { label: 'Interview Prep', icon: Target, category: 'Growth' },
    { label: 'Cover Letter', icon: Award, category: 'Resume' },
    { label: 'Salary Insights', icon: TrendingUp, category: 'Market' },
    { label: 'Career Roadmap', icon: Briefcase, category: 'Growth' },
];

function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

export default function AISupportWidget() {
    const [mounted, setMounted] = useState(false);
    const { user } = useFirebase();
    const pathname = usePathname();
    const { toast } = useToast();
    
    const [isOpen, setIsOpen] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
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
        setShowActions(false); // Close actions on send

        const history = messages.map(m => ({ role: m.sender, text: m.text }));

        try {
            const response = await runCareerAssistant({
                query: text,
                isLoggedIn: !!user,
                userData: user ? {
                    name: user.displayName || undefined,
                    professionalTitle: 'Senior Professional', 
                    skills: ['React', 'Next.js', 'TypeScript'], 
                } : undefined,
                history
            });

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response.text }]);
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
            {/* Innovation: Glass Chat Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[400px] h-[650px] flex flex-col bg-[#0B0F17]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        {/* Executive Header */}
                        <div className="p-8 bg-gradient-to-br from-primary/20 via-transparent to-accent/5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 p-1 bg-white/5 shadow-inner">
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
                                        <span className="text-[10px] uppercase font-black tracking-widest text-primary animate-pulse">Analyzing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Innovation: Action Deck Panel */}
                        <div className="relative">
                            <AnimatePresence>
                                {showActions && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        className="absolute bottom-0 left-0 right-0 z-50 bg-[#151C2B] border-t border-white/10 p-6 rounded-t-[2rem] shadow-2xl"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Abena Tools</h4>
                                            <Button variant="ghost" size="icon" onClick={() => setShowActions(false)} className="h-6 w-6 rounded-full text-white/40">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {QUICK_ACTIONS.map((action, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSendMessage(action.label)}
                                                    className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all group text-left"
                                                >
                                                    <div className="p-2 rounded-xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                                                        <action.icon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-white tracking-tight">{action.label}</p>
                                                        <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-0.5">{action.category}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Interaction Bar */}
                            <div className="p-8 border-t border-white/5 bg-black/40">
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={() => setShowActions(!showActions)}
                                        className="w-full flex items-center justify-between px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LayoutGrid className="h-4 w-4 text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Quick Actions</span>
                                        </div>
                                        {showActions ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronUp className="h-4 w-4 text-slate-500 group-hover:translate-y-[-2px] transition-transform" />}
                                    </button>

                                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="relative">
                                        <Input 
                                            placeholder="Ask Abena anything..." 
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Living Orb Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700",
                    isOpen ? "rotate-90" : "hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(147,197,253,0.3)]"
                )}
            >
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow opacity-40 blur-2xl" />
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
