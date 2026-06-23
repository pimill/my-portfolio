import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { useState, useEffect } from 'react';
import { MushroomIcon } from './MushroomIcon';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 150 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute z-40 text-brand-red bg-transparent flex items-center justify-center"
          >
            <MushroomIcon className="w-12 h-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto pointer-events-auto"
          >
            <button 
              onClick={onClose}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-50 p-4 bg-brand-light-gray hover:bg-brand-red hover:text-white rounded-full transition-colors group cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full h-[60vh] md:h-[80vh] relative">
              <img 
                src={project.heroImage} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                <div>
                  <span className="text-brand-red font-bold tracking-widest relative uppercase text-sm mb-4 block">
                    {project.category}
                    <MushroomIcon className="w-4 h-4 inline-block ml-2 mb-1" />
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-brand-dark-gray">{project.title}</h2>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-brand-dark-gray">
                <p className="text-xl md:text-3xl font-light leading-relaxed mb-16">
                  {project.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      設計過程
                      <div className="w-8 h-px bg-brand-red" />
                    </h3>
                    <ul className="space-y-4">
                      {project.process.map((step, idx) => (
                        <li key={idx} className="flex gap-4 text-lg">
                          <span className="text-brand-red font-mono font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      最終成果
                      <div className="w-8 h-px bg-brand-blue" />
                    </h3>
                    <ul className="space-y-4">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-4 text-lg items-center">
                          <div className="w-2 h-2 rounded-full bg-brand-blue" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-brand-red/50 animate-bounce cursor-pointer mix-blend-difference hidden md:block" onClick={() => window.scrollTo(0, window.innerHeight)}>
              <MushroomIcon className="w-6 h-6" />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
