/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Works } from './components/Works';
// 這裡移除了 import { About } from './components/About';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Loader />
      <Navigation currentView="home" onViewChange={() => {}} />
      <main>
        <Hero />
        <Works />
        {/* 這裡把 <About /> 刪除了！因為現在改用 Navigation 裡面的彈出視窗 */}
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
}
