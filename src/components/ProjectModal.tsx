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
          {/* 黑色半透明背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />
          
          {/* 白色彈跳視窗本體 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-[1200px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            {/* 右上角關閉按鈕 */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 左側：大圖展示區 */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 md:p-10 border-r border-gray-100">
              <img
                src={project.heroImage || project.coverImage}
                alt={project.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded shadow-sm"
              />
            </div>

            {/* 右側：文字資訊區 */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto">
              
              {/* 標題 */}
              <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6 shrink-0">
                <MushroomIcon className="w-8 h-8 text-[#FF1A23]" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide">
                  {project.title}
                </h2>
              </div>

              <div className="space-y-10 text-gray-700 flex-1">
                
                {/* 專案簡介 */}
                <section>
                  <h3 className="text-[#FF1A23] font-bold text-sm tracking-widest mb-4">專案簡介</h3>
                  <p className="leading-loose text-sm md:text-base text-gray-600">{project.description}</p>
                </section>

                {/* 設計概念 */}
                {project.concept && (
                  <section>
                    <h3 className="text-[#FF1A23] font-bold text-sm tracking-widest mb-4">設計概念</h3>
                    <p className="leading-loose text-sm md:text-base text-gray-600">{project.concept}</p>
                  </section>
                )}

                {/* 設計規格與色彩計畫 (兩欄排版) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* 規格 */}
                  {project.specs && project.specs.length > 0 && (
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-sm tracking-widest mb-4">設計規格</h3>
                      <ul className="text-sm space-y-2 text-gray-500">
                        {project.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                      </ul>
                    </section>
                  )}

                  {/* 色彩 */}
                  {project.colorPalette && project.colorPalette.length > 0 && (
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-sm tracking-widest mb-4">色彩計畫</h3>
                      <div className="flex flex-wrap gap-4">
                        {project.colorPalette.map((color, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" 
                              style={{ backgroundColor: color }} 
                              title={color} 
                            />
                            <span className="text-[10px] text-gray-400 font-mono uppercase">{color}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* 聯絡資訊區 (置底) */}
                <section className="pt-8 mt-12 border-t border-gray-100">
                  <h3 className="text-[#FF1A23] font-bold text-xs tracking-widest mb-4">聯絡</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50">IG @r_yobiii_618</span>
                    <span className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50">Behance</span>
                    <span className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50">fpizzayz2@gmail.com</span>
                    <span className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50">0925-367-291</span>
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
