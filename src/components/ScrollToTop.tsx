import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-brand-dark-gray text-white rounded-full shadow-2xl hover:bg-brand-red transition-colors group cursor-pointer"
          aria-label="Scroll to top"
        >
          <MushroomIcon className="w-6 h-6 group-hover:text-brand-yellow transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
