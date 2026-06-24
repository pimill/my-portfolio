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
          {/* 蘑菇展開動畫：恢復為原本的樣子，撤銷透明度修改 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 150 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red bg-transparent flex items-center justify-center pointer-events-none"
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          {/* 背景遮罩 (Backdrop)：保留此修改，它已經是半透明的 bg-black/40 並且有 backdrop-blur-sm 效果 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal 主體：縮小尺寸，剛好呈現不超過一個頁面。保留此修改。 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-50 w-[90%] md:w-[85%] max-w-5xl h-[80vh] md:h-[75vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
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

            {/* ── 左欄：作品圖（不裁切）。保留 object-contain 修改。 ────────────────────── */}
            <div className="w-full h-[40%] md:h-full md:w-[45%] flex-shrink-0 flex items-center justify-center bg-white p-6">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* ── 右欄：文字內容（縮減間距與留白，完美裝入一頁）。保留此修改。 ──── */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 py-8 md:px-10 md:py-10 flex flex-col gap-4 md:gap-5">

              {/* 分類 + 標題 */}
              <div className="pt-2">
                <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-1 block">
                  {project.category}
                  <MushroomIcon className="w-3 h-3 inline-block ml-2 mb-0.5" />
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter text-brand-dark-gray leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* 分隔線 */}
              <div className="w-full h-px bg-brand-light-gray/60" />

              {/* 專案簡介 */}
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1">
                  專案簡介
                </span>
                <p className="text-xs md:text-sm font-light leading-relaxed tracking-wide text-brand-dark-gray">
                  {project.description}
                </p>
              </div>

              {/* 設計概念 */}
              {project.concept && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark-gray/60 mb-1 flex items-center gap-3">
                    設計概念
                    <div className="flex-1 h-px bg-brand-light-gray/60" />
                  </h3>
                  <p className="text-xs leading-relaxed tracking-wide text-brand-dark-gray/80">
                    {project.concept}
                  </p>
                </div>
              )}

              {/* 規格 + 色彩：橫排並列 */}
              <div className="flex flex-col sm:flex-row gap-6">
                {project.specs && project.specs.length > 0 && (
                  <div className="flex-1">
                    <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block opacity-60 mb-1">
                      設計規格
                    </span>
                    <ul className="space-y-1">
                      {project.specs.map((spec, idx) => (
                        <li key={idx} className="text-[12px] tracking-wide text-brand-dark-gray/70">
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
                            className="w-6 h-6 rounded-full border border-brand-light-gray/60 shadow-sm"
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

              {/* 聯絡資訊（底部，強制不換行） */}
              <div className="mt-auto pt-4 border-t border-brand-light-gray/60">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">
                  聯絡
                </span>
                <div className="flex flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <a
                    href="https://www.instagram.com/r_yobiii_618/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[11px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-3 py-1 transition-all"
                  >
                    IG @r_yobiii_618
                  </a>
                  <a
                    href="https://www.behance.net/32a0d06b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[11px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-3 py-1 transition-all"
                  >
                    Behance
                  </a>
                  <a
                    href="mailto:fpizzayz2@gmail.com"
                    className="whitespace-nowrap text-[11px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-3 py-1 transition-all"
                  >
                    fpizzayz2@gmail.com
                  </a>
                  <a
                    href="tel:0925367291"
                    className="whitespace-nowrap text-[11px] tracking-wider border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-3 py-1 transition-all"
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
