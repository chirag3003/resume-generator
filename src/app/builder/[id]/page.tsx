"use client";

import { ArrowLeft, Eye, FileText, Loader2, PenSquare } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { ChatPanel } from "@/components/builder/ChatPanel";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { resumeData, setResumeData, activeTemplate, setActiveTemplate } =
    useResumeStore();
  const { resumes, updateResume } = useDashboardStore();

  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

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

  // Derive active resume for display
  const activeResume = resumes.find((r) => r.id === id);

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
            <span className="font-medium truncate max-w-[200px]">
              {activeResume.name}
            </span>
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
