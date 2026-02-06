"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";

export function SkillsEditor() {
  const { resumeData } = useResumeStore();
  const { skills } = resumeData;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
          >
            {skill.name}
            {skill.level && (
              <span className="text-xs text-muted-foreground ml-1">
                ({skill.level})
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
