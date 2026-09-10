import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Cake, Cookie, Croissant, IceCream, UtensilsCrossed, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const getCategoryIcon = (nameOrIcon) => {
  const n = (nameOrIcon || '').toLowerCase();
  if (n.includes('cake')) return Cake;
  if (n.includes('biscuit') || n.includes('cookie')) return Cookie;
  if (n.includes('bread') || n.includes('croissant')) return Croissant;
  if (n.includes('pastr') || n.includes('icecream') || n.includes('dessert')) return IceCream;
  if (n.includes('snack') || n.includes('utensils')) return UtensilsCrossed;
  if (n.includes('puff') || n.includes('flame')) return Flame;
  return Cake;
};

export const CollectionSection = ({ categories = [], loading = false }) => {
  const navigate = useNavigate();

  // Fallback category definitions if DB categories are loading
  const defaultCollection = [
    { name: 'Cakes', slug: 'cakes', description: 'Celebration masterpieces' },
    { name: 'Biscuits', slug: 'biscuits', description: 'Crispy little delights' },
    { name: 'Breads', slug: 'breads', description: 'Freshly baked every day' },
    { name: 'Pastries', slug: 'pastries', description: 'Layers of deliciousness' },
    { name: 'Snacks', slug: 'snacks', description: 'Savory bakery favorites' },
    { name: 'Puffs', slug: 'puffs', description: 'Golden, flaky goodness' },
  ];

  const displayList = categories.length > 0 ? categories.slice(0, 6) : defaultCollection;

  return (
    <section className="relative z-10 pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FCFAF7]" aria-labelledby="collection-heading">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Collection Heading & Call to action */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center lg:justify-start">
            <span className="font-sans text-[#8C735A] font-bold tracking-[0.2em] uppercase text-xs mb-2 sm:mb-3 block">
              OUR COLLECTION
            </span>
            <h2 id="collection-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3A2923] mb-3 sm:mb-4 tracking-tight leading-[1.12]">
              Handcrafted <br className="hidden sm:inline" />Delights
            </h2>
            <span className="inline-block w-14 sm:w-16 h-1 bg-[#B09A7C] rounded-full mb-4 sm:mb-6" aria-hidden="true" />
            <p className="font-sans text-[#6F5746] text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
              From grand celebration cakes to morning breads and flaky golden puffs, discover our signature six collections made fresh every day.
            </p>
            <div className="w-full sm:w-auto">
              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-xs font-bold tracking-[0.18em] uppercase shadow-[0_4px_16px_rgba(58,41,35,0.2)] transition-all duration-200 group"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Grid of 6 Category Cards */}
          <div className="lg:col-span-8">
            {loading && categories.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-36 sm:h-44 bg-[#E8DED1]/50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
                {displayList.map((cat, index) => {
                  const IconComponent = getCategoryIcon(cat.name || cat.icon);
                  return (
                    <motion.article
                      key={cat._id || cat.slug || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      onClick={() => navigate(`/menu?category=${cat.slug || cat._id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(`/menu?category=${cat.slug || cat._id}`);
                        }
                      }}
                      className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C735A] border border-[#3A2923]/5 group relative overflow-hidden flex flex-col items-center justify-between text-center min-h-[145px] sm:min-h-[175px]"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#F7F4EE] flex items-center justify-center text-[#3A2923] mb-2 sm:mb-3 transition-colors duration-300 group-hover:bg-[#E8DED1] flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#3A2923]" />
                      </div>

                      <div className="w-full">
                        <h3 className="font-display text-xs sm:text-base md:text-lg font-bold text-[#3A2923] mb-0.5 sm:mb-1 transition-colors duration-300 group-hover:text-[#8C735A] truncate">
                          {cat.name}
                        </h3>

                        <p className="font-sans text-[10px] sm:text-xs text-[#6F5746] line-clamp-1 sm:line-clamp-2 leading-relaxed">
                          {cat.description || 'Handcrafted fresh daily'}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
