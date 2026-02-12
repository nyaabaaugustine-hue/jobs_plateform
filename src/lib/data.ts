
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
    const ratings = [4.5, 4.8, 4.2, 4.9, 4.6, 4.7, 4.3, 4.4, 4.8, 4.1, 4.0, 4.9, 4.7, 4.6, 4.2, 4.8, 4.5, 4.9, 4.3, 4.7, 4.1, 4.6, 4.4, 4.8];
    const jobCounts = [5, 8, 3, 12, 6, 9, 2, 7, 10, 4, 1, 15, 8, 5, 3, 11, 6, 9, 2, 7, 4, 8, 5, 10];
    return {
        id: `${i + 1}`,
        name: names[i] || `Company ${i + 1}`,
        logo: `company-logo-${i + 1}`,
        industry: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Retail'][i % 6],
        location: ['Accra, Ghana', 'Kumasi, Ghana', 'Takoradi, Ghana', 'Tema, Ghana'][i % 4],
        description: 'A leading company in its field.',
        website: `${names[i]?.toLowerCase().replace(/ /g, '')}.com`,
        employerId: `employer-${i+1}`,
        activeJobs: jobCounts[i],
        rating: ratings[i],
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
    const company = DUMMY_COMPANIES[i % 4];
    const category = JOB_CATEGORIES[i % JOB_CATEGORIES.length].name;
    const types: Job['type'][] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer'];
    const experienceLevels: Job['experienceLevel'][] = ['Entry', 'Mid-level', 'Senior'];

    const jobType = types[i % types.length];
    let experienceLevel: Job['experienceLevel'];

    if (jobType === 'Internship' || jobType === 'Volunteer') {
        experienceLevel = 'Entry';
    } else {
        experienceLevel = experienceLevels[i % experienceLevels.length];
    }

    return {
        id: `job-${i + 1}`,
        title: `${experienceLevel} ${category}`,
        description: 'We are looking for a talented individual to join our team. This role involves developing and maintaining our core products, collaborating with cross-functional teams to deliver high-quality solutions.',
        company: company,
        location: ['Accra', 'Kumasi', 'Remote'][i % 3],
        type: jobType,
        experienceLevel: experienceLevel,
        salaryRange: `GH₵${(i+1) * 2}k - GH₵${(i+1) * 3}k`,
        skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL', 'Figma', 'Project Management'].slice(i % 4, (i % 4) + 3),
        isUrgent: i % 5 === 0,
        postedDate: new Date(new Date().setDate(new Date().getDate() - (i * 2 + 1))).toISOString(),
        category: category,
    };
});

export const DUMMY_APPLICANTS: Applicant[] = DUMMY_USERS.slice(0, 20).map((user, i) => {
    const skillMatches = [88, 92, 75, 95, 82, 78, 91, 85, 93, 76, 89, 94, 81, 79, 96, 83, 87, 90, 84, 86];
    const experiences = [5, 2, 8, 1, 10, 3, 6, 4, 7, 9, 5, 2, 8, 1, 10, 3, 6, 4, 7, 9];
    return {
        id: `applicant-${i + 1}`,
        userId: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        jobId: DUMMY_JOBS[i % DUMMY_JOBS.length].id,
        skillMatch: skillMatches[i],
        experience: experiences[i],
        status: ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'][i % 7] as any,
    };
});

export const DUMMY_APPLICATIONS: Application[] = DUMMY_APPLICANTS.map((applicant, i) => {
    const job = DUMMY_JOBS.find(j => j.id === applicant.jobId);
    const user = DUMMY_USERS.find(u => u.email === applicant.email);

    if (!job || !user) {
        return null;
    }

    let applicationStatus: Application['status'];
    switch (applicant.status) {
        case 'New':
            applicationStatus = 'Applied';
            break;
        case 'Reviewed':
        case 'Shortlisted':
            applicationStatus = 'Screening';
            break;
        case 'Interview':
            applicationStatus = 'Interview';
            break;
        case 'Offer':
            applicationStatus = 'Offer';
            break;
        case 'Hired':
            applicationStatus = 'Hired';
            break;
        case 'Rejected':
            applicationStatus = 'Rejected';
            break;
        default:
            applicationStatus = 'Applied';
    }

    return {
        id: `app-${i + 1}`,
        job: job,
        user: user,
        status: applicationStatus,
        appliedDate: new Date(new Date('2024-07-01').getTime() + i * 24 * 60 * 60 * 1000).toISOString(),
    };
}).filter((app): app is Application => app !== null);


export const DUMMY_REVIEWS: Review[] = DUMMY_USERS.slice(0, 6).map((user, i) => {
    const ratings = [5, 5, 4, 5, 4, 5];
    return {
        id: `review-${i + 1}`,
        user: user,
        rating: ratings[i],
        comment: [
            "This platform helped me find my dream job in just two weeks! The platform is intuitive and the recommendations were spot on.",
            "As a hiring manager, this is my go-to. We found our new lead developer here and the process was seamless.",
            "Great selection of jobs. The application tracker is a fantastic feature that kept me organized.",
            "The quality of employers on this platform is top-notch. I received multiple offers.",
            "A fantastic resource for anyone in the tech industry. I highly recommend it.",
            "User-friendly interface and very relevant job matches. A huge time-saver."
        ][i]
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
        excerpt: 'Learn how to leverage React Hooks to write cleaner, more efficient, and more readable code in your applications.',
        content: `
            <p>React Hooks, introduced in React 16.8, revolutionized how we write components. They allow you to use state and other React features without writing a class. This post will take you on a deep dive into the most essential Hooks and how to use them effectively.</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">The Power of <code>useState</code></h3>
            <p>The <code>useState</code> Hook is the most fundamental Hook. It lets you add React state to function components. Before Hooks, you would need a class component to manage state. Now, it's as simple as this:</p>
            <pre><code class="language-javascript">const [count, setCount] = useState(0);</code></pre>
            <p>Here, <code>count</code> is our state variable, and <code>setCount</code> is the function to update it. We can now use these in our component to display and update a counter.</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">Handling Side Effects with <code>useEffect</code></h3>
            <p>The <code>useEffect</code> Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. <code>useEffect</code> runs after every render by default, but you can control when it runs.</p>
            <blockquote class="border-l-4 border-primary pl-4 italic my-4">
              "Think of <code>useEffect</code> Hook as <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code> combined."
            </blockquote>
            <p>By providing a dependency array, you can tell React to only re-run the effect if one of the dependencies has changed. An empty dependency array (<code>[]</code>) means the effect will only run once, after the initial render, mimicking <code>componentDidMount</code>.</p>
        `,
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
        content: `
            <p>The technical interview is a daunting hurdle for many developers. However, with the right preparation, you can confidently showcase your skills and land your dream job. This guide breaks down the process into manageable steps.</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">1. Master the Fundamentals</h3>
            <p>Before diving into complex algorithms, ensure you have a rock-solid understanding of data structures (Arrays, Linked Lists, Trees, Graphs, etc.) and algorithms (Sorting, Searching). This is the foundation upon which everything else is built.</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">2. Practice, Practice, Practice</h3>
            <p>Use platforms like LeetCode, HackerRank, or Codewars to solve coding challenges regularly. This will improve your problem-solving speed and familiarity with common patterns.</p>
            <ul class="list-disc list-inside space-y-2 my-4">
                <li>Start with easy problems to build confidence.</li>
                <li>Move to medium and hard problems as you improve.</li>
                <li>Time yourself to simulate interview conditions.</li>
            </ul>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">3. The Behavioral Interview</h3>
            <p>Don't neglect the behavioral questions! Prepare to talk about your past projects, challenges you've faced, and how you work in a team. Use the STAR method (Situation, Task, Action, Result) to structure your answers.</p>
        `,
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
        content: `
            <p>A portfolio is often the first thing a recruiter or hiring manager looks at. It's your chance to make a strong first impression. Here’s how to build one that stands out.</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">Showcase Your Best Work</h3>
            <p>Quality over quantity. It's better to have 2-3 polished, impressive projects than 10 small, unfinished ones. For each project, include:</p>
            <ul class="list-disc list-inside space-y-2 my-4">
                <li>A live demo link.</li>
                <li>A link to the source code (e.g., on GitHub).</li>
                <li>A clear description of the project, the technologies used, and your role in it.</li>
            </ul>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">Write a Compelling "About Me" Section</h3>
            <p>This is your chance to tell your story. What are you passionate about? What are your career goals? Let your personality shine through.</p>
            <blockquote class="border-l-4 border-primary pl-4 italic my-4">
              "Your portfolio should not just show what you can do, but also who you are."
            </blockquote>
        `,
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
        content: '<p>Serverless computing allows you to build and run applications and services without thinking about servers. It eliminates infrastructure management tasks like server or cluster provisioning, patching, operating system maintenance, and capacity provisioning. While the name is "serverless", servers are still running the code. The term refers to the fact that the tasks associated with infrastructure provisioning and management are invisible to the developer.</p><p>This approach enables developers to focus on their core product instead of worrying about managing and operating servers or runtimes, either in the cloud or on-premises. This reduced overhead lets developers reclaim time and energy that can be spent on developing great products which scale and are reliable.</p>',
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
        content: '<p>Choosing a state management solution is a critical decision in any React application. While React\'s built-in Context API is powerful for passing data through the component tree without having to pass props down manually at every level, it has limitations for high-frequency updates. For more complex applications, libraries like Redux and MobX offer more robust solutions.</p><p>Redux provides a predictable state container with a strict unidirectional data flow. This makes debugging easier but can lead to boilerplate code. MobX, on the other hand, uses observables to automatically track changes and update the UI, resulting in less code but potentially harder-to-trace updates. The right choice depends on your team\'s familiarity and the specific needs of your project.</p>',
        image: 'blog-post-5',
        date: '2024-06-20T12:00:00Z',
        author: DUMMY_USERS[0],
        status: 'Pending Review',
    },
    {
        id: '6',
        slug: 'the-future-of-remote-work',
        title: 'The Future of Remote Work: Trends & Predictions',
        excerpt: 'Remote work is here to stay. Discover the trends shaping the future of how we work.',
        content: '<p>The COVID-19 pandemic accelerated the shift to remote work, and it\'s clear that it\'s not just a temporary trend. Companies are embracing hybrid models, and employees are demanding more flexibility. This shift is driving innovation in collaboration tools, asynchronous communication practices, and how we measure productivity. The future of work is not about where you are, but what you achieve.</p>',
        image: 'blog-post-6',
        date: '2024-06-12T12:00:00Z',
        author: DUMMY_USERS[5],
        status: 'Draft',
    },
    {
        id: '7',
        slug: 'why-i-love-tailwind-css',
        title: 'Why I Fell in Love with Tailwind CSS',
        excerpt: 'A personal journey into the world of utility-first CSS and how it transformed my development workflow.',
        content: '<p>At first, Tailwind CSS seemed like a chaotic mess of classes in my HTML. But after giving it a real try, I was converted. The utility-first approach means I can build custom designs without ever leaving my HTML. It speeds up development, enforces consistency, and makes responsive design a breeze. No more fighting with custom CSS files or trying to come up with the perfect class name. It\'s just you and your design, built rapidly.</p>',
        image: 'blog-post-7',
        date: '2024-05-30T12:00:00Z',
        author: DUMMY_USERS[6],
        status: 'Rejected',
    }
];

export const DUMMY_OPPORTUNITIES = [
  {
    icon: GraduationCap,
    title: 'Student Attachments',
    description: 'Gain real-world experience with leading companies in your field of study. Bridge the gap between theory and practice.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    filterValue: 'internship',
  },
  {
    icon: Handshake,
    title: 'Volunteer Programs',
    description: 'Make an impact by contributing your skills to NGOs and community projects. Build your network and character.',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    filterValue: 'volunteer',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Challenges',
    description: 'Participate in student-focused innovation challenges and hackathons sponsored by top tech firms.',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
    filterValue: 'all',
  }
];
