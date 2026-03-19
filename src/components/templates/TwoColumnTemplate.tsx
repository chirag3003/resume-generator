"use client";

import type { ResumeData } from "@/lib/schema";

interface TwoColumnTemplateProps {
  data: ResumeData;
}

export function TwoColumnTemplate({ data }: TwoColumnTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <article className="w-[210mm] min-h-[297mm] bg-white text-black print:p-0 font-sans text-sm leading-snug">
      <div className="flex h-full min-h-[297mm]">
        {/* Left Column */}
        <aside
          className="w-[35%] bg-slate-50 p-6 print:p-6 print:bg-slate-50"
          style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
        >
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-1 text-slate-900">
              {personalInfo.fullName}
            </h1>
          </header>

          <section className="mb-6 text-sm text-slate-700 space-y-2">
            {personalInfo.email && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  Email
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-blue-600"
                >
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  Phone
                </span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  Location
                </span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  LinkedIn
                </span>
                <a
                  href={
                    personalInfo.linkedin.startsWith("http")
                      ? personalInfo.linkedin
                      : `https://${personalInfo.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 truncate"
                >
                  {personalInfo.linkedin
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  GitHub
                </span>
                <a
                  href={
                    personalInfo.github.startsWith("http")
                      ? personalInfo.github
                      : `https://${personalInfo.github}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 truncate"
                >
                  {personalInfo.github
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs uppercase text-slate-500">
                  Portfolio
                </span>
                <a
                  href={
                    personalInfo.portfolio.startsWith("http")
                      ? personalInfo.portfolio
                      : `https://${personalInfo.portfolio}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 truncate"
                >
                  {personalInfo.portfolio
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")}
                </a>
              </div>
            )}
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6 print:break-inside-avoid">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1 mb-3 text-slate-900">
                Skills
              </h2>
              <div className="flex flex-col gap-1.5 text-slate-700">
                {skills.map((skill) => (
                  <span key={skill.id} className="font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1 mb-3 text-slate-900">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 print:break-inside-avoid">
                  <h3 className="font-semibold text-slate-800 text-sm leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium mt-0.5 mb-0.5">
                    {edu.school}
                  </div>
                  <div className="text-xs text-slate-500">
                    {edu.startDate && `${edu.startDate} – `}
                    {edu.endDate}
                  </div>
                  {edu.gpa && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="w-[65%] p-6 print:p-6 bg-white">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6 print:break-inside-avoid">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-1 mb-2 text-slate-900">
                Profile
              </h2>
              <p className="text-slate-800 leading-normal">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-1 mb-3 text-slate-900">
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-base">
                      {exp.title}
                    </h3>
                    <span className="text-xs text-slate-600 font-semibold shrink-0 ml-2">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-slate-700 font-medium mb-1">
                    {exp.company}
                    {exp.location && (
                      <span className="text-slate-500 font-normal">
                        {" "}
                        • {exp.location}
                      </span>
                    )}
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 text-slate-800 space-y-0.5">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-1 mb-3 text-slate-900">
                Projects
              </h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-3 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-base">
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
                        Link
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-slate-800 mt-0.5">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs text-slate-600 mt-1 font-medium italic">
                      {project.technologies.join(", ")}
                    </p>
                  )}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 text-slate-800 space-y-0.5">
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
        </main>
      </div>
    </article>
  );
}
