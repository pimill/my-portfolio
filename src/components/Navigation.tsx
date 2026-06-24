import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';

interface NavigationProps {
  currentView: 'home' | 'past-works';
  onViewChange: (view: 'home' | 'past-works') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAboutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isAboutOpen]);

  const links = [
    { name: '歷年作品', href: '#works' },
    { name: '關於我', action: () => setIsAboutOpen(true) }, 
    { name: '聯絡資訊', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm text-brand-dark-gray'
            : 'bg-transparent py-8 text-white'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo — 點擊回頂部 */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <MushroomIcon
              className={`w-8 h-8 transition-transform group-hover:scale-110 ${
                !isScrolled && 'text-brand-yellow'
              }`}
            />
            <span className="font-display font-bold text-xl tracking-tight uppercase hidden md:block">
              PORTFOLIO
            </span>
          </a>

          {/* 導覽連結 */}
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.name} className="relative group">
                <a
                  href={link.href || '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.action) {
                      link.action();
                    } else if (link.href) {
                      const elem = document.querySelector(link.href);
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="font-sans text-sm md:text-base font-medium transition-all group-hover:font-bold tracking-wide uppercase cursor-pointer"
                >
                  {link.name}
                </a>
                {/* Mushroom stem underline */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-current transition-all duration-300 rounded-full group-hover:w-full opacity-0 group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* 關於我內嵌式彈出視窗 */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 背景灰色遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />
            
            {/* 視窗本體 */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-[850px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden text-slate-800"
            >
              {/* 右上角關閉按鈕 */}
              <button 
                onClick={() => setIsAboutOpen(false)} 
                className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors bg-white/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 左側設計 */}
              <div className="w-full md:w-[40%] bg-gray-50 flex flex-col items-center justify-center p-8 border-r border-gray-100 min-h-[250px]">
                <MushroomIcon className="w-20 h-20 text-gray-300 mb-2" />
                <span className="text-gray-400 text-xs tracking-widest uppercase font-mono">About Me</span>
              </div>

              {/* 右側區塊：文字與能力標籤 */}
              <div className="w-full md:w-[60%] flex flex-col p-6 md:p-10 justify-center text-left">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <MushroomIcon className="w-7 h-7 text-[#FF1A23]" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
                    關於這裡
                  </h2>
                </div>

                <div className="space-y-6 text-gray-700">
                  <section className="space-y-3 text-[13px] md:text-sm leading-relaxed text-gray-600">
                    <p>沒有偉大的理想，只有些完成的作品、半途而廢的想法，和很多很多想睡覺的日子。</p>
                    <p>這裡像蘑菇一樣，不太喜歡被注意。<br/>平常常待在自己的角落慢慢生長，偶爾長出一些作品，或者慢慢發霉、長出苔蘚。</p>
                  </section>

                  {/* 核心能力 */}
                  <section>
                    <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2">核心能力</h3>
                    <div className="flex flex-wrap gap-2">
                      {['品牌識別', '平面設計', '插畫繪製', '介面設計'].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs bg-gray-50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
