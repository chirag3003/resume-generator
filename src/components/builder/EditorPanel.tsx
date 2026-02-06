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
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo("fullName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.phone || ""}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.location || ""}
                  onChange={(e) =>
                    updatePersonalInfo("location", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">LinkedIn</label>
                <input
                  type="url"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.linkedin || ""}
                  onChange={(e) =>
                    updatePersonalInfo("linkedin", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <input
                  type="url"
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  value={personalInfo.website || ""}
                  onChange={(e) =>
                    updatePersonalInfo("website", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Summary</label>
                <textarea
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm min-h-[100px]"
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
              {experience.map((exp, idx) => (
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
                    <div>
                      <label className="text-sm font-medium">Job Title</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={exp.title}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={exp.company}
                        readOnly
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">
                          Start Date
                        </label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                          value={exp.startDate}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                          value={exp.endDate || "Present"}
                          readOnly
                        />
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium">Highlights</label>
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
                    <div>
                      <label className="text-sm font-medium">Degree</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={edu.degree}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">School</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={edu.school}
                        readOnly
                      />
                    </div>
                    {edu.gpa && (
                      <div>
                        <label className="text-sm font-medium">GPA</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                          value={edu.gpa}
                          readOnly
                        />
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
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={project.name}
                        readOnly
                      />
                    </div>
                    {project.description && (
                      <div>
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                          value={project.description}
                          readOnly
                        />
                      </div>
                    )}
                    {project.url && (
                      <div>
                        <label className="text-sm font-medium">URL</label>
                        <input
                          type="url"
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                          value={project.url}
                          readOnly
                        />
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
