"use client";

import { BarChart3, Bot, Briefcase, FileText, FolderKanban, Map, MessageSquare, Settings, Target } from "lucide-react";
import { memo } from "react";

import { SectionPlaceholder } from "@/features/dashboard/components/sections/section-placeholder";

export const ResumeScoreSection = memo(function ResumeScoreSection() {
  return (
    <SectionPlaceholder
      sectionId="resume-score"
      icon={FileText}
      emptyTitle="No resume uploaded yet"
      emptyDescription="Upload your resume to receive ATS scoring, keyword analysis, and AI-powered improvements."
    />
  );
});

export const CareerRoadmapSection = memo(function CareerRoadmapSection() {
  return (
    <SectionPlaceholder
      sectionId="career-roadmap"
      icon={Map}
      emptyTitle="Your roadmap awaits"
      emptyDescription="Define your target role to generate a personalized career roadmap with milestones."
    />
  );
});

export const SkillGapSection = memo(function SkillGapSection() {
  return (
    <SectionPlaceholder
      sectionId="skill-gap"
      icon={Target}
      emptyTitle="Skill analysis pending"
      emptyDescription="Compare your current skills against your target role to identify gaps and learning paths."
    />
  );
});

export const InterviewPracticeSection = memo(function InterviewPracticeSection() {
  return (
    <SectionPlaceholder
      sectionId="interview-practice"
      icon={MessageSquare}
      emptyTitle="No sessions yet"
      emptyDescription="Start a mock interview session to practice responses and receive AI feedback."
    />
  );
});

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <SectionPlaceholder
      sectionId="projects"
      icon={FolderKanban}
      emptyTitle="No projects tracked"
      emptyDescription="Add portfolio projects to track progress and generate showcase-ready summaries."
    />
  );
});

export const AnalyticsSection = memo(function AnalyticsSection() {
  return (
    <SectionPlaceholder
      sectionId="analytics"
      icon={BarChart3}
      emptyTitle="Analytics loading"
      emptyDescription="Career metrics and trend visualizations will appear here once data is available."
      showWidgets
    />
  );
});

export const AiAssistantSection = memo(function AiAssistantSection() {
  return (
    <SectionPlaceholder
      sectionId="ai-assistant"
      icon={Bot}
      emptyTitle="AI Assistant ready"
      emptyDescription="Run a career goal through the autonomous agent workflow to generate an execution timeline."
    />
  );
});

export const PortfolioSection = memo(function PortfolioSection() {
  return (
    <SectionPlaceholder
      sectionId="portfolio"
      icon={Briefcase}
      emptyTitle="Portfolio empty"
      emptyDescription="Build and publish a professional portfolio from your projects and achievements."
    />
  );
});

export const SettingsSection = memo(function SettingsSection() {
  return (
    <SectionPlaceholder
      sectionId="settings"
      icon={Settings}
      emptyTitle="Settings workspace"
      emptyDescription="Workspace preferences, notifications, and account settings will be configured here."
    />
  );
});
