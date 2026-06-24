import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-24 md:py-40 px-4 md:px-12 bg-white relative font-sans">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-5"
        >
          <MushroomIcon className="w-10 h-10 text-[#FF1A23]" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            歷年作品
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[1400px] mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.7, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-gray-50 overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 ring-1 ring-black/5 flex items-center justify-center p-8 md:p-12">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 drop-shadow-md"
                />
                
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">VIEW PROJECT</span>
                  <svg className="w-4 h-4 text-[#FF1A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col px-2 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold tracking-wider uppercase border border-gray-200">
                    {project.category}
                  </span>
                  
                  <span className="text-gray-400 font-mono text-xs">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#FF1A23] transition-colors duration-300 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
