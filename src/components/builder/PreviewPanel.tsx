"use client";

import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClassicATSTemplate } from "@/components/templates/ClassicATSTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ModernSidebarTemplate } from "@/components/templates/ModernSidebarTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { TwoColumnTemplate } from "@/components/templates/TwoColumnTemplate";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/lib/schema";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { PDFDownloadButton } from "./PDFDownloadButton";
import { TemplateSelector } from "./TemplateSelector";

interface PreviewPanelProps {
  data: ResumeData;
}

export function PreviewPanel({ data }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [autoScale, setAutoScale] = useState(0.6);
  const [isAutoScale, setIsAutoScale] = useState(true);
  const { activeTemplate } = useResumeStore();

  const calculateAutoScale = useCallback(() => {
    if (!containerRef.current) return 0.6;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // A4 dimensions in pixels at 96 DPI: 794 x 1123
    const a4Width = 794;
    const a4Height = 1123;

    const padding = 120; // Account for controls and padding
    const availableWidth = containerWidth - padding;
    const availableHeight = containerHeight - padding;

    const scaleX = availableWidth / a4Width;
    const scaleY = availableHeight / a4Height;

    return Math.min(scaleX, scaleY, 1);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const newAutoScale = calculateAutoScale();
      setAutoScale(newAutoScale);
      if (isAutoScale) {
        setScale(newAutoScale);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calculateAutoScale, isAutoScale]);

  const handleZoomIn = () => {
    setIsAutoScale(false);
    setScale((s) => Math.min(s + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setIsAutoScale(false);
    setScale((s) => Math.max(s - 0.1, 0.3));
  };

  const handleReset = () => {
    setIsAutoScale(true);
    setScale(autoScale);
  };

  const zoomPercentage = Math.round(scale * 100);

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "twocolumn":
        return <TwoColumnTemplate data={data} />;
      case "modernsidebar":
        return <ModernSidebarTemplate data={data} />;
      default:
        return <ClassicATSTemplate data={data} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-zinc-100 dark:bg-zinc-900 flex flex-col overflow-hidden print:bg-transparent print:h-auto print:overflow-visible print:block"
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 bg-background/80 backdrop-blur border-b shrink-0 print:hidden">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={handleZoomOut}
              disabled={scale <= 0.3}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm font-medium w-12 text-center">
              {zoomPercentage}%
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={handleZoomIn}
              disabled={scale >= 1.5}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex"
              onClick={handleReset}
              title="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden sm:block">
            <TemplateSelector />
          </div>
        </div>

        <PDFDownloadButton data={data} />
      </div>

      {/* Mobile template selector */}
      <div className="sm:hidden flex justify-center p-2 bg-background/50 border-b print:hidden">
        <TemplateSelector />
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-4 sm:p-8 print:p-0 print:overflow-visible print:block bg-slate-200/50 dark:bg-slate-900/50">
        <div
          id="resume-scale-wrapper"
          className="origin-top flex flex-col gap-6 print:block print:gap-0"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <div
            id="resume-preview-container"
            className="shadow-xl bg-white print:shadow-none relative"
            style={{
              width: "210mm",
              minHeight: "297mm",
            }}
          >
            {/* Page boundary indicator for preview */}
            <div
              className="absolute pointer-events-none print:hidden z-50 left-0 right-0 border-b-2 border-dashed border-red-500 flex items-center justify-center"
              style={{
                top: "297mm",
                height: "1px",
              }}
            >
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-3">
                Page Break
              </div>
            </div>
            {/* Second Page boundary indicator for preview */}
            <div
              className="absolute pointer-events-none print:hidden z-50 left-0 right-0 border-b-2 border-dashed border-red-500 flex items-center justify-center"
              style={{
                top: "594mm",
                height: "1px",
              }}
            >
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-3">
                Page Break
              </div>
            </div>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
