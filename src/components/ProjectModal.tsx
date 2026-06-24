import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { useEffect } from 'react';
import { MushroomIcon } from './MushroomIcon';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 蘑菇展開動畫 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 150 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red bg-transparent flex items-center justify-center pointer-events-none"
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          {/* 背景遮罩 (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal 主體：加寬視窗比例 (max-w-6xl)，純白無邊框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-50 w-[95%] md:w-[90%] max-w-6xl h-[85vh] md:h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-5 right-5 z-50 p-2.5 bg-neutral-100 hover:bg-brand-red hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ── 左欄：作品圖（不裁切）────────────────────── */}
            <div className="w-full h-[40%] md:h-full md:w-[45%] flex-shrink-0 flex items-center justify-center bg-white p-8">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* ── 右欄：文字內容（隱藏滾動條，加大行距與留白）──── */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6 md:gap-8">

              {/* 分類 + 標題 */}
              <div className="pt-2">
                <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-2 block">
                  {project.category}
                  <MushroomIcon className="w-3 h-3 inline-block ml-2 mb-0.5" />
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter text-brand-dark-gray leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* 分隔線 */}
              <div className="w-full h-px bg-brand-light-gray/60" />

              {/* 專案簡介 */}
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">
                  專案簡介
                </span>
                <p className="text-sm md:text-base font-light leading-loose tracking-wide text-brand-dark-gray">
                  {project.description}
                </p>
              </div>

              {/* 設計概念 */}
              {project.concept && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark-gray/60 mb-2 flex items-center gap-3">
                    設計概念
                    <div className="flex-1 h-px bg-brand-light-gray/60" />
                  </h3>
                  <p className="text-sm leading-loose tracking-wide text-brand-dark-gray/80">
                    {project.concept}
                  </p>
                </div>
              )}

              {/* 規格 + 色彩：橫排並列 */}
              <div className="flex flex-col sm:flex-row gap-8">
                {project.specs && project.specs.length > 0 && (
                  <div className="flex-1">
                    <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block opacity-60 mb-2">
                      設計規格
                    </span>
                    <ul className="space-y-1.5">
                      {project.specs.map((spec, idx) => (
                        <li key={idx} className="text-[13px] tracking-wide text-brand-dark-gray/70">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.colorPalette && project.colorPalette.length > 0 && (
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">
                      色彩計畫
                    </span>
                    <div className="flex flex-nowrap gap-3">
                      {project.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5">
                          <div
                            className="w-8 h-8 rounded-full border border-brand-light-gray/60 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[10px] font-mono text-brand-dark-gray/60 uppercase">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 聯絡資訊（底部，強制不換行） */}
              <div className="mt-auto pt-6 border-t border-brand-light-gray/60">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-3">
                  聯絡
                </span>
                <div className="flex flex-nowrap gap-2 md:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <a
                    href="https://www.instagram.com/r_yobiii_618/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[12px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    IG @r_yobiii_618
                  </a>
                  <a
                    href="https://www.behance.net/32a0d06b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[12px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    Behance
                  </a>
                  <a
                    href="mailto:fpizzayz2@gmail.com"
                    className="whitespace-nowrap text-[12px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    fpizzayz2@gmail.com
                  </a>
                  <a
                    href="tel:0925367291"
                    className="whitespace-nowrap text-[12px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    0925-367-291
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
