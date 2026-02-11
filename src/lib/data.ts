import type { Job, Company, Review, Application, Applicant, User, BlogPost } from './types';
import { Briefcase, Code, Headset, Megaphone, PenTool, Search, Users, BookOpen, Palette, Wallet, BrainCircuit, GitMerge, KanbanSquare, Scale, Stethoscope, Clapperboard, GraduationCap, Handshake, Lightbulb, UserCog, Landmark } from 'lucide-react';

export const DUMMY_COMPANIES: Company[] = Array.from({ length: 24 }, (_, i) => {
    const names = [
        "Innovate Inc.", "QuantumLeap", "Synergy Corp", "DataDriven", "PixelPerfect", 
        "HealthFirst", "EcoSolutions", "NextGen Edu", "Zenith Media", "BuildRight", 
        "AgroPlus", "FinSecure", "TechNova", "GreenScape", "BioGen", "CyberSafe", 
        "AquaPure", "Solaris", "LogiChain", "Medica", "RoboCorp", "Archinnovate", 
        "Retail-e", "Fintex"
    ];
    return {
        id: `${i + 1}`,
        name: names[i] || `Company ${i + 1}`,
        logo: `company-logo-${i + 1}`,
        industry: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Retail'][i % 6],
        location: ['Accra, Ghana', 'Kumasi, Ghana', 'Takoradi, Ghana', 'Tema, Ghana'][i % 4],
        description: 'A leading company in its field.',
        website: `${names[i]?.toLowerCase().replace(/ /g, '')}.com`,
        employerId: `employer-${i+1}`,
        activeJobs: Math.floor(Math.random() * 10) + 1,
        rating: Math.round((Math.random() * (5 - 3.5) + 3.5) * 10) / 10,
    };
});

export const DUMMY_USERS: User[] = Array.from({ length: 24 }, (_, i) => {
    const firstNames = ['Ama', 'Kofi', 'Adwoa', 'Yaw', 'Esi', 'Kwame', 'Akua', 'Kwadwo'];
    const lastNames = ['Mensah', 'Addo', 'Owusu', 'Adjei', 'Serwaa', 'Boateng', 'Asare', 'Osei'];
    const roles = ['Software Developer', 'Product Manager', 'UX/UI Designer', 'Data Scientist', 'Marketing Manager', 'HR Specialist', 'Financial Analyst', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'Content Writer', 'Sales Executive', 'Accountant', 'Student', 'Intern', 'Lecturer', 'Actress', 'Film Director', 'CEO', 'Director of Engineering'];
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    return {
        id: `user-${i + 1}`,
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        avatar: `avatar-${i + 1}`,
        role: roles[i % roles.length],
    };
});

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

export const DUMMY_JOBS: Job[] = Array.from({ length: 20 }, (_, i) => {
    const company = DUMMY_COMPANIES[i % DUMMY_COMPANIES.length];
    const category = JOB_CATEGORIES[i % JOB_CATEGORIES.length].name;
    const types: Job['type'][] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer'];
    const experienceLevels: Job['experienceLevel'][] = ['Entry', 'Mid-level', 'Senior'];
    return {
        id: `job-${i + 1}`,
        title: `${experienceLevels[i%3]} ${category.slice(0,-1)}`,
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: company,
        location: ['Accra', 'Kumasi', 'Remote'][i % 3],
        type: types[i % types.length],
        experienceLevel: experienceLevels[i % experienceLevels.length],
        salaryRange: `GH₵${(i+1) * 2}k - GH₵${(i+1) * 3}k`,
        skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL', 'Figma', 'Project Management'].slice(i % 4, (i % 4) + 3),
        isUrgent: i % 5 === 0,
        postedDate: new Date(new Date().setDate(new Date().getDate() - (i * 2 + 1))).toISOString(),
        category: category,
    };
});

export const DUMMY_APPLICANTS: Applicant[] = DUMMY_USERS.slice(0, 20).map((user, i) => ({
    id: `applicant-${i + 1}`,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    jobId: DUMMY_JOBS[i % DUMMY_JOBS.length].id,
    skillMatch: Math.floor(Math.random() * (98 - 65 + 1)) + 65,
    experience: Math.floor(Math.random() * 10) + 1,
    status: ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'][i % 7] as any,
}));

export const DUMMY_APPLICATIONS: Application[] = DUMMY_APPLICANTS.map((applicant, i) => ({
  id: `app-${i + 1}`,
  job: DUMMY_JOBS.find(j => j.id === applicant.jobId)!,
  user: DUMMY_USERS.find(u => u.email === applicant.email)!,
  status: applicant.status,
  appliedDate: new Date(new Date('2024-07-01').getTime() + i * 24 * 60 * 60 * 1000).toISOString(),
}));

export const DUMMY_REVIEWS: Review[] = DUMMY_USERS.slice(0, 6).map((user, i) => ({
    id: `review-${i + 1}`,
    user: user,
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    comment: [
        "This platform helped me find my dream job in just two weeks! The platform is intuitive and the recommendations were spot on.",
        "As a hiring manager, this is my go-to. We found our new lead developer here and the process was seamless.",
        "Great selection of jobs. The application tracker is a fantastic feature that kept me organized.",
        "The quality of employers on this platform is top-notch. I received multiple offers.",
        "A fantastic resource for anyone in the tech industry. I highly recommend it.",
        "User-friendly interface and very relevant job matches. A huge time-saver."
    ][i]
}));

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
        excerpt: 'Learn how to leverage React Hooks to write cleaner, more efficient, and more readable code in your applications.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-2',
        date: '2024-07-15T12:00:00Z',
        author: DUMMY_USERS[0],
        status: 'Published',
    },
    {
        id: '2',
        slug: 'ace-your-next-tech-interview',
        title: 'How to Ace Your Next Tech Interview',
        excerpt: 'A comprehensive guide on preparing for and succeeding in technical interviews, from coding challenges to system design.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-1',
        date: '2024-07-10T12:00:00Z',
        author: DUMMY_USERS[1],
        status: 'Published',
    },
    {
        id: '3',
        slug: 'building-a-strong-developer-portfolio',
        title: 'Building a Strong Developer Portfolio',
        excerpt: 'Your portfolio is your digital resume. Learn the key elements of a portfolio that will impress hiring managers.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-3',
        date: '2024-07-05T12:00:00Z',
        author: DUMMY_USERS[2],
        status: 'Published',
    },
    {
        id: '4',
        slug: 'the-rise-of-serverless',
        title: 'The Rise of Serverless Architecture',
        excerpt: 'Explore the benefits of serverless and how it is changing the way we build and deploy applications.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-4',
        date: '2024-06-28T12:00:00Z',
        author: DUMMY_USERS[3],
        status: 'Published',
    },
    {
        id: '5',
        slug: 'state-management-in-react',
        title: 'Choosing the Right State Management Library',
        excerpt: 'Redux, MobX, or Context API? We break down the pros and cons of each to help you decide.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-5',
        date: '2024-06-20T12:00:00Z',
        author: DUMMY_USERS[4],
        status: 'Draft',
    },
    {
        id: '6',
        slug: 'the-future-of-remote-work',
        title: 'The Future of Remote Work: Trends & Predictions',
        excerpt: 'Remote work is here to stay. Discover the trends shaping the future of how we work.',
        content: 'Full blog post content goes here...',
        image: 'blog-post-6',
        date: '2024-06-12T12:00:00Z',
        author: DUMMY_USERS[5],
        status: 'Published',
    }
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
