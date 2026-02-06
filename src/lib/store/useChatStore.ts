import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

interface ChatStore {
    // Keyed by resumeId
    chats: Record<string, ChatMessage[]>;

    // Actions
    addMessage: (resumeId: string, message: Omit<ChatMessage, "id" | "timestamp">) => void;
    clearChat: (resumeId: string) => void;
    getMessages: (resumeId: string) => ChatMessage[];
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            chats: {},

            addMessage: (resumeId, message) =>
                set((state) => {
                    const currentMessages = state.chats[resumeId] || [];
                    const newMessage: ChatMessage = {
                        ...message,
                        id: Math.random().toString(36).substring(7),
                        timestamp: Date.now(),
                    };
                    return {
                        chats: {
                            ...state.chats,
                            [resumeId]: [...currentMessages, newMessage],
                        },
                    };
                }),

            clearChat: (resumeId) =>
                set((state) => {
                    const newChats = { ...state.chats };
                    delete newChats[resumeId];
                    return { chats: newChats };
                }),

            getMessages: (resumeId) => {
                const state = get();
                return state.chats[resumeId] || [];
            },
        }),
        {
            name: "resume-builder-chat-storage",
        }
    )
);
