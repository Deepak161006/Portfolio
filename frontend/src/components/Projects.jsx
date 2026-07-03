import React, { useState } from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects({ projectsData }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Frontend', 'Backend', 'Fullstack'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData?.filter(p => {
        if (filter === 'Frontend') return p.category === 'Frontend' || p.category === 'Fullstack';
        if (filter === 'Backend') return p.category === 'Backend' || p.category === 'Fullstack';
        return p.category === filter;
      });

  // Helper colors for project fallback illustrations
  const projectColors = {
    Fullstack: 'from-violet-500 to-indigo-500',
    Backend: 'from-cyan-500 to-blue-500',
    Frontend: 'from-emerald-500 to-teal-500'
  };

  return (
    <section id="projects" className="py-20 bg-white/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal delay={100} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              My Projects
            </h2>
            <div className="w-12 h-1 bg-violet-600 dark:bg-violet-500 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400">
              A curated collection of digital experiences and developer APIs I've engineered.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal delay={200} duration={600}>
          <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  filter === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 150 + 300} duration={800}>
              <div 
                className="group glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200/40 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
              >
              {/* Image / Vector Illustration Cover */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[project.category] || 'from-violet-500 to-indigo-500'} opacity-75 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                  <FolderGit2 className="text-white opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300" size={56} />
                </div>
                {/* Real Image overlay once generated */}
                <img
                  src={`/${project.image}.png`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-100 opacity-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    // Stay opacity-0 if not found
                    e.target.style.opacity = 0;
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = 1;
                  }}
                />
                
                {/* Category Pill Tag */}
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-white rounded-full border border-slate-200/20 dark:border-slate-800">
                  {project.category}
                </span>
              </div>

              {/* Project Info Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                {project.duration && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-3">
                    {project.duration}
                  </p>
                )}
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto border-t border-slate-200/50 dark:border-slate-800/60 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors gap-1.5"
                  >
                    <GithubIcon size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors gap-1.5"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
