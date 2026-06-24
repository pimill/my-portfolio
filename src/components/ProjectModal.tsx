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
  // 彩蛋狀態管理
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
      // 每次打開新作品時重置彩蛋狀態
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

  // 處理彩蛋點擊邏輯
  const handleImageClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowSnake(true);
      setClickCount(0); // 觸發後歸零
    }
  };

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

          {/* 背景遮罩 (半透明黑 + 輕微模糊) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal 主體：取消滑動動畫，直接淡入顯示，移除滾動條設計 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.4, duration: 0.3 }}
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

            {/* ── 左欄：作品圖（加入點擊觸發彩蛋）────────────────────── */}
            <div 
              className="w-full h-[40%] md:h-full md:w-[45%] flex-shrink-0 flex items-center justify-center bg-white p-8 cursor-pointer relative group"
              onClick={handleImageClick}
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/* 隱藏的提示小字 */}
              <span className="absolute bottom-4 text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                Tap the image...
              </span>
            </div>

            {/* ── 右欄：文字內容（不滾動，使用 justify-between 自動分配高度）──── */}
            <div className="flex-1 px-8 py-8 md:px-12 md:py-10 flex flex-col justify-between overflow-hidden">
              
              <div className="flex flex-col gap-5 md:gap-6">
                {/* 分類 + 標題 */}
                <div>
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
                  <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1.5">
                    專案簡介
                  </span>
                  <p className="text-sm md:text-base font-light leading-relaxed tracking-wide text-brand-dark-gray line-clamp-3 md:line-clamp-none">
                    {project.description}
                  </p>
                </div>

                {/* 設計概念 */}
                {project.concept && (
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark-gray/60 mb-1.5 flex items-center gap-3">
                      設計概念
                      <div className="flex-1 h-px bg-brand-light-gray/60" />
                    </h3>
                    <p className="text-sm leading-relaxed tracking-wide text-brand-dark-gray/80 line-clamp-3 md:line-clamp-none">
                      {project.concept}
                    </p>
                  </div>
                )}

                {/* 規格 + 色彩：橫排並列 */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {project.specs && project.specs.length > 0 && (
                    <div className="flex-1">
                      <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block opacity-60 mb-1.5">
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
                      <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-1.5">
                        色彩計畫
                      </span>
                      <div className="flex flex-nowrap gap-2.5">
                        {project.colorPalette.map((color, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <div
                              className="w-7 h-7 rounded-full border border-brand-light-gray/60 shadow-sm"
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
              </div>

              {/* 聯絡資訊（底部，強制不換行） */}
              <div className="pt-5 border-t border-brand-light-gray/60 mt-4">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase block opacity-60 mb-2">
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

          {/* 🐍 隱藏彩蛋：爬行的蛇 */}
          <AnimatePresence>
            {showSnake && (
              <motion.div
                initial={{ x: '-20vw', y: '60vh', opacity: 0 }}
                animate={{ 
                  x: '120vw', 
                  y: ['60vh', '50vh', '65vh', '45vh', '55vh'], // 模擬蛇行起伏
                  opacity: 1 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                onAnimationComplete={() => setShowSnake(false)}
                className="fixed z-[70] pointer-events-none drop-shadow-lg"
              >
                {/* 繪製極簡白蛇 SVG */}
                <svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 身體線條 */}
                  <path d="M0,40 C40,10 60,70 100,40 C140,10 160,70 200,40 C215,25 225,35 230,40" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
                  {/* 頭部 */}
                  <circle cx="230" cy="40" r="10" fill="white" />
                  {/* 眼睛 */}
                  <circle cx="233" cy="36" r="2" fill="#1A1A1A" />
                  <circle cx="233" cy="44" r="2" fill="#1A1A1A" />
                  {/* 吐信（舌頭） */}
                  <path d="M240,40 L248,38 M240,40 L248,42" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
};
