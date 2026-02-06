"use client";

import { useRef, useEffect, useState } from "react";
import type { ResumeData } from "@/lib/schema";
import { ClassicATSTemplate } from "@/components/templates/ClassicATSTemplate";

interface PreviewPanelProps {
  data: ResumeData;
}

export function PreviewPanel({ data }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // A4 dimensions in pixels at 96 DPI: 794 x 1123
      const a4Width = 794;
      const a4Height = 1123;

      const padding = 48; // 24px on each side
      const availableWidth = containerWidth - padding;
      const availableHeight = containerHeight - padding;

      const scaleX = availableWidth / a4Width;
      const scaleY = availableHeight / a4Height;

      setScale(Math.min(scaleX, scaleY, 1));
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-zinc-100 dark:bg-zinc-900 overflow-auto flex items-start justify-center p-6"
    >
      <div
        className="shadow-2xl origin-top"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <ClassicATSTemplate data={data} />
      </div>
    </div>
  );
}
