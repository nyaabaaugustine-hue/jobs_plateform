import type { Job, Company, Review, Application, Applicant, User, BlogPost } from './types';
import { Briefcase, Code, Headset, Megaphone, PenTool, Search, Users, BookOpen, Palette, Wallet, BrainCircuit, GitMerge, KanbanSquare, Scale, Stethoscope, Clapperboard, GraduationCap, Handshake, Lightbulb, UserCog, Landmark } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

// This file is now primarily for static configuration data like categories.
// All dynamic data like jobs, companies, users, etc., will be fetched from Firestore.

export const JOB_CATEGORIES = [
    { name: 'Content Writer', jobCount: '29 Jobs', icon: PenTool, color: 'text-sky-800', iconBgColor: 'bg-sky-100' },
    { name: 'Market Research', jobCount: '7 Jobs', icon: Search, color: 'text-violet-800', iconBgColor: 'bg-violet-100' },
    { name: 'Marketing & Sale', jobCount: '9 Jobs', icon: Megaphone, color: 'text-amber-800', iconBgColor: 'bg-amber-100' },
    { name: 'Customer Help', jobCount: '4 Jobs', icon: Headset, color: 'text-rose-800', iconBgColor: 'bg-rose-100' },
    { name: 'Finance', jobCount: '9 Jobs', icon: Landmark, color: 'text-emerald-800', iconBgColor: 'bg-emerald-100' },
    { name: 'Software', jobCount: '4 Jobs', icon: Code, color: 'text-cyan-800', iconBgColor: 'bg-cyan-100' },
    { name: 'Human Resource', jobCount: '10 Jobs', icon: UserCog, color: 'text-fuchsia-800', iconBgColor: 'bg-fuchsia-100' },
    { name: 'Management', jobCount: '6 Jobs', icon: Briefcase, color: 'text-indigo-800', iconBgColor: 'bg-indigo-100' },
    { name: 'Design', jobCount: '5 Jobs', icon: Palette, color: 'text-pink-800', iconBgColor: 'bg-pink-100' },
    { name: 'Education', jobCount: '12 Jobs', icon: BookOpen, color: 'text-orange-800', iconBgColor: 'bg-orange-100' },
    { name: 'Data Science', jobCount: '8 Jobs', icon: BrainCircuit, color: 'text-blue-800', iconBgColor: 'bg-blue-100' },
    { name: 'DevOps', jobCount: '5 Jobs', icon: GitMerge, color: 'text-teal-800', iconBgColor: 'bg-teal-100' },
    { name: 'Product Management', jobCount: '7 Jobs', icon: KanbanSquare, color: 'text-purple-800', iconBgColor: 'bg-purple-100' },
    { name: 'Legal', jobCount: '3 Jobs', icon: Scale, color: 'text-gray-800', iconBgColor: 'bg-gray-100' },
    { name: 'Healthcare', jobCount: '11 Jobs', icon: Stethoscope, color: 'text-red-800', iconBgColor: 'bg-red-100' },
    { name: 'Media', jobCount: '6 Jobs', icon: Clapperboard, color: 'text-yellow-800', iconBgColor: 'bg-yellow-100' },
  ];

export const DUMMY_OPPORTUNITIES = [
  {
    icon: GraduationCap,
    title: 'Student Attachments',
    description: 'Gain real-world experience with leading companies in your field of study. Bridge the gap between theory and practice.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    link: '/jobs?type=Internship'
  },
  {
    icon: Handshake,
    title: 'Volunteer Programs',
    description: 'Make an impact by contributing your skills to NGOs and community projects. Build your network and character.',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    link: '/jobs?type=Volunteer'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Challenges',
    description: 'Participate in student-focused innovation challenges and hackathons sponsored by top tech firms.',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
    link: '#'
  }
];
