import React from 'react';
import * as Icons from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function TechStack({ techStackData }) {
  // Safe helper to render Lucide icon dynamically
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Cpu;
    return <IconComponent className="text-violet-600 dark:text-violet-400" size={24} />;
  };

  const categories = [
    { key: 'frontend', title: 'Frontend Technologies', description: 'Building fast, responsive, and beautiful user interfaces' },
    { key: 'backend', title: 'Backend & Integration', description: 'Powering application logic and structured data flow' },
    { key: 'tools', title: 'Development Tools & Setup', description: 'Version control systems and IDE environments I use' }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal delay={100} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              My Tech Stack
            </h2>
            <div className="w-12 h-1 bg-violet-600 dark:bg-violet-500 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400">
              A comprehensive breakdown of frameworks, databases, and environments I work with.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <ScrollReveal key={category.key} delay={index * 150 + 200} duration={800}>
              <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-full border border-slate-200/40 dark:border-slate-800">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-4 mt-auto">
                  {techStackData?.[category.key]?.map((tech, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-slate-200/20 dark:border-slate-800/40 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200/20 dark:border-slate-800/60">
                          {renderIcon(tech.icon)}
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-250">
                          {tech.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-750 dark:text-violet-300">
                        {tech.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
