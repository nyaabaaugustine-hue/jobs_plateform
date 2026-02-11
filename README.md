# Chapel Hill Ltd - Job Management Platform

This is a comprehensive, full-stack job board application built with a modern, AI-integrated technology stack. It provides distinct, feature-rich dashboards for three key user roles: Job Seekers, Employers, and Administrators.

## Project Overview (Non-Technical)

Chapel Hill Ltd is a sophisticated platform designed to streamline the connection between job seekers and employers. It goes beyond a simple job listing site by incorporating intelligent features and providing dedicated tools for each type of user.

### Key Features

**For Job Seekers:**
- **User Authentication:** Secure registration and login.
- **Personalized Dashboard:** A central hub to track applications and saved jobs.
- **AI Job Recommendations:** Get job suggestions powered by AI based on your profile and skills.
- **Advanced Job Search:** Filter jobs by keyword, location, type, salary, and more.
- **Profile Management:** Build and maintain a professional profile to attract employers.
- **Application Tracking:** Follow the status of your applications from "Applied" to "Hired".

**For Employers:**
- **Company Profile:** Create and manage a public-facing company profile to attract talent.
- **Employer Dashboard:** An all-in-one interface to manage job listings and applicants.
- **Post & Manage Jobs:** Easily create, edit, and archive job postings.
- **Applicant Tracking System (ATS):** View, filter, and manage candidates who have applied to your jobs.
- **Hiring Analytics:** Gain insights into your hiring funnel and job post performance.

**For Administrators:**
- **Executive Dashboard:** A high-level overview of all platform activity, including revenue, user sign-ups, and active jobs.
- **Comprehensive Management:** Manage all users, jobs, companies, and blog posts on the platform.
- **AI-Powered Moderation:** A dedicated moderation center where AI helps flag potentially fraudulent or spam job postings for review.
- **Financial Tracking:** Monitor revenue, subscriptions, and all platform transactions.

---

## Technical Description

This project is built using a modern, scalable, and performant tech stack, with a strong emphasis on security and developer experience.

### Technology Stack

- **Framework:** **Next.js 15** (using the App Router)
- **Language:** **TypeScript**
- **UI:**
    - **React 19**
    - **ShadCN UI:** A component library for building accessible and beautiful UIs.
    - **Tailwind CSS:** A utility-first CSS framework for rapid styling.
- **Backend & Database:**
    - **Firebase:** Used as the primary backend-as-a-service.
    - **Firebase Authentication:** Handles user identity, roles, and session management.
    - **Firestore:** A NoSQL, document-based database for storing all application data (users, jobs, companies, etc.).
- **Generative AI:**
    - **Google's Genkit:** Powers the AI features, including job recommendations for candidates and content moderation for administrators.

### Architecture

- **Frontend:** The application is built with **React Server Components** by default for optimal performance, with Client Components used for interactive UI elements. The structure follows the Next.js App Router paradigm, with dedicated route groups for each user dashboard (`/dashboard`, `/employer`, `/admin`).

- **Backend (Serverless):** Firebase provides a robust and scalable serverless backend.
    - **Data Modeling:** The Firestore database is structured with top-level collections for `users`, `jobs`, `companies`, etc., ensuring a clean and scalable data model.
    - **Security:** Security is enforced via **Firestore Security Rules** (`firestore.rules`). These rules are meticulously crafted to ensure that users can only access and modify their own data, while providing administrators with appropriate read-only oversight. This prevents unauthorized data access at the database level.

- **AI Integration:** AI logic is encapsulated in **Genkit Flows** located in the `src/ai/flows` directory. These flows are exposed as server actions and called from the frontend, ensuring that all AI processing and prompting happens securely on the server.
