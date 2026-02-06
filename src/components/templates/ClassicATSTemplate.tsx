"use client";

import type { ResumeData } from "@/lib/schema";

interface ClassicATSTemplateProps {
  data: ResumeData;
}

export function ClassicATSTemplate({ data }: ClassicATSTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black p-12 font-sans text-sm leading-relaxed">
      {/* Header - Personal Info */}
      <header className="text-center mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
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
              <span>{personalInfo.linkedin.replace("https://", "")}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="text-gray-400">|</span>
              <span>{personalInfo.website.replace("https://", "")}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.title}</h3>
                <span className="text-xs text-gray-600">
                  {exp.startDate} – {exp.endDate || "Present"}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-gray-600">
                <span>{exp.company}</span>
                {exp.location && (
                  <span className="text-xs">{exp.location}</span>
                )}
              </div>
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-gray-700">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span className="text-xs text-gray-600">
                  {edu.startDate && `${edu.startDate} – `}
                  {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-gray-600">
                <span>{edu.school}</span>
                {edu.location && (
                  <span className="text-xs">{edu.location}</span>
                )}
              </div>
              {edu.gpa && (
                <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
              )}
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-gray-700">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
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
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{project.name}</h3>
                {project.url && (
                  <span className="text-xs text-gray-600">
                    {project.url.replace("https://", "")}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-gray-700">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  Technologies: {project.technologies.join(", ")}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-gray-700">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
