

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  employerId: string;
  size?: string;
  subscriptionTier?: 'basic' | 'pro' | 'enterprise';
  // Non-schema fields
  activeJobs?: number;
  rating?: number;
};

export type UserRole = 'jobSeeker' | 'employer' | 'recruiter' | 'hiringManager' | 'admin';

export type User = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar: string; // URL to avatar image
  role: UserRole;
  professionalTitle?: string;
  companyId?: string;
  profileData?: {
    skills?: string[];
    education?: any[];
    experience?: any[];
    resumeUrl?: string;
    profileStrength?: number;
  };
  aiScore?: number;
  resumeEmbedding?: string;
};

export type Job = {
  id:string;
  title: string;
  description: string;
  requirements?: string;
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
  jobEmbedding?: string;
  aiPriorityScore?: number;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
};

export type ApplicationStatus = 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';

export type Application = {
  id: string;
  job: Job;
  user: User; // In a real app, this might just be applicantId
  status: ApplicationStatus;
  appliedDate: string;
  jobId: string;
  applicantId: string;
  companyId: string;
  employerId: string;
  resumeUrl?: string;
  coverLetter?: string;
  aiMatchScore?: number;
  screeningScore?: number;
  interviewScore?: number;
  interviewDate?: string;
  offerDetails?: string;
  pipelineStage?: string;
  timelineEvents?: any[];
};

export type Applicant = {
  id: string;
  userId: string;
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
  status: 'Published' | 'Draft' | 'Pending Review' | 'Rejected';
  
  // Fields for firestore that we are not using with demo data
  imageUrl?: string;
  imageHint?: string;
};
