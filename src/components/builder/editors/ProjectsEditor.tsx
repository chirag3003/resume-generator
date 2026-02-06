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
import { Textarea } from "@/components/ui/textarea";

export function ProjectsEditor() {
  const { resumeData } = useResumeStore();
  const { projects } = resumeData;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Projects</h3>
      <Accordion type="single" collapsible className="w-full">
        {projects.map((project) => (
          <AccordionItem key={project.id} value={project.id}>
            <AccordionTrigger className="text-sm">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">{project.name}</span>
                {project.technologies && (
                  <span className="text-xs text-muted-foreground">
                    {project.technologies.slice(0, 3).join(", ")}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-1">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input type="text" value={project.name} readOnly />
              </div>
              {project.description && (
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea value={project.description} readOnly />
                </div>
              )}
              {project.url && (
                <div className="space-y-1.5">
                  <Label>URL</Label>
                  <Input type="url" value={project.url} readOnly />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
