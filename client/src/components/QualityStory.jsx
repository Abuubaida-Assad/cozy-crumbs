import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const QualityStory = () => {
  const points = [
    {
      icon: Sparkles,
      title: 'Artisanal Craftsmanship',
      description: 'Handcrafted by master pastry chefs using time-tested European baking traditions.',
    },
    {
      icon: Heart,
      title: '100% In-House Kitchens',
      description: 'Zero third-party mass production. Everything is prepared fresh in our hygienic central bakery.',
    },
    {
      icon: ShieldCheck,
      title: 'Pure Dairy & Real Butter',
      description: 'We use real churned butter, Belgian cocoa, Madagascar vanilla, and pure fresh cream.',
    },
    {
      icon: Clock,
      title: 'Baked Fresh Every Morning',
      description: 'Ovens ignite before dawn so every loaf, cake, and puff reaches you at peak aroma and taste.',
    },
  ];

  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-cream-beige/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
                alt="Cozy Crumbs Artisan Baker at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="text-[10px] tracking-widest uppercase font-bold text-accent-soft block mb-1">
                  OUR PHILOSOPHY
                </span>
                <p className="font-display text-base sm:text-lg md:text-xl font-bold">
                  “No shortcuts, no compromises. Just genuine baking joy.”
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Commitments */}
          <div className="lg:col-span-6">
            <span className="font-sans text-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 sm:mb-3 block">
              WHY COZY CRUMBS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cocoa tracking-tight mb-3 sm:mb-4">
              Dedicated to the Art of Fine Baking
            </h2>
            <p className="font-sans text-cocoa/75 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
              From our ovens in Hyderabad to your family table, we combine culinary passion with finest global ingredients to ensure each bite is memorable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div key={i} className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-accent flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-cocoa mb-0.5 sm:mb-1">
                        {pt.title}
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs text-cocoa/70 leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full sm:w-auto">
              <Link
                to="/about"
                className="w-full sm:w-auto btn-primary justify-center"
              >
                <span>READ OUR FULL STORY</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
