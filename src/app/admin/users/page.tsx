'use client';

import { useState } from 'react';
import { DUMMY_USERS } from '@/lib/data';
import type { User, UserRole } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, User as UserIcon, Upload, Loader2, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // State for create user dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProfessionalTitle, setNewProfessionalTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageUpload = () => {
      setIsUploading(true);
      setTimeout(() => {
          const randomImage = PlaceHolderImages.find(p => p.id === `avatar-${Math.floor(Math.random() * 24) + 1}`);
          if(randomImage) {
              setUploadedImageUrl(randomImage.imageUrl);
          }
          setIsUploading(false);
      }, 1500);
  };
  
  const resetCreateForm = () => {
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewProfessionalTitle('');
    setUploadedImageUrl(null);
  };
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();

    let permissionRole: UserRole = 'jobSeeker';
    if (['CEO', 'Director of Engineering'].includes(newProfessionalTitle)) {
        permissionRole = 'employer';
    } else if (['HR Specialist', 'Recruiter'].includes(newProfessionalTitle)) {
        permissionRole = 'recruiter';
    } else if (['Product Manager', 'Marketing Manager'].includes(newProfessionalTitle)) {
        permissionRole = 'hiringManager';
    } else if (['Admin', 'Administrator'].includes(newProfessionalTitle)) {
        permissionRole = 'admin';
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: `${newFirstName} ${newLastName}`,
      email: newEmail,
      role: permissionRole,
      professionalTitle: newProfessionalTitle,
      avatar: uploadedImageUrl ? (PlaceHolderImages.find(p => p.imageUrl === uploadedImageUrl)?.id || 'avatar-1') : 'avatar-1',
    };
    setUsers(prev => [newUser, ...prev]);
    toast({
      title: 'User Created',
      description: `${newUser.name} has been added to the platform.`,
      variant: 'vibrant'
    });
    setIsCreateDialogOpen(false);
    resetCreateForm();
  };
  
  const handleBanUser = (userName: string) => {
    toast({
      title: 'User Banned',
      description: `${userName} has been banned from the platform.`,
      variant: 'destructive'
    });
  };

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => roleFilter === 'all' || (user.professionalTitle || '').toLowerCase().replace(/ /g, '-') === roleFilter);

  const uniqueProfessionalTitles: string[] = [
    ...new Set(
      DUMMY_USERS
        .map(user => user.professionalTitle)
        .filter((title): title is string => !!title) // type guard
    )
  ];

  const getRoleBadgeClass = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (['developer', 'engineer', 'scientist', 'devops'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    }
    if (['manager', 'lead', 'ceo', 'director'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
    }
    if (['design', 'architect', 'actress'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-5/10 text-chart-5 border-chart-5/20';
    }
    if (['market', 'sale'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
     if (['analyst', 'research', 'qa', 'accountant', 'student', 'intern', 'lecturer'].some(term => lowerRole.includes(term))) {
        return 'bg-accent/10 text-accent border-accent/20';
    }
    return 'bg-secondary text-secondary-foreground';
  };


  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all users on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast({ title: 'Exporting Users...', description: 'This would trigger a CSV download.' })}><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button variant="outline" onClick={() => toast({ title: 'Importing Users...', description: 'This would open a file upload dialog.' })}><Upload className="mr-2 h-4 w-4" /> Import</Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-accent-gradient" onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleCreateUser}>
                <DialogHeader>
                    <DialogTitle>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <PlusCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span>Add New User</span>
                    </div>
                    </DialogTitle>
                    <DialogDescription>
                    Fill in the details below to create a new user account.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" value={newFirstName} onChange={e => setNewFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" value={newLastName} onChange={e => setNewLastName(e.target.value)} required />
                    </div>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                        ) : uploadedImageUrl ? (
                            <Image src={uploadedImageUrl} alt="Uploaded preview" width={60} height={60} className="rounded-full object-cover" />
                        ) : (
                            <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                        <p className="mt-2 text-sm text-muted-foreground">
                            {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Avatar selected. ' : 'Drag & drop or '}
                            {!uploadedImageUrl && !isUploading && (
                                <Button variant="link" className="p-0 h-auto" type="button" onClick={handleImageUpload}>click to upload</Button>
                            )}
                            {uploadedImageUrl && !isUploading && (
                                <Button variant="link" className="p-0 h-auto text-destructive" type="button" onClick={() => setUploadedImageUrl(null)}>Remove</Button>
                            )}
                        </p>
                    </div>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a strong password" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="role">Professional Title</Label>
                    <Select onValueChange={setNewProfessionalTitle} required>
                        <SelectTrigger id="role">
                        <SelectValue placeholder="Select a title" />
                        </SelectTrigger>
                        <SelectContent>
                        {uniqueProfessionalTitles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-accent-gradient">Create User</Button>
                </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by name or email..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
             <div className="flex gap-4">
                 <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {uniqueProfessionalTitles.map(role => (
                            <SelectItem key={role} value={role.toLowerCase().replace(/ /g, '-')}>{role}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => {
            const avatar = PlaceHolderImages.find((p) => p.id === user.avatar);
            return (
              <Card key={user.id} className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Avatar className="w-24 h-24 mb-4 border-4 border-secondary shadow-md">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
                  <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                
                {user.professionalTitle && (
                  <Badge variant="outline" className={cn("font-medium", getRoleBadgeClass(user.professionalTitle))}>
                      {user.professionalTitle}
                  </Badge>
                )}
                
                <div className="mt-6 w-full flex-1 flex flex-col justify-end">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>Joined: {new Date('2023-01-15').toLocaleDateString()}</span>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
                            </span>
                            Active
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <MoreHorizontal className="mr-2 h-4 w-4" />
                                Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => toast({ title: "Feature not implemented" })}><UserIcon className="mr-2"/>View Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({ title: "Feature not implemented" })}>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleBanUser(user.name)}>Ban User</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </Card>
            );
          })}
      </div>
      
        {filteredUsers.length === 0 && (
            <Card>
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">No users found.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
