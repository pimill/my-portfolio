/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Works } from './components/Works';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { PastWorks } from './components/PastWorks';

export default function App() {
  const [view, setView] = useState<'home' | 'past-works'>('home');

  return (
    <div className="min-h-screen bg-white">
      <Loader />
      <Navigation currentView={view} onViewChange={setView} />
      <main>
        {/* 首頁內容始終保持在背景 */}
        <Hero />
        <Works onViewChange={setView} />
        <About />
        <Contact />

        {/* 作品詳情彈跳視窗 (Modal) */}
        {view === 'past-works' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* 背景遮罩：品牌紅色，透明度設定為 60% */}
            <div 
              className="absolute inset-0 bg-[#FF1A23]/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setView('home')}
            />
            
            {/* 白色主區塊：不佔滿全螢幕，設定最大高度與寬度 */}
            <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* 關閉按鈕 */}
              <button 
                onClick={() => setView('home')}
                className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors shadow-sm"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* 作品內容區：保留您的蘑菇動畫轉場 */}
              <div className="flex-1 overflow-auto">
                <PastWorks onViewChange={setView} />
              </div>
            </div>
          </div>
        )}
      </main>
      <ScrollToTop />
    </div>
  );
}
