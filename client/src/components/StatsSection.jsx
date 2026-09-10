import React from 'react';
import { Award, Store, Factory, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatsSection = () => {
  const stats = [
    {
      icon: Award,
      value: '10+',
      label: 'Years of Excellence',
    },
    {
      icon: Store,
      value: '15+',
      label: 'Signature Products',
    },
    {
      icon: Factory,
      value: '100%',
      label: 'Freshly Prepared',
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Customers',
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 md:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white/80 backdrop-blur-md rounded-3xl md:rounded-full p-5 sm:p-6 md:p-8 shadow-soft-lg border border-cocoa/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-pastel-sand/70 flex items-center justify-center text-cocoa mb-2.5 transition-all duration-300 group-hover:bg-accent-soft group-hover:text-cocoa group-hover:scale-105 shadow-sm">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cocoa" />
                </div>
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-cocoa tracking-tight mb-0.5 tabular-nums transition-colors duration-300 group-hover:text-accent">
                  {stat.value}
                </h3>
                <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold text-cocoa/70 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
