import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { success, info } = useToast();
  
  // Stored cart
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cozy_crumbs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Store
  const [selectedStore, setSelectedStore] = useState(() => {
    try {
      const saved = localStorage.getItem('cozy_crumbs_selected_store');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('cozy_crumbs_cart', JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (selectedStore) {
        localStorage.setItem('cozy_crumbs_selected_store', JSON.stringify(selectedStore));
      } else {
        localStorage.removeItem('cozy_crumbs_selected_store');
      }
    } catch (err) {
      console.error('Failed to save store:', err);
    }
  }, [selectedStore]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    success(`Added "${product.name}" to your bag!`);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
    info('Item removed from bag');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.product.price || 0) * item.quantity;
  }, 0);

  const selectStore = (store) => {
    setSelectedStore(store);
    setIsStoreModalOpen(false);
    success(`Store selected: ${store.name}`);
  };

  const openProductModal = (product) => {
    setActiveProductModal(product);
  };

  const closeProductModal = () => {
    setActiveProductModal(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        selectedStore,
        selectStore,
        isCartOpen,
        setIsCartOpen,
        isStoreModalOpen,
        setIsStoreModalOpen,
        activeProductModal,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
