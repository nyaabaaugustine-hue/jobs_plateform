
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

export type User = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar: string; // URL to avatar image
  role: string;
};

export type Job = {
  id:string;
  title: string;
  description: string;
  company: Company;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Volunteer';
  experienceLevel: 'Entry' | 'Mid-level' | 'Senior';
  salaryRange: string;
  skills: string[];
  isUrgent: boolean;
  postedDate: string;
  employerId?: string;
  category?: string;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
};

export type Application = {
  id: string;
  job: Job;
  user: User;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
  coverLetter?: string;
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
  image: string;
  date: string;
  author: User;
  status: 'Published' | 'Draft';
  
  // Fields for firestore that we are not using with demo data
  imageUrl?: string;
  imageHint?: string;
};
