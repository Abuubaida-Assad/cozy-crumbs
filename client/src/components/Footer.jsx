import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#24130D] text-[#FCFAF7]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span
                className="font-display text-2xl font-black tracking-tight text-[#FCFAF7] italic"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                COZY CRUMBS
              </span>
            </Link>

            <p className="font-sans text-[#E8DED1]/80 text-xs sm:text-sm leading-relaxed max-w-sm">
              At Cozy Crumbs, we believe every day deserves something freshly baked. From celebration cakes to warm breads and delicate biscuits, we create simple moments worth remembering.
            </p>
          </div>

          {/* Column 2: Useful Links (Home, Menu, Contact only) */}
          <div className="space-y-4">
            <h3 className="font-display text-xs sm:text-sm font-bold text-[#FCFAF7] uppercase tracking-widest border-b border-white/10 pb-2">
              Useful Links
            </h3>
            <ul className="space-y-2.5 font-sans text-[#E8DED1]/80 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white text-[#B09A7C] transition-colors inline-flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-4">
            <h3 className="font-display text-xs sm:text-sm font-bold text-[#FCFAF7] uppercase tracking-widest border-b border-white/10 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 font-sans text-[#E8DED1]/80 text-xs sm:text-sm">
              <li className="flex items-center gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C]">
                  <Phone className="w-4 h-4" />
                </span>
                <a href="tel:7098322796" className="hover:text-white transition-colors">
                  7098322796
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C]">
                  <Mail className="w-4 h-4" />
                </span>
                <a href="mailto:cozycrumbs6767@gmail.com" className="hover:text-white transition-colors">
                  cozycrumbs6767@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C]">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>Gachibowli TNGOS Colony</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DED1]/70">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Cozy Crumbs. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8C735A] flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8C735A] flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8C735A] flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/917098322796"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8C735A] flex items-center justify-center text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
