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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#FF1A23]/60 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex items-start justify-center">
                  <img
                    src={project.heroImage || project.coverImage}
                    alt={project.title}
                    className="w-full h-auto rounded-lg shadow-sm object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <MushroomIcon className="w-8 h-8 text-[#FF1A23]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {project.title}
                    </h2>
                  </div>
                  <div className="space-y-6 text-sm md:text-base text-gray-700">
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-2">專案簡介</h3>
                      <p className="leading-relaxed">{project.description}</p>
                    </section>
                    {project.concept && (
                      <section>
                        <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-2">設計概念</h3>
                        <p className="leading-relaxed">{project.concept}</p>
                      </section>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {project.specs && project.specs.length > 0 && (
                        <section>
                          <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-2">設計規格</h3>
                          <ul className="text-xs space-y-1 text-gray-500">
                            {project.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                          </ul>
                        </section>
                      )}
                      {project.colorPalette && project.colorPalette.length > 0 && (
                        <section>
                          <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-2">色彩計畫</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.colorPalette.map((color, i) => (
                              <div key={i} className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
