/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Works } from './components/Works';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Loader />
      {/* 導覽列保持在首頁 */}
      <Navigation currentView="home" onViewChange={() => {}} />
      <main>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
}
