"use client";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/schema";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 32,
    paddingTop: 28,
    paddingBottom: 28,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#cbd5e1",
  },
  body: {
    padding: 32,
    paddingTop: 24,
  },
  summary: {
    fontSize: 9,
    color: "#374151",
    borderLeftWidth: 3,
    borderLeftColor: "#1e293b",
    paddingLeft: 12,
    marginBottom: 16,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
    marginLeft: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
  },
  itemSubtitle: {
    color: "#4b5563",
    fontSize: 9,
  },
  itemDate: {
    color: "#6b7280",
    fontSize: 8,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    marginLeft: 8,
  },
  bullet: {
    width: 8,
    color: "#6b7280",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginLeft: 16,
  },
  skill: {
    backgroundColor: "#e2e8f0",
    color: "#475569",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 9,
  },
});

interface ModernPDFDocumentProps {
  data: ResumeData;
}

export function ModernPDFDocument({ data }: ModernPDFDocumentProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            <Text>{personalInfo.email}</Text>
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
          <View style={[styles.contactRow, { color: "#94a3b8", marginTop: 4 }]}>
            {personalInfo.linkedin && (
              <Text>
                {personalInfo.linkedin
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.github && (
              <Text>
                {personalInfo.github
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.portfolio && (
              <Text>
                {personalInfo.portfolio
                  .replace("https://", "")
                  .replace("http://", "")}
              </Text>
            )}
            {personalInfo.website && (
              <Text>{personalInfo.website.replace("https://", "")}</Text>
            )}
          </View>
        </View>

        <View style={styles.body}>
          {/* Summary */}
          {personalInfo.summary && (
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.title}</Text>
                    <Text style={styles.itemDate}>
                      {exp.startDate} – {exp.endDate || "Present"}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {exp.company}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </Text>
                  {exp.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemDate}>
                      {edu.startDate}
                      {edu.endDate ? ` – ${edu.endDate}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {edu.school}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill) => (
                  <Text key={skill.id} style={styles.skill}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project) => (
                <View key={project.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{project.name}</Text>
                    {project.url && (
                      <Text style={{ fontSize: 8, color: "#2563eb" }}>
                        {project.url.replace("https://", "")}
                      </Text>
                    )}
                  </View>
                  {project.description && (
                    <Text style={styles.itemSubtitle}>
                      {project.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
