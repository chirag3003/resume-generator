"use client";

import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/lib/schema";
import { useResumeStore } from "@/lib/store/useResumeStore";

interface PDFDownloadButtonProps {
  data: ResumeData;
}

export function PDFDownloadButton({ data }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activeTemplate } = useResumeStore();
  const fileName = `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");

      let PdfComponent: React.ComponentType<{ data: ResumeData }>;

      switch (activeTemplate) {
        case "modern": {
          const { ModernPDFDocument } = await import(
            "@/components/pdf/ModernPDFDocument"
          );
          PdfComponent = ModernPDFDocument;
          break;
        }
        case "minimal": {
          const { MinimalPDFDocument } = await import(
            "@/components/pdf/MinimalPDFDocument"
          );
          PdfComponent = MinimalPDFDocument;
          break;
        }
        default: {
          const { ResumePDFDocument } = await import(
            "@/components/pdf/ResumePDFDocument"
          );
          PdfComponent = ResumePDFDocument;
          break;
        }
      }

      const blob = await pdf(<PdfComponent data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <Button disabled className="gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <Button onClick={handleDownload} disabled={isLoading} className="gap-2">
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}
