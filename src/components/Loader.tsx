import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { MushroomIcon } from './MushroomIcon';

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-red"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="text-white"
          >
            <MushroomIcon className="w-32 h-32" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
