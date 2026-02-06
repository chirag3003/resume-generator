import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResumeData } from "@/lib/schema";

export interface SavedResume {
    id: string;
    name: string;
    data: ResumeData;
    createdAt: string;
    updatedAt: string;
}

interface DashboardStore {
    resumes: SavedResume[];
    activeResumeId: string | null;

    // Actions
    createResume: (name: string) => string;
    deleteResume: (id: string) => void;
    updateResume: (id: string, data: ResumeData) => void;
    renameResume: (id: string, name: string) => void;
    setActiveResume: (id: string | null) => void;
    getActiveResume: () => SavedResume | null;
    duplicateResume: (id: string) => string;
}

const generateId = () => `resume-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createEmptyResume = (): ResumeData => ({
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        website: "",
        summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
});

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set, get) => ({
            resumes: [],
            activeResumeId: null,

            createResume: (name: string) => {
                const id = generateId();
                const now = new Date().toISOString();
                const newResume: SavedResume = {
                    id,
                    name,
                    data: createEmptyResume(),
                    createdAt: now,
                    updatedAt: now,
                };
                set((state) => ({
                    resumes: [...state.resumes, newResume],
                    activeResumeId: id,
                }));
                return id;
            },

            deleteResume: (id: string) => {
                set((state) => ({
                    resumes: state.resumes.filter((r) => r.id !== id),
                    activeResumeId: state.activeResumeId === id ? null : state.activeResumeId,
                }));
            },

            updateResume: (id: string, data: ResumeData) => {
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === id
                            ? { ...r, data, updatedAt: new Date().toISOString() }
                            : r
                    ),
                }));
            },

            renameResume: (id: string, name: string) => {
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === id
                            ? { ...r, name, updatedAt: new Date().toISOString() }
                            : r
                    ),
                }));
            },

            setActiveResume: (id: string | null) => {
                set({ activeResumeId: id });
            },

            getActiveResume: () => {
                const { resumes, activeResumeId } = get();
                return resumes.find((r) => r.id === activeResumeId) || null;
            },

            duplicateResume: (id: string) => {
                const { resumes } = get();
                const original = resumes.find((r) => r.id === id);
                if (!original) return "";

                const newId = generateId();
                const now = new Date().toISOString();
                const duplicate: SavedResume = {
                    id: newId,
                    name: `${original.name} (Copy)`,
                    data: JSON.parse(JSON.stringify(original.data)),
                    createdAt: now,
                    updatedAt: now,
                };
                set((state) => ({
                    resumes: [...state.resumes, duplicate],
                }));
                return newId;
            },
        }),
        {
            name: "resume-dashboard-storage",
        }
    )
);
