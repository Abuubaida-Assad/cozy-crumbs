import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  const reviews = [
    {
      author: 'Customer Review',
      category: 'Celebration Cakes',
      quote: 'The chocolate cake was soft, fresh and perfectly balanced. The richness of the ganache made our celebration truly special.',
      rating: 5,
    },
    {
      author: 'Customer Review',
      category: 'Artisanal Breads',
      quote: 'The sourdough bread was incredibly fresh and soft with an authentic golden crust. Best morning loaf we have ever tasted.',
      rating: 5,
    },
    {
      author: 'Customer Review',
      category: 'Handmade Biscuits',
      quote: 'The Osmania butter biscuits were crisp and delicious. The melt-in-the-mouth texture with evening tea is simply unmatched.',
      rating: 5,
    },
  ];

  return (
    <section className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FCFAF7]" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-sans text-[#8C735A] font-bold tracking-[0.2em] uppercase text-xs mb-2 sm:mb-3 block">
            TESTIMONIALS
          </span>
          <h2 id="testimonials-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3A2923] tracking-tight">
            Loved By Our Patrons
          </h2>
          <span className="inline-block w-14 sm:w-16 h-1 bg-[#B09A7C] rounded-full mt-3 sm:mt-4" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-3xl p-6 sm:p-8 bg-white border border-[#3A2923]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-9 h-9 text-[#3A2923]/10 pointer-events-none" />

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C735A] block mb-2">
                  {rev.category}
                </span>

                <div className="flex gap-1 mb-4" aria-label={`${rev.rating} out of 5 stars`}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8C735A] text-[#8C735A]" />
                  ))}
                </div>

                <blockquote className="font-sans text-[#3A2923]/85 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <footer className="pt-4 border-t border-[#3A2923]/10">
                <p className="font-display text-xs font-bold uppercase tracking-wider text-[#6F5746]">
                  — {rev.author}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
