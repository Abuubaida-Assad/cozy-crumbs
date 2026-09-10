import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ProductModal = () => {
  const { activeProductModal, closeProductModal } = useCart();

  if (!activeProductModal) return null;

  const product = activeProductModal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0 bg-[#24130D]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#FCFAF7] rounded-3xl sm:rounded-[2.5rem] shadow-2xl max-w-3xl w-full max-h-[90dvh] flex flex-col md:flex-row overflow-hidden border border-[#3A2923]/10 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeProductModal}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#3A2923] flex items-center justify-center shadow-md transition-colors"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Column */}
          <div className="relative h-52 sm:h-64 md:h-auto md:w-1/2 bg-[#E8DED1] overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
              {product.isVeg ? (
                <span className="badge-veg bg-white/95 p-1 shadow-xs" title="Vegetarian">
                  <span className="badge-veg-dot" />
                </span>
              ) : (
                <span className="badge-nonveg bg-white/95 p-1 shadow-xs" title="Non-Vegetarian">
                  <span className="badge-nonveg-dot" />
                </span>
              )}
              {product.isEggless && (
                <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Eggless
                </span>
              )}
            </div>
          </div>

          {/* Content Details Column */}
          <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto md:w-1/2 flex-1">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8C735A] mb-1 block">
                {typeof product.category === 'object' ? product.category.name : 'Artisanal Bakery'}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#3A2923] mb-2 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-2xl font-black text-[#3A2923]">
                  ₹{product.price}
                </span>
                {product.weight && (
                  <span className="text-xs font-medium text-[#6F5746] bg-[#E8DED1]/60 px-2.5 py-1 rounded-lg">
                    {product.weight}
                  </span>
                )}
                <span className="text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg">
                  Available
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#6F5746] leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Nutritional Highlights */}
              {product.nutritionalInfo && (
                <div className="grid grid-cols-3 gap-2 bg-[#F7F4EE] rounded-2xl p-3 border border-[#3A2923]/10 mb-5 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Calories</span>
                    <span className="text-xs font-bold text-[#3A2923]">
                      {product.nutritionalInfo.calories || '320 kcal'}
                    </span>
                  </div>
                  <div className="border-x border-[#3A2923]/10">
                    <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Servings</span>
                    <span className="text-xs font-bold text-[#3A2923]">
                      {product.nutritionalInfo.servings || '4-6 Slices'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Shelf Life</span>
                    <span className="text-xs font-bold text-[#3A2923]">
                      {product.nutritionalInfo.shelfLife || '3 Days'}
                    </span>
                  </div>
                </div>
              )}

              {/* Ingredients List */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3A2923] block mb-2">
                    Key Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-white border border-[#3A2923]/10 px-2.5 py-1 rounded-full text-[#6F5746]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Bar: Inquire / Contact */}
            <div className="pt-4 border-t border-[#3A2923]/10 space-y-2">
              <Link
                to="/contact"
                onClick={closeProductModal}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#B09A7C]" />
                <span>INQUIRE / CUSTOM ORDER</span>
              </Link>
              <p className="text-[11px] text-center text-[#8C735A]">
                Freshly handcrafted by Cozy Crumbs master bakers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
