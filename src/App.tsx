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
import { ProjectModal } from './components/ProjectModal'; // 改用 ProjectModal
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 處理點擊作品的邏輯
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // 延遲清空選中項目，讓退出動畫跑完
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Loader />
      <Navigation currentView="home" onViewChange={() => {}} />
      <main>
        <Hero />
        {/* 假設 Works 組件接收一個處理點擊的 function */}
        <Works onProjectClick={handleProjectSelect} />
        <About />
        <Contact />

        {/* 彈跳視窗：背景大紅大紫透明度在 ProjectModal 內調整 */}
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </main>
      <ScrollToTop />
    </div>
  );
}
