"use client";

import type { ResumeData } from "@/lib/schema";

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black font-sans text-sm leading-relaxed print:p-0 print:pt-0">
      {/* Header with accent color */}
      <header
        className="bg-slate-800 text-white px-12 py-8 print:break-inside-avoid print:px-16"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-white"
            >
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 mt-1">
          {personalInfo.linkedin && (
            <a
              href={
                personalInfo.linkedin.startsWith("http")
                  ? personalInfo.linkedin
                  : `https://${personalInfo.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
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
              className="hover:text-white"
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
              className="hover:text-white"
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
              className="hover:text-white"
            >
              {personalInfo.website.replace("https://", "").replace("www.", "")}
            </a>
          )}
        </div>
      </header>

      <div className="p-8 pt-6 print:px-10 print:pb-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-4 print:break-inside-avoid">
            <p
              className="text-gray-700 italic border-l-4 border-slate-800 pl-4 leading-normal"
              style={{
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
              }}
            >
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2 print:break-after-avoid">
              <span
                className="w-8 h-0.5 bg-slate-800"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                }}
              ></span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 ml-6 print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">{exp.title}</h3>
                  <span
                    className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-medium"
                    style={{
                      WebkitPrintColorAdjust: "exact",
                      printColorAdjust: "exact",
                    }}
                  >
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-700 text-sm font-medium mb-1">
                  {exp.company}
                  {exp.location && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      • {exp.location}
                    </span>
                  )}
                </p>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 text-gray-700 text-sm space-y-0.5">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="pl-1">
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
          <section className="mb-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2 print:break-after-avoid">
              <span
                className="w-8 h-0.5 bg-slate-800"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                }}
              ></span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 ml-6 print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 font-medium">
                    {edu.startDate && `${edu.startDate} – `}
                    {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 text-sm font-medium">
                  {edu.school}
                  {edu.location && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      • {edu.location}
                    </span>
                  )}
                  {edu.gpa && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      • GPA: {edu.gpa}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-4 print:break-inside-avoid">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span
                className="w-8 h-0.5 bg-slate-800"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                }}
              ></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 ml-6">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    WebkitPrintColorAdjust: "exact",
                    printColorAdjust: "exact",
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2 print:break-after-avoid">
              <span
                className="w-8 h-0.5 bg-slate-800"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                }}
              ></span>
              Projects
            </h2>
            {projects.map((project) => (
              <div
                key={project.id}
                className="mb-2 ml-6 print:break-inside-avoid"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-800">
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
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {project.url
                        .replace("https://", "")
                        .replace("http://", "")
                        .replace("www.", "")}
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm mt-0.5">
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    {project.technologies.join(" • ")}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 text-gray-700 text-sm space-y-0.5">
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
