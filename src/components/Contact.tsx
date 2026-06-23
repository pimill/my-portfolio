import { motion } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';
import { Camera, Palette, Mail, Phone, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const links = [
    {
      name: 'Instagram',
      value: '@r_yobiii_618',
      url: 'https://www.instagram.com/r_yobiii_618/',
      external: true,
      icon: Camera,
    },
    {
      name: 'Behance',
      value: '作品集',
      url: 'https://www.behance.net/32a0d06b',
      external: true,
      icon: Palette,
    },
    {
      name: 'Email',
      value: 'fpizzayz2@gmail.com',
      url: 'mailto:fpizzayz2@gmail.com',
      external: false,
      icon: Mail,
    },
    {
      name: '電話',
      value: '0925-367-291',
      url: 'tel:0925367291',
      external: false,
      icon: Phone,
    },
    {
      name: 'LINE ID',
      value: '514687',
      url: 'https://line.me/ti/p/~514687',
      external: true,
      icon: MessageCircle,
    },
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto mt-12 w-full"
          >
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center gap-3 border border-white/20 hover:border-brand-yellow hover:bg-white/5 rounded-2xl px-4 py-6 transition-all cursor-pointer"
                >
                  <Icon className="w-6 h-6 text-brand-yellow transition-transform group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-display font-bold text-sm md:text-base uppercase tracking-wide">
                      {link.name}
                    </div>
                    <div className="text-xs md:text-sm text-white/60 mt-1 break-all group-hover:text-white/90 transition-colors">
                      {link.value}
                    </div>
                  </div>
                </a>
              );
            })}
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
