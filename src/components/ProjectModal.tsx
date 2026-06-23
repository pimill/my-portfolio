import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { useState, useEffect, useRef } from 'react';
import { MushroomIcon } from './MushroomIcon';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

          {/* Modal 主體 */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-50 p-4 bg-brand-light-gray hover:bg-brand-red hover:text-white rounded-full transition-colors group cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Hero 圖片 */}
            <div className="w-full h-[60vh] md:h-[80vh] relative">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* 內容區 */}
            <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                <div>
                  <span className="text-brand-red font-bold tracking-widest relative uppercase text-sm mb-4 block">
                    {project.category}
                    <MushroomIcon className="w-4 h-4 inline-block ml-2 mb-1" />
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-brand-dark-gray">
                    {project.title}
                  </h2>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-brand-dark-gray">
                <p className="text-xl md:text-3xl font-light leading-relaxed mb-16">
                  {project.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      設計過程
                      <div className="w-8 h-px bg-brand-red" />
                    </h3>
                    <ul className="space-y-4">
                      {project.process.map((step, idx) => (
                        <li key={idx} className="flex gap-4 text-lg">
                          <span className="text-brand-red font-mono font-bold">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      最終成果
                      <div className="w-8 h-px bg-brand-blue" />
                    </h3>
                    <ul className="space-y-4">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-4 text-lg items-center">
                          <div className="w-2 h-2 rounded-full bg-brand-blue" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ════════════════════════════════
                    聯絡資訊
                ════════════════════════════════ */}
                <div className="mt-24 pt-16 border-t border-brand-light-gray/60">
                  <h3 className="font-display text-2xl font-bold mb-10 flex items-center gap-3">
                    聯絡資訊
                    <div className="w-8 h-px bg-brand-red" />
                  </h3>

                  {/* Social Media — 膠囊按鈕 */}
                  <div className="mb-10">
                    <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-5">
                      Social Media
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/r_yobiii_618/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-5 py-2.5 transition-all cursor-pointer"
                      >
                        <span className="font-medium text-base">Instagram</span>
                        <span className="text-sm opacity-40 group-hover:opacity-70 transition-opacity">
                          @r_yobiii_618
                        </span>
                      </a>

                      {/* Behance */}
                      <a
                        href="https://www.behance.net/32a0d06b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border border-brand-light-gray hover:border-brand-red hover:text-brand-red rounded-full px-5 py-2.5 transition-all cursor-pointer"
                      >
                        <span className="font-medium text-base">Behance</span>
                        <span className="text-sm opacity-40 group-hover:opacity-70 transition-opacity">
                          作品集
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Contact Details — 卡片格列 */}
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-5">
                      Contact Details
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Email */}
                      <a
                        href="mailto:fpizzayz2@gmail.com"
                        className="group flex flex-col gap-1.5 border border-brand-light-gray hover:border-brand-red rounded-2xl px-5 py-4 transition-all cursor-pointer text-left"
                      >
                        <span className="text-xs font-bold tracking-widest uppercase opacity-40 group-hover:text-brand-red group-hover:opacity-60 transition-colors">
                          Email
                        </span>
                        <span className="font-medium text-sm group-hover:text-brand-red transition-colors break-all">
                          fpizzayz2@gmail.com
                        </span>
                      </a>

                      {/* 電話 */}
                      <a
                        href="tel:0925367291"
                        className="group flex flex-col gap-1.5 border border-brand-light-gray hover:border-brand-red rounded-2xl px-5 py-4 transition-all cursor-pointer text-left"
                      >
                        <span className="text-xs font-bold tracking-widest uppercase opacity-40 group-hover:text-brand-red group-hover:opacity-60 transition-colors">
                          電話
                        </span>
                        <span className="font-medium text-sm group-hover:text-brand-red transition-colors">
                          0925-367-291
                        </span>
                      </a>

                      {/* LINE ID */}
                      <a
                        href="https://line.me/ti/p/~514687"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-1.5 border border-brand-light-gray hover:border-brand-red rounded-2xl px-5 py-4 transition-all cursor-pointer text-left"
                      >
                        <span className="text-xs font-bold tracking-widest uppercase opacity-40 group-hover:text-brand-red group-hover:opacity-60 transition-colors">
                          LINE ID
                        </span>
                        <span className="font-medium text-sm group-hover:text-brand-red transition-colors">
                          514687
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 往下捲動提示 */}
            <div
              className="fixed bottom-10 left-1/2 -translate-x-1/2 text-brand-red/50 animate-bounce cursor-pointer mix-blend-difference"
              onClick={(e) => {
                e.stopPropagation();
                modalRef.current?.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth',
                });
              }}
            >
              <MushroomIcon className="w-6 h-6" />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
