import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersonalInfo } from "@/lib/schema";

interface UserProfileStore {
    profile: Partial<PersonalInfo>;
    context: {
        summary: string;
        skills: string;
        custom: string;
    };

    // Actions
    updateProfile: (profile: Partial<PersonalInfo>) => void;
    updateContext: (context: Partial<UserProfileStore["context"]>) => void;
}

export const useUserProfileStore = create<UserProfileStore>()(
    persist(
        (set) => ({
            profile: {},
            context: {
                summary: "",
                skills: "",
                custom: "",
            },

            updateProfile: (profile) =>
                set((state) => ({
                    profile: { ...state.profile, ...profile },
                })),

            updateContext: (context) =>
                set((state) => ({
                    context: { ...state.context, ...context },
                })),
        }),
        {
            name: "resume-builder-user-profile",
        }
    )
);
