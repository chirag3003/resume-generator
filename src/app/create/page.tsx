"use client";

import {
  AlertCircle,
  ArrowLeft,
  FileText,
  Loader2,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateFullResume } from "@/lib/ai/aiService";
import { DEFAULT_MODELS } from "@/lib/ai/aiService";
import {
  type AIProvider,
  useAISettingsStore,
} from "@/lib/store/useAISettingsStore";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { useUserProfileStore } from "@/lib/store/useUserProfileStore";

const MODELS = {
  openai: [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
  ],
  google: [
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash" },
    { id: "gemini-3-pro-preview", name: "Gemini 3 Pro" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
  ],
  anthropic: [
    { id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
  ],
};

export default function CreateResumePage() {
  const router = useRouter();
  const { createResume, updateResume } = useDashboardStore();
  const settings = useAISettingsStore();
  const { profile, context } = useUserProfileStore();

  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Local AI settings for quick switching
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(
    settings.selectedProvider,
  );
  const [selectedModel, setSelectedModel] = useState(
    settings.selectedModel || DEFAULT_MODELS[settings.selectedProvider],
  );

  const hasApiKey = settings.hasKey(selectedProvider);

  const handleProviderChange = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setSelectedModel(DEFAULT_MODELS[provider]);
  };

  const handleCreateEmpty = () => {
    if (!name.trim()) {
      toast.error("Please enter a resume name");
      return;
    }
    const id = createResume(name.trim());
    router.push(`/builder/${id}`);
  };

  const handleGenerateWithAI = async () => {
    if (!name.trim()) {
      toast.error("Please enter a resume name");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a job description or prompt for AI generation");
      return;
    }
    if (!hasApiKey) {
      toast.error(
        `Please configure your ${selectedProvider} API key in settings first.`,
      );
      return;
    }

    // Save the selected provider/model to global settings
    settings.setSelectedProvider(selectedProvider);
    settings.setSelectedModel(selectedModel);

    setIsGenerating(true);
    try {
      const generatedData = await generateFullResume({
        prompt: prompt.trim(),
        settings: {
          ...settings,
          selectedProvider,
          selectedModel,
        },
        context,
        profile,
      });

      const id = createResume(name.trim());
      updateResume(id, generatedData);

      toast.success("Resume generated successfully!");
      router.push(`/builder/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-semibold">Create New Resume</span>
              </div>
            </div>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          {/* Resume Name */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="resume-name" className="text-base font-medium">
              Resume Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resume-name"
              placeholder="e.g., Software Engineer at Google"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12"
            />
          </div>

          {/* AI Configuration Banner */}
          {!hasApiKey && (
            <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    AI features not configured
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Add your API key in{" "}
                    <Link
                      href="/settings"
                      className="underline font-medium hover:text-amber-900"
                    >
                      Settings
                    </Link>{" "}
                    to use AI-powered resume generation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI Provider/Model Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              AI Configuration
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Provider
                </Label>
                <Select
                  value={selectedProvider}
                  onValueChange={(val) =>
                    handleProviderChange(val as AIProvider)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">
                      <div className="flex items-center gap-2">
                        <span>OpenAI</span>
                        {settings.openaiKey && (
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                    </SelectItem>
                    <SelectItem value="google">
                      <div className="flex items-center gap-2">
                        <span>Google Gemini</span>
                        {settings.googleKey && (
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                    </SelectItem>
                    <SelectItem value="anthropic">
                      <div className="flex items-center gap-2">
                        <span>Anthropic Claude</span>
                        {settings.anthropicKey && (
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS[selectedProvider].map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Job Description / Prompt */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt" className="text-base font-medium">
                Job Description / Prompt
              </Label>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span>AI will tailor your resume</span>
              </div>
            </div>
            <Textarea
              id="prompt"
              placeholder="Paste the full job description here, or describe the role you're targeting...

Example:
- Senior Frontend Developer with 5+ years React experience
- Focus on performance optimization and accessibility
- Looking for roles at tech companies in San Francisco"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[250px] resize-y text-sm leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              We'll use your profile details and this prompt to generate a
              tailored resume.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-12"
              onClick={handleCreateEmpty}
              disabled={isGenerating}
            >
              Create Empty Resume
            </Button>
            <Button
              size="lg"
              className="flex-1 h-12 gap-2"
              onClick={handleGenerateWithAI}
              disabled={isGenerating || !hasApiKey}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
