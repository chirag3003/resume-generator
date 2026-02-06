/** biome-ignore-all lint/a11y/noStaticElementInteractions: <not needed> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <not needed> */
"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, Plus, Sparkles, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { generateContent } from "@/lib/ai/aiService";
import { BULLET_ENHANCER_PROMPT } from "@/lib/ai/prompts";
import type { Experience } from "@/lib/schema/resume";
import { useAISettingsStore } from "@/lib/store/useAISettingsStore";
import { useResumeStore } from "@/lib/store/useResumeStore";

interface SortableExperienceItemProps {
  exp: {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    highlights: string[];
  };
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  handleAddHighlight: (id: string) => void;
  handleUpdateHighlight: (id: string, idx: number, value: string) => void;
  handleRemoveHighlight: (id: string, idx: number) => void;
  onEnhance: (
    expId: string,
    idx: number,
    text: string,
    context: { role: string; company: string },
  ) => void;
  isEnhancing: (expId: string, idx: number) => boolean;
}

function SortableExperienceItem({
  exp,
  updateExperience,
  removeExperience,
  handleAddHighlight,
  handleUpdateHighlight,
  handleRemoveHighlight,
  onEnhance,
  isEnhancing,
}: SortableExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={exp.id}>
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
              <span className="font-medium">{exp.title || "New Position"}</span>
              <span className="text-xs text-muted-foreground">
                {exp.company || "Company Name"}
              </span>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="space-y-3 px-1 ml-8">
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
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1 relative">
                    <Input
                      value={highlight}
                      onChange={(e) =>
                        handleUpdateHighlight(exp.id, idx, e.target.value)
                      }
                      placeholder="Describe an achievement..."
                      className="pr-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                      title="Improve with AI"
                      onClick={() =>
                        onEnhance(exp.id, idx, highlight, {
                          role: exp.title,
                          company: exp.company,
                        })
                      }
                      disabled={!highlight || isEnhancing(exp.id, idx)}
                    >
                      {isEnhancing(exp.id, idx) ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 mt-0.5"
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
    </div>
  );
}

import { useUserProfileStore } from "@/lib/store/useUserProfileStore";

// ... imports ...

export function ExperienceEditor() {
  const {
    resumeData,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
  } = useResumeStore();
  const { experience } = resumeData;
  const settings = useAISettingsStore();
  const { context: globalContext } = useUserProfileStore();

  const [enhancingId, setEnhancingId] = useState<{
    id: string;
    idx: number;
  } | null>(null);

  const [enhancementOptions, setEnhancementOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  // Drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = experience.findIndex((e) => e.id === active.id);
      const newIndex = experience.findIndex((e) => e.id === over.id);
      reorderExperience(oldIndex, newIndex);
    }
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

  const handleEnhance = async (
    expId: string,
    idx: number,
    text: string,
    context: { role: string; company: string },
  ) => {
    const provider = settings.selectedProvider;
    if (!settings.hasKey(provider)) {
      toast.error(
        `Please configure your ${provider} API key in settings first.`,
      );
      return;
    }

    setEnhancingId({ id: expId, idx });
    try {
      const promptData = {
        originalText: text,
        role: context.role || "Employee",
        company: context.company || "Company",
      };

      const prompt = JSON.stringify(promptData);

      const response = await generateContent({
        provider,
        settings,
        context: globalContext, // Pass global context
        prompt,
        systemPrompt: BULLET_ENHANCER_PROMPT.replace(
          "{originalText}",
          promptData.originalText,
        )
          .replace("{role}", promptData.role)
          .replace("{company}", promptData.company),
      });

      const json = JSON.parse(response);
      if (json.options && Array.isArray(json.options)) {
        setEnhancementOptions(json.options);
        setShowOptions(true);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance text. Please try again.");
      setEnhancingId(null); // Reset on error
    }
    // Do not reset enhancingId here on success, keep it until selection or close
  };

  const handleSelectEnhancement = (option: string) => {
    if (enhancingId) {
      handleUpdateHighlight(enhancingId.id, enhancingId.idx, option);
    }
    setShowOptions(false);
    setEnhancingId(null);
  };

  const handleCloseDialog = (open: boolean) => {
    setShowOptions(open);
    if (!open) setEnhancingId(null);
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={experience.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="single" collapsible className="w-full pl-6">
            {experience.map((exp) => (
              <SortableExperienceItem
                key={exp.id}
                exp={exp}
                updateExperience={updateExperience}
                removeExperience={removeExperience}
                handleAddHighlight={handleAddHighlight}
                handleUpdateHighlight={handleUpdateHighlight}
                handleRemoveHighlight={handleRemoveHighlight}
                onEnhance={handleEnhance}
                isEnhancing={(id, idx) =>
                  enhancingId?.id === id && enhancingId?.idx === idx
                }
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>

      {experience.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No work experience added yet. Click "Add" to get started.
        </p>
      )}

      {/* Options Dialog */}
      <Dialog open={showOptions} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enhanced Suggestions</DialogTitle>
            <DialogDescription>
              Select an improved version of your bullet point.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {enhancementOptions.map((option, i) => (
              <div
                key={i}
                className="p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                onClick={() => handleSelectEnhancement(option)}
              >
                <p className="text-sm">{option}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
