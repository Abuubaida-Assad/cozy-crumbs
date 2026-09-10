import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Clock, Check, Store as StoreIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storeService } from '../services/storeService';
import { motion, AnimatePresence } from 'framer-motion';

export const StoreModal = () => {
  const { isStoreModalOpen, setIsStoreModalOpen, selectedStore, selectStore } = useCart();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isStoreModalOpen) {
      const fetchStores = async () => {
        try {
          const res = await storeService.getStores();
          if (res.success && res.data) {
            setStores(res.data);
          }
        } catch (err) {
          console.error('Failed to load stores:', err);
          // Fallback static list if offline
          setStores([
            {
              _id: '1',
              name: 'Cozy Crumbs — Jubilee Hills',
              locationName: 'Jubilee Hills, Road No. 36',
              address: 'Plot 412, Road No. 36, Jubilee Hills, Hyderabad',
              phone: '+91 90101 11144',
              timings: '8:00 AM - 11:30 PM',
              isOpen: true,
              distance: '1.2 km away',
            },
            {
              _id: '2',
              name: 'Cozy Crumbs — Banjara Hills',
              locationName: 'Banjara Hills, Road No. 12',
              address: 'Near MLA Colony, Road No. 12, Banjara Hills, Hyderabad',
              phone: '+91 90101 11145',
              timings: '8:00 AM - 11:00 PM',
              isOpen: true,
              distance: '3.4 km away',
            },
            {
              _id: '3',
              name: 'Cozy Crumbs — Madhapur (Hitec City)',
              locationName: 'Madhapur, Near Metro Pillar C-14',
              address: 'Opp. Inorbit Mall Road, Madhapur, Hyderabad',
              phone: '+91 90101 11146',
              timings: '7:30 AM - Midnight',
              isOpen: true,
              distance: '5.1 km away',
            },
            {
              _id: '4',
              name: 'Cozy Crumbs — Gachibowli',
              locationName: 'Gachibowli, Financial District',
              address: 'Near DLF Cybercity, Gachibowli, Hyderabad',
              phone: '+91 90101 11147',
              timings: '8:00 AM - 11:00 PM',
              isOpen: true,
              distance: '7.8 km away',
            },
            {
              _id: '5',
              name: 'Cozy Crumbs — Kukatpally',
              locationName: 'Kukatpally, KPHB Phase 1',
              address: 'Main Road, KPHB Colony, Kukatpally, Hyderabad',
              phone: '+91 90101 11148',
              timings: '8:30 AM - 10:30 PM',
              isOpen: true,
              distance: '9.5 km away',
            },
          ]);
        } finally {
          setLoading(false);
        }
      };
      fetchStores();
    }
  }, [isStoreModalOpen]);

  if (!isStoreModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsStoreModalOpen(false)}
          className="fixed inset-0 bg-cocoa-dark/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#FCFAF7] rounded-3xl sm:rounded-[2.5rem] shadow-soft-lg max-w-2xl w-full max-h-[90dvh] flex flex-col overflow-hidden border border-cocoa/10 z-10 my-auto p-5 sm:p-7 md:p-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsStoreModalOpen(false)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-beige hover:bg-cream-sand text-cocoa flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close store selection"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-cocoa">
              <StoreIcon className="w-5 h-5 text-cocoa" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent block">
                COZY CRUMBS OUTLETS
              </span>
              <h2 className="font-display text-2xl font-extrabold text-cocoa">
                Select a Bakery Store
              </h2>
            </div>
          </div>
          <p className="font-sans text-xs sm:text-sm text-cocoa/70 mb-6">
            Choose your preferred outlet for fresh pickup or store-direct ordering.
          </p>

          {/* Stores List */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-cream-beige/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {stores.map((store) => {
                const isSelected = selectedStore && (selectedStore._id === store._id || selectedStore.name === store.name);
                return (
                  <div
                    key={store._id}
                    onClick={() => selectStore(store)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-accent-soft/40 border-accent shadow-sm'
                        : 'bg-white hover:bg-cream-pure border-cocoa/10 hover:border-cocoa/20 shadow-soft'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold text-cocoa">
                          {store.name}
                        </h3>
                        {store.isOpen && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-md">
                            Open Now
                          </span>
                        )}
                        {store.distance && (
                          <span className="text-[11px] font-semibold text-cocoa-light bg-cream-beige px-2 py-0.5 rounded-md">
                            {store.distance}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-1.5 text-xs text-cocoa/75">
                        <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-cocoa/65 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cocoa/50" />
                          {store.timings}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-cocoa/50" />
                          {store.phone}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 flex-shrink-0 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-cocoa text-cream hover:bg-accent'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Select Store</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
