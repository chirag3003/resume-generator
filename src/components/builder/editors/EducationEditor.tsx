"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EducationEditor() {
  const { resumeData } = useResumeStore();
  const { education } = resumeData;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Education</h3>
      <Accordion type="single" collapsible className="w-full">
        {education.map((edu) => (
          <AccordionItem key={edu.id} value={edu.id}>
            <AccordionTrigger className="text-sm">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">{edu.degree}</span>
                <span className="text-xs text-muted-foreground">
                  {edu.school}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-1">
              <div className="space-y-1.5">
                <Label>Degree</Label>
                <Input type="text" value={edu.degree} readOnly />
              </div>
              <div className="space-y-1.5">
                <Label>School</Label>
                <Input type="text" value={edu.school} readOnly />
              </div>
              {edu.gpa && (
                <div className="space-y-1.5">
                  <Label>GPA</Label>
                  <Input type="text" value={edu.gpa} readOnly />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
