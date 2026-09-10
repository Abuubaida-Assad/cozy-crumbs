import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, MoreVertical, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Allowed public navigation items only
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FCFAF7]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(58,41,35,0.06)] py-3 sm:py-3.5'
          : 'bg-[#FCFAF7]/90 md:bg-transparent py-3.5 sm:py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Artisanal COZY CRUMBS Logo */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none"
            aria-label="Cozy Crumbs Home"
          >
            <div className="flex items-center gap-2">
              <span
                className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#3A2923] italic select-none drop-shadow-xs group-hover:text-[#6F5746] transition-colors"
                style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}
              >
                COZY CRUMBS
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C735A] pl-2 border-l border-[#3A2923]/20">
                Artisanal Bakery
              </span>
            </div>
          </Link>

          {/* CENTER: Main Navigation (HOME, MENU, CONTACT only) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-xs lg:text-[13px] font-bold tracking-[0.18em] uppercase py-1 relative transition-colors duration-200 ${
                    active
                      ? 'text-[#6F5746] font-extrabold'
                      : 'text-[#3A2923] hover:text-[#6F5746]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6F5746] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Desktop Admin Button & Mobile 3-Dot Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop-only Admin Dashboard Button (Hidden on Mobile) */}
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#3A2923]/25 hover:border-[#3A2923] text-[#3A2923] hover:bg-[#3A2923] hover:text-[#FCFAF7] text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-xs active:scale-95"
              aria-label="Admin Dashboard Access"
              title="Admin Dashboard Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C735A] group-hover:text-inherit" />
              <span>ADMIN DASHBOARD</span>
            </Link>

            {/* Mobile 3-Dot Action Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#3A2923] hover:text-[#6F5746] hover:bg-[#E8DED1]/50 transition-colors w-10 h-10 flex items-center justify-center rounded-full active:scale-95 border border-[#3A2923]/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open 3-dot Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[58px] sm:top-[66px] z-40 md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[58px] sm:top-[66px] bg-[#24130D]/40 backdrop-blur-xs -z-10"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <div className="bg-[#FCFAF7] border-b border-[#3A2923]/10 px-6 py-6 shadow-2xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                      active
                        ? 'text-[#6F5746] bg-[#6F5746]/10 font-extrabold border-l-4 border-[#6F5746]'
                        : 'text-[#3A2923] hover:bg-[#E8DED1]/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#3A2923]/10">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#3A2923] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B09A7C]" />
                  <span>ADMIN DASHBOARD</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
