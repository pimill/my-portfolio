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

          {/* 蘑菇展開動畫：保留原本動畫，加 opacity 0.5 讓紅色背景半透明 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 150 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red bg-transparent flex items-center justify-center pointer-events-none"
            style={{ opacity: 0.5 }}
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal 主體：彈跳視窗，不占滿螢幕，無滾動 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-50 w-[88%] md:w-[80%] max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            style={{ maxHeight: '82vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 z-50 p-2 bg-neutral-100 hover:bg-brand-red hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ── 左欄：作品圖（不裁切）────────────────────── */}
            <div className="w-full h-[38%] md:h-full md:w-[42%] flex-shrink-0 flex items-center justify-center bg-white p-4 md:p-5">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* ── 右欄：不滾動，緊湊排版 ──── */}
            <div className="flex-1 overflow-hidden px-5 py-5 md:px-7 md:py-6 flex flex-col gap-3">

              {/* 分類 + 標題 */}
              <div>
                <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-1 block">
                  {project.category}
                  <MushroomIcon className="w-3 h-3 inline-block ml-2 mb-0.5" />
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tighter text-brand-dark-gray leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* 分隔線 */}
              <div className="w-full h-px bg-brand-light-gray/60 flex-shrink-0" />

              {/* 專案簡介 */}
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1">
                  專案簡介
                </span>
                <p className="text-xs font-light leading-relaxed tracking-wide text-brand-dark-gray line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* 設計概念 */}
              {project.concept && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark-gray/60 mb-1 flex items-center gap-2">
                    設計概念
                    <div className="flex-1 h-px bg-brand-light-gray/60" />
                  </h3>
                  <p className="text-xs leading-relaxed tracking-wide text-brand-dark-gray/80 line-clamp-3">
                    {project.concept}
                  </p>
                </div>
              )}

              {/* 規格 + 色彩：橫排並列 */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.specs && project.specs.length > 0 && (
                  <div className="flex-1">
                    <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block opacity-60 mb-1">
                      設計規格
                    </span>
                    <ul className="space-y-0.5">
                      {project.specs.map((spec, idx) => (
                        <li key={idx} className="text-[11px] tracking-wide text-brand-dark-gray/70">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.colorPalette && project.colorPalette.length > 0 && (
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1">
                      色彩計畫
                    </span>
                    <div className="flex flex-nowrap gap-2">
                      {project.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <div
                            className="w-5 h-5 rounded-full border border-brand-light-gray/60 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[9px] font-mono text-brand-dark-gray/60 uppercase">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 聯絡資訊（底部，強制不換行）*/}
              <div className="mt-auto pt-3 border-t border-brand-light-gray/60 flex-shrink-0">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">
                  聯絡
                </span>
                <div className="flex flex-nowrap gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <a
                    href="https://www.instagram.com/r_yobiii_618/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[10px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-2.5 py-1 transition-all"
                  >
                    IG @r_yobiii_618
                  </a>
                  <a
                    href="https://www.behance.net/32a0d06b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[10px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-2.5 py-1 transition-all"
                  >
                    Behance
                  </a>
                  <a
                    href="mailto:fpizzayz2@gmail.com"
                    className="whitespace-nowrap text-[10px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-2.5 py-1 transition-all"
                  >
                    fpizzayz2@gmail.com
                  </a>
                  <a
                    href="tel:0925367291"
                    className="whitespace-nowrap text-[10px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-2.5 py-1 transition-all"
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
