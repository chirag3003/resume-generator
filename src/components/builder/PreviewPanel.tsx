"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { ResumeData } from "@/lib/schema";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { ClassicATSTemplate } from "@/components/templates/ClassicATSTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
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
      case "classic":
      default:
        return <ClassicATSTemplate data={data} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-zinc-100 dark:bg-zinc-900 flex flex-col overflow-hidden"
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 bg-background/80 backdrop-blur border-b shrink-0">
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
      <div className="sm:hidden flex justify-center p-2 bg-background/50 border-b">
        <TemplateSelector />
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-3 sm:p-6">
        <div
          className="shadow-2xl origin-top"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
