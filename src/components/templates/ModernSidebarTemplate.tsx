"use client";

import type { ResumeData } from "@/lib/schema";

interface ModernSidebarTemplateProps {
  data: ResumeData;
}

export function ModernSidebarTemplate({ data }: ModernSidebarTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black print:p-0 font-sans text-sm leading-snug">
      <div className="flex h-full min-h-[297mm]">
        {/* Left Sidebar (Dark) */}
        <aside
          className="w-[30%] bg-slate-900 text-slate-200 p-8 print:p-8"
          style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-light tracking-wide mb-2 text-white leading-tight">
              {personalInfo.fullName.split(" ").map((name, i, arr) => (
                <span
                  key={i}
                  className={i === arr.length - 1 ? "font-bold block" : "block"}
                >
                  {name}
                </span>
              ))}
            </h1>
          </div>

          <section className="mb-8 space-y-3 text-sm">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">
              Contact
            </h2>
            {personalInfo.email && (
              <div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && (
              <div>
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
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div>
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
                  GitHub
                </a>
              </div>
            )}
            {personalInfo.portfolio && (
              <div>
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
                  Portfolio
                </a>
              </div>
            )}
            {personalInfo.website && (
              <div>
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
                  Website
                </a>
              </div>
            )}
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 print:break-inside-avoid">
                  <h3 className="font-semibold text-white text-sm">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {edu.school}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {edu.startDate && `${edu.startDate} – `}
                    {edu.endDate}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8 print:break-inside-avoid">
              <h2 className="text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs bg-slate-800 text-slate-200 px-2 py-1 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="w-[70%] p-8 print:p-8 bg-white text-slate-800">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-8 print:break-inside-avoid">
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                <span className="w-6 h-0.5 bg-blue-600 mr-3"></span>
                Profile
              </h2>
              <p className="text-slate-700 leading-normal pl-9">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center print:break-after-avoid">
                <span className="w-6 h-0.5 bg-blue-600 mr-3"></span>
                Professional Experience
              </h2>
              <div className="pl-9 space-y-5">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="print:break-inside-avoid relative"
                  >
                    <div className="absolute -left-9 top-1.5 w-2 h-2 rounded-full bg-slate-300 border-2 border-white"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-slate-900">{exp.title}</h3>
                      <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider shrink-0 ml-2">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-slate-600 font-medium mb-1.5">
                      {exp.company}
                      {exp.location && <span> • {exp.location}</span>}
                    </div>
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1.5 text-slate-700 space-y-1">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="pl-1">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center print:break-after-avoid">
                <span className="w-6 h-0.5 bg-blue-600 mr-3"></span>
                Projects
              </h2>
              <div className="pl-9 space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="print:break-inside-avoid relative"
                  >
                    <div className="absolute -left-9 top-1.5 w-2 h-2 rounded-full bg-slate-300 border-2 border-white"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-slate-900">
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
                          className="text-xs text-blue-600 hover:underline shrink-0 ml-2"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-slate-700 mt-0.5">
                        {project.description}
                      </p>
                    )}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          {project.technologies.join(" • ")}
                        </p>
                      )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1.5 text-slate-700 space-y-1">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="pl-1">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </article>
  );
}
