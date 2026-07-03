import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Hero({ personalData }) {
  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Express.js Backend Dev",
    "Problem Solver"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullText = roles[roleIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at end
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const socialIcons = {
    github: <GithubIcon size={20} />,
    linkedin: <LinkedinIcon size={20} />
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none dark:bg-violet-600/5"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none dark:bg-indigo-600/5"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero Copy (Left side) */}
          <ScrollReveal delay={100} duration={800} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100/80 text-violet-700 border border-violet-200/50 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-900/50 mb-6">
              Available for Opportunities
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
              Hi, I'm <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">{personalData?.name || 'Deepak Sai Manukonda'}</span>
            </h1>

            <div className="h-10 mb-6">
              <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300">
                I am a <span className="text-violet-600 dark:text-violet-400 font-semibold typing-cursor">{currentText}</span>
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-8 leading-relaxed">
              {personalData?.bio || 'Building robust web solutions and elegant user experiences with React, Node, and Tailwind.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-750 hover:to-indigo-750 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View Projects
                <ArrowRight className="ml-2" size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 dark:border-slate-800 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Let's Connect
              </a>
            </div>

            {/* Social Platform Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                Follow me:
              </span>
              <div className="flex gap-2">
                {personalData?.socials && Object.entries(personalData.socials).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${key}`}
                    className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200/40 dark:border-slate-800 transition-all hover:scale-105"
                  >
                    {socialIcons[key] || <GithubIcon size={20} />}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Avatar Area (Right side) */}
          <ScrollReveal delay={300} duration={1000} className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-250 animate-pulse"></div>

              {/* Profile Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-950 bg-slate-100 dark:bg-slate-900 flex items-center justify-center shadow-2xl">
                <img
                  src="/PP.png"
                  alt={personalData?.name || "Profile Avatar"}
                  className="w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fail-safe fallbacks if image fails to load before we generate it
                    e.target.src = "/PP.png";
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
