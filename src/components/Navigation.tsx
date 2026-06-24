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

      {/* 關於我彈出視窗 */}
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
            
            {/* 視窗本體 - 放大寬度至最大 1050px 以容納左右分欄 */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-[1050px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden text-slate-800"
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

              {/* 左側頭像設計：帶有禁止符號的蘑菇 (404無此圖片意象) */}
              <div className="w-full md:w-[25%] bg-gray-50 flex flex-col items-center justify-center p-6 border-r border-gray-100 min-h-[220px]">
                <div className="relative flex items-center justify-center mb-3">
                  <MushroomIcon className="w-20 h-20 text-gray-200" />
                  {/* 絕對定位的禁止符號疊加層 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-[5px] border-gray-400/60 rounded-full relative flex items-center justify-center">
                      <div className="absolute w-[5px] h-16 bg-gray-400/60 rotate-45 rounded-full" />
                    </div>
                  </div>
                </div>
                <span className="text-gray-400 text-[10px] tracking-widest uppercase font-mono font-bold">IMAGE NOT FOUND / 404</span>
              </div>

              {/* 右側區塊：滿版內容與左右分欄 */}
              <div className="w-full md:w-[75%] flex flex-col p-6 md:p-8 justify-center text-left">
                {/* 標題改為：關於我 */}
                <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
                  <MushroomIcon className="w-7 h-7 text-[#FF1A23]" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
                    關於我
                  </h2>
                </div>

                {/* 內文左右分欄架構 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  
                  {/* 左側欄：個人介紹 */}
                  <div className="space-y-4 text-[12px] md:text-[13px] leading-relaxed text-gray-600 font-sans">
                    <p>
                      我是曾琬茹，畢業於崑山科技大學視覺傳達設計系，專注於品牌識別、平面設計與視覺整合設計。擅長透過設計思考將品牌理念轉化為具辨識度與一致性的視覺形象，並重視設計在溝通與商業應用上的價值。
                    </p>
                    <p>
                      熟悉 Adobe Illustrator、Photoshop、InDesign 等設計軟體，具備品牌識別設計、包裝設計、版面編排、行銷宣傳物及視覺企劃等實務能力，同時具備 After Effects 與 Premiere Pro 的基礎製作能力，能應用於動態視覺與數位內容製作。
                    </p>
                    <p>
                      在設計工作中，我重視細節與執行品質，擅長從需求分析、概念發想、風格規劃到設計落實的完整流程，並具備良好的溝通協調能力與團隊合作精神。期望透過專業設計能力與創意思維，協助品牌建立更具影響力的視覺形象，並持續在設計領域精進與成長。
                    </p>
                  </div>

                  {/* 右側欄：參賽與證照 */}
                  <div className="space-y-5">
                    {/* 參賽經歷 */}
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2.5 border-b border-gray-100 pb-1 uppercase">參賽 Competition</h3>
                      <ul className="space-y-2 text-[12px] text-gray-600">
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2025</span>
                          <span>第11屆國際拍片運動-入選獎</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2025</span>
                          <span>第五十屆嵐雲文學獎徵文比賽-文藝評論組-佳作</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2024</span>
                          <span>「有蛇有得」生肖圖像設計競賽(大專組)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2024</span>
                          <span>全國旅遊文學明信片創作大賽-17臺南</span>
                        </li>
                      </ul>
                    </section>

                    {/* 證照認證 */}
                    <section>
                      <h3 className="text-[#FF1A23] font-bold text-[11px] tracking-widest mb-2.5 border-b border-gray-100 pb-1 uppercase">證照 Certifications</h3>
                      <ul className="space-y-2 text-[12px] text-gray-600">
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2025</span>
                          <span>文創品牌行銷企劃師-甲級</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2025</span>
                          <span>TQC+ 電腦繪圖設計</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2023</span>
                          <span>電腦軟體應用-丙級</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono font-bold text-gray-400">2022</span>
                          <span>印前製程圖文組板-乙、丙級</span>
                        </li>
                      </ul>
                    </section>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
