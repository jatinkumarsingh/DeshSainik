import React from "react";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Job Alerts",
    date: "📋",
    content: "Get real-time notifications for defence recruitment notifications across all services",
    category: "Alerts",
    icon: Calendar,
    relatedIds: [2, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Exam Preparation",
    date: "📚",
    content: "Comprehensive study materials, mock tests, and exam strategy from experts",
    category: "Learning",
    icon: FileText,
    relatedIds: [1, 3, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "AI Mentor",
    date: "🤖",
    content: "Personal AI-powered guidance for personalized exam preparation strategies",
    category: "AI",
    icon: Code,
    relatedIds: [2, 5],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 4,
    title: "Fitness Tracking",
    date: "💪",
    content: "Monitor your fitness progress and get workout plans tailored to defence standards",
    category: "Fitness",
    icon: User,
    relatedIds: [2, 5, 6],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 5,
    title: "Community Support",
    date: "👥",
    content: "Connect with fellow aspirants, share experiences, and learn from success stories",
    category: "Community",
    icon: Clock,
    relatedIds: [3, 4, 6],
    status: "completed",
    energy: 80,
  },
  {
    id: 6,
    title: "Video Learning",
    date: "🎬",
    content: "Expert-curated video tutorials and live sessions for better understanding",
    category: "Videos",
    icon: Calendar,
    relatedIds: [4, 5],
    status: "completed",
    energy: 88,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
