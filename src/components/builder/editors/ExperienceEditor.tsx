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

export function ExperienceEditor() {
  const { resumeData, addExperience, updateExperience, removeExperience } =
    useResumeStore();
  const { experience } = resumeData;

  const handleAddExperience = () => {
    addExperience({
      id: `exp-${Date.now()}`,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      highlights: [],
    });
  };

  const handleUpdateHighlight = (
    expId: string,
    highlightIndex: number,
    value: string,
  ) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights];
    newHighlights[highlightIndex] = value;
    updateExperience(expId, { highlights: newHighlights });
  };

  const handleAddHighlight = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, { highlights: [...exp.highlights, ""] });
  };

  const handleRemoveHighlight = (expId: string, highlightIndex: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = exp.highlights.filter((_, i) => i !== highlightIndex);
    updateExperience(expId, { highlights: newHighlights });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Work Experience</h3>
        <Button variant="outline" size="sm" onClick={handleAddExperience}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {experience.map((exp) => (
          <AccordionItem key={exp.id} value={exp.id}>
            <AccordionTrigger className="text-sm">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">
                  {exp.title || "New Position"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {exp.company || "Company Name"}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-1">
              <div className="space-y-1.5">
                <Label>Job Title</Label>
                <Input
                  type="text"
                  value={exp.title}
                  onChange={(e) =>
                    updateExperience(exp.id, { title: e.target.value })
                  }
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Company</Label>
                <Input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                  placeholder="e.g. TechCorp Inc."
                />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  type="text"
                  value={exp.location || ""}
                  onChange={(e) =>
                    updateExperience(exp.id, { location: e.target.value })
                  }
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                    placeholder="e.g. Jan 2020"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input
                    type="text"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    placeholder="Present"
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Highlights</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddHighlight(exp.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) =>
                          handleUpdateHighlight(exp.id, idx, e.target.value)
                        }
                        placeholder="Describe an achievement..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => handleRemoveHighlight(exp.id, idx)}
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
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Experience
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {experience.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No work experience added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
