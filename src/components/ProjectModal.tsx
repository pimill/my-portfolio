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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* 背景改為黑色透明度 60% */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            /* 限制高度使其剛好符合一個畫面，不需要滑動 */
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 overflow-hidden p-6 md:p-10 flex flex-col h-full">
              <div className="flex flex-col md:flex-row gap-8 h-full">
                
                {/* 左側圖片區：限制高度不滑動，圖片等比例縮放 */}
                <div className="w-full md:w-1/2 flex items-center justify-center h-48 md:h-full shrink-0">
                  <img
                    src={project.heroImage || project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                
                {/* 右側文字區：填滿剩餘空間，確保資訊可見 */}
                <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center gap-3 mb-4 shrink-0">
                    <MushroomIcon className="w-8 h-8 text-[#FF1A23]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {project.title}
                    </h2>
                  </div>
                  
                  {/* 內文區域，設定空間比例讓資訊完整在一頁內呈現 */}
                  <div className="space-y-4 text-sm text-gray-700 flex-1 overflow-y-auto pr-2">
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-1">專案簡介</h3>
                      <p className="leading-relaxed">{project.description}</p>
                    </section>
                    {project.concept && (
                      <section>
                        <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-1">設計概念</h3>
                        <p className="leading-relaxed">{project.concept}</p>
                      </section>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {project.specs && project.specs.length > 0 && (
                        <section>
                          <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-1">設計規格</h3>
                          <ul className="text-xs space-y-1 text-gray-500">
                            {project.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                          </ul>
                        </section>
                      )}
                      {project.colorPalette && project.colorPalette.length > 0 && (
                        <section>
                          <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-1">色彩計畫</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.colorPalette.map((color, i) => (
                              <div key={i} className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>

                  {/* 聯絡資訊區：絕對不換行 (flex-nowrap, whitespace-nowrap) */}
                  <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
                    <h3 className="text-[#FF1A23] font-bold text-xs uppercase tracking-widest mb-2">聯絡</h3>
                    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <span className="px-3 py-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full whitespace-nowrap shrink-0">IG @r_yobiii_618</span>
                      <span className="px-3 py-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full whitespace-nowrap shrink-0">Behance</span>
                      <span className="px-3 py-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full whitespace-nowrap shrink-0">fpizzayz2@gmail.com</span>
                      <span className="px-3 py-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full whitespace-nowrap shrink-0">0925-367-291</span>
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
