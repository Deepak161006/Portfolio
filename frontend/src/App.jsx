import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

const FALLBACK_PROFILE = {
  personal: {
    name: "Deepak Sai Manukonda",
    title: "Full Stack Developer",
    bio: "I am a passionate software engineer specializing in building modern web applications. With expertise spanning frontend design systems and robust backend APIs, I strive to create high-performance web software.",
    email: "mdeepak1610@gmail.com",
    location: "India",
    socials: {
      github: "https://github.com/Deepak161006",
      linkedin: "https://www.linkedin.com/in/deepak-manukonda/"
    }
  },
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Vignan's Foundation for Science, Technology and Research",
      duration: "2023 - Present",
      description: "Focusing on software engineering methodologies, database management systems, data structures, algorithms, and web technologies. Maintained a 8.2 CGPA."
    },
    {
      id: 2,
      degree: "Higher Secondary Education (Class XII)",
      institution: "Westberry School",
      duration: "2021 - 2023",
      description: "Completed school curriculum majoring in Physics, Chemistry, and Mathematics with computer science electives."
    }
  ],
  techStack: {
    frontend: [
      { name: "React.js", level: "Advanced", icon: "Atom" },
      { name: "Vite", level: "Advanced", icon: "Zap" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Wind" },
      { name: "HTML5 & CSS3", level: "Expert", icon: "Code" },
      { name: "JavaScript", level: "Advanced", icon: "Terminal" }
    ],
    backend: [
      { name: "Node.js", level: "Intermediate", icon: "Server" },
      { name: "Express.js", level: "Intermediate", icon: "Cpu" },
      { name: "REST APIs", level: "Advanced", icon: "Database" }
    ],
    tools: [
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch" },
      { name: "VS Code", level: "Expert", icon: "Edit3" },
      { name: "npm", level: "Advanced", icon: "Package" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Online Learning platform",
      duration: "October 2025 – December 2025",
      description: "Using Node.js and Express.js, a RESTful API was designed to handle student profiles, dynamic game states, and real-time scoring. created a highly responsive React.js frontend with an emphasis on high-performance games and user-friendly UX/UI for younger students. MongoDB was implemented to store and query data related to longitudinal progress tracking and complicated instructional content. included secure role-based access with JWT-based authentication to give student users a private, secure environment.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Express", "React.js", "REST API"],
      github: "https://github.com/Deepak161006",
      demo: "https://edulearn-tekj.onrender.com/",
      category: "Fullstack",
      image: "project_ecommerce"
    },
    {
      id: 2,
      title: "Orderly Application",
      duration: "October 2025 – December 2025",
      description: "I have deployed both frontend and backend Orderly application, which is similar to Swigy. This Orderly application is build using MERN (MongoDB, Express, React, Node). This application allows user to sign up, login, search, sort, asks location, select products, and add them to the cart.",
      tech: ["React-Vite", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/Deepak161006",
      demo: "https://orderly-bjp0.onrender.com/",
      category: "Fullstack",
      image: "project_portfolio"
    }
  ]
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Default to dark mode for a premium starting look
    return localStorage.getItem('theme') || 'dark';
  });

  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);

  // Sync theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE}/api/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.warn('API returned non-200 status, using fallbacks.');
        }
      } catch (error) {
        console.error('Error fetching profile from Express, using local fallbacks:', error);
      } finally {
        // Add a slight artificial delay for a premium skeleton/loading feel
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-violet-500 mb-4" size={48} />
        <p className="text-sm font-semibold tracking-wider text-slate-400">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} personalData={profile.personal} />
      
      <main className="flex-grow">
        <Hero personalData={profile.personal} />
        <About personalData={profile.personal} educationData={profile.education} />
        <TechStack techStackData={profile.techStack} />
        <Projects projectsData={profile.projects} />
        <Contact personalData={profile.personal} />
      </main>

      <Footer personalData={profile.personal} />
    </div>
  );
}
