import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import type { AISettings } from "@/lib/store/useAISettingsStore";
import type { ResumeData } from "../schema";
import { FULL_RESUME_PROMPT } from "./prompts";

export type AIModel =
  | "gpt-4o-mini"
  | "gemini-1.5-flash"
  | "claude-3-haiku-20240307";

// Provider-specific default models
export const DEFAULT_MODELS = {
  openai: "gpt-4o-mini",
  google: "gemini-1.5-flash",
  anthropic: "claude-3-haiku-20240307",
};

interface GenerateOptions {
  prompt: string;
  systemPrompt: string;
  provider: "openai" | "google" | "anthropic";
  settings: AISettings;
  context?: {
    summary?: string;
    skills?: string;
    custom?: string;
  };
}

export async function generateContent({
  prompt,
  systemPrompt,
  provider,
  settings,
  context,
}: GenerateOptions): Promise<string> {
  // Append context to system prompt if provided
  let finalSystemPrompt = systemPrompt;
  if (context) {
    const contextParts = [];
    if (context.summary)
      contextParts.push(`USER PROFESSIONAL SUMMARY:\n"${context.summary}"`);
    if (context.skills)
      contextParts.push(`USER TECHNICAL SKILLS:\n"${context.skills}"`);
    if (context.custom)
      contextParts.push(`CUSTOM INSTRUCTIONS:\n"${context.custom}"`);

    if (contextParts.length > 0) {
      finalSystemPrompt += `\n\nADDITIONAL CONTEXT & INSTRUCTIONS:\n${contextParts.join("\n\n")}\n\nUse this context to personalize the output.`;
    }
  }

  // Use selected model or fallback to default for that provider
  const model = settings.selectedModel || DEFAULT_MODELS[provider];

  switch (provider) {
    case "openai":
      return generateOpenAI(
        prompt,
        finalSystemPrompt,
        settings.openaiKey,
        model,
      );
    case "google":
      return generateGoogle(
        prompt,
        finalSystemPrompt,
        settings.googleKey,
        model,
      );
    case "anthropic":
      return generateAnthropic(
        prompt,
        finalSystemPrompt,
        settings.anthropicKey,
        model,
      );
    default:
      throw new Error("Invalid provider");
  }
}

async function generateOpenAI(
  prompt: string,
  systemPrompt: string,
  apiKey: string,
  model: string,
) {
  if (!apiKey) throw new Error("OpenAI API key is missing");
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  return response.choices[0].message.content || "";
}

async function generateGoogle(
  prompt: string,
  systemPrompt: string,
  apiKey: string,
  modelName: string,
) {
  if (!apiKey) throw new Error("Google API key is missing");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  // Gemini doesn't always support system prompts strictly in the same way,
  // but prepending it works well.
  const fullPrompt = `${systemPrompt}\n\nIMPORTANT: Return only valid JSON.\n\nUser Input:\n${prompt}`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  let text = response.text();

  // Clean up potential markdown code blocks from Gemini
  text = text.replace(/```json\n?|\n?```/g, "");
  return text;
}

async function generateAnthropic(
  prompt: string,
  systemPrompt: string,
  apiKey: string,
  model: string,
) {
  if (!apiKey) throw new Error("Anthropic API key is missing");
  const anthropic = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    system: `${systemPrompt}\nIMPORTANT: Return valid JSON only.`,
    messages: [{ role: "user", content: prompt }],
  });

  // Extract text from ContentBlock
  const content = response.content[0];
  if (content.type === "text") {
    return content.text;
  }
  return "";
}

export async function generateFullResume({
  prompt,
  settings,
  context,
  profile,
}: {
  prompt: string;
  settings: AISettings;
  context: { summary: string; skills: string; custom: string };
  profile: any;
}): Promise<ResumeData> {
  const systemPrompt = FULL_RESUME_PROMPT.replace("{prompt}", prompt)
    .replace("{profile}", JSON.stringify(profile))
    .replace("{context}", JSON.stringify(context));

  const response = await generateContent({
    prompt: "Generate the JSON.",
    systemPrompt,
    provider: "openai", // defaulting to openai or settings.selectedProvider if verified
    settings,
    context, // Implicitly adds context to standard prompt as well
  });

  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse resume JSON", e, response);
    throw new Error("AI failed to generate valid JSON");
  }
}
