import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-24 md:py-40 px-4 md:px-12 bg-[#FAFAFA] relative font-sans">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex items-center gap-5 justify-center md:justify-start"
        >
          <MushroomIcon className="w-10 h-10 text-[#FF1A23]" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            歷年作品
          </h2>
        </motion.div>

        {/* 使用錯落與疊加排版，製造 Z 軸立體感 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-24 gap-x-12 max-w-[1200px] mx-auto mt-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col relative"
              onClick={() => setSelectedProject(project)}
            >
              {/* 圖片層：帶有深邃陰影，hover 時上浮 */}
              <div className="relative w-full aspect-[4/5] rounded-xl bg-gray-100 overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 transform group-hover:-translate-y-2">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                {/* 微漸層遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* 文字懸浮層：向上負邊距 (-mt-20) 疊加在圖片上方，打破平面 */}
              <div className="relative w-[85%] mx-auto -mt-20 bg-white rounded-xl p-6 md:p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.15)] transition-all duration-500 transform group-hover:-translate-y-3 z-10 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#FF1A23] uppercase bg-red-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-gray-300 font-mono text-sm font-bold">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-gray-900 group-hover:text-[#FF1A23] transition-colors duration-300 mb-3">
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
