/** biome-ignore-all lint/a11y/useSemanticElements: <not needed> */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateFullResume } from "@/lib/ai/aiService";
import { useAISettingsStore } from "@/lib/store/useAISettingsStore";
import {
  useDashboardStore,
  type SavedResume,
} from "@/lib/store/useDashboardStore";
import { useUserProfileStore } from "@/lib/store/useUserProfileStore";
import {
  Copy,
  FileText,
  Loader2,
  MoreVertical,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ResumeCard({ resume }: { resume: SavedResume }) {
  const router = useRouter();
  const { deleteResume, duplicateResume, setActiveResume } =
    useDashboardStore();

  const handleOpen = () => {
    setActiveResume(resume.id);
    router.push(`/builder/${resume.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume?")) {
      deleteResume(resume.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateResume(resume.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={handleOpen}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      role="button"
      tabIndex={0}
      className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200"
    >
      {/* Preview Area */}
      <div className="aspect-[8.5/11] bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center relative">
        <div className="absolute inset-4 bg-white dark:bg-slate-700 rounded shadow-sm flex flex-col p-3 text-[6px] leading-tight overflow-hidden">
          {/* Mini preview */}
          <div className="text-center border-b border-slate-200 dark:border-slate-600 pb-1 mb-1">
            <div className="font-bold text-[8px] truncate">
              {resume.data.personalInfo.fullName || "Your Name"}
            </div>
            <div className="text-slate-500 text-[5px] truncate">
              {resume.data.personalInfo.email || "email@example.com"}
            </div>
          </div>
          {resume.data.experience.length > 0 && (
            <div className="mb-1">
              <div className="font-bold text-[5px] text-slate-400 uppercase">
                Experience
              </div>
              {resume.data.experience.slice(0, 2).map((exp) => (
                <div
                  key={exp.id}
                  className="truncate text-slate-600 dark:text-slate-400"
                >
                  {exp.title} at {exp.company}
                </div>
              ))}
            </div>
          )}
          {resume.data.skills.length > 0 && (
            <div>
              <div className="font-bold text-[5px] text-slate-400 uppercase">
                Skills
              </div>
              <div className="text-slate-600 dark:text-slate-400 truncate">
                {resume.data.skills
                  .slice(0, 5)
                  .map((s) => s.name)
                  .join(", ")}
              </div>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Open
          </Button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-slate-900 dark:text-white truncate">
              {resume.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Updated {formatDate(resume.updatedAt)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function CreateResumeDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();
  const { createResume, updateResume } = useDashboardStore();
  const settings = useAISettingsStore();
  const { profile, context } = useUserProfileStore();

  const handleCreate = async () => {
    if (!name.trim()) return;

    if (prompt.trim()) {
      // AI Generation Flow
      const provider = settings.selectedProvider;
      if (!settings.hasKey(provider)) {
        toast.error(
          `Please configure your ${provider} API key in settings first.`,
        );
        return;
      }

      setIsGenerating(true);
      try {
        // 1. Generate full resume JSON
        const generatedData = await generateFullResume({
          prompt: prompt.trim(),
          settings,
          context,
          profile,
        });

        // 2. Create resume container
        const id = createResume(name.trim());

        // 3. Update with generated data
        updateResume(id, generatedData);

        // 4. Navigate
        toast.success("Resume generated successfully!");
        setOpen(false);
        setPrompt("");
        setName("");
        router.push(`/builder/${id}`);
      } catch (error) {
        console.error(error);
        toast.error("Failed to generate resume. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Standard Flow
      const id = createResume(name.trim());
      setName("");
      setOpen(false);
      router.push(`/builder/${id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden cursor-pointer hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
          <div className="aspect-[8.5/11] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="h-8 w-8 group-hover:text-primary transition-colors" />
            </div>
            <span className="font-medium text-slate-600 dark:text-slate-400">
              Create New Resume
            </span>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="h-6" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            Give your resume a name and optionally provide a prompt to
            auto-generate content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume-name">Resume Name *</Label>
            <Input
              id="resume-name"
              placeholder="e.g., Software Engineer Resume"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="resume-prompt">Starter Prompt (Optional)</Label>
              <Sparkles className="h-3 w-3 text-yellow-500" />
            </div>
            <Textarea
              id="resume-prompt"
              placeholder="e.g., Senior Frontend Developer with 5 years experience in React and TypeScript. Focus on performance optimization."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-24 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              We'll use your profile details and global context to fill in the
              rest.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : prompt.trim() ? (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate & Create
              </>
            ) : (
              "Create Empty"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardPage() {
  const { resumes } = useDashboardStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">ResumeBuilder</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4 ml-6">
                <Link
                  href="/settings"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Resumes
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {resumes.length === 0
                ? "Create your first resume to get started"
                : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateResumeDialog />
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </main>
    </div>
  );
}
