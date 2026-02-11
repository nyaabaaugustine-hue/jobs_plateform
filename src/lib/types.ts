
import type { FieldValue } from 'firebase/firestore';

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  employerId: string;
  // Non-schema fields
  activeJobs?: number;
  rating?: number;
};

export type Job = {
  id:string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Volunteer';
  experienceLevel: 'Entry' | 'Mid-level' | 'Senior';
  salaryRange: string;
  skills: string[];
  isUrgent: boolean;
  postedDate: FieldValue | string;
  employerId: string;
  category?: string;
};

export type User = {
  id: string;
  name: string; // This might be split into firstName/lastName in your Firestore doc
  firstName?: string;
  lastName?: string;
  email: string;
  avatar: string; // URL to avatar image
  role: 'jobSeeker' | 'employer' | 'admin';
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  employerId: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: FieldValue | string;
  coverLetter?: string;
  // These are for denormalization on the user's application record
  job?: Job; 
  user?: User;
};

export type Applicant = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  jobId: string;
  skillMatch: number;
  experience: number; // years
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  coverLetter?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  authorName: string;
  authorId: string;
  publishedDate: FieldValue | string;
  isPublished: boolean;
};
