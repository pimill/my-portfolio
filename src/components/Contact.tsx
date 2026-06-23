import { motion } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';
import { ArrowUpRight } from 'lucide-react';

export const Contact = () => {
  const links = [
    { name: "Instagram", url: "https://www.instagram.com/r_yobiii_618/", external: true },
    { name: "Behance", url: "https://www.behance.net/32a0d06b", external: true },
    { name: "Email", url: "mailto:fpizzayz2@gmail.com", external: false },
    { name: "電話", url: "tel:0925367291", external: false },
    { name: "LINE ID", url: "https://line.me/ti/p/~514687", external: true },
  ];

  return (
    <section id="contact" className="py-24 md:py-40 px-4 md:px-12 bg-brand-red relative text-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <MushroomIcon className="w-24 h-24 text-brand-yellow mx-auto mb-8" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-8">
              今天先這樣
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 md:gap-12 items-center justify-center mt-12"
          >
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-2 font-display text-base md:text-lg font-medium tracking-tight hover:text-brand-yellow transition-colors relative"
              >
                {link.name}
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-brand-yellow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </motion.div>
        </div>
        <div className="mt-32 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-white/60 font-sans text-sm">
          <p>&copy; {new Date().getFullYear()} 個人作品集. 保留所有權利。</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span>精心設計</span>
            <MushroomIcon className="w-4 h-4 text-brand-yellow" />
          </div>
        </div>
      </div>
    </section>
  );
};
