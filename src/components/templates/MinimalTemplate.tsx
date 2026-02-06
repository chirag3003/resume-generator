"use client";

import type { ResumeData } from "@/lib/schema";

interface MinimalTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black p-16 font-serif text-sm leading-relaxed">
      {/* Header - Ultra minimal */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-wide mb-3">
          {personalInfo.fullName}
        </h1>
        <div className="text-xs text-gray-500 space-y-0.5">
          <div className="flex flex-wrap gap-x-6">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap gap-x-6">
            {personalInfo.linkedin && (
              <span>
                {personalInfo.linkedin
                  .replace("https://", "")
                  .replace("http://", "")}
              </span>
            )}
            {personalInfo.github && (
              <span>
                {personalInfo.github
                  .replace("https://", "")
                  .replace("http://", "")}
              </span>
            )}
            {personalInfo.portfolio && (
              <span>
                {personalInfo.portfolio
                  .replace("https://", "")
                  .replace("http://", "")}
              </span>
            )}
            {personalInfo.website && (
              <span>{personalInfo.website.replace("https://", "")}</span>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium">{exp.title}</span>
                <span className="text-xs text-gray-400">
                  {exp.startDate} — {exp.endDate || "Present"}
                </span>
              </div>
              <p className="text-gray-500 text-xs mb-2">
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </p>
              {exp.highlights.length > 0 && (
                <ul className="text-gray-600 text-sm space-y-1">
                  {exp.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-300"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-medium">{edu.degree}</span>
                <span className="text-xs text-gray-400">
                  {edu.startDate && `${edu.startDate} — `}
                  {edu.endDate}
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                {edu.school}
                {edu.gpa && ` · ${edu.gpa}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
            Skills
          </h2>
          <p className="text-gray-600">
            {skills.map((s) => s.name).join(" · ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-medium">{project.name}</span>
                {project.url && (
                  <span className="text-xs text-gray-400">
                    {project.url.replace("https://", "")}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-gray-500 text-xs">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
