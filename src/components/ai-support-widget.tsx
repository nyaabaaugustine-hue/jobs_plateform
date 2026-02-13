
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, SendHorizonal, X, Loader, CornerDownLeft, Sparkles, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Message = {
    id: number;
    sender: 'user' | 'ai';
    text: string;
};

type QuickAction = {
    label: string;
    action: () => void;
};

export default function AISupportWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    { id: 1, sender: 'ai', text: "Hello! I'm your AI Support Assistant. How can I help you find your next opportunity or top-tier talent today?" }
                ]);
                setIsTyping(false);
            }, 1500);
        } else {
            // Reset chat when closed
            setMessages([]);
            setInputValue('');
        }
    }, [isOpen]);
    
    useEffect(scrollToBottom, [messages, isTyping]);
    
    const handleQuickAction = (text: string, response: string) => {
        const userMessage: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = { id: Date.now() + 1, sender: 'ai', text: response };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1200);
    };

    const quickActions: QuickAction[] = [
        { label: 'View Pricing', action: () => handleQuickAction('Tell me about pricing.', 'Of course! Our pricing is designed to be flexible. We have a free Basic plan, a Pro plan for growing teams at GH₵99/month, and custom Enterprise solutions. You can see all the details on our pricing page!') },
        { label: 'Post a Job', action: () => handleQuickAction('How do I post a job?', 'Posting a job is easy! Just head over to our "Post a Job" page, fill in the details about the role, and you can publish it in minutes. Our Pro plan allows for multiple job posts.') },
        { label: 'Browse Candidates', action: () => handleQuickAction('Can I browse candidates?', 'Absolutely. Our "Browse Candidates" section lets you discover top talent. With a Pro plan, you get unlimited views and access to our AI matching feature to find the perfect fit faster.') },
    ];
    
    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage: Message = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = { id: Date.now() + 1, sender: 'ai', text: "Thank you for your message. As an AI assistant for a demo application, I'm here to showcase a conversational UI. For specific queries, please explore the navigation links!" };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1800);
    };

    return (
        <TooltipProvider>
            <div className="fixed bottom-6 right-6 z-50">
                {/* Chat Panel */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsOpen(false)} />
                )}
                <div 
                    className={cn(
                        "fixed bottom-6 right-6 w-[calc(100vw-3rem)] max-w-sm h-[75vh] max-h-[600px] flex flex-col bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out z-50",
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
                    )}
                >
                    {/* Header */}
                    <header className="p-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                             <div className="relative">
                                <Bot className="h-7 w-7 text-white" />
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-card" />
                            </div>
                            <div>
                                <h2 className="font-bold text-base text-white">AI Support Assistant</h2>
                                <p className="text-xs text-gray-300">Online</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </header>
                    
                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={cn(
                                "flex gap-2 items-end animate-fade-in-up",
                                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                            )}>
                                {message.sender === 'ai' && <Bot className="h-6 w-6 text-primary shrink-0 mb-1" />}
                                <div className={cn(
                                    "px-4 py-2.5 rounded-xl max-w-[85%] text-sm",
                                    message.sender === 'user'
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                                )}>
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                        ))}
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                                {quickActions.map(qa => (
                                     <Button key={qa.label} variant="outline" size="sm" className="rounded-full bg-secondary/80 border-primary/20 hover:bg-primary/20" onClick={() => qa.action()}>
                                        {qa.label}
                                    </Button>
                                ))}
                            </div>
                        )}
                         {isTyping && (
                            <div className="flex gap-2 items-end animate-fade-in-up">
                                <Bot className="h-6 w-6 text-primary shrink-0 mb-1" />
                                <div className="px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground rounded-bl-none">
                                    <div className="flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]" />
                                        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]" />
                                        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Input */}
                    <footer className="p-4 border-t border-white/10 shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                             <Input
                                placeholder="Type a message..."
                                className="flex-1 bg-background/50 border-white/20 placeholder:text-gray-400 focus-visible:ring-primary"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button type="submit" size="icon" className="bg-accent-gradient" disabled={!inputValue || isTyping}>
                                <SendHorizonal className="h-5 w-5" />
                            </Button>
                        </form>
                    </footer>
                </div>

                {/* Floating Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "h-16 w-16 rounded-full bg-accent-gradient p-0 shadow-lg hover:scale-110 active:scale-105 transition-all duration-300 animate-pulse-glow",
                                isOpen && 'scale-0 opacity-0'
                            )}
                        >
                            <Sparkles className="h-8 w-8 text-white" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-black/80 text-white border-white/20">
                        <p>Chat with AI Support</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}

