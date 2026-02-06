"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, GripVertical } from "lucide-react";
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
import type { Skill } from "@/lib/schema";

function SortableSkillItem({
  skill,
  updateSkill,
  removeSkill,
}: {
  skill: Skill;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-center">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 opacity-50 hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        value={skill.name}
        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
        placeholder="Skill name..."
        className="flex-1"
      />
      <Select
        value={skill.level || ""}
        onValueChange={(value: string) =>
          updateSkill(skill.id, {
            level: value as
              | "beginner"
              | "intermediate"
              | "advanced"
              | "expert"
              | undefined,
          })
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
          <SelectItem value="expert">Expert</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={() => removeSkill(skill.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function SkillsEditor() {
  const { resumeData, addSkill, updateSkill, removeSkill, reorderSkills } =
    useResumeStore();
  const { skills } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddSkill = () => {
    addSkill({
      id: `skill-${Date.now()}`,
      name: "",
      level: undefined,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((s) => s.id === active.id);
      const newIndex = skills.findIndex((s) => s.id === over.id);
      reorderSkills(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Skills</h3>
        <Button variant="outline" size="sm" onClick={handleAddSkill}>
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
          items={skills.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {skills.map((skill) => (
              <SortableSkillItem
                key={skill.id}
                skill={skill}
                updateSkill={updateSkill}
                removeSkill={removeSkill}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No skills added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
