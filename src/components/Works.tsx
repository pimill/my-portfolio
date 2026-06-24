import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

const INITIAL_COUNT = 3;

export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="works" className="py-20 md:py-32 px-4 md:px-12 bg-[#FAFAFA] relative font-sans">
      <div className="container mx-auto">
        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex items-center gap-4 justify-center md:justify-start"
        >
          <MushroomIcon className="w-8 h-8 text-[#FF1A23]" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            歷年作品
          </h2>
        </motion.div>

        {/* 3 欄網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-6 max-w-[1100px] mx-auto">
          <AnimatePresence>
            {visibleProjects.map((project, idx) => {
              const originalIdx = projects.indexOf(project);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: 'easeOut' }}
                  className="group cursor-pointer flex flex-col relative"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* 圖片 */}
                  <div className="relative w-full aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden shadow-[0_10px_30px_-8px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-2">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    {/* hover 遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* 右下角小蘑菇 */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 opacity-50 group-hover:opacity-90 transition-opacity duration-300">
                      <MushroomIcon className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  </div>

                  {/* 浮式文字卡 */}
                  <div className="relative w-[88%] mx-auto -mt-10 bg-white rounded-xl p-4 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.1)] group-hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-2 z-10 border border-gray-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold tracking-widest text-[#FF1A23] uppercase bg-red-50 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-gray-200 font-mono text-xs font-bold">
                        {(originalIdx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-gray-900 group-hover:text-[#FF1A23] transition-colors duration-300 mb-1 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 查看更多按鈕 */}
        {!showAll && projects.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative overflow-hidden border-2 border-gray-900 text-gray-900 px-9 py-3.5 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white"
            >
              <span className="absolute inset-0 bg-gray-900 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                查看更多作品
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
