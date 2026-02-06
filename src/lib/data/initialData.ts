import type { ResumeData } from "@/lib/schema";

export const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        website: "https://johndoe.dev",
        summary:
            "Senior Software Engineer with 8+ years of experience building scalable web applications. Passionate about clean code, developer experience, and mentoring teams.",
    },
    experience: [
        {
            id: "exp-1",
            title: "Senior Software Engineer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            startDate: "Jan 2021",
            endDate: "",
            highlights: [
                "Led development of microservices architecture serving 10M+ daily users",
                "Reduced API response times by 40% through query optimization and caching strategies",
                "Mentored team of 5 junior developers and established code review best practices",
                "Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes",
            ],
        },
        {
            id: "exp-2",
            title: "Software Engineer",
            company: "StartupXYZ",
            location: "Remote",
            startDate: "Mar 2018",
            endDate: "Dec 2020",
            highlights: [
                "Built real-time collaboration features using WebSockets and Redis",
                "Developed React component library used across 3 product teams",
                "Integrated third-party payment systems processing $2M+ monthly transactions",
            ],
        },
    ],
    education: [
        {
            id: "edu-1",
            degree: "B.S. Computer Science",
            school: "University of California, Berkeley",
            location: "Berkeley, CA",
            startDate: "Aug 2014",
            endDate: "May 2018",
            gpa: "3.8",
            highlights: ["Dean's List", "Computer Science Honor Society"],
        },
    ],
    skills: [
        { id: "skill-1", name: "TypeScript", level: "expert" },
        { id: "skill-2", name: "React", level: "expert" },
        { id: "skill-3", name: "Node.js", level: "advanced" },
        { id: "skill-4", name: "PostgreSQL", level: "advanced" },
        { id: "skill-5", name: "AWS", level: "intermediate" },
        { id: "skill-6", name: "Docker", level: "intermediate" },
        { id: "skill-7", name: "GraphQL", level: "advanced" },
        { id: "skill-8", name: "Python", level: "intermediate" },
    ],
    projects: [
        {
            id: "proj-1",
            name: "Open Source CLI Tool",
            description:
                "A command-line tool for automating development workflows with 500+ GitHub stars",
            url: "https://github.com/johndoe/cli-tool",
            technologies: ["TypeScript", "Node.js", "Commander.js"],
            highlights: [
                "Featured in JavaScript Weekly newsletter",
                "Used by 50+ companies for their development workflows",
            ],
        },
    ],
};
