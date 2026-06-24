import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { useEffect, useState } from 'react';
import { MushroomIcon } from './MushroomIcon';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSnake, setShowSnake] = useState(false);

  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setClickCount(0);
      setShowSnake(false);
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

  const handleImageClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowSnake(true);
      setClickCount(0);
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* 蘑菇放大動畫 (保留原設計，改為不完全遮蔽底層) */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 150, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red pointer-events-none flex items-center justify-center"
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          {/* 背景遮罩 (設為黑色並帶有 70% 透明度，達到透視效果) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal 主體 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="relative z-50 w-[95%] md:w-[90%] max-w-6xl h-[85vh] md:h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-50 p-2.5 bg-neutral-100 hover:bg-brand-red hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 左欄 */}
            <div 
              className="w-full h-[40%] md:h-full md:w-[45%] flex-shrink-0 flex items-center justify-center bg-white p-8 cursor-pointer relative group"
              onClick={handleImageClick}
            >
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>

            {/* 右欄 (增加底部內邊距，聯絡資訊向上推) */}
            <div className="flex-1 px-8 pt-8 pb-12 md:px-12 md:pt-10 md:pb-16 flex flex-col justify-between overflow-y-auto">
              
              <div className="flex flex-col gap-5 md:gap-6">
                <div>
                  <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-2 block">
                    {project.category}
                    <MushroomIcon className="w-3 h-3 inline-block ml-2 mb-0.5" />
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter text-brand-dark-gray leading-tight">
                    {project.title}
                  </h2>
                </div>

                <div className="w-full h-px bg-brand-light-gray/60" />

                <div>
                  <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1.5">專案簡介</span>
                  <p className="text-sm md:text-base font-light leading-relaxed text-brand-dark-gray">{project.description}</p>
                </div>

                {/* 聯絡資訊 (強制調整間距) */}
                <div className="pt-6 border-t border-brand-light-gray/60 mt-auto">
                  <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">聯絡</span>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <a href="https://www.instagram.com/r_yobiii_618/" target="_blank" className="text-[12px] border border-brand-light-gray rounded-full px-4 py-1.5 hover:border-brand-red transition-all">IG @r_yobiii_618</a>
                    <a href="https://www.behance.net/32a0d06b" target="_blank" className="text-[12px] border border-brand-light-gray rounded-full px-4 py-1.5 hover:border-brand-red transition-all">Behance</a>
                    <a href="mailto:fpizzayz2@gmail.com" className="text-[12px] border border-brand-light-gray rounded-full px-4 py-1.5 hover:border-brand-red transition-all">fpizzayz2@gmail.com</a>
                    <a href="tel:0925367291" className="text-[12px] border border-brand-light-gray rounded-full px-4 py-1.5 hover:border-brand-red transition-all">0925-367-291</a>
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
