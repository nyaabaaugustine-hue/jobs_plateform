
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, SendHorizonal, X, Loader, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

type Message = {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    actions?: {
        label: string;
        onClick: () => void;
    }[];
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.8.48 3.55 1.38 5.06L2 22l5.2-1.52c1.46.84 3.15 1.31 4.84 1.31h.01c5.46 0 9.9-4.44 9.9-9.9c0-5.45-4.44-9.9-9.9-9.9zM12.04 20.15h-.01c-1.5 0-2.98-.4-4.29-1.15l-.3-.18l-3.18.93l.95-3.1l-.2-.31c-.83-1.3-1.28-2.83-1.28-4.43c0-4.54 3.7-8.24 8.24-8.24c4.54 0 8.24 3.7 8.24 8.24c0 4.54-3.7 8.24-8.23 8.24zM17.39 14.15c-.2-.11-.7-.35-1.18-.59c-.48-.24-.83-.42-1.07-.42c-.24 0-.48.11-.66.35c-.18.24-.7.83-.86 1c-.16.18-.3.2-.48.1c-.18-.11-1.13-.42-2.15-1.32c-.8-.7-1.34-1.58-1.52-1.85c-.18-.28-.01-.43.1-.57c.1-.11.24-.3.36-.45c.12-.15.16-.24.24-.42c.08-.18.04-.35-.02-.46c-.06-.11-.48-1.15-.66-1.6c-.17-.43-.35-.37-.48-.37c-.12 0-.27 0-.42 0c-.15 0-.39.06-.6.3c-.2.24-.82.8-1.01 1.95c-.2 1.15.24 2.54.36 2.73c.12.2 1.57 2.45 3.8 3.35c.54.22.95.35 1.27.45c.56.17 1.07.15 1.47.09c.45-.07 1.35-.55 1.54-1.07c.2-.52.2-1 .14-1.12c-.07-.1-.2-.17-.4-.28z"
        />
    </svg>
);

export default function AISupportWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const router = useRouter();
    
    const aiButtonImage = PlaceHolderImages.find((img) => img.id === 'ai-support-button');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

     const handleShowPopularJob = () => {
        const userMessage: Message = { id: Date.now(), sender: 'user', text: "Show me popular jobs" };
        
        setMessages(prev =>
            prev.map(m => (m.actions ? { ...m, actions: undefined } : m)).concat(userMessage)
        );

        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "Our most popular opening right now is 'Senior React Developer' at Innovate Inc. It's a great remote opportunity with a competitive salary. Would you like to see it?",
                actions: [{
                    label: 'View Job Details',
                    onClick: () => {
                        toast({
                            title: "Navigating to Job...",
                            description: "Opening the 'Senior React Developer' position.",
                            variant: 'vibrant',
                        });
                        router.push('/jobs/job-1');
                        setIsOpen(false);
                    }
                }]
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1800);
    };

    const handleExplainPricing = () => {
        const userMessage: Message = { id: Date.now(), sender: 'user', text: "Explain pricing plans" };
        
        setMessages(prev =>
            prev.map(m => (m.actions ? { ...m, actions: undefined } : m)).concat(userMessage)
        );

        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "We have three main plans:\n\n- **Basic**: Free, for getting started.\n- **Pro**: Our most popular plan for growing teams, with more job posts and AI features.\n- **Enterprise**: Custom solutions for large organizations.",
                actions: [{
                    label: 'View Pricing Details',
                    onClick: () => {
                        toast({
                            title: "Navigating to Pricing...",
                            variant: 'vibrant',
                        });
                        router.push('/pricing');
                        setIsOpen(false);
                    }
                }]
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1800);
    };
    
    const handleOpenWhatsApp = () => {
        const adminPhoneNumber = "233541988383";
        const prefilledMessage = "Hello, I have a question about the platform.";
        const whatsappLink = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;
        window.open(whatsappLink, '_blank');
        toast({
            title: "Opening WhatsApp...",
            description: "Connecting you with an admin.",
            variant: 'vibrant',
        });
    };

    useEffect(() => {
        if (isOpen) {
            setIsTyping(true);
            setTimeout(() => {
                const initialAiMessage: Message = {
                    id: 1,
                    sender: 'ai',
                    text: "Hello! I'm your AI Support Assistant. How can I help you today? Here are a few things I can do:",
                    actions: [
                        {
                            label: 'Show popular jobs',
                            onClick: handleShowPopularJob,
                        },
                        {
                            label: 'Explain pricing plans',
                            onClick: handleExplainPricing,
                        },
                        {
                            label: 'Chat on WhatsApp',
                            onClick: handleOpenWhatsApp,
                        }
                    ]
                };
                setMessages([initialAiMessage]);
                setIsTyping(false);
            }, 1500);
        } else {
            // Reset chat when closed
            setMessages([]);
            setInputValue('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    
    useEffect(scrollToBottom, [messages, isTyping]);
    
    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage: Message = { id: Date.now(), sender: 'user', text: inputValue };
        
        setMessages(prev => 
            prev.map(m => (m.actions ? { ...m, actions: undefined } : m)).concat(userMessage)
        );

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
                                "flex w-full items-end gap-3 animate-fade-in-up",
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                            )}>
                                {message.sender === 'ai' && <Bot className="h-7 w-7 text-primary shrink-0 mb-1" />}
                                
                                <div className={cn(
                                    "px-4 py-2.5 rounded-xl max-w-[85%] text-sm",
                                    message.sender === 'user'
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                                )}>
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                    {message.actions && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {message.actions.map((action, index) => {
                                                const isWhatsApp = action.label.includes('WhatsApp');
                                                return (
                                                    <Button
                                                        key={index}
                                                        size="sm"
                                                        className={cn(
                                                            "border",
                                                            isWhatsApp 
                                                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
                                                                : "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                                                        )}
                                                        onClick={action.onClick}
                                                    >
                                                        {isWhatsApp ? <WhatsAppIcon className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-3 w-3" />}
                                                        {action.label}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                {message.sender === 'user' && <User className="h-7 w-7 text-muted-foreground shrink-0 mb-1" />}
                            </div>
                        ))}
                         {isTyping && (
                            <div className="flex items-end gap-3 animate-fade-in-up justify-start">
                                <Bot className="h-7 w-7 text-primary shrink-0 mb-1" />
                                <div className="px-4 py-2.5 rounded-xl bg-secondary rounded-bl-none">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]" />
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]" />
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
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
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "relative w-16 h-16 rounded-full overflow-hidden shadow-2xl bg-black transition-all duration-300 ease-out hover:scale-105 ring-2 ring-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]",
                                isOpen && 'scale-0 opacity-0'
                            )}
                        >
                            <div className="absolute inset-0 w-full h-full">
                                {aiButtonImage && (
                                <Image
                                    src={aiButtonImage.imageUrl}
                                    alt={aiButtonImage.description}
                                    fill
                                    className="object-cover"
                                />
                                )}
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-black/80 text-white border-white/20">
                        <p>Chat with AI Support</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}
