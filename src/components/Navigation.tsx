import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';

interface NavigationProps {
  currentView: 'home' | 'past-works';
  onViewChange: (view: 'home' | 'past-works') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: '歷年作品', view: 'past-works' as const, href: '#works' },
    { name: '關於我', view: 'home' as const, href: '#about' },
    { name: '聯絡資訊', view: 'home' as const, href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm text-brand-dark-gray' : 'bg-transparent py-8 text-white'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            onViewChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group"
        >
          <MushroomIcon className={`w-8 h-8 transition-transform group-hover:scale-110 ${!isScrolled && 'text-brand-yellow'}`} />
          <span className="font-display font-bold text-xl tracking-tight uppercase hidden md:block">PORTFOLIO</span>
        </a>

        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.name} className="relative group">
              <a 
                href={link.href}
                onClick={(e) => {
                  if (link.view === 'past-works') {
                    e.preventDefault();
                    onViewChange('past-works');
                  } else {
                    onViewChange('home');
                    setTimeout(() => {
                      const elem = document.querySelector(link.href);
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }
                }}
                className={`font-sans text-sm md:text-base font-medium transition-all group-hover:font-bold tracking-wide uppercase ${currentView === link.view ? 'font-bold' : ''}`}
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
  );
};
