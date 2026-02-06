"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";

export function EducationEditor() {
  const { resumeData, addEducation, updateEducation, removeEducation } =
    useResumeStore();
  const { education } = resumeData;

  const handleAddEducation = () => {
    addEducation({
      id: `edu-${Date.now()}`,
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      highlights: [],
    });
  };

  const handleUpdateHighlight = (
    eduId: string,
    highlightIndex: number,
    value: string,
  ) => {
    const edu = education.find((e) => e.id === eduId);
    if (!edu || !edu.highlights) return;
    const newHighlights = [...edu.highlights];
    newHighlights[highlightIndex] = value;
    updateEducation(eduId, { highlights: newHighlights });
  };

  const handleAddHighlight = (eduId: string) => {
    const edu = education.find((e) => e.id === eduId);
    if (!edu) return;
    updateEducation(eduId, { highlights: [...(edu.highlights || []), ""] });
  };

  const handleRemoveHighlight = (eduId: string, highlightIndex: number) => {
    const edu = education.find((e) => e.id === eduId);
    if (!edu || !edu.highlights) return;
    const newHighlights = edu.highlights.filter((_, i) => i !== highlightIndex);
    updateEducation(eduId, { highlights: newHighlights });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Education</h3>
        <Button variant="outline" size="sm" onClick={handleAddEducation}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {education.map((edu) => (
          <AccordionItem key={edu.id} value={edu.id}>
            <AccordionTrigger className="text-sm">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">
                  {edu.degree || "New Degree"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {edu.school || "School Name"}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-1">
              <div className="space-y-1.5">
                <Label>Degree</Label>
                <Input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                  placeholder="e.g. B.S. Computer Science"
                />
              </div>
              <div className="space-y-1.5">
                <Label>School</Label>
                <Input
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(edu.id, { school: e.target.value })
                  }
                  placeholder="e.g. University of California"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  type="text"
                  value={edu.location || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { location: e.target.value })
                  }
                  placeholder="e.g. Berkeley, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input
                    type="text"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                    placeholder="e.g. Aug 2018"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input
                    type="text"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                    placeholder="e.g. May 2022"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>GPA</Label>
                <Input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { gpa: e.target.value })
                  }
                  placeholder="e.g. 3.8"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Highlights</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddHighlight(edu.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {edu.highlights?.map((highlight, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) =>
                          handleUpdateHighlight(edu.id, idx, e.target.value)
                        }
                        placeholder="e.g. Dean's List, Honor Society..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => handleRemoveHighlight(edu.id, idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Education
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {education.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No education added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
