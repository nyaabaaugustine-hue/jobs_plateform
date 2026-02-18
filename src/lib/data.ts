import type { Job, Company, Review, Application, Applicant, User, BlogPost, UserRole } from './types';
import { Users, BookOpen, Palette, BrainCircuit, GitMerge, KanbanSquare, Scale, Stethoscope, Clapperboard, GraduationCap, Handshake, Lightbulb } from 'lucide-react';

const ghanaianCompanies = [
    { id: '1', name: "mPharma", industry: "Healthcare", logo: 'company-logo-1' },
    { id: '2', name: "Hubtel", industry: "Fintech", logo: 'company-logo-2' },
    { id: '3', name: "MTN Ghana", industry: "Telecommunications", logo: 'company-logo-3' },
    { id: '4', name: "GCB Bank", industry: "Banking", logo: 'company-logo-4' },
    { id: '5', name: "Stanbic Bank", industry: "Banking", logo: 'company-logo-5' },
    { id: '6', name: "GOIL", industry: "Oil & Gas", logo: 'company-logo-6' },
    { id: '7', name: "Vodafone Ghana", industry: "Telecommunications", logo: 'company-logo-7' },
    { id: '8', name: "Ecobank Ghana", industry: "Banking", logo: 'company-logo-8' },
    { id: '9', name: "KPMG Ghana", industry: "Consulting", logo: 'company-logo-9' },
    { id: '10', name: "PwC Ghana", industry: "Professional Services", logo: 'company-logo-10' },
    { id: '11', name: "Ashesi University", industry: "Education", logo: 'company-logo-11' },
    { id: '12', name: "Nyaho Medical Centre", industry: "Healthcare", logo: 'company-logo-12' },
];


export const DUMMY_COMPANIES: Company[] = ghanaianCompanies.map((company, i) => {
    const ratings = [4.5, 4.8, 4.2, 4.9, 4.6, 4.7, 4.3, 4.4, 4.8, 4.1, 4.0, 4.9];
    const jobCounts = [5, 8, 3, 12, 6, 9, 2, 7, 10, 4, 1, 15];
    
    return {
        id: company.id,
        name: company.name,
        logo: company.logo,
        industry: company.industry,
        location: ['Accra, Ghana', 'Kumasi, Ghana', 'Takoradi, Ghana', 'Tema, Ghana'][i % 4],
        description: `A leading company in ${company.industry}.`,
        website: `${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.gh`,
        employerId: `employer-${i+1}`,
        activeJobs: jobCounts[i],
        rating: ratings[i],
    };
});

export const DUMMY_USERS: User[] = Array.from({ length: 24 }, (_, i) => {
    const firstNames = ['Ama', 'Kofi', 'Adwoa', 'Yaw', 'Esi', 'Kwame', 'Akua', 'Kwadwo'];
    const lastNames = ['Mensah', 'Addo', 'Owusu', 'Adjei', 'Serwaa', 'Boateng', 'Asare', 'Osei'];
    const professionalTitles = ['Software Developer', 'Product Manager', 'UX/UI Designer', 'Data Scientist', 'Marketing Manager', 'HR Specialist', 'Financial Analyst', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'Content Writer', 'Sales Executive', 'Accountant', 'Student', 'Intern', 'Lecturer', 'Actress', 'Film Director', 'CEO', 'Director of Engineering'];
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    const professionalTitle = professionalTitles[i % professionalTitles.length];

    let permissionRole: UserRole = 'jobSeeker';
    if (['CEO', 'Director of Engineering'].includes(professionalTitle)) {
        permissionRole = 'employer';
    } else if (['HR Specialist'].includes(professionalTitle)) {
        permissionRole = 'recruiter';
    } else if (['Product Manager', 'Marketing Manager'].includes(professionalTitle)) {
        permissionRole = 'hiringManager';
    }

    if (i === 2) permissionRole = 'admin'; // Override for one admin user for demo.

    return {
        id: `user-${i + 1}`,
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        avatar: `avatar-${i + 1}`,
        role: permissionRole,
        professionalTitle: professionalTitle,
    };
});

export const JOB_CATEGORIES = [
    { name: 'Technology', jobCount: '29 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015383/lightning_j3bwjz.png' },
    { name: 'Marketing', jobCount: '7 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015387/marketing_bcsgf7.png' },
    { name: 'Design', jobCount: '9 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015374/customer_respcf.png' },
    { name: 'Finance', jobCount: '4 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015374/finance_qznfzg.png' },
    { name: 'Management', jobCount: '9 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015384/management_rzmraf.png' },
    { name: 'Software', jobCount: '4 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015383/lightning_j3bwjz.png' },
    { name: 'Healthcare', jobCount: '10 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015374/human_fyw51x.png' },
    { name: 'Education', jobCount: '6 Jobs', icon: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771015388/research_cmzjlb.png' },
    { name: 'Data Science', jobCount: '5 Jobs', icon: BrainCircuit },
  ];

export const DUMMY_JOBS: Job[] = [
    {
        id: 'job-1',
        title: 'Entry Content Writer',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'mPharma')!,
        location: 'Accra',
        type: 'Full-time',
        experienceLevel: 'Entry',
        salaryRange: 'GH₵2k - GH₵3k',
        skills: ['React', 'TypeScript', 'Node.js'],
        isUrgent: true,
        postedDate: new Date(Date.now() - 86400000).toISOString(),
        category: 'Technology',
        aiPriorityScore: 87
    },
    {
        id: 'job-2',
        title: 'Mid-level Market Research',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'Hubtel')!,
        location: 'Kumasi',
        type: 'Part-time',
        experienceLevel: 'Mid-level',
        salaryRange: 'GH₵4k - GH₵6k',
        skills: ['TypeScript', 'Node.js', 'Next.js'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 259200000).toISOString(),
        category: 'Marketing',
        aiPriorityScore: 84
    },
    {
        id: 'job-3',
        title: 'Senior Marketing & Sale',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'MTN Ghana')!,
        location: 'Remote',
        type: 'Contract',
        experienceLevel: 'Senior',
        salaryRange: 'GH₵6k - GH₵9k',
        skills: ['Node.js', 'Next.js', 'GraphQL'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 432000000).toISOString(),
        category: 'Design',
        aiPriorityScore: 80
    },
    {
        id: 'job-4',
        title: 'Entry Customer Help',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'GCB Bank')!,
        location: 'Accra',
        type: 'Internship',
        experienceLevel: 'Entry',
        salaryRange: 'GH₵8k - GH₵12k',
        skills: ['Next.js', 'GraphQL', 'Figma'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 604800000).toISOString(),
        category: 'Finance',
        aiPriorityScore: 98
    },
    {
        id: 'job-5',
        title: 'Entry Finance',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'Stanbic Bank')!,
        location: 'Kumasi',
        type: 'Volunteer',
        experienceLevel: 'Entry',
        salaryRange: 'GH₵10k - GH₵15k',
        skills: ['React', 'TypeScript', 'Node.js'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 777600000).toISOString(),
        category: 'Management',
        aiPriorityScore: 75
    },
    {
        id: 'job-6',
        title: 'Senior Software',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'GOIL')!,
        location: 'Remote',
        type: 'Full-time',
        experienceLevel: 'Senior',
        salaryRange: 'GH₵12k - GH₵18k',
        skills: ['TypeScript', 'Node.js', 'Next.js'],
        isUrgent: true,
        postedDate: new Date(Date.now() - 950400000).toISOString(),
        category: 'Software',
        aiPriorityScore: 93
    },
    {
        id: 'job-7',
        title: 'Entry Human Resource',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'Vodafone Ghana')!,
        location: 'Accra',
        type: 'Part-time',
        experienceLevel: 'Entry',
        salaryRange: 'GH₵14k - GH₵21k',
        skills: ['Node.js', 'Next.js', 'GraphQL'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 1123200000).toISOString(),
        category: 'Healthcare',
        aiPriorityScore: 88
    },
    {
        id: 'job-8',
        title: 'Mid-level Management',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'Ecobank Ghana')!,
        location: 'Kumasi',
        type: 'Contract',
        experienceLevel: 'Mid-level',
        salaryRange: 'GH₵16k - GH₵24k',
        skills: ['Next.js', 'GraphQL', 'Figma'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 1296000000).toISOString(),
        category: 'Education',
        aiPriorityScore: 82
    },
    {
        id: 'job-9',
        title: 'Entry Design',
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: DUMMY_COMPANIES.find(c => c.name === 'KPMG Ghana')!,
        location: 'Remote',
        type: 'Internship',
        experienceLevel: 'Entry',
        salaryRange: 'GH₵18k - GH₵27k',
        skills: ['React', 'TypeScript', 'Node.js'],
        isUrgent: false,
        postedDate: new Date(Date.now() - 1468800000).toISOString(),
        category: 'Data Science',
        aiPriorityScore: 85
    }
];

export const DUMMY_APPLICANTS: Applicant[] = DUMMY_USERS.slice(0, 20).map((user, i) => {
    return {
        id: `applicant-${i + 1}`,
        userId: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        jobId: DUMMY_JOBS[i % DUMMY_JOBS.length]?.id || 'job-1',
        skillMatch: 85,
        experience: 5,
        status: 'New',
    };
});

export const DUMMY_APPLICATIONS: Application[] = DUMMY_APPLICANTS.map((applicant, i) => {
    const job = DUMMY_JOBS.find(j => j.id === applicant.jobId);
    const user = DUMMY_USERS.find(u => u.email === applicant.email);

    if (!job || !user) {
        return null;
    }

    return {
        id: `app-${i + 1}`,
        job: job,
        user: user,
        status: 'APPLIED',
        appliedDate: new Date().toISOString(),
        jobId: job.id,
        applicantId: user.id,
        companyId: job.company.id,
        employerId: job.company.employerId,
    };
}).filter((app): app is Application => app !== null);


export const DUMMY_REVIEWS: Review[] = DUMMY_USERS.slice(0, 6).map((user, i) => {
    return {
        id: `review-${i + 1}`,
        user: user,
        rating: 5,
        comment: "This platform helped me find my dream job in just two weeks!"
    };
});

export const DUMMY_LOCATIONS = [
  { name: 'Accra', jobs: 120, companies: 45, imageId: 'location-accra' },
  { name: 'Kumasi', jobs: 80, companies: 25, imageId: 'location-kumasi' },
  { name: 'Takoradi', jobs: 50, companies: 15, imageId: 'location-takoradi' },
  { name: 'Cape Coast', jobs: 30, companies: 10, imageId: 'location-cape-coast' },
  { name: 'Tamale', jobs: 25, companies: 8, imageId: 'location-tamale' },
  { name: 'Tema', jobs: 40, companies: 20, imageId: 'location-tema' },
];

export const DUMMY_BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'mastering-react-hooks',
        title: 'Mastering React Hooks: A Deep Dive',
        excerpt: 'Learn how to leverage React Hooks to write cleaner, more efficient code.',
        content: '<p>React Hooks are awesome...</p>',
        image: 'blog-post-2',
        date: '2024-07-15T12:00:00Z',
        author: DUMMY_USERS[0],
        status: 'Published',
    }
];

export const DUMMY_OPPORTUNITIES = [
  {
    icon: GraduationCap,
    title: 'Student Attachments',
    description: 'Gain real-world experience with leading companies in your field of study.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    filterValue: 'internship',
  },
  {
    icon: Handshake,
    title: 'Volunteer Programs',
    description: 'Make an impact by contributing your skills to NGOs and community projects.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    filterValue: 'volunteer',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Challenges',
    description: 'Participate in student-focused innovation challenges and hackathons.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    filterValue: 'all',
  }
];