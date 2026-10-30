import pmsScreenshot from "../assets/Screenshot 2026-10-28 100556.png";
import o2dScreenshot from "../assets/Screenshot 2026-10-28 100910.png";
import mojitoScreenshot from "../assets/Screenshot 2026-10-28 101226.png";
import gamingScreenshot from "../assets/Screenshot 2026-10-28 101505.png";

export interface ResumeData {
  personal: {
    name: string;
    role: string;
    subRoles: string[];
    summary: string;
    avatar: string;
    email: string;
    phone: string;
    location: string;
    social: {
      github: string;
      linkedin: string;
      x?: string;
    };
  };
  metrics: {
    label: string;
    value: number;
    suffix: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    cgpa: string;
  }[];
  certifications: {
    issuer: string;
    title: string;
    period: string;
    items: {
      name: string;
      url: string;
    }[];
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level?: string;
      featured?: boolean;
    }[];
  }[];
  orbitSkills: {
    name: string;
    icon: string;
    color: string;
  }[];
  cyberSkills: {
    columns: {
      id: string;
      title: string;
      cards: {
        id: string;
        title: string;
        bullets: string[];
        wireColor: string;
        badge?: string;
      }[];
    }[];
  };
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    type: string;
    modules: {
      name: string;
      fullName: string;
      desc: string;
    }[];
    highlights: string[];
  }[];
  projects: {
    title: string;
    subtitle: string;
    period: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
    highlights: string[];
    featured: boolean;
  }[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Hemant Kushwaha",
    role: "MERN Full Stack Developer",
    subRoles: [
      "MERN Full Stack Developer",
      "ERP Systems Engineer",
      "React & Node.js Specialist",
      "Creative 3D Web Builder",
    ],
    summary:
      "Full Stack Developer with hands-on ERP internship experience, building MERN applications with React, Node.js, Express.js and MongoDB. Built and deployed ERP-style projects with REST APIs, JWT authentication, role-based access and dashboards. Seeking a Junior Full Stack Developer role to build reliable, user-friendly web applications.",
    avatar: "https://avatars.githubusercontent.com/u/134399725?v=4",
    email: "kushwahhemant766@gmail.com",
    phone: "+91 7495008424",
    location: "Jhansi, Uttar Pradesh, India",
    social: {
      github: "https://github.com/Hemantkumar468",
      linkedin: "https://www.linkedin.com/in/hemant-kushwaha-dev",
      x: "https://x.com/hemant468",
    },
  },
  metrics: [
    {
      label: "ERP Modules Built",
      value: 5,
      suffix: "+",
      description: "CRM, HRMS, Delegation & Checklist, EMS, PMS",
    },
    {
      label: "Industry Certifications",
      value: 4,
      suffix: "",
      description: "Verified credentials from Coding Ninjas",
    },
    {
      label: "Core MERN Projects",
      value: 3,
      suffix: "",
      description: "Production-ready architectures deployed on cloud",
    },
    {
      label: "Responsive & Modern",
      value: 100,
      suffix: "%",
      description: "Mobile-first, accessible, and high-performance UX",
    },
  ],
  education: [
    {
      institution: "Eklavya University",
      degree: "Bachelor of Computer Applications (BCA)",
      period: "Apr 2022 – Apr 2025",
      location: "Damoh, Madhya Pradesh",
      cgpa: "6.77",
    },
  ],
  certifications: [
    {
      issuer: "Coding Ninjas",
      title: "Full Stack Web Development",
      period: "Dec 2025 – Sep 2027",
      items: [
        {
          name: "Full Stack Web Development",
          url: "https://certificate.codingninjas.com/view/7fc0a5f7911796f9",
        },
        {
          name: "Generative AI",
          url: "https://certificate.codingninjas.com/view/404e582c1738c5a8",
        },
        {
          name: "Soft Skills",
          url: "https://certificate.codingninjas.com/view/9fc81421db130aa1",
        },
        {
          name: "Data Structures & Python",
          url: "https://certificate.codingninjas.com/view/54b5671dcc81fb69",
        },
      ],
    },
  ],
  skills: [
    {
      category: "MERN Stack",
      items: [
        { name: "React.js", featured: true },
        { name: "Node.js", featured: true },
        { name: "Express.js", featured: true },
        { name: "MongoDB", featured: true },
      ],
    },
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript (ES6+)", featured: true },
        { name: "HTML5" },
        { name: "CSS3" },
      ],
    },
    {
      category: "Databases & ORM",
      items: [
        { name: "MongoDB", featured: true },
        { name: "Mongoose", featured: true },
      ],
    },
    {
      category: "Frameworks & State Management",
      items: [
        { name: "React.js", featured: true },
        { name: "Redux Toolkit", featured: true },
        { name: "RTK Query", featured: true },
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "Tailwind CSS", featured: true },
        { name: "Bootstrap" },
      ],
    },
    {
      category: "Developer Tools",
      items: [
        { name: "VS Code" },
        { name: "Git", featured: true },
        { name: "GitHub", featured: true },
        { name: "Postman", featured: true },
        { name: "Chrome DevTools" },
        { name: "Vite", featured: true },
      ],
    },
    {
      category: "Architecture & Backend Skills",
      items: [
        { name: "REST APIs", featured: true },
        { name: "JWT Authentication", featured: true },
        { name: "Role-Based Access (RBAC)", featured: true },
        { name: "AWS S3", featured: true },
        { name: "Vercel Deployment" },
        { name: "Data Structures & Algorithms (DSA)" },
        { name: "Object-Oriented Programming (OOPS)" },
      ],
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Problem Solving" },
        { name: "Team Collaboration" },
        { name: "Code Review & Feedback" },
        { name: "Adaptability" },
      ],
    },
  ],
  orbitSkills: [
    { name: "React", icon: "⚛️", color: "#06b6d4" },
    { name: "Node.js", icon: "🟢", color: "#22c55e" },
    { name: "Express", icon: "⚡", color: "#e2e8f0" },
    { name: "MongoDB", icon: "🍃", color: "#10b981" },
    { name: "Redux", icon: "🔄", color: "#a855f7" },
    { name: "Tailwind", icon: "🌊", color: "#38bdf8" },
    { name: "Three.js", icon: "🌐", color: "#ec4899" },
    { name: "AWS S3", icon: "☁️", color: "#f97316" },
  ],
  cyberSkills: {
    columns: [
      {
        id: "core",
        title: "Core & Languages",
        cards: [
          {
            id: "ts",
            title: "TypeScript",
            bullets: [
              "Static Typing",
              "Interfaces",
              "Generics",
              "Type Guards",
              "Type Inference",
            ],
            wireColor: "#38bdf8",
          },
          {
            id: "js",
            title: "JavaScript (ES6+)",
            bullets: [
              "Modern ES Features",
              "Promises/Async-Await",
              "Closures",
              "Prototypes",
              "Functional Programming",
            ],
            wireColor: "#facc15",
          },
          {
            id: "node",
            title: "Node.js",
            bullets: [
              "Event Loop",
              "Express.js Framework",
              "RESTful APIs",
              "Middleware",
              "Asynchronous I/O",
            ],
            wireColor: "#22c55e",
          },
          {
            id: "express",
            title: "Express.js",
            bullets: [
              "Routing",
              "Server-Side Logic",
              "JWT Authentication",
              "API Security",
              "Error Handling",
            ],
            wireColor: "#a855f7",
          },
        ],
      },
      {
        id: "frontend",
        title: "Frontend & State Management",
        cards: [
          {
            id: "react",
            title: "React.js",
            bullets: [
              "Functional Components",
              "Hooks",
              "Context API",
              "Virtual DOM",
              "State Management",
            ],
            wireColor: "#06b6d4",
          },
          {
            id: "redux",
            title: "Redux Toolkit",
            bullets: [
              "State Slices",
              "Thunks",
              "Immutability",
              "DevTools",
            ],
            wireColor: "#c084fc",
          },
          {
            id: "tailwind",
            title: "Tailwind CSS",
            bullets: [
              "Utility-First CSS",
              "Responsive Design",
              "Custom Configuration",
              "JIT Mode",
              "Dark Mode",
            ],
            wireColor: "#38bdf8",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture & Tools",
        cards: [
          {
            id: "rest",
            title: "REST APIs",
            bullets: [
              "API Design (RESTful)",
              "HTTP Methods",
              "Status Codes",
              "Versioning",
              "Data Transfer (JSON)",
            ],
            wireColor: "#38bdf8",
          },
          {
            id: "jwt",
            title: "JWT Authentication",
            bullets: [
              "Token-Based Auth",
              "Header/Payload/Signature",
              "Stateless Sessions",
              "Access/Refresh Tokens",
              "Security Best Practices",
            ],
            wireColor: "#ec4899",
          },
          {
            id: "git",
            title: "Git & GitHub",
            bullets: [
              "Version Control",
              "Branch Management",
              "Pull Requests",
              "CI/CD (GitHub Actions)",
            ],
            wireColor: "#f97316",
          },
        ],
      },
    ],
  },
  experience: [
    {
      company: "D-Table Analytics",
      role: "Frontend Developer (Internship)",
      period: "Sep 2026",
      location: "Bhopal, Madhya Pradesh",
      type: "Internship",
      modules: [
        {
          name: "CRM",
          fullName: "Customer Relationship Management",
          desc: "Managing customer leads, pipelines, and interaction histories.",
        },
        {
          name: "HRMS",
          fullName: "Human Resource Management System",
          desc: "Employee records, attendance tracking, and leave management.",
        },
        {
          name: "Delegation & Checklist",
          fullName: "Task Delegation & Checklist Engine",
          desc: "Operational task assignments, recurring checklists, and verification.",
        },
        {
          name: "EMS",
          fullName: "Employee Management System",
          desc: "Department structuring, hierarchy, and credential assignments.",
        },
        {
          name: "PMS",
          fullName: "Project Management System",
          desc: "Project tracking, milestones, departmental approvals, and documents.",
        },
      ],
      highlights: [
        "Worked on ERP modules including CRM, HRMS, Delegation & Checklist, EMS, and PMS, building and maintaining responsive React.js components across key pages.",
        "Optimized page performance, reducing load times, and debugged issues in the existing ERP codebase.",
        "Shipped new features as part of a team, participating in code reviews and incorporating feedback.",
      ],
    },
  ],
  projects: [
    {
      title: "PMS – ERP System",
      subtitle: "Franchise Expansion & Task Management Platform",
      period: "Jun 2026",
      image: pmsScreenshot,
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "AWS S3", "RBAC"],
      githubUrl: "https://github.com/Hemantkumar468/real",
      liveUrl: "https://real-sooty-five.vercel.app",
      featured: true,
      highlights: [
        "Built an end-to-end ERP web application for franchise expansion, from property selection to store launch.",
        "Built REST APIs with Node.js, Express.js and MongoDB, with JWT, role-based access and AWS S3.",
        "One place for departments to track tasks, approvals and documents, with notifications.",
      ],
    },
    {
      title: "Order-to-Dispatch ERP",
      subtitle: "B2B Sales, Logistics & Invoice Management System",
      period: "Oct 2026",
      image: o2dScreenshot,
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "MUI", "Joi", "JWT"],
      githubUrl: "https://github.com/Hemantkumar468/Order-to-dispatch-",
      liveUrl: "https://deluxe-pasca-d1c123.netlify.app/dashboard",
      featured: true,
      highlights: [
        "Built a B2B ERP system covering sales orders, planning, challans and invoices.",
        "Used React, Redux Toolkit and MUI, with Node.js, Express.js, Joi and JWT on MongoDB.",
        "Lets sales, logistics and accounts teams track orders to payment, with printable challans and Excel export.",
      ],
    },
    {
      title: "Mojito – Cocktail Recipe Platform",
      subtitle: "Interactive 3D & Mobile-First Drink Discovery Platform",
      period: "Nov 2025",
      image: mojitoScreenshot,
      tags: ["React.js", "Tailwind CSS", "Three.js", "JavaScript", "React Hooks", "Vercel"],
      githubUrl: "https://github.com/Hemantkumar468/mojito",
      liveUrl: "https://mojito-eight-beta.vercel.app/",
      featured: true,
      highlights: [
        "Built a responsive cocktail recipe browser using reusable React components.",
        "Implemented search, filtering and detail views with React hooks, using mobile-first layouts.",
        "Makes recipes easy to find and consistent on desktop, tablet and mobile; deployed on Vercel.",
      ],
    },
    {
      title: "Redefine Gaming – 3D Metagame Platform",
      subtitle: "Interactive 3D Gaming & Metagame Web Application",
      period: "Dec 2025",
      image: gamingScreenshot,
      tags: ["React.js", "Three.js", "Tailwind CSS", "Motion", "Vercel"],
      githubUrl: "https://github.com/Hemantkumar468/gaming",
      liveUrl: "https://gaming-gamma-taupe.vercel.app",
      featured: true,
      highlights: [
        "Engineered an interactive 3D gaming ecosystem showcasing metagame layers, vaults, and trailers.",
        "Designed fluid responsive animations, high-fidelity shaders, and smooth camera transitions.",
        "Optimized client-side rendering for consistent 60fps performance across desktop and mobile devices.",
      ],
    },
  ],
};
