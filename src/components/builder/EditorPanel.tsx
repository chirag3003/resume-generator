"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
} from "lucide-react";

export function EditorPanel() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="h-full flex flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Resume Editor</h2>
        <p className="text-sm text-muted-foreground">
          Edit your resume details
        </p>
      </div>

      <ScrollArea className="flex-1">
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

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-4">
            <h3 className="font-medium">Personal Information</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo("fullName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={personalInfo.phone || ""}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={personalInfo.location || ""}
                  onChange={(e) =>
                    updatePersonalInfo("location", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={personalInfo.linkedin || ""}
                  onChange={(e) =>
                    updatePersonalInfo("linkedin", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={personalInfo.website || ""}
                  onChange={(e) =>
                    updatePersonalInfo("website", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  className="min-h-[100px]"
                  value={personalInfo.summary || ""}
                  onChange={(e) =>
                    updatePersonalInfo("summary", e.target.value)
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            <h3 className="font-medium">Work Experience</h3>
            <Accordion type="single" collapsible className="w-full">
              {experience.map((exp) => (
                <AccordionItem key={exp.id} value={exp.id}>
                  <AccordionTrigger className="text-sm">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{exp.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {exp.company}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 px-1">
                    <div className="space-y-1.5">
                      <Label>Job Title</Label>
                      <Input type="text" value={exp.title} readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Company</Label>
                      <Input type="text" value={exp.company} readOnly />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label>Start Date</Label>
                        <Input type="text" value={exp.startDate} readOnly />
                      </div>
                      <div className="space-y-1.5">
                        <Label>End Date</Label>
                        <Input
                          type="text"
                          value={exp.endDate || "Present"}
                          readOnly
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-1.5">
                      <Label>Highlights</Label>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <h3 className="font-medium">Education</h3>
            <Accordion type="single" collapsible className="w-full">
              {education.map((edu) => (
                <AccordionItem key={edu.id} value={edu.id}>
                  <AccordionTrigger className="text-sm">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{edu.degree}</span>
                      <span className="text-xs text-muted-foreground">
                        {edu.school}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 px-1">
                    <div className="space-y-1.5">
                      <Label>Degree</Label>
                      <Input type="text" value={edu.degree} readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>School</Label>
                      <Input type="text" value={edu.school} readOnly />
                    </div>
                    {edu.gpa && (
                      <div className="space-y-1.5">
                        <Label>GPA</Label>
                        <Input type="text" value={edu.gpa} readOnly />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
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
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <h3 className="font-medium">Projects</h3>
            <Accordion type="single" collapsible className="w-full">
              {projects.map((project) => (
                <AccordionItem key={project.id} value={project.id}>
                  <AccordionTrigger className="text-sm">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{project.name}</span>
                      {project.technologies && (
                        <span className="text-xs text-muted-foreground">
                          {project.technologies.slice(0, 3).join(", ")}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 px-1">
                    <div className="space-y-1.5">
                      <Label>Name</Label>
                      <Input type="text" value={project.name} readOnly />
                    </div>
                    {project.description && (
                      <div className="space-y-1.5">
                        <Label>Description</Label>
                        <Textarea value={project.description} readOnly />
                      </div>
                    )}
                    {project.url && (
                      <div className="space-y-1.5">
                        <Label>URL</Label>
                        <Input type="url" value={project.url} readOnly />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
