export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  activeJobs: number;
};

export type Job = {
  id: string;
  title: string;
  company: Company;
  description: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experienceLevel: 'Entry' | 'Mid-level' | 'Senior';
  salaryRange: string;
  postedDate: string;
  isUrgent: boolean;
  skills: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
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
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: User;
  date: string;
  image: string; // image id from placeholder-images
  excerpt: string;
  content: string;
};
