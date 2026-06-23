import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';
import { useCallback, useState } from 'react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [bgMushrooms, setBgMushrooms] = useState<{id: number, left: number, top: number, scale: number}[]>([]);

  const handleMushroomClick = () => {
    const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 mushrooms
    const newMushrooms = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 110 - 5, // -5% to 105% to cover edges
      top: Math.random() * 110 - 5, // -5% to 105%
      scale: 0.5 + Math.random() * 1.2, 
    }));
    setBgMushrooms(prev => [...prev, ...newMushrooms]);

    // Remove mushrooms after 4 seconds
    setTimeout(() => {
      const idsToRemove = newMushrooms.map(m => m.id);
      setBgMushrooms(prev => prev.filter(m => !idsToRemove.includes(m.id)));
    }, 4000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-brand-red overflow-hidden selection:bg-brand-yellow selection:text-brand-dark-red"
    >
      {/* Background Mushrooms Layer */}
      <div className="absolute w-full h-full inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {bgMushrooms.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 50, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: m.scale }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="absolute text-white"
              style={{
                left: `${m.left}%`,
                top: `${m.top}%`,
                transformOrigin: 'bottom center'
              }}
            >
              <MushroomIcon className="w-32 h-32 md:w-40 md:h-40" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 text-white relative group cursor-pointer"
          onClick={handleMushroomClick}
        >
          <MushroomIcon className="w-32 h-32 md:w-40 md:h-40" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter text-white mb-6"
        >
          設計作品集
        </motion.h1>
      </motion.div>
    </section>
  );
};
