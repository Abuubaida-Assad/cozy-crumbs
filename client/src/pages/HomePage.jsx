import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { CollectionSection } from '../components/CollectionSection';
import { Testimonials } from '../components/Testimonials';
import { categoryService } from '../services/categoryService';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Flame } from 'lucide-react';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const catRes = await categoryService.getCategories();
        if (catRes.success) setCategories(catRes.data);
      } catch (err) {
        console.error('Failed to load homepage categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="bg-[#FCFAF7]">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. BRAND STATEMENT / VISUAL SECTION (Straight vertical alignment on mobile, 3-col on desktop) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-[#3A2923]/10 bg-[#F7F4EE]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-[280px] sm:max-w-xs md:max-w-none mx-auto">
            <div className="flex items-center gap-3.5 sm:gap-4 justify-start">
              <div className="w-11 h-11 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#3A2923] flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#8C735A]" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-sm sm:text-base text-[#3A2923] block leading-tight">
                  FRESHLY BAKED
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#6F5746]">
                  EVERY SINGLE DAY
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 justify-start">
              <div className="w-11 h-11 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#3A2923] flex-shrink-0">
                <Heart className="w-5 h-5 text-[#8C735A]" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-sm sm:text-base text-[#3A2923] block leading-tight">
                  MADE WITH CARE
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#6F5746]">
                  PURE ARTISANAL CRAFT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 justify-start">
              <div className="w-11 h-11 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#3A2923] flex-shrink-0">
                <Flame className="w-5 h-5 text-[#8C735A]" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-sm sm:text-base text-[#3A2923] block leading-tight">
                  ORIGINAL RECIPES
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#6F5746]">
                  PREMIUM QUALITY INGREDIENTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR COLLECTION */}
      <CollectionSection categories={categories} loading={loading} />

      {/* 4. CUSTOM CELEBRATIONS SECTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F4EE]">
        <div className="max-w-6xl mx-auto rounded-3xl p-6 sm:p-10 md:p-14 bg-white border border-[#3A2923]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C735A] block mb-2">
              CUSTOM CELEBRATIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#3A2923] mb-4 leading-tight">
              Make every celebration a little sweeter with a cake made just for you.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#6F5746] leading-relaxed mb-6">
              Whether it is an intimate birthday, a grand wedding, or a corporate gathering, our master bakers handcraft bespoke celebration cakes and dessert spreads tailored to your flavor and design wishes.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-xs font-bold tracking-[0.18em] uppercase shadow-sm transition-all active:scale-95"
            >
              <span>TALK TO US</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="md:w-1/2 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#E8DED1] relative group">
            <img
              src="/rahul-black-forest.jpg"
              alt="Custom Rahul Black Forest Celebration Cake"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 bg-[#3A2923]/80 backdrop-blur-sm text-[#FCFAF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Custom Order • Rahul Black Forest
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <Testimonials />
    </div>
  );
};
