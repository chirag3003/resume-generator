export type AIModel =
  | "gpt-5.4"
  | "gpt-5.4-pro"
  | "gpt-5.2"
  | "gpt-5.1"
  | "gpt-5"
  | "gpt-5-mini"
  | "gpt-5-nano"
  | "gemini-3-flash-preview"
  | "gemini-3-pro-preview"
  | "gemini-2.5-pro"
  | "gemini-2.5-flash"
  | "gemini-2.5-flash-lite"
  | "claude-3-haiku-20240307"
  | "claude-3-5-haiku-20241022"
  | "claude-3-5-sonnet-20240620"
  | "claude-3-opus-20240229";

export const AI_MODELS = {
  openai: [
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "gpt-5.4-pro", name: "GPT-5.4 Pro" },
    { id: "gpt-5.2", name: "GPT-5.2" },
    { id: "gpt-5.1", name: "GPT-5.1" },
    { id: "gpt-5", name: "GPT-5" },
    { id: "gpt-5-mini", name: "GPT-5 Mini" },
    { id: "gpt-5-nano", name: "GPT-5 Nano" },
  ],
  google: [
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash" },
    { id: "gemini-3-pro-preview", name: "Gemini 3 Pro" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash-Lite" },
  ],
  anthropic: [
    { id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
  ],
};

export const DEFAULT_MODELS = {
  openai: "gpt-5-mini",
  google: "gemini-3-flash-preview",
  anthropic: "claude-3-haiku-20240307",
};
