import { create } from "zustand";
import type { ResumeData, Experience, Education, Skill, Project } from "@/lib/schema";
import { initialResumeData } from "@/lib/data/initialData";

interface ResumeStore {
    resumeData: ResumeData;
    activeTemplate: string;

    // Actions
    setResumeData: (data: ResumeData) => void;
    updatePersonalInfo: (field: string, value: string) => void;

    // Experience actions
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;

    // Education actions
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    // Skills actions
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    // Projects actions
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;

    // Template
    setActiveTemplate: (template: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialResumeData,
    activeTemplate: "classic",

    setResumeData: (data) => set({ resumeData: data }),

    updatePersonalInfo: (field, value) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                personalInfo: {
                    ...state.resumeData.personalInfo,
                    [field]: value,
                },
            },
        })),

    // Experience
    addExperience: (experience) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [...state.resumeData.experience, experience],
            },
        })),

    updateExperience: (id, experience) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.map((exp) =>
                    exp.id === id ? { ...exp, ...experience } : exp
                ),
            },
        })),

    removeExperience: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.filter((exp) => exp.id !== id),
            },
        })),

    // Education
    addEducation: (education) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, education],
            },
        })),

    updateEducation: (id, education) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.map((edu) =>
                    edu.id === id ? { ...edu, ...education } : edu
                ),
            },
        })),

    removeEducation: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((edu) => edu.id !== id),
            },
        })),

    // Skills
    addSkill: (skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...state.resumeData.skills, skill],
            },
        })),

    updateSkill: (id, skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.map((s) =>
                    s.id === id ? { ...s, ...skill } : s
                ),
            },
        })),

    removeSkill: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((s) => s.id !== id),
            },
        })),

    // Projects
    addProject: (project) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: [...state.resumeData.projects, project],
            },
        })),

    updateProject: (id, project) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.map((p) =>
                    p.id === id ? { ...p, ...project } : p
                ),
            },
        })),

    removeProject: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.filter((p) => p.id !== id),
            },
        })),

    setActiveTemplate: (template) => set({ activeTemplate: template }),
}));
