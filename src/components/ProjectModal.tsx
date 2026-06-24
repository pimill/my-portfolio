import { motion, AnimatePresence } from 'motion/react';
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
