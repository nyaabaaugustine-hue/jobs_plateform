


# Chapel Hill - AI-Powered Job & Recruitment Platform

Chapel Hill is a sophisticated, AI-powered platform designed to connect job seekers with employers. It serves as a comprehensive job board with distinct user roles and features, all built on a modern, scalable tech stack.

## Key Features & User Roles

The application is structured around three primary user roles:

### 1. Job Seekers
- **Personalized Dashboard:** A central hub to track application status, view profile completion progress, and see AI-driven job recommendations.
- **Advanced Job Search:** Users can browse and filter jobs by keywords, location, type, and more.
- **Application Tracking:** A Kanban-style board allows users to visualize the status of their applications (Applied, Screening, Interview, etc.).
- **Profile Management:** Users can build and maintain a detailed professional profile, including work experience, education, and skills.

### 2. Employers
- **Hiring Dashboard:** An overview of active jobs, total applicants, and recent activity.
- **Job Management:** Employers can post new jobs, manage existing listings, and view performance analytics for each post.
- **Applicant Tracking System (ATS):** A comprehensive table to view, filter, and manage all applicants for their jobs, including changing their status in the hiring pipeline.
- **Company Profile:** Employers can create and manage a public company profile to attract talent.

### 3. Administrators
- **Executive Dashboard:** A high-level overview of the entire platform's health, including revenue, user metrics, system status, and moderation queues.
- **Content & User Management:** Admins have full control over jobs, users, companies, and even website content like the homepage hero section and blog posts.
- **Job Moderation:** An AI-assisted interface to review, approve, or reject new job postings to maintain platform quality.
- **Platform Settings:** A global settings panel to configure everything from job expiration rules and security policies to API keys for third-party integrations.

## Core Technology Stack

- **Frontend Framework:** **Next.js** with the App Router, leveraging React Server Components for performance.
- **Language:** **TypeScript** for type safety and improved developer experience.
- **UI Components:** Built with **ShadCN/UI**, providing a beautiful, accessible, and customizable component library.
- **Styling:** **Tailwind CSS** for a utility-first styling approach.
- **AI Integration:** **Genkit** (a Google AI toolkit) is used to power features like job recommendations and content moderation.
- **Backend & Database:** **Firebase** is used for:
    - **Authentication:** Manages user sign-up, login, and roles.
    - **Firestore:** A NoSQL database for storing all application data (users, jobs, companies, etc.).
    - **Security Rules:** Granular, role-based access control is defined in `firestore.rules` to protect data.
- **Data Visualization:** **Recharts** is used for creating the analytical charts in the dashboards.

## AI-Powered Features

The project leverages Genkit to integrate generative AI capabilities:

- **AI Job Recommendations:** Analyzes a job seeker's profile to suggest relevant job openings.
- **AI Job Moderation:** Automatically flags potentially fraudulent or spam job postings for admin review, providing a reason for its decision.
- **SMS Notifications:** A placeholder flow demonstrates the capability to integrate with SMS services like Twilio for sending notifications.
