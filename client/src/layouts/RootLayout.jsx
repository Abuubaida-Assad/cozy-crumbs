import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductModal } from '../components/ProductModal';

export const RootLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] text-[#3A2923]">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Global Product Details Modal (No Cart/Store modals) */}
      <ProductModal />
    </div>
  );
};
