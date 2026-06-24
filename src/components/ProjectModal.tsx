import { FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const isOpen = !!project;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-[1000px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            /* 移除 max-height 的限制，讓內容決定高度，避免出現捲軸 */
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors bg-white/80"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-[45%] bg-gray-50 flex items-center justify-center p-6 border-r border-gray-100">
              <img
                src={project.heroImage || project.coverImage}
                alt={project.title}
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* 移除 overflow-y-auto，不再出現捲軸 */}
            <div className="w-full md:w-[55%] flex flex-col p-6 md:p-8">
              
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <MushroomIcon className="w-7 h-7 text-[#FF1A23]" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
                  {project.title}
                </h2>
              </div>

              <div className="space-y-6 text-gray-700 flex-1">
                
                <section>
                  <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2">專案簡介</h3>
                  <p className="leading-relaxed text-[13px] text-gray-600">{project.description}</p>
                </section>

                {project.concept && (
                  <section>
                    <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2">設計概念</h3>
                    <p className="leading-relaxed text-[13px] text-gray-600">{project.concept}</p>
                  </section>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.specs && project.specs.length > 0 && (
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2">設計規格 / SPECS</h3>
                      <ul className="text-[12px] space-y-1 text-gray-500">
                        {project.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                      </ul>
                    </section>
                  )}

                  {project.colorPalette && project.colorPalette.length > 0 && (
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2">色彩計畫 / COLORS</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.colorPalette.map((color, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5">
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" 
                              style={{ backgroundColor: color }} 
                              title={color} 
                            />
                            <span className="text-[9px] text-gray-400 font-mono uppercase">{color}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <section className="pt-4 mt-6 border-t border-gray-100">
                  <h3 className="text-[#FF1A23] font-bold text-[10px] tracking-widest mb-3">聯絡</h3>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">IG @r_yobiii_618</span>
                    <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">Behance</span>
                    <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">fpizzayz2@gmail.com</span>
                    <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">0925-367-291</span>
                  </div>
                </section>
                
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
