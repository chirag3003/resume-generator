"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/schema";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: "light",
    letterSpacing: 2,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    fontSize: 8,
    color: "#6b7280",
  },
  summary: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 20,
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 8,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: "Times-Bold",
  },
  itemSubtitle: {
    color: "#6b7280",
    fontSize: 8,
  },
  itemDate: {
    color: "#9ca3af",
    fontSize: 8,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 12,
  },
  bullet: {
    width: 12,
    color: "#d1d5db",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#4b5563",
  },
  skillsText: {
    fontSize: 9,
    color: "#4b5563",
  },
});

interface MinimalPDFDocumentProps {
  data: ResumeData;
}

export function MinimalPDFDocument({ data }: MinimalPDFDocumentProps) {
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
          <View style={[styles.contactRow, { marginTop: 2 }]}>
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
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""}
                </Text>
                {exp.highlights.map((h, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>–</Text>
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
                    {edu.endDate ? ` — ${edu.endDate}` : ""}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {edu.school}
                  {edu.gpa ? ` · ${edu.gpa}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>
              {skills.map((s) => s.name).join(" · ")}
            </Text>
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
                    <Text style={{ fontSize: 8, color: "#9ca3af" }}>
                      {project.url.replace("https://", "")}
                    </Text>
                  )}
                </View>
                {project.description && (
                  <Text style={styles.itemSubtitle}>{project.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
