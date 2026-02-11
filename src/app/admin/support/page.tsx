'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DUMMY_USERS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SendHorizonal, Search, Inbox, Archive, ChevronsRight, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';

type SupportTicket = {
    id: string;
    subject: string;
    user: typeof DUMMY_USERS[0];
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    priority: 'Low' | 'Medium' | 'High';
    messages: { from: 'user' | 'admin', text: string, date: string }[];
};

const DUMMY_TICKETS: SupportTicket[] = [
  {
    id: 'ticket-1',
    subject: 'Cannot upload my resume',
    user: DUMMY_USERS[0],
    date: '2024-07-28T10:00:00Z',
    status: 'Open',
    priority: 'High',
    messages: [
      { from: 'user', text: 'I keep getting an error when I try to upload my resume PDF. It says "File type not supported", but it is a PDF.', date: '2024-07-28T10:00:00Z' },
    ]
  },
  {
    id: 'ticket-2',
    subject: 'Question about Pro plan features',
    user: DUMMY_USERS[1],
    date: '2024-07-27T14:30:00Z',
    status: 'In Progress',
    priority: 'Medium',
    messages: [
      { from: 'user', text: 'Does the Pro plan include analytics for individual job posts?', date: '2024-07-27T14:30:00Z' },
      { from: 'admin', text: 'Hi Kofi, yes it does! You can view detailed analytics for each job post, including views, applicant demographics, and conversion rates.', date: '2024-07-27T14:45:00Z' },
    ]
  },
  {
    id: 'ticket-3',
    subject: 'Job post not showing up',
    user: DUMMY_USERS[2],
    date: '2024-07-26T09:00:00Z',
    status: 'Resolved',
    priority: 'High',
    messages: [
      { from: 'user', text: 'I posted a job yesterday but I cannot find it on the public job board.', date: '2024-07-26T09:00:00Z' },
      { from: 'admin', text: 'Hi Yaw, thanks for reaching out. It looks like your post was still pending admin approval. I have just approved it, and it should be live now.', date: '2024-07-26T09:15:00Z' },
      { from: 'user', text: 'Great, I see it now. Thanks!', date: '2024-07-26T09:20:00Z' },
    ]
  },
  {
    id: 'ticket-4',
    subject: 'Billing issue: double charged',
    user: DUMMY_USERS[13],
    date: '2024-07-28T11:00:00Z',
    status: 'Open',
    priority: 'High',
    messages: [
      { from: 'user', text: 'My company was double-charged for our Pro subscription this month. Can you please investigate?', date: '2024-07-28T11:00:00Z' },
    ]
  },
  {
    id: 'ticket-5',
    subject: 'How do I delete my account?',
    user: DUMMY_USERS[14],
    date: '2024-07-27T18:00:00Z',
    status: 'Resolved',
    priority: 'Low',
    messages: [
      { from: 'user', text: 'I can\'\'\'t find the option to delete my account.', date: '2024-07-27T18:00:00Z' },
      { from: 'admin', text: 'Hi Esi, you can find the option to delete your account in your dashboard under Settings > Danger Zone. Let us know if you need further assistance.', date: '2024-07-27T18:10:00Z' },
    ]
  }
];

const TicketTimestamp = ({ date }: { date: string }) => {
    const [timestamp, setTimestamp] = useState('');
    useEffect(() => {
        setTimestamp(formatDistanceToNow(new Date(date), { addSuffix: true }));
    }, [date]);
    if (!timestamp) return <p className="text-xs text-muted-foreground shrink-0">&nbsp;</p>;
    return <p className="text-xs text-muted-foreground shrink-0">{timestamp}</p>;
};

const MessageTimestamp = ({ date }: { date: string }) => {
    const [timestamp, setTimestamp] = useState('');
    useEffect(() => {
        setTimestamp(new Date(date).toLocaleString());
    }, [date]);
    if (!timestamp) return <p className="text-xs opacity-70">&nbsp;</p>;
    return <p className="text-xs opacity-70">{timestamp}</p>;
};


export default function AdminSupportPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>(DUMMY_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(tickets.length > 0 ? tickets[0] : null);

    const getPriorityBadgeClass = (priority: SupportTicket['priority']) => {
        switch (priority) {
            case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
            case 'Low': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            default: return 'bg-secondary';
        }
    };
    
    const getStatusBadgeClass = (status: SupportTicket['status']) => {
        switch (status) {
            case 'Open': return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'In Progress': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
            case 'Resolved': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
            default: return 'bg-secondary';
        }
    };

    const adminAvatar = PlaceHolderImages.find(p => p.id === 'avatar-2');

    return (
        <div className="h-full flex flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">Support Center</h1>
                <p className="text-muted-foreground">Manage and respond to user support tickets.</p>
            </div>
            <Card className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[700px] overflow-hidden">
                <div className="col-span-1 border-r flex flex-col bg-secondary/50">
                    <div className="p-4 border-b space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search tickets..." className="pl-9 bg-background" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="flex-1 justify-start gap-2"><Inbox className="h-4 w-4" /> Inbox ({tickets.filter(t => t.status !== 'Resolved').length})</Button>
                            <Button variant="ghost" className="flex-1 justify-start gap-2"><Archive className="h-4 w-4" /> Resolved ({tickets.filter(t => t.status === 'Resolved').length})</Button>
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        {tickets.map(ticket => (
                            <button
                                key={ticket.id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={cn(
                                    "w-full text-left p-4 border-b flex flex-col gap-2 hover:bg-muted transition-colors",
                                    selectedTicket?.id === ticket.id && "bg-primary/10 border-l-4 border-primary"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold truncate flex-1 pr-4">{ticket.subject}</p>
                                    <TicketTimestamp date={ticket.date} />
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{ticket.user.name}</p>
                                <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className={cn("text-xs font-medium", getStatusBadgeClass(ticket.status))}>{ticket.status}</Badge>
                                    <Badge variant="outline" className={cn("text-xs font-medium", getPriorityBadgeClass(ticket.priority))}>{ticket.priority}</Badge>
                                </div>
                            </button>
                        ))}
                    </ScrollArea>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                    {selectedTicket ? (
                        <>
                        <div className="p-4 border-b flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                                <div className="flex items-center gap-4 text-sm mt-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            {PlaceHolderImages.find(p => p.id === selectedTicket.user.avatar) && <AvatarImage src={PlaceHolderImages.find(p => p.id === selectedTicket.user.avatar)?.imageUrl} alt={selectedTicket.user.name} />}
                                            <AvatarFallback>{selectedTicket.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span>{selectedTicket.user.name}</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4"/>
                                    <Badge variant="outline" className={cn("text-xs", getStatusBadgeClass(selectedTicket.status))}>{selectedTicket.status}</Badge>
                                    <Badge variant="outline" className={cn("text-xs", getPriorityBadgeClass(selectedTicket.priority))}>{selectedTicket.priority}</Badge>
                                </div>
                            </div>
                            <Button variant="ghost">View User Profile</Button>
                        </div>
                        <ScrollArea className="flex-1 p-6 bg-secondary/30">
                            <div className="space-y-6">
                                {selectedTicket.messages.map((msg, index) => {
                                    const userAvatar = PlaceHolderImages.find(p => p.id === selectedTicket.user.avatar);
                                    const isAdmin = msg.from === 'admin';
                                    return (
                                        <div key={index} className={cn("flex gap-4 items-start", isAdmin ? 'flex-row-reverse' : 'flex-row')}>
                                            <Avatar className="h-10 w-10 border">
                                                {isAdmin ? (
                                                    <>
                                                        {adminAvatar && <AvatarImage src={adminAvatar.imageUrl} alt="Admin" />}
                                                        <AvatarFallback>A</AvatarFallback>
                                                    </>
                                                ) : (
                                                    <>
                                                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={selectedTicket.user.name} />}
                                                        <AvatarFallback>{selectedTicket.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </>
                                                )}
                                            </Avatar>
                                            <div className={cn("flex-1 rounded-lg border p-4 max-w-lg", isAdmin ? "bg-primary text-primary-foreground" : "bg-card")}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="font-semibold">{isAdmin ? 'Admin Support' : selectedTicket.user.name}</p>
                                                    <MessageTimestamp date={msg.date} />
                                                </div>
                                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t bg-background space-y-4">
                             <Textarea placeholder="Type your reply here..." className="flex-1" rows={4} />
                             <div className="flex justify-between items-center">
                                 <div className="flex gap-2">
                                     <Button variant="outline"> <ChevronsRight className="mr-2 h-4 w-4"/> Set as In Progress</Button>
                                     <Button variant="outline" className="text-green-600 border-green-600/20 hover:bg-green-500/10 hover:text-green-700"> <Archive className="mr-2 h-4 w-4"/> Mark as Resolved</Button>
                                 </div>
                                <Button className="bg-accent-gradient">
                                    <SendHorizonal className="mr-2 h-4 w-4" /> Send Reply
                                </Button>
                             </div>
                        </div>
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center text-muted-foreground bg-secondary/30">
                           <div className="text-center">
                               <MessageCircleQuestion className="h-16 w-16 mx-auto text-muted-foreground/50" />
                               <h3 className="mt-4 text-lg font-semibold">No Ticket Selected</h3>
                               <p className="mt-1 text-sm">Please select a ticket from the list to view the conversation.</p>
                           </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
