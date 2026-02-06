"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

export function SkillsEditor() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();
  const { skills } = resumeData;

  const handleAddSkill = () => {
    addSkill({
      id: `skill-${Date.now()}`,
      name: "",
      level: undefined,
    });
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

      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex gap-2 items-center">
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              placeholder="Skill name..."
              className="flex-1"
            />
            <Select
              value={skill.level || ""}
              onValueChange={(value) =>
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
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No skills added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
}
