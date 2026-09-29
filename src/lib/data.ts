// ========================================================================
// DATA — All portfolio content in one place for easy editing
// ========================================================================

export const PROFILE = {
  name: "Aditya S Jagtap",
  role: "Full-Stack Developer & Tech Enthusiast",
  tagline: "CS Student at Shetty Institute of Technology",
  email: "adityajagtap14@gmail.com",
  heroSubtitle:
    "I build digital experiences that bridge software, hardware, and human connection — from real-time web apps to IoT microcontrollers.",
  aboutParagraphs: [
    "I'm a Computer Science student at Shetty Institute of Technology with a burning passion for building technology that solves real-world problems. My toolkit spans the full stack — from crafting polished Next.js frontends to architecting Python backends and managing Supabase databases.",
    "But what sets me apart is my breadth. I don't just write JavaScript — I program Arduino boards, flash LPC21xx microcontrollers, and debug C/C++ at the hardware level. I believe the best engineers understand the entire stack, from transistors to TypeScript.",
    "Beyond the terminal, I bring strong communication and leadership skills — anchoring college tech events, speaking at hackathons, and running a YouTube channel. I'm not just a coder; I'm a builder, a communicator, and an endlessly curious technologist.",
  ],
  social: {
    github: "https://github.com/adityajagtap",
    linkedin: "https://www.linkedin.com/in/adityajagtap14/",
    twitter: "https://x.com/jagtapaditya14",
    youtube: "https://www.youtube.com/c/TimePassSociety",
  },
} as const;

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string; // accent colour for the card
  github?: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "edusync",
    title: "EduSync",
    subtitle: "Smart Faculty Dashboard",
    description:
      "A comprehensive faculty management dashboard built with Next.js and Python, backed by Supabase. Features real-time attendance tracking, grade management, and automated reporting for educational institutions.",
    tags: ["Next.js", "Python", "Supabase", "TypeScript"],
    color: "#7c5cfc",
    github: "https://github.com/adityajagtap",
  },
  {
    id: "sarva-health",
    title: "Sarva Health",
    subtitle: "Real-Time Hospital Queue Management",
    description:
      "A patient-first healthcare platform that eliminates long hospital wait times through real-time queue management, live bed-availability tracking, and smart appointment scheduling.",
    tags: ["React", "Node.js", "WebSocket", "MongoDB"],
    color: "#22d3ee",
    github: "https://github.com/adityajagtap",
  },
  {
    id: "krishi-dost",
    title: "Krishi Dost",
    subtitle: "Smart Farming Assistant",
    description:
      "An intelligent farming support system helping Indian farmers maximise crop yields through soil analysis recommendations, weather-based advisories, and real-time market price tracking.",
    tags: ["HTML", "Node.js", "CSS", "JavaScript"],
    color: "#34d399",
    github: "https://github.com/adityajagtap14/krishi-dost",
  },
];

export interface HardwareItem {
  title: string;
  description: string;
  icon: string; // emoji
}

export const HARDWARE_ITEMS: HardwareItem[] = [
  {
    title: "Arduino Projects",
    description:
      "Hands-on experience building sensor-driven systems, servo control modules, and IoT prototypes with Arduino Uno/Nano.",
    icon: "⚡",
  },
  {
    title: "LPC21xx Microcontrollers",
    description:
      "Low-level ARM programming — timer interrupts, UART communication, and GPIO manipulation on NXP LPC2148 boards.",
    icon: "🔧",
  },
  {
    title: "C/C++ Embedded",
    description:
      "Firmware-level development in C/C++ for resource-constrained environments, focusing on memory efficiency and real-time performance.",
    icon: "🖥️",
  },
];

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "event" | "achievement" | "creative";
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2026",
    title: "WAVE 3.0 Hackathon",
    description:
      "Competed in the WAVE 3.0 hackathon, building innovative solutions under time pressure and collaborating with cross-functional teams.",
    type: "achievement",
  },
  {
    year: "2025",
    title: "Make 4 SIT Hackathon",
    description:
      "Participated in the Make 4 SIT hackathon, designing and pitching a working prototype within 24 hours.",
    type: "achievement",
  },
  {
    year: "2025",
    title: "Event Anchoring & Public Speaking",
    description:
      "Hosted and anchored major college tech events, sharpening stage presence and audience engagement skills.",
    type: "event",
  },
  {
    year: "2024",
    title: "TimePass Society — YouTube Channel",
    description:
      "Launched and grew a YouTube channel featuring creative video content, honing video editing, storytelling, and design skills.",
    type: "creative",
  },
];

export interface Passion {
  title: string;
  description: string;
  icon: string;
}

export const CREATIVE_PASSIONS: Passion[] = [
  {
    title: "Content Creation",
    description: "Creating engaging video content and growing my YouTube channel, TimePass Society.",
    icon: "🎬",
  },
  {
    title: "Videography",
    description: "Capturing cinematic moments — from event coverage to creative short films.",
    icon: "📹",
  },
  {
    title: "Photography",
    description: "Exploring visual storytelling through landscape and portrait photography.",
    icon: "📸",
  },
  {
    title: "Gaming",
    description: "Competitive and casual gaming — appreciating game design and interactive experiences.",
    icon: "🎮",
  },
];

export const EDUCATION = [
  {
    degree: "B.E. in Computer Science",
    institution: "Shetty Institute of Technology",
    year: "Graduating 2028",
    coursework: "Data Structures, Algorithms, Web Development, DBMS, OOP, Embedded Systems",
  },
  {
    degree: "Higher Secondary (Class XII) — PCMC",
    institution: "KLE Society's Prerana PU College",
    year: "Completed 2022",
    coursework: "Physics, Chemistry, Mathematics, Computer Science",
  },
];

export const SKILLS = {
  languages: ["TypeScript", "JavaScript", "Python", "C/C++", "SQL", "HTML/CSS"],
  frameworks: ["Next.js", "React", "Node.js", "Tailwind CSS", "Framer Motion"],
  tools: ["Git", "GitHub", "Supabase", "VS Code", "Arduino IDE", "Figma"],
  hardware: ["Arduino", "LPC21xx ARM", "Embedded C", "IoT Prototyping"],
} as const;
