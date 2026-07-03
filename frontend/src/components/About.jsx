import React from 'react';
import { BookOpen, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function About({ personalData, educationData }) {
  return (
    <section id="about" className="py-20 bg-white/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal delay={100} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-12 h-1 bg-violet-600 dark:bg-violet-500 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400">
              A background summary of my academic path and software engineering aspirations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Introduction Card (Left) */}
          <ScrollReveal delay={200} duration={800} className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                My Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {personalData?.bio || "I am currently pursuing my education in Computer Science and Engineering. I started exploring programming early in my curriculum and fell in love with full-stack technologies."}
              </p>
              
              <div className="space-y-4 border-t border-slate-200/50 dark:border-slate-800 pt-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <MapPin className="text-violet-600 dark:text-violet-400 flex-shrink-0" size={18} />
                  <span>Based in {personalData?.location || "India"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <BookOpen className="text-violet-600 dark:text-violet-400 flex-shrink-0" size={18} />
                  <span>Pursuing B.Tech CSE</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Education Timeline (Right) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={200} duration={600}>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="text-violet-600 dark:text-violet-400" size={22} />
                Academic History
              </h3>
            </ScrollReveal>
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-8 ml-3">
              {educationData && educationData.map((edu, index) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-violet-600 dark:border-violet-500 group-hover:bg-violet-600 dark:group-hover:bg-violet-500 transition-colors duration-300"></div>
                  
                  <ScrollReveal delay={index * 150 + 300} duration={800}>
                    <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 relative">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950 text-violet-750 dark:text-violet-300 mb-3">
                        <Calendar size={12} />
                        {edu.duration}
                      </span>
                      
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {edu.degree}
                      </h4>
                      
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-455 mb-3">
                        {edu.institution}
                      </p>
                      
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
