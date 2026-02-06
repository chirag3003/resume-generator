"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";

const templates = [
  {
    id: "classic",
    name: "Classic ATS",
    description: "Clean, traditional layout",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Dark header with accent colors",
  },
  { id: "minimal", name: "Minimal", description: "Light, elegant typography" },
] as const;

export function TemplateSelector() {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="flex items-center gap-2">
      <FileText className="h-4 w-4 text-muted-foreground" />
      <Select value={activeTemplate} onValueChange={setActiveTemplate}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              <div className="flex flex-col">
                <span>{template.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
