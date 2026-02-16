
'use client'

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DUMMY_APPLICANTS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SendHorizonal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Message = { from: 'me' | 'them'; text: string; };

type Conversation = {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    messages: Message[];
};

const conversationsData: Conversation[] = DUMMY_APPLICANTS.slice(0, 8).map(applicant => ({
    id: applicant.id,
    name: applicant.name,
    avatar: applicant.avatar,
    lastMessage: "Sounds great, thank you for the opportunity! I look forward to hearing from you.",
    lastMessageTime: "5m",
    messages: [
        { from: 'them', text: "Hi, thanks for applying! We'd like to schedule an interview." },
        { from: 'me', text: "That's great news! I'm available tomorrow afternoon." },
        { from: 'them', text: "Perfect. Does 2 PM work for you?" },
        { from: 'me', text: "Yes, 2 PM works perfectly." },
        { from: 'me', text: "Sounds great, thank you for the opportunity! I look forward to hearing from you." },
    ]
}));

export default function EmployerMessagesPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(conversationsData);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = { from: 'me', text: messageText };
    
    const newSelectedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText
    };

    const updatedConversations = conversations.map(convo =>
      convo.id === selectedConversation.id ? newSelectedConversation : convo
    );

    setConversations(updatedConversations);
    setSelectedConversation(newSelectedConversation);
    setMessageText('');
    toast({ title: "Message Sent", variant: 'vibrant' });
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h1 className="font-headline text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with applicants and your team.</p>
      </div>
      <Card className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px] overflow-hidden">
        <div className="col-span-1 border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-9" />
                </div>
            </div>
            <ScrollArea className="flex-1">
                {conversations.map(convo => {
                    const avatar = PlaceHolderImages.find(p => p.id === convo.avatar);
                    return (
                        <button 
                            key={convo.id} 
                            onClick={() => setSelectedConversation(convo)}
                            className={cn(
                                "w-full text-left p-4 border-b flex gap-3 hover:bg-secondary transition-colors",
                                selectedConversation?.id === convo.id && "bg-secondary"
                            )}
                        >
                            <Avatar>
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={convo.name} />}
                                <AvatarFallback>{convo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{convo.name}</p>
                                    <p className="text-xs text-muted-foreground">{convo.lastMessageTime}</p>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                            </div>
                        </button>
                    )
                })}
            </ScrollArea>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
            {selectedConversation ? (
                <>
                <div className="p-4 border-b flex items-center gap-3">
                     <Avatar>
                        {PlaceHolderImages.find(p => p.id === selectedConversation.avatar) && <AvatarImage src={PlaceHolderImages.find(p => p.id === selectedConversation.avatar)?.imageUrl} alt={selectedConversation.name} />}
                        <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{selectedConversation.name}</p>
                </div>
                <ScrollArea className="flex-1 p-6 bg-secondary">
                    <div className="space-y-4">
                        {selectedConversation.messages.map((msg, index) => (
                             <div key={index} className={cn("flex", msg.from === 'me' ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 text-sm",
                                    msg.from === 'me' ? "bg-emerald-200 dark:bg-emerald-800 text-foreground rounded-br-none" : "bg-card border rounded-bl-none"
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <Input 
                            placeholder="Type a message..." 
                            className="flex-1" 
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <Button type="submit">
                            <SendHorizonal className="mr-2" /> Send
                        </Button>
                    </form>
                </div>
                </>
            ) : (
                <div className="flex flex-1 items-center justify-center text-muted-foreground">
                    <p>Select a conversation to start messaging.</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
}
