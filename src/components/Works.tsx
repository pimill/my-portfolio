// Works.tsx
import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-24 md:py-40 px-4 md:px-12 bg-white relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-6"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-brand-dark-gray uppercase tracking-tighter">
            歷年作品
          </h2>
          <MushroomIcon className="w-12 h-12 text-brand-red" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* 預覽圖片剛好呈現，不被裁切 */}
              <div className="aspect-[3/4] rounded-sm overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] bg-neutral-50/50 flex items-center justify-center">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 文字標示 */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold uppercase tracking-tight text-brand-dark-gray">
                    {project.title}
                  </h3>
                  <span className="font-sans text-xs text-brand-dark-gray/50">
                    {project.category}
                  </span>
                </div>
                <MushroomIcon className="w-4 h-4 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
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
