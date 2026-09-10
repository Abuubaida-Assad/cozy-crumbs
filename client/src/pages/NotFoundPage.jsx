import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFBF7] text-center pt-28">
      <div className="max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-soft border border-cocoa/10">
        <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center text-cocoa mx-auto mb-4">
          <Cake className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-1">
          404 ERROR
        </span>

        <h1 className="font-display text-3xl font-extrabold text-cocoa mb-3">
          Page Not Found
        </h1>

        <p className="font-sans text-xs sm:text-sm text-cocoa/75 mb-8 leading-relaxed">
          The bakery page you are looking for might have been moved, renamed, or devoured fresh from the oven!
        </p>

        <Link
          to="/"
          className="btn-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>
      </div>
    </div>
  );
};
