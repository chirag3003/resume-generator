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
import { Textarea } from "@/components/ui/textarea";
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
import type { Project } from "@/lib/schema";

function SortableProjectItem({
  project,
  updateProject,
  removeProject,
  handleAddHighlight,
  handleUpdateHighlight,
  handleRemoveHighlight,
  handleAddTechnology,
  handleUpdateTechnology,
  handleRemoveTechnology,
}: {
  project: Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  handleAddHighlight: (id: string) => void;
  handleUpdateHighlight: (id: string, idx: number, value: string) => void;
  handleRemoveHighlight: (id: string, idx: number) => void;
  handleAddTechnology: (id: string) => void;
  handleUpdateTechnology: (id: string, idx: number, value: string) => void;
  handleRemoveTechnology: (id: string, idx: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={project.id}>
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
              <span className="font-medium">
                {project.name || "New Project"}
              </span>
              {project.technologies && project.technologies.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {project.technologies.slice(0, 3).join(", ")}
                </span>
              )}
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="space-y-3 px-1 ml-8">
          <div className="space-y-1.5">
            <Label>Project Name</Label>
            <Input
              type="text"
              value={project.name}
              onChange={(e) =>
                updateProject(project.id, { name: e.target.value })
              }
              placeholder="e.g. Open Source CLI Tool"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={project.description || ""}
              onChange={(e) =>
                updateProject(project.id, { description: e.target.value })
              }
              placeholder="Brief description of your project..."
            />
          </div>
          <div className="space-y-1.5">
            <Label>URL</Label>
            <Input
              type="url"
              value={project.url || ""}
              onChange={(e) =>
                updateProject(project.id, { url: e.target.value })
              }
              placeholder="e.g. https://github.com/username/project"
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Technologies</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddTechnology(project.id)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {project.technologies?.map((tech, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) =>
                      handleUpdateTechnology(project.id, idx, e.target.value)
                    }
                    placeholder="e.g. TypeScript, React..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => handleRemoveTechnology(project.id, idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Highlights</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddHighlight(project.id)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {project.highlights?.map((highlight, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) =>
                      handleUpdateHighlight(project.id, idx, e.target.value)
                    }
                    placeholder="Describe an achievement..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => handleRemoveHighlight(project.id, idx)}
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
            onClick={() => removeProject(project.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove Project
          </Button>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export function ProjectsEditor() {
  const {
    resumeData,
    addProject,
    updateProject,
    removeProject,
    reorderProjects,
  } = useResumeStore();
  const { projects } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddProject = () => {
    addProject({
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      url: "",
      technologies: [],
      highlights: [],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      reorderProjects(oldIndex, newIndex);
    }
  };

  const handleUpdateHighlight = (
    projId: string,
    highlightIndex: number,
    value: string,
  ) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj || !proj.highlights) return;
    const newHighlights = [...proj.highlights];
    newHighlights[highlightIndex] = value;
    updateProject(projId, { highlights: newHighlights });
  };

  const handleAddHighlight = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, { highlights: [...(proj.highlights || []), ""] });
  };

  const handleRemoveHighlight = (projId: string, highlightIndex: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj || !proj.highlights) return;
    const newHighlights = proj.highlights.filter(
      (_, i) => i !== highlightIndex,
    );
    updateProject(projId, { highlights: newHighlights });
  };

  const handleUpdateTechnology = (
    projId: string,
    techIndex: number,
    value: string,
  ) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj || !proj.technologies) return;
    const newTechnologies = [...proj.technologies];
    newTechnologies[techIndex] = value;
    updateProject(projId, { technologies: newTechnologies });
  };

  const handleAddTechnology = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, {
      technologies: [...(proj.technologies || []), ""],
    });
  };

  const handleRemoveTechnology = (projId: string, techIndex: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj || !proj.technologies) return;
    const newTechnologies = proj.technologies.filter((_, i) => i !== techIndex);
    updateProject(projId, { technologies: newTechnologies });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Projects</h3>
        <Button variant="outline" size="sm" onClick={handleAddProject}>
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
          items={projects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="single" collapsible className="w-full pl-6">
            {projects.map((project) => (
              <SortableProjectItem
                key={project.id}
                project={project}
                updateProject={updateProject}
                removeProject={removeProject}
                handleAddHighlight={handleAddHighlight}
                handleUpdateHighlight={handleUpdateHighlight}
                handleRemoveHighlight={handleRemoveHighlight}
                handleAddTechnology={handleAddTechnology}
                handleUpdateTechnology={handleUpdateTechnology}
                handleRemoveTechnology={handleRemoveTechnology}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>

      {projects.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No projects added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
