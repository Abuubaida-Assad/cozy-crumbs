import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Store, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItemsCount,
    selectedStore,
    setIsStoreModalOpen,
  } = useCart();
  const { success } = useToast();
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!selectedStore) {
      setIsStoreModalOpen(true);
      return;
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B36B39', '#3A2923', '#F8F5EF', '#E9DED1'],
    });

    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
      setIsCartOpen(false);
      success('Your order request has been received by Cozy Crumbs!');
    }, 2400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-cocoa-dark/60 backdrop-blur-xs"
        />

        {/* Sliding Drawer Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-full sm:max-w-md bg-[#FCFAF7] h-[100dvh] max-h-[100dvh] shadow-2xl z-10 flex flex-col justify-between border-l border-cocoa/10 overflow-hidden"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-cocoa/10 flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent-soft flex items-center justify-center text-cocoa">
                <ShoppingBag className="w-5 h-5 text-cocoa" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-cocoa">Your Bakery Bag</h2>
                <span className="text-xs text-cocoa-light font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-cream-beige text-cocoa transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store Indicator Banner */}
          <div className="px-5 py-3 bg-cream-beige/50 border-b border-cocoa/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <Store className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-cocoa/80 truncate">
                {selectedStore ? (
                  <>Store: <strong className="text-cocoa">{selectedStore.locationName}</strong></>
                ) : (
                  'No pickup outlet selected'
                )}
              </span>
            </div>
            <button
              onClick={() => setIsStoreModalOpen(true)}
              className="text-accent font-bold uppercase text-[10px] tracking-wider hover:underline ml-2 flex-shrink-0"
            >
              {selectedStore ? 'Change' : 'Choose'}
            </button>
          </div>

          {/* Order Success State */}
          {orderSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cocoa mb-2">
                Order Received!
              </h3>
              <p className="font-sans text-xs sm:text-sm text-cocoa/75 max-w-xs leading-relaxed">
                Thank you! The bakers at <strong className="text-cocoa">{selectedStore?.name || 'Cozy Crumbs'}</strong> are preparing your fresh treats.
              </p>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-pastel-sand flex items-center justify-center text-cocoa/50 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-cocoa mb-1">Your bag is empty</h3>
              <p className="font-sans text-xs text-cocoa/60 max-w-xs mb-6">
                Explore our handcrafted cakes, flaky puffs, and artisan breads to add treats.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary py-3 text-xs"
              >
                <span>EXPLORE MENU</span>
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl p-3.5 border border-cocoa/10 shadow-soft flex items-center gap-3.5"
                >
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-cream-beige flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-xs sm:text-sm font-bold text-cocoa truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-cocoa-light mb-2">
                      ₹{product.price} {product.weight ? `• ${product.weight}` : ''}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-cream-beige/70 rounded-lg px-2 py-0.5 border border-cocoa/5">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="text-cocoa font-bold text-xs px-1 hover:text-accent"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-cocoa px-2">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="text-cocoa font-bold text-xs px-1 hover:text-accent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-cocoa ml-auto">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="p-1.5 text-cocoa/40 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-cocoa/50 hover:text-red-600 underline"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}

          {/* Drawer Footer */}
          {items.length > 0 && !orderSuccess && (
            <div className="p-5 sm:p-6 bg-white border-t border-cocoa/10 space-y-4">
              <div className="space-y-1.5 text-xs text-cocoa/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-cocoa">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Bakery Fresh Guarantee</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="border-t border-cocoa/10 pt-2 flex justify-between text-base font-extrabold text-cocoa">
                  <span>Total Payable</span>
                  <span className="text-accent">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4"
              >
                <span>{selectedStore ? 'PROCEED TO ORDER' : 'PICK STORE & ORDER'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
