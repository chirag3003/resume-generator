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
import { Plus, Trash2, X, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Education } from "@/lib/schema";

function SortableEducationItem({
  edu,
  updateEducation,
  removeEducation,
  handleAddHighlight,
  handleUpdateHighlight,
  handleRemoveHighlight,
}: {
  edu: Education;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  handleAddHighlight: (id: string) => void;
  handleUpdateHighlight: (id: string, idx: number, value: string) => void;
  handleRemoveHighlight: (id: string, idx: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: edu.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={edu.id}>
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <AccordionTrigger className="text-sm flex-1">
            <div className="flex flex-col items-start text-left">
              <span className="font-medium">{edu.degree || "New Degree"}</span>
              <span className="text-xs text-muted-foreground">
                {edu.school || "School Name"}
              </span>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="space-y-3 px-1 ml-8">
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
              onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
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
    </div>
  );
}

export function EducationEditor() {
  const {
    resumeData,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
  } = useResumeStore();
  const { education } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = education.findIndex((e) => e.id === active.id);
      const newIndex = education.findIndex((e) => e.id === over.id);
      reorderEducation(oldIndex, newIndex);
    }
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={education.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="single" collapsible className="w-full pl-6">
            {education.map((edu) => (
              <SortableEducationItem
                key={edu.id}
                edu={edu}
                updateEducation={updateEducation}
                removeEducation={removeEducation}
                handleAddHighlight={handleAddHighlight}
                handleUpdateHighlight={handleUpdateHighlight}
                handleRemoveHighlight={handleRemoveHighlight}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>

      {education.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No education added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
