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
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* 蘑菇展開動畫 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 150 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red bg-transparent flex items-center justify-center"
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          {/* Modal 主體：全螢幕左右雙欄，整體 overflow-hidden 不滾動 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white overflow-hidden pointer-events-auto flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="fixed top-6 right-6 z-50 p-3 bg-brand-light-gray hover:bg-brand-red hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── 左欄：作品圖（佔 45%，不裁切）────────────────────── */}
            <div
              className="w-full h-48 md:h-full md:w-[45%] flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: project.colorPalette?.[0] ?? '#1A1A1A' }}
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* ── 右欄：文字內容（手機可內部捲動，桌面單頁顯示）──── */}
            <div className="flex-1 overflow-y-auto md:overflow-y-auto px-8 py-10 md:px-12 md:py-12 flex flex-col gap-5 md:gap-6">

              {/* 分類 + 標題 */}
              <div className="pt-2 md:pt-6">
                <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-2 block">
                  {project.category}
                  <MushroomIcon className="w-3 h-3 inline-block ml-2 mb-0.5" />
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter text-brand-dark-gray leading-tight">
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
                <p className="text-sm md:text-base font-light leading-relaxed text-brand-dark-gray">
                  {project.description}
                </p>
              </div>

              {/* 設計概念 */}
              {project.concept && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark-gray/60 mb-2 flex items-center gap-2">
                    設計概念
                    <div className="flex-1 h-px bg-brand-light-gray/60" />
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark-gray/75">
                    {project.concept}
                  </p>
                </div>
              )}

              {/* 規格 + 色彩：橫排並列 */}
              <div className="flex flex-col sm:flex-row gap-6">
                {project.specs && project.specs.length > 0 && (
                  <div className="flex-1">
                    <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block opacity-60 mb-2">
                      設計規格
                    </span>
                    <ul className="space-y-1">
                      {project.specs.map((spec, idx) => (
                        <li key={idx} className="text-xs text-brand-dark-gray/70">
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
                    <div className="flex flex-wrap gap-3">
                      {project.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
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

              {/* 聯絡資訊（底部，緊湊膠囊版） */}
              <div className="mt-auto pt-5 border-t border-brand-light-gray/60">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-3">
                  聯絡
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.instagram.com/r_yobiii_618/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    IG @r_yobiii_618
                  </a>
                  <a
                    href="https://www.behance.net/32a0d06b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    Behance
                  </a>
                  <a
                    href="mailto:fpizzayz2@gmail.com"
                    className="text-xs border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    fpizzayz2@gmail.com
                  </a>
                  <a
                    href="tel:0925367291"
                    className="text-xs border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-4 py-1.5 transition-all"
                  >
                    0925-367-291
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
