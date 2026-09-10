import React from 'react';
import { useCart } from '../context/CartContext';
import { Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { openProductModal } = useCart();

  return (
    <div
      onClick={() => openProductModal(product)}
      className="bg-white rounded-3xl overflow-hidden border border-[#3A2923]/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-full cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openProductModal(product);
        }
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8DED1]">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dietary Badges on Image */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {product.isVeg ? (
            <span className="badge-veg bg-white/95 backdrop-blur-sm shadow-xs" title="Vegetarian">
              <span className="badge-veg-dot" />
            </span>
          ) : (
            <span className="badge-nonveg bg-white/95 backdrop-blur-sm shadow-xs" title="Non-Vegetarian">
              <span className="badge-nonveg-dot" />
            </span>
          )}

          {product.isEggless && (
            <span className="bg-amber-100/95 text-amber-900 border border-amber-300 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Eggless
            </span>
          )}
        </div>

        {/* Category Pill Tag */}
        {product.category && (
          <div className="absolute top-3 right-3 bg-[#3A2923]/80 text-[#FCFAF7] backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {typeof product.category === 'object' ? product.category.name : 'Bakery'}
          </div>
        )}

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-[#3A2923]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white text-[#3A2923] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#8C735A]" />
            View Details
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Header: Name & Weight */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-base font-bold text-[#3A2923] group-hover:text-[#8C735A] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
            {product.weight && (
              <span className="text-[11px] font-medium text-[#6F5746] bg-[#F7F4EE] px-2 py-0.5 rounded-md whitespace-nowrap">
                {product.weight}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-sans text-xs text-[#6F5746] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Bottom Area: Price Display (No order button) */}
        <div className="pt-3 border-t border-[#3A2923]/10 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[9px] uppercase font-semibold text-[#8C735A] block leading-none mb-0.5">Price</span>
            <span className="font-sans text-lg font-black text-[#3A2923]">
              ₹{product.price}
            </span>
          </div>

          <span className="text-xs font-semibold text-[#8C735A] group-hover:underline flex items-center gap-1">
            Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
