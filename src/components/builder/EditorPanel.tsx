"use client";

import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  User,
  Wrench,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EducationEditor,
  ExperienceEditor,
  PersonalInfoEditor,
  ProjectsEditor,
  SkillsEditor,
} from "./editors";

export function EditorPanel() {
  return (
    <div className="h-full flex flex-col bg-background border-r overflow-hidden">
      <div className="p-4 border-b shrink-0">
        <h2 className="font-semibold text-lg">Resume Editor</h2>
        <p className="text-sm text-muted-foreground">
          Edit your resume details
        </p>
      </div>

      <ScrollArea className="flex-1 h-0">
        <Tabs defaultValue="personal" className="p-4">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="personal" className="text-xs">
              <User className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">
              <Briefcase className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs">
              <GraduationCap className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              <Wrench className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">
              <FolderKanban className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoEditor />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="education">
            <EducationEditor />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsEditor />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
