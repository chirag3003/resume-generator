"use client";

import type { ResumeData } from "@/lib/schema";

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black font-sans text-sm leading-relaxed">
      {/* Header with accent color */}
      <header className="bg-slate-800 text-white px-12 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 mt-1">
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
      </header>

      <div className="p-12 pt-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <p className="text-gray-700 italic border-l-4 border-slate-800 pl-4">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800"></span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 ml-10">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">{exp.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-2 text-gray-700 text-sm space-y-1">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800"></span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 ml-10">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">
                    {edu.startDate && `${edu.startDate} – `}
                    {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {edu.school}
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 ml-10">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800"></span>
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3 ml-10">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">
                    {project.name}
                  </h3>
                  {project.url && (
                    <span className="text-xs text-blue-600">
                      {project.url.replace("https://", "")}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {project.technologies.join(" • ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
