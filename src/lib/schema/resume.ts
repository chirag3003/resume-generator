import { z } from "zod/v4";

// Personal Information
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(), // URL or username
  github: z.string().optional(), // URL or username
  portfolio: z.string().optional(), // URL or username (Dribbble, Behance, etc.)
  website: z.url().optional(),
  summary: z.string().optional(),
});

// Work Experience
export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(), // Empty = "Present"
  highlights: z.array(z.string()),
});

// Education
export const EducationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  school: z.string().min(1, "School name is required"),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

// Skills
export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

// Projects
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.url().optional(),
  technologies: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
});

// Complete Resume
export const ResumeDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
});

// Inferred TypeScript types
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;
