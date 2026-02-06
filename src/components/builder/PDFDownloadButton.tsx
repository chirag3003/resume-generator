"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import type { ResumeData } from "@/lib/schema";

interface PDFDownloadButtonProps {
  data: ResumeData;
}

export function PDFDownloadButton({ data }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileName = `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // Dynamic import to avoid SSR issues
      const { pdf } = await import("@react-pdf/renderer");
      const { ResumePDFDocument } = await import(
        "@/components/pdf/ResumePDFDocument"
      );

      const blob = await pdf(<ResumePDFDocument data={data} />).toBlob();
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
