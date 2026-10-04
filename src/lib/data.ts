import {
  Activity,
  Bot,
  Braces,
  Brain,
  Briefcase,
  Code,
  Cpu,
  Database,
  FlaskConical,
  Globe,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Edit this file to update the site's content. Every section reads from here.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Abir Dey",
  headline: [
    "Computer Science Graduate",
    "BRAC University",
    "Aspiring AI & ML Researcher",
  ],
  intro:
    "I build systems where learning algorithms meet real-world signals. My work spans multimodal machine learning, computational analysis for drug discovery, compiler construction, and embedded hardware. I'm now looking to turn that breadth into focused, thesis-driven research in AI.",
  status: "Seeking thesis-based MSc opportunities in AI & CS",
  email: "deyabir1345@gmail.com",
  github: "https://github.com/ABIRdey123",
  linkedin: "https://www.linkedin.com/in/abir-dey-70a619241",
  // Put your PDF at /public/resume.pdf
  resume: "/resume.pdf",
};

export const navLinks = [
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const education = {
  degree: "BSc in Computer Science and Engineering",
  institution: "BRAC University, Dhaka",
  period: "2022 – 2026",
  thesis:
    "Dynamic Attention-Based Fusion for Multimodal Emotion Recognition Using EEG, Speech, and Facial Expressions",
  objective:
    "My goal is to pursue a thesis-based Master's degree in Artificial Intelligence and Computer Science, where I can study how models learn from diverse, noisy, real-world data and build that understanding into rigorous research.",
  interests: [
    "Multimodal Learning",
    "Affective Computing",
    "Machine Learning for Science",
    "Transformer Architectures",
    "Systems for ML",
  ],
};

export type Project = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  featured?: boolean;
  link?: string; // optional GitHub / paper URL
};

export const projects: Project[] = [
  {
    title: "Multimodal Emotion Recognition",
    label: "Undergraduate Thesis",
    description:
      "A machine learning pipeline that fuses EEG signals, speech, and facial expressions to recognize emotional states. A dynamic attention-based fusion mechanism weighs each modality, built on transformer-based architectures for cross-modal representation learning.",
    tags: ["Transformers", "EEG", "Audio Spectrograms", "Computer Vision", "PyTorch"],
    icon: Brain,
    featured: true,
  },
  {
    title: "Cheminformatics Predictive Modeling",
    label: "Computational Analysis",
    description:
      "A split-controller audit of aromatase (CYP19A1) inhibitor prediction. Predicted pIC50 inhibition values against human aromatase and benchmarked regression algorithms on ECFP4 molecular fingerprints with Bemis-Murcko scaffold splitting to measure generalization to unseen chemotypes.",
    tags: ["Regression", "ECFP4", "Scaffold Split", "scikit-learn", "RDKit"],
    icon: FlaskConical,
  },
  {
    title: "Probashi",
    label: "Web Platform",
    description:
      "An all-in-one platform connecting Bangladeshi citizens with overseas job opportunities and skill-building courses. Users can register, apply for jobs, enroll in courses, generate CVs, and communicate with agencies, all in multiple languages. Built single-handedly for a competition.",
    tags: ["Full-Stack", "Job Portal", "CV Generator", "Multilingual", "Solo Build"],
    icon: Globe,
  },
  {
    title: "Custom Compiler Development",
    label: "Systems Engineering",
    description:
      "Engineered a compiler in C++ with Flex and Bison, featuring dynamic symbol tables, Abstract Syntax Tree (AST) generation, and Three-Address Code generation routines.",
    tags: ["C++", "Flex", "Bison", "AST", "Three-Address Code"],
    icon: Braces,
  },
  {
    title: "Hardware & Robotics Systems",
    label: "Embedded Systems",
    description:
      "Assembled and programmed autonomous hardware integrating Arduino and ESP32-CAM microcontrollers, motor drivers, and gyroscopes, with custom power management for reliable operation.",
    tags: ["Arduino", "ESP32-CAM", "Motor Drivers", "Gyroscopes", "Power Management"],
    icon: Bot,
  },
];

export type ExperienceItem = {
  role: string;
  organization: string;
  period?: string;
  description: string;
  icon: LucideIcon;
};

export const experience: ExperienceItem[] = [
  {
    role: "Sales Executive",
    organization: "Datumcraft",
    period: "Dec 2024 – Apr 2025",
    description:
      "Worked in sales alongside my studies, building communication skills and a focus on customer satisfaction.",
    icon: Briefcase,
  },
  {
    role: "Solo Developer",
    organization: "Probashi · Competition Project",
    description:
      "Designed and built the entire Probashi platform myself as a competition entry, from user registration and job applications to course enrollment, CV generation, and agency messaging.",
    icon: Globe,
  },
  {
    role: "Database Management",
    organization: "University Course Project",
    description: "Handled the database for a team course project.",
    icon: Database,
  },
];

export type SkillGroup = {
  category: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: Code,
    skills: ["Python", "C", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Machine Learning",
    icon: Activity,
    skills: [
      "PyTorch",
      "Transformers",
      "scikit-learn",
      "NumPy",
      "pandas",
      "RDKit",
      "Signal Processing",
      "Jupyter",
    ],
  },
  {
    category: "Systems & Hardware",
    icon: Cpu,
    skills: [
      "Flex & Bison",
      "Compiler Design",
      "Arduino",
      "ESP32-CAM",
      "Sensor Integration",
      "Motor Control",
      "Linux",
      "Git",
    ],
  },
  {
    category: "Web & Tools",
    icon: Layers,
    skills: [
      "Django",
      "React",
      "Next.js",
      "Tailwind CSS",
      "API Implementation",
      "Database Management",
      "Figma UI Design",
      "Vercel",
      "Microsoft Excel & Word",
    ],
  },
];

export const softSkills = ["Communication", "Customer Satisfaction"];
export const spokenLanguages = ["English", "Bangla"];
