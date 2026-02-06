"use client";

import { useState } from "react";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { PenSquare, Eye } from "lucide-react";

export default function BuilderPage() {
  const { resumeData } = useResumeStore();
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Toggle Bar - Only visible on mobile */}
      <div className="lg:hidden flex items-center justify-center gap-2 p-2 bg-background border-b shrink-0">
        <Button
          variant={mobileView === "editor" ? "default" : "outline"}
          size="sm"
          onClick={() => setMobileView("editor")}
          className="flex-1 max-w-[150px]"
        >
          <PenSquare className="h-4 w-4 mr-2" />
          Editor
        </Button>
        <Button
          variant={mobileView === "preview" ? "default" : "outline"}
          size="sm"
          onClick={() => setMobileView("preview")}
          className="flex-1 max-w-[150px]"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

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
  );
}
