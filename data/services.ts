import { BarChart2, BookMarked, BookOpen, Briefcase, ClipboardList, Code2, Cpu, Database, FileText, Globe, GraduationCap, Layers, LineChart, PieChart, Users } from "lucide-react";

export const serviceGroups = [
    {
      id: 1,
      category: "Thesis & Writing",
      services: [
        { id: "01", title: "Topic Selection", items: ["Domain scoping", "Gap analysis", "Title finalization", "Guide alignment"] },
        { id: "02", title: "Proposal Writing", items: ["Synopsis drafting", "Objective framing", "Methodology outline", "University format"] },
        { id: "03", title: "Literature Review", items: ["Source identification", "Critical analysis", "Gap mapping", "APA/MLA formatting"] },
        { id: "04", title: "Thesis Writing", items: ["All chapters", "Plagiarism under 10%", "Turnitin report", "Guide revisions"] },
        { id: "05", title: "Editing & Proofing", items: ["Grammar check", "Structure review", "Format compliance", "Final polish"] },
      ],
    },
    {
      id: 2,
      category: "Research & Analysis",
      services: [
        { id: "06", title: "SPSS Analysis", items: ["Descriptive stats", "Regression", "Factor analysis", "Output interpretation"] },
        { id: "07", title: "Statistical Analysis", items: ["SEM", "Mediation", "Moderation", "R & Python"] },
        { id: "08", title: "Pharma Analysis", items: ["Biostatistics", "Clinical data", "Stability studies", "ICH guidelines"] },
        { id: "09", title: "Programming", items: ["Python", "R scripts", "Data pipelines", "ML models"] },
        { id: "10", title: "Questionnaire Design", items: ["Scale selection", "Pilot testing", "Data collection", "Google Forms/Survey"] },
      ],
    },
    {
      id: 3,
      category: "Publication & Quality",
      services: [
        { id: "11", title: "Paper Writing", items: ["Manuscript drafting", "Journal formatting", "Abstract writing", "Co-authorship"] },
        { id: "12", title: "Publication Support", items: ["Scopus journals", "UGC-CARE listed", "Reviewer responses", "Revision support"] },
        { id: "13", title: "Plagiarism Removal", items: ["Turnitin check", "iThenticate", "Paraphrasing", "Under 10% guaranteed"] },
      ],
    },
  ];

  export const otherServices = [
    {
      id: "01",
      title: "Data Collection Survey",
      description: "Gather smart insights through structured surveys and advanced tools. We design, deploy, and analyze surveys that actually tell you something useful.",
      icon: ClipboardList,
      floatingIcons: [Database, LineChart, PieChart, FileText],
      bg: "#0d3b2e",
      accent: "#4ade80",
      mesh: "radial-gradient(ellipse at 20% 50%, #4ade8028 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #06b45228 0%, transparent 50%)",
    },
    {
      id: "02",
      title: "Statistical Analysis",
      description: "Turn raw data into actionable knowledge with pro-level analytics. SPSS, R, Python — we speak all the languages your data needs.",
      icon: BarChart2,
      floatingIcons: [LineChart, PieChart, Cpu, BarChart2],
      bg: "#1e1b4b",
      accent: "#a78bfa",
      mesh: "radial-gradient(ellipse at 70% 30%, #a78bfa28 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #7c3aed28 0%, transparent 50%)",
    },
    {
      id: "03",
      title: "PhD Guidance",
      description: "Helping scholars navigate thesis work, publications, and beyond. From stuck to submitted — we've been here before.",
      icon: GraduationCap,
      floatingIcons: [BookOpen, FileText, BookMarked, Layers],
      bg: "#3b0f1f",
      accent: "#fb7185",
      mesh: "radial-gradient(ellipse at 30% 60%, #fb718528 0%, transparent 60%), radial-gradient(ellipse at 75% 20%, #e1183628 0%, transparent 50%)",
    },
    {
      id: "04",
      title: "Internships",
      description: "Explore real-world experience through smart and hands-on training. Bridge the gap between classroom and career with live projects.",
      icon: Briefcase,
      floatingIcons: [Users, Cpu, Layers, Globe],
      bg: "#431407",
      accent: "#fb923c",
      mesh: "radial-gradient(ellipse at 60% 40%, #fb923c28 0%, transparent 60%), radial-gradient(ellipse at 10% 70%, #ea580c28 0%, transparent 50%)",
    },
    {
      id: "05",
      title: "Workshops & Training",
      description: "Level-up your skills through immersive learning experiences. Hands-on sessions designed around what industry actually needs.",
      icon: BookOpen,
      floatingIcons: [Users, BookMarked, Layers, Cpu],
      bg: "#042f2e",
      accent: "#22d3ee",
      mesh: "radial-gradient(ellipse at 40% 30%, #22d3ee28 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, #0891b228 0%, transparent 50%)",
    },
    {
      id: "06",
      title: "Web Development",
      description: "End-to-end websites with modern UI and backend logic. From landing pages to full-stack platforms — built to perform.",
      icon: Code2,
      floatingIcons: [Globe, Layers, Cpu, Code2],
      bg: "#18181b",
      accent: "#a3e635",
      mesh: "radial-gradient(ellipse at 25% 25%, #a3e63528 0%, transparent 60%), radial-gradient(ellipse at 70% 75%, #65a30d28 0%, transparent 50%)",
    },
  ];