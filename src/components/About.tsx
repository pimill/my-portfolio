import { motion } from 'motion/react';
import { MushroomIcon } from './MushroomIcon';
import realisticFishAvatar from '../assets/images/specific_fish_no_furniture_1781178100666.png';

export const About = () => {
  const skills = [
    "品牌識別",
    "平面設計",
    "插畫繪製",
    "介面設計"
  ];

  return (
    <section id="about" className="py-24 md:py-40 px-4 md:px-12 bg-white flex items-center relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-center justify-center max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 max-w-sm relative group"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem]">
              <img 
                src={realisticFishAvatar} 
                alt="Portrait of a realistic fish on bed" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-red rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
              <MushroomIcon className="w-10 h-10 text-white animate-pulse" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark-gray uppercase tracking-tighter mb-8">關於這裡</h2>
            <div className="font-sans text-base md:text-lg font-light text-brand-dark-gray leading-relaxed space-y-6">
              <p>
                沒有偉大的理想，只有些完成的作品、半途而廢的想法，和很多很多想睡覺的日子。
              </p>
              <p>
                這裡像蘑菇一樣，不太喜歡被注意。<br />
                平常待在自己的角落慢慢生長，偶爾長出一些作品，或者慢慢發霉、長出苔癬。
              </p>
            </div>

            <div className="mt-16">
              <h3 className="font-sans text-sm tracking-widest text-brand-red uppercase mb-6 font-bold flex items-center gap-4">
                核心能力
                <div className="h-px bg-brand-red flex-grow opacity-50" />
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 border border-brand-dark-gray rounded-full text-brand-dark-gray font-display font-medium text-sm md:text-base whitespace-nowrap cursor-default hover:bg-brand-red hover:border-brand-red hover:text-white transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
