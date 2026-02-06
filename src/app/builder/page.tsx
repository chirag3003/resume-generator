"use client";

import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function BuilderPage() {
  const { resumeData } = useResumeStore();

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left Panel - Editor (35%) */}
      <div className="w-[35%] min-w-[320px] h-full overflow-hidden">
        <EditorPanel />
      </div>

      {/* Right Panel - Preview (65%) */}
      <div className="flex-1 h-full overflow-hidden">
        <PreviewPanel data={resumeData} />
      </div>
    </div>
  );
}
