"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/schema";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    fontSize: 9,
    color: "#4b5563",
  },
  contactItem: {
    marginHorizontal: 4,
  },
  summary: {
    fontSize: 9,
    color: "#374151",
    marginTop: 8,
    textAlign: "center",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    paddingBottom: 2,
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  itemSubtitle: {
    color: "#4b5563",
  },
  itemDate: {
    color: "#6b7280",
    fontSize: 9,
  },
  highlight: {
    marginLeft: 12,
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skill: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 9,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
});

interface ResumePDFDocumentProps {
  data: ResumeData;
}

export function ResumePDFDocument({ data }: ResumePDFDocumentProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            {personalInfo.phone && (
              <Text style={styles.contactItem}>| {personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactItem}>| {personalInfo.location}</Text>
            )}
            {personalInfo.linkedin && (
              <Text style={styles.contactItem}>
                |{" "}
                {personalInfo.linkedin
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.github && (
              <Text style={styles.contactItem}>
                |{" "}
                {personalInfo.github
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.portfolio && (
              <Text style={styles.contactItem}>
                |{" "}
                {personalInfo.portfolio
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.website && (
              <Text style={styles.contactItem}>
                | {personalInfo.website.replace("https://", "")}
              </Text>
            )}
          </View>
          {personalInfo.summary && (
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          )}
        </View>

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.title}</Text>
                    <Text style={styles.itemSubtitle}>
                      {exp.company}
                      {exp.location ? ` • ${exp.location}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Text>
                </View>
                <View style={styles.highlight}>
                  {exp.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {edu.startDate}
                    {edu.endDate ? ` — ${edu.endDate}` : ""}
                  </Text>
                </View>
                {edu.highlights && edu.highlights.length > 0 && (
                  <View style={styles.highlight}>
                    {edu.highlights.map((h, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>
                  {skill.name}
                  {skill.level ? ` (${skill.level})` : ""}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  {project.url && (
                    <Link src={project.url} style={styles.link}>
                      <Text>View Project</Text>
                    </Link>
                  )}
                </View>
                {project.description && (
                  <Text style={styles.itemSubtitle}>{project.description}</Text>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>
                    Tech: {project.technologies.join(", ")}
                  </Text>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <View style={styles.highlight}>
                    {project.highlights.map((h, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
