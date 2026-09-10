import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export const FloatingCartButton = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#352520] hover:bg-[#251814] text-[#F8F5EF] shadow-[0_10px_30px_rgba(53,37,32,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Open your bakery order bag"
      >
        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[1.6]" />
        {totalItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#A3381B] text-white font-extrabold text-[10px] flex items-center justify-center shadow-md border-2 border-white animate-bounce">
            {totalItemsCount}
          </span>
        )}
      </button>
    </motion.div>
  );
};
