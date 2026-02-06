"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { useAISettingsStore } from "@/lib/store/useAISettingsStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { generateContent } from "@/lib/ai/aiService";
import { SUMMARY_PROMPT } from "@/lib/ai/prompts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function PersonalInfoEditor() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const settings = useAISettingsStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryOptions, setSummaryOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerateSummary = async () => {
    const provider = settings.selectedProvider;
    if (!settings.hasKey(provider)) {
      toast.error(
        `Please configure your ${provider} API key in AI Settings first.`,
      );
      return;
    }

    if (!resumeData.experience.length && !resumeData.skills.length) {
      toast.error(
        "Please add some experience or skills first for better results.",
      );
      return;
    }

    setIsGenerating(true);
    try {
      const promptData = {
        jobTitle: resumeData.experience[0]?.title || "Professional",
        experience: resumeData.experience
          .map((e) => `${e.title} at ${e.company}: ${e.description}`)
          .join("\n"),
        skills: resumeData.skills.map((s) => s.name).join(", "),
      };

      const prompt = JSON.stringify(promptData);

      const response = await generateContent({
        provider,
        settings,
        prompt,
        systemPrompt: SUMMARY_PROMPT.replace("{jobTitle}", promptData.jobTitle)
          .replace("{experience}", promptData.experience)
          .replace("{skills}", promptData.skills),
      });

      const json = JSON.parse(response);
      if (json.options && Array.isArray(json.options)) {
        setSummaryOptions(json.options);
        setShowOptions(true);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (option: string) => {
    updatePersonalInfo("summary", option);
    setShowOptions(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Personal Information</h3>
      <div className="space-y-3">
        {/* ... existing fields ... */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            type="text"
            value={personalInfo.location || ""}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            type="text"
            placeholder="linkedin.com/in/username"
            value={personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            type="text"
            placeholder="github.com/username"
            value={personalInfo.github || ""}
            onChange={(e) => updatePersonalInfo("github", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="portfolio">Portfolio / Dribbble</Label>
          <Input
            id="portfolio"
            type="text"
            placeholder="dribbble.com/username or behance.net/username"
            value={personalInfo.portfolio || ""}
            onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={personalInfo.website || ""}
            onChange={(e) => updatePersonalInfo("website", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Summary</Label>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-900 dark:hover:bg-blue-950"
              onClick={handleGenerateSummary}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          <Textarea
            id="summary"
            className="min-h-[100px]"
            value={personalInfo.summary || ""}
            onChange={(e) => updatePersonalInfo("summary", e.target.value)}
            placeholder="Write a brief summary of your professional background..."
          />
        </div>
      </div>

      {/* Options Dialog */}
      <Dialog open={showOptions} onOpenChange={setShowOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Summary</DialogTitle>
            <DialogDescription>
              Choose the option that best fits your profile. You can edit it
              later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {summaryOptions.map((option, i) => (
              <div
                key={i}
                className="p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                onClick={() => handleSelectOption(option)}
              >
                <p className="text-sm">{option}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
