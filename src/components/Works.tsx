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

        {/* 3欄網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 max-w-[1200px] mx-auto">
          <AnimatePresence>
            {visibleProjects.map((project, idx) => {
              const originalIdx = projects.indexOf(project);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1, duration: 0.7, ease: 'easeOut' }}
                  className="group cursor-pointer flex flex-col relative"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* 圖片層 */}
                  <div
                    className="relative w-full aspect-[3/4] rounded-2xl bg-gray-100 overflow-hidden
                      shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]
                      group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.28)]
                      transition-all duration-500
                      group-hover:-translate-y-2"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    {/* hover 遮罩 + VIEW PROJECT 提示 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-5 left-5 right-5">
                        <span
                          className="inline-flex items-center gap-2 text-white text-[11px] font-bold tracking-widest uppercase
                            translate-y-4 opacity-0
                            group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-500 delay-75"
                        >
                          VIEW PROJECT
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 浮式文字卡 */}
                  <div
                    className="relative w-[88%] mx-auto -mt-12 bg-white rounded-xl p-5
                      shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)]
                      group-hover:shadow-[0_16px_40px_-5px_rgba(0,0,0,0.15)]
                      transition-all duration-500
                      group-hover:-translate-y-2
                      z-10 border border-gray-100/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold tracking-widest text-[#FF1A23] uppercase bg-red-50 px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-gray-200 font-mono text-xs font-bold">
                        {(originalIdx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#FF1A23] transition-colors duration-300 mb-1.5 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
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
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative overflow-hidden border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white"
            >
              <span className="absolute inset-0 bg-gray-900 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                查看更多作品
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
