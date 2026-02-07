"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Eye,
  FileText,
  Loader2,
  PenSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AISettingsDialog } from "@/components/builder/AISettingsDialog";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { ChatPanel } from "@/components/builder/ChatPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAISettingsStore } from "@/lib/store/useAISettingsStore";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { resumeData, setResumeData, activeTemplate, setActiveTemplate } =
    useResumeStore();
  const { resumes, updateResume, renameResume } = useDashboardStore();
  const aiSettings = useAISettingsStore();

  const hasAIKey = aiSettings.hasKey(aiSettings.selectedProvider);

  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  const initializedIdRef = useRef<string | null>(null);

  // Initial load effect
  useEffect(() => {
    setIsHydrated(true);

    if (id && initializedIdRef.current !== id) {
      const resume = resumes.find((r) => r.id === id);
      if (resume) {
        setResumeData(resume.data);
        if (resume.settings?.template) {
          setActiveTemplate(resume.settings.template);
        }
        initializedIdRef.current = id;
        setIsValidating(false);
      } else {
        router.push("/dashboard");
      }
    }
  }, [id, resumes, setResumeData, setActiveTemplate, router]);

  // Auto-save effect
  useEffect(() => {
    if (isHydrated && !isValidating && id) {
      updateResume(id, resumeData, { template: activeTemplate });
    }
  }, [resumeData, activeTemplate, id, updateResume, isHydrated, isValidating]);

  // Beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Derive active resume for display
  const activeResume = resumes.find((r) => r.id === id);

  // Handle inline rename
  const handleStartRename = useCallback(() => {
    if (activeResume) {
      setEditedName(activeResume.name);
      setIsEditingName(true);
    }
  }, [activeResume]);

  const handleConfirmRename = useCallback(() => {
    if (id && editedName.trim()) {
      renameResume(id, editedName.trim());
      setIsEditingName(false);
    }
  }, [id, editedName, renameResume]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleConfirmRename();
      } else if (e.key === "Escape") {
        setIsEditingName(false);
      }
    },
    [handleConfirmRename],
  );

  if (!isHydrated || isValidating) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!activeResume) return null;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden text-left">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleConfirmRename}
                  className="h-7 w-[180px] text-sm font-medium"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleConfirmRename}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                className="font-medium truncate max-w-[200px] cursor-pointer hover:text-primary transition-colors text-left"
                onClick={handleStartRename}
                title="Click to rename"
              >
                {activeResume.name}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle - Only on mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant={mobileView === "editor" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("editor")}
          >
            <PenSquare className="h-4 w-4" />
          </Button>
          <Button
            variant={mobileView === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("preview")}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* AI Model Indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
            {hasAIKey ? (
              <Sparkles className="h-3 w-3 text-yellow-500" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-amber-500" />
            )}
            <span className="text-muted-foreground">
              {aiSettings.selectedProvider === "openai" && "OpenAI"}
              {aiSettings.selectedProvider === "google" && "Gemini"}
              {aiSettings.selectedProvider === "anthropic" && "Claude"}
            </span>
            <span className="hidden sm:inline">
              {aiSettings.selectedModel?.split("-").slice(0, 2).join("-") ||
                "default"}
            </span>
          </div>
          <AISettingsDialog />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`
            lg:w-[35%] lg:min-w-[320px] h-full overflow-hidden
            ${mobileView === "editor" ? "flex-1" : "hidden lg:block"}
          `}
        >
          <EditorPanel />
        </div>

        {/* Preview Panel */}
        <div
          className={`
            lg:flex-1 h-full overflow-hidden
            ${mobileView === "preview" ? "flex-1" : "hidden lg:block"}
          `}
        >
          <PreviewPanel data={resumeData} />
        </div>

        {/* Chat Panel - Desktop: Fixed width on right. Mobile: Hidden for now (future: add toggle) */}
        <div className="hidden lg:block w-[320px] h-full overflow-hidden shrink-0">
          <ChatPanel resumeId={id} />
        </div>
      </div>
    </div>
  );
}
