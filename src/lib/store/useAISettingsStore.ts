import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AIProvider = "openai" | "google" | "anthropic";

export interface AISettings {
  openaiKey: string;
  googleKey: string;
  anthropicKey: string;
  selectedProvider: AIProvider;
  selectedModel?: string;
}

interface AISettingsStore extends AISettings {
  setOpenAIKey: (key: string) => void;
  setGoogleKey: (key: string) => void;
  setAnthropicKey: (key: string) => void;
  setSelectedProvider: (provider: AIProvider) => void;
  setSelectedModel: (model: string) => void;
  hasKey: (provider: AIProvider) => boolean;
}

export const useAISettingsStore = create<AISettingsStore>()(
  persist(
    (set, get) => ({
      openaiKey: "",
      googleKey: "",
      anthropicKey: "",
      selectedProvider: "openai", // Default
      selectedModel: "",

      setOpenAIKey: (key: string) => set({ openaiKey: key }),
      setGoogleKey: (key: string) => set({ googleKey: key }),
      setAnthropicKey: (key: string) => set({ anthropicKey: key }),
      setSelectedProvider: (provider: AIProvider) =>
        set({ selectedProvider: provider }),
      setSelectedModel: (model: string) => set({ selectedModel: model }),

      hasKey: (provider: AIProvider) => {
        const state = get();
        switch (provider) {
          case "openai":
            return !!state.openaiKey;
          case "google":
            return !!state.googleKey;
          case "anthropic":
            return !!state.anthropicKey;
          default:
            return false;
        }
      },
    }),
    {
      name: "resume-builder-ai-settings",
    },
  ),
);
