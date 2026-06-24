import { FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { MushroomIcon } from './MushroomIcon';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* 背景遮罩：60% 透明度 + 模糊 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#FF1A23]/60 backdrop-blur-md cursor-pointer"
          />

          {/* 白色主區塊：固定高度，內部捲動 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
          >
            {/* 關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 內容區 */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <img src={project.heroImage || project.coverImage} alt={project.title} className="w-full h-auto rounded-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MushroomIcon className="w-8 h-8 text-[#FF1A23]" />
                    <h2 className="text-3xl font-bold">{project.title}</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
                  {project.concept && (
                    <div className="mb-6">
                      <h3 className="text-[#FF1A23] font-bold mb-2">設計概念</h3>
                      <p className="text-gray-700">{project.concept}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
