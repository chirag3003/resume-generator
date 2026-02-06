"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { Button } from "@/components/ui/button";
import { PenSquare, Eye, ArrowLeft, FileText } from "lucide-react";

export default function BuilderPage() {
  const { resumeData, setResumeData } = useResumeStore();
  const { activeResumeId, getActiveResume, updateResume } = useDashboardStore();
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // Load resume data from dashboard store on mount
  useEffect(() => {
    const activeResume = getActiveResume();
    if (activeResume) {
      setResumeData(activeResume.data);
    }
  }, [getActiveResume, setResumeData]);

  // Auto-save to dashboard store when resumeData changes
  useEffect(() => {
    if (activeResumeId) {
      updateResume(activeResumeId, resumeData);
    }
  }, [resumeData, activeResumeId, updateResume]);

  const activeResume = getActiveResume();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium truncate max-w-[200px]">
              {activeResume?.name || "Untitled Resume"}
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
      </div>
    </div>
  );
}
