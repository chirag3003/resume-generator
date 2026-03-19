"use client";

import type { ResumeData } from "@/lib/schema";

interface ClassicATSTemplateProps {
  data: ResumeData;
}

export function ClassicATSTemplate({ data }: ClassicATSTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black p-8 print:p-0 font-sans text-sm leading-snug">
      <div className="print:px-8 print:py-8">
        {/* Header - Personal Info */}
        <header className="text-center mb-4 border-b border-gray-300 pb-4">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            {personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-700">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-blue-600 print:text-black"
              >
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <>
                <span className="text-gray-400">|</span>
                <span>{personalInfo.phone}</span>
              </>
            )}
            {personalInfo.location && (
              <>
                <span className="text-gray-400">|</span>
                <span>{personalInfo.location}</span>
              </>
            )}
            {personalInfo.linkedin && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={
                    personalInfo.linkedin.startsWith("http")
                      ? personalInfo.linkedin
                      : `https://${personalInfo.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 print:text-black"
                >
                  {personalInfo.linkedin
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
            {personalInfo.github && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={
                    personalInfo.github.startsWith("http")
                      ? personalInfo.github
                      : `https://${personalInfo.github}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 print:text-black"
                >
                  {personalInfo.github
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
            {personalInfo.portfolio && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={
                    personalInfo.portfolio.startsWith("http")
                      ? personalInfo.portfolio
                      : `https://${personalInfo.portfolio}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 print:text-black"
                >
                  {personalInfo.portfolio
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
            {personalInfo.website && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={
                    personalInfo.website.startsWith("http")
                      ? personalInfo.website
                      : `https://${personalInfo.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 print:text-black"
                >
                  {personalInfo.website
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-4 print:break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-900">
              Summary
            </h2>
            <p className="text-gray-800 leading-normal">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-900">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-700 font-medium">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-gray-700 mb-1">
                  <span className="font-medium">{exp.company}</span>
                  {exp.location && (
                    <span className="text-xs">{exp.location}</span>
                  )}
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 text-gray-800 space-y-0.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-1">
                        {highlight}
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
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-900">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-700 font-medium">
                    {edu.startDate && `${edu.startDate} – `}
                    {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-gray-700">
                  <span className="font-medium">{edu.school}</span>
                  {edu.location && (
                    <span className="text-xs">{edu.location}</span>
                  )}
                </div>
                {edu.gpa && (
                  <p className="text-xs text-gray-700 mt-0.5">GPA: {edu.gpa}</p>
                )}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 text-gray-800 space-y-0.5">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-1">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-4 print:break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-900">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-800">
              {skills.map((skill, idx) => (
                <span key={skill.id}>
                  {skill.name}
                  {idx < skills.length - 1 && (
                    <span className="text-gray-400 ml-2">•</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-900">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-2 print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={
                        project.url.startsWith("http")
                          ? project.url
                          : `https://${project.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline print:text-gray-700"
                    >
                      {project.url
                        .replace("https://", "")
                        .replace("http://", "")
                        .replace("www.", "")}
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-800 mt-0.5">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1 font-medium">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 text-gray-800 space-y-0.5">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-1">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
