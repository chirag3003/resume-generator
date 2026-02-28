"use client";

import type { ResumeData } from "@/lib/schema";

interface MinimalTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black p-16 print:p-0 print:pt-12 print:pb-12 font-serif text-sm leading-relaxed">
      <div className="print:px-16">
        {/* Header - Ultra minimal */}
        <header className="mb-8 print:mb-6">
          <h1 className="text-4xl font-light tracking-wide mb-3">
            {personalInfo.fullName}
          </h1>
          <div className="text-xs text-gray-500 space-y-0.5">
            <div className="flex flex-wrap gap-x-6">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-black"
                >
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
            <div className="flex flex-wrap gap-x-6">
              {personalInfo.linkedin && (
                <a
                  href={
                    personalInfo.linkedin.startsWith("http")
                      ? personalInfo.linkedin
                      : `https://${personalInfo.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {personalInfo.linkedin
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={
                    personalInfo.github.startsWith("http")
                      ? personalInfo.github
                      : `https://${personalInfo.github}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {personalInfo.github
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={
                    personalInfo.portfolio.startsWith("http")
                      ? personalInfo.portfolio
                      : `https://${personalInfo.portfolio}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {personalInfo.portfolio
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              )}
              {personalInfo.website && (
                <a
                  href={
                    personalInfo.website.startsWith("http")
                      ? personalInfo.website
                      : `https://${personalInfo.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {personalInfo.website
                    .replace("https://", "")
                    .replace("www.", "")}
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <p className="text-gray-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 print:break-after-avoid">
              Experience
            </h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-5 print:mb-4 print:break-inside-avoid"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-gray-900">{exp.title}</span>
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
          <section className="mb-8 print:mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 print:break-after-avoid">
              Education
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                className="mb-4 print:mb-3 print:break-inside-avoid"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-gray-900">
                    {edu.degree}
                  </span>
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
          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
              Skills
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {skills.map((s) => s.name).join(" · ")}
            </p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 print:break-after-avoid">
              Projects
            </h2>
            {projects.map((project) => (
              <div
                key={project.id}
                className="mb-4 print:mb-3 print:break-inside-avoid"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-gray-900">
                    {project.name}
                  </span>
                  {project.url && (
                    <a
                      href={
                        project.url.startsWith("http")
                          ? project.url
                          : `https://${project.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-black hover:underline"
                    >
                      {project.url
                        .replace("https://", "")
                        .replace("http://", "")
                        .replace("www.", "")}
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-500 text-xs">{project.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
