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
        {view === 'home' ? (
          <>
            <Hero />
            <Works onViewChange={setView} />
            <About />
            <Contact />
          </>
        ) : (
          <PastWorks onViewChange={setView} />
        )}
      </main>
      <ScrollToTop />
    </div>
  );
}
