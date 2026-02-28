"use client";

import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/lib/schema";

interface PDFDownloadButtonProps {
  data: ResumeData; // Kept for prop compatibility
}

export function PDFDownloadButton({ data }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    // When the user prints, the browser automatically applies the @media print CSS
    // which hides all standard UI and forces the resume into the center
    window.print();
  };

  if (!isClient) {
    return (
      <Button disabled className="gap-2">
        <Printer className="h-4 w-4" />
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={handlePrint}
      className="gap-2"
      title="Print or save as PDF"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">Print / Save PDF</span>
    </Button>
  );
}
