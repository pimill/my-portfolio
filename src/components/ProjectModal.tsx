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
          {/* 背景遮罩：調整為大約 60% 透明度，並加入模糊效果 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-red/60 backdrop-blur-md cursor-pointer"
          />

          {/* 白色主區塊：固定高度，不佔滿全螢幕 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* 關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/80 hover:bg-brand-light-gray rounded-full transition-colors shadow-sm group"
            >
              <svg className="w-6 h-6 text-brand-dark-gray group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 內容區域：設定內部捲動 */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 左側：圖片 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </motion.div>

                {/* 右側：文字內容 */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MushroomIcon className="w-8 h-8 text-brand-red" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark-gray">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">專案簡介</h3>
                      <p className="text-brand-dark-gray leading-relaxed">{project.description}</p>
                    </section>

                    <section>
                      <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">設計概念</h3>
                      <p className="text-brand-dark-gray leading-relaxed">{project.concept}</p>
                    </section>

                    <div className="grid grid-cols-2 gap-8">
                      <section>
                        <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">設計規格</h3>
                        <ul className="text-sm text-brand-dark-gray space-y-1">
                          <li>尺寸：{project.specs.size}</li>
                          <li>解析度：{project.specs.resolution}</li>
                          <li>色彩模式：{project.specs.colorMode}</li>
                          <li>格式：{project.specs.format}</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">色彩計畫</h3>
                        <div className="flex gap-2">
                          {project.colors.map((color, index) => (
                            <div key={index} className="text-center">
                              <div 
                                className="w-8 h-8 rounded-full border border-gray-200 mb-1"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-[10px] text-gray-500 uppercase">{color}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    <section className="pt-8 border-t border-brand-light-gray">
                      <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-4">聯絡資訊</h3>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(project.links).map(([key, value]) => (
                          <a
                            key={key}
                            href={key === 'email' ? `mailto:${value}` : value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-brand-light-gray hover:bg-brand-yellow rounded-full text-xs font-medium transition-colors"
                          >
                            {key === 'email' ? value : key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
