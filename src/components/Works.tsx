import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-24 md:py-40 px-4 md:px-12 bg-brand-light-gray relative">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-6"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-brand-dark-gray uppercase tracking-tighter">精選作品</h2>
          <MushroomIcon className="w-12 h-12 text-brand-red" />
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer overflow-hidden rounded-sm break-inside-avoid shadow-lg"
              onClick={() => setSelectedProject(project)}
            >
              <div className="overflow-hidden aspect-auto">
                <motion.img 
                  src={project.coverImage} 
                  alt={project.title}
                  className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              
              <div className="absolute inset-0 bg-brand-dark-red/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <MushroomIcon className="w-10 h-10 text-brand-yellow mb-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h3>
                <span className="font-sans font-medium text-brand-yellow transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{project.category}</span>
                <span className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity underline underline-offset-4 decoration-brand-yellow text-white font-medium block">觀看專案</span>
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
