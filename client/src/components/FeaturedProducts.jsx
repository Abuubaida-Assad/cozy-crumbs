import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

export const FeaturedProducts = ({ products = [], loading = false }) => {
  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-cream-pure/60" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-sans text-accent font-bold tracking-[0.2em] uppercase text-xs">
                OUR FAVORITES
              </span>
            </div>
            <h2 id="featured-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-cocoa tracking-tight">
              Freshly Baked, <br className="hidden sm:inline" />
              <span className="text-cocoa-light">Made With Love.</span>
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-cocoa hover:text-accent transition-colors group"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 sm:h-96 bg-cream-beige/50 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl p-8 border border-cocoa/5 shadow-soft">
            <p className="text-cocoa/70 text-sm">No featured products currently on display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
