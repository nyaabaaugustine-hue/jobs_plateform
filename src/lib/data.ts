import type { Job, Company, Review, Application, Applicant } from './types';

export const DUMMY_COMPANIES: Company[] = [
  { id: '1', name: 'Innovate Inc.', logo: 'company-logo-1', industry: 'Tech', activeJobs: 5 },
  { id: '2', name: 'QuantumLeap', logo: 'company-logo-2', industry: 'AI', activeJobs: 3 },
  { id: '3', name: 'Synergy Corp', logo: 'company-logo-3', industry: 'Finance', activeJobs: 8 },
  { id: '4', name: 'PixelPerfect', logo: 'company-logo-4', industry: 'Design', activeJobs: 2 },
  { id: '5', name: 'DataDriven', logo: 'company-logo-5', industry: 'Analytics', activeJobs: 10 },
  { id: '6', name: 'HealthFirst', logo: 'company-logo-6', industry: 'Healthcare', activeJobs: 4 },
];

export const DUMMY_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: DUMMY_COMPANIES[0],
    description:
      'We are looking for a seasoned React developer to join our team. You will be responsible for building and maintaining our web applications.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: '$120k - $160k',
    postedDate: '2024-05-15',
    isUrgent: true,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  },
  {
    id: '2',
    title: 'Mid-level Next.js Developer',
    company: DUMMY_COMPANIES[1],
    description: 'Join our innovative team to work on exciting Next.js projects. Experience with Vercel is a plus.',
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryRange: '$90k - $110k',
    postedDate: '2024-05-14',
    isUrgent: false,
    skills: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: '3',
    title: 'Frontend Engineer (React)',
    company: DUMMY_COMPANIES[2],
    description:
      'Synergy Corp is hiring a frontend engineer to help build our next-generation financial platform.',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryRange: '$110k - $130k',
    postedDate: '2024-05-12',
    isUrgent: false,
    skills: ['React', 'Redux', 'TypeScript', 'Jest'],
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: DUMMY_COMPANIES[3],
    description: 'PixelPerfect is looking for a mobile developer with React Native expertise to create beautiful apps.',
    location: 'Los Angeles, CA',
    type: 'Contract',
    experienceLevel: 'Senior',
    salaryRange: '$100/hr',
    postedDate: '2024-05-10',
    isUrgent: true,
    skills: ['React Native', 'iOS', 'Android'],
  },
  {
    id: '5',
    title: 'Entry-level React Developer',
    company: DUMMY_COMPANIES[4],
    description: 'A great opportunity for a junior developer to grow their skills in a data-driven environment.',
    location: 'Chicago, IL',
    type: 'Full-time',
    experienceLevel: 'Entry',
    salaryRange: '$70k - $85k',
    postedDate: '2024-05-16',
    isUrgent: false,
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: '6',
    title: 'Full-stack Engineer',
    company: DUMMY_COMPANIES[5],
    description:
      'HealthFirst needs a full-stack engineer with React and Node.js experience to improve our healthcare platform.',
    location: 'Boston, MA',
    type: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryRange: '$100k - $125k',
    postedDate: '2024-05-13',
    isUrgent: false,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
];

export const DUMMY_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'avatar-1', role: 'Senior Developer' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', avatar: 'avatar-2', role: 'Product Manager' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'avatar-3', role: 'Designer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', avatar: 'avatar-4', role: 'Frontend Developer' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', avatar: 'avatar-5', role: 'Backend Developer' },
];

export const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    user: DUMMY_USERS[0],
    rating: 5,
    comment: 'ReactHire helped me find my dream job in just two weeks! The platform is intuitive and the recommendations were spot on.',
  },
  {
    id: '2',
    user: DUMMY_USERS[1],
    rating: 5,
    comment: 'As a hiring manager, ReactHire is my go-to. We found our new lead developer here and the process was seamless.',
  },
  {
    id: '3',
    user: DUMMY_USERS[3],
    rating: 4,
    comment: 'Great selection of jobs. The application tracker is a fantastic feature that kept me organized.',
  },
];

export const DUMMY_APPLICATIONS: Application[] = [
  { id: '1', job: DUMMY_JOBS[0], user: DUMMY_USERS[0], status: 'Interview', appliedDate: '2024-05-10' },
  { id: '2', job: DUMMY_JOBS[1], user: DUMMY_USERS[0], status: 'Applied', appliedDate: '2024-05-15' },
  { id: '3', job: DUMMY_JOBS[2], user: DUMMY_USERS[0], status: 'Offer', appliedDate: '2024-05-01' },
  { id: '4', job: DUMMY_JOBS[3], user: DUMMY_USERS[0], status: 'Rejected', appliedDate: '2024-04-20' },
  { id: '5', job: DUMMY_JOBS[4], user: DUMMY_USERS[0], status: 'Hired', appliedDate: '2024-03-15' },
  { id: '6', job: DUMMY_JOBS[5], user: DUMMY_USERS[0], status: 'Screening', appliedDate: '2024-05-12' },
];

export const DUMMY_APPLICANTS: Applicant[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'avatar-1', jobId: '1', skillMatch: 95, experience: 5, status: 'Interview' },
  { id: '2', name: 'Diana Prince', email: 'diana@example.com', avatar: 'avatar-4', jobId: '1', skillMatch: 88, experience: 3, status: 'Shortlisted' },
  { id: '3', name: 'Ethan Hunt', email: 'ethan@example.com', avatar: 'avatar-5', jobId: '1', skillMatch: 82, experience: 7, status: 'Reviewed' },
  { id: '4', name: 'Frank Castle', email: 'frank@example.com', avatar: 'avatar-1', jobId: '1', skillMatch: 75, experience: 2, status: 'New' },
  { id: '5', name: 'Grace Hopper', email: 'grace@example.com', avatar: 'avatar-2', jobId: '1', skillMatch: 60, experience: 1, status: 'Rejected' },
];
