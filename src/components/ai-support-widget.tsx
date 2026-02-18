
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
    X, 
    Sparkles, 
    Loader2, 
    TrendingUp, 
    ChevronUp, 
    ChevronDown, 
    Briefcase, 
    FileText, 
    Target, 
    Zap, 
    Award,
    LayoutGrid,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import { runCareerAssistant } from '@/lib/actions';

type Message = { 
    id: number; 
    sender: 'user' | 'ai'; 
    text: string; 
    image?: string;
    isIntro?: boolean;
};

const QUICK_ACTIONS = [
    { label: 'Smart Job Match', icon: Search, category: 'Search', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Optimize My CV', icon: FileText, category: 'Resume', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Interview Prep', icon: Target, category: 'Growth', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Cover Letter', icon: Award, category: 'Resume', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { label: 'Salary Insights', icon: TrendingUp, category: 'Market', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Career Roadmap', icon: Briefcase, category: 'Growth', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
];

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
    const abenaAvatar = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771168493/eds_bjytks.png";
    const introImage = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771205327/straight_yqwg78.png";
    
    const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/employer') || pathname === '/hilladmin' || pathname === '/login' || pathname === '/register';

    useEffect(() => { setMounted(true); }, []);

    const scrollToBottom = () => {
        if (!messagesEndRef.current) return;
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;
        
        const userMsg: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);
        setShowActions(false);

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
            setIsTyping(false);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeText = user 
                ? `Hello ${user.displayName || 'there'}! I'm Abena, your AI executive assistant. How can I accelerate your career today?`
                : "Welcome to Chapel Hill! I'm Abena. Sign in to unlock my personalized career features, or ask me for general career advice!";
            
            setMessages([{ 
                id: 1, 
                sender: 'ai', 
                text: welcomeText,
                image: introImage,
                isIntro: true
            }]);
        }
    }, [isOpen, user, messages.length]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(scrollToBottom, 300);
            return () => clearTimeout(timer);
        }
    }, [messages, isTyping, isOpen]);

    if (!mounted || isDashboardPage) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[320px] h-[520px] flex flex-col bg-[#0B0F17]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        <div className="p-6 bg-gradient-to-br from-primary/20 via-transparent to-accent/5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 p-0.5 bg-white/5 shadow-inner">
                                        <Image src={abenaAvatar} alt="Abena" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B0F17] animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-headline font-black text-white text-base tracking-tight">Abena AI</h3>
                                    <div className="flex items-center gap-1">
                                        <Sparkles className="h-2.5 w-2.5 text-gold" />
                                        <p className="text-[8px] uppercase font-black tracking-[0.2em] text-primary">Executive Assistant</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="rounded-full text-white/40 hover:text-white hover:bg-white/5 p-1 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((m) => (
                                <div key={m.id} className={cn("flex flex-col", m.sender === 'user' ? "items-end" : "items-start")}>
                                    {m.isIntro && m.image ? (
                                        <div className="relative mb-3 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group aspect-square">
                                            <Image 
                                                src={m.image} 
                                                alt="Assistant Intro" 
                                                fill 
                                                className="object-contain scale-105" 
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                                                    <p className="text-white text-[11px] font-bold leading-relaxed shadow-lg">
                                                        {m.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {m.image && (
                                                <div className="mb-3 w-full max-w-[220px] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
                                                    <Image 
                                                        src={m.image} 
                                                        alt="AI Graphic" 
                                                        width={220} 
                                                        height={220} 
                                                        className="w-full h-auto object-contain" 
                                                    />
                                                </div>
                                            )}
                                            <div className={cn(
                                                "max-w-[90%] p-4 rounded-[1.25rem] text-[11px] leading-relaxed",
                                                m.sender === 'user' 
                                                    ? "bg-primary text-primary-foreground rounded-tr-none font-bold shadow-xl border border-white/10" 
                                                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-medium"
                                            )}>
                                                {m.text}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-[1.25rem] rounded-tl-none flex items-center gap-2">
                                        <Loader2 className="h-3 w-3 text-primary animate-spin" />
                                        <span className="text-[8px] uppercase font-black tracking-widest text-primary animate-pulse">Analyzing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-px w-full" />
                        </div>

                        <div className="relative">
                            <AnimatePresence>
                                {showActions && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        className="absolute bottom-0 left-0 right-0 z-50 bg-[#151C2B] border-t border-white/10 p-5 rounded-t-[1.5rem] shadow-2xl"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Abena Tools</h4>
                                            <button onClick={() => setShowActions(false)} className="text-white/40 hover:text-white transition-colors">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {QUICK_ACTIONS.map((action, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSendMessage(action.label)}
                                                    className={cn(
                                                        "flex flex-col items-start gap-2 p-3 rounded-xl bg-white/5 border transition-all group text-left",
                                                        action.border,
                                                        "hover:border-primary/50 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className={cn("p-1.5 rounded-lg transition-all group-hover:scale-110 shadow-lg", action.bg, action.color)}>
                                                        <action.icon className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-white tracking-tight">{action.label}</p>
                                                        <p className={cn("text-[7px] uppercase font-black tracking-widest mt-0.5 opacity-60", action.color)}>{action.category}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6 border-t border-white/5 bg-black/40">
                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => setShowActions(!showActions)}
                                        className="w-full flex items-center justify-between px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <LayoutGrid className="h-3 w-3 text-primary" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Quick Actions</span>
                                        </div>
                                        {showActions ? <ChevronDown className="h-3 w-3 text-slate-500" /> : <ChevronUp className="h-3 w-3 text-slate-500 group-hover:translate-y-[-1px] transition-transform" />}
                                    </button>

                                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="relative">
                                        <Input 
                                            placeholder="Ask Abena..." 
                                            className="bg-white/5 border-white/10 h-11 pl-4 pr-11 rounded-xl text-white placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary text-sm font-medium transition-all"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            disabled={isTyping}
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={!inputValue.trim() || isTyping}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-gold transition-all disabled:opacity-30"
                                        >
                                            <Zap className="h-5 w-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all duration-700",
                    isOpen ? "rotate-90" : "hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(147,197,253,0.3)]"
                )}
            >
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow opacity-40 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-gold rounded-full shadow-[0_0_30px_rgba(147,197,253,0.6)]" />
                <div className="relative z-10 text-black">
                    {isOpen ? (
                        <X className="h-6 w-6 stroke-[3]" />
                    ) : (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-black/10">
                            <Image src={abenaAvatar} alt="AI" width={28} height={28} className="object-contain" />
                        </div>
                    )}
                </div>
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#0B0F17] rounded-full flex items-center justify-center animate-bounce shadow-xl">
                        <span className="text-[8px] font-black text-white">1</span>
                    </div>
                )}
            </button>
        </div>
    );
}
