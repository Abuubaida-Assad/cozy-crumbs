import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-cocoa/5 shadow-soft p-4 flex flex-col h-80 animate-pulse">
      <div className="aspect-[4/3] bg-cream-beige/70 rounded-2xl mb-4" />
      <div className="h-4 bg-cream-beige/80 rounded-md w-3/4 mb-2" />
      <div className="h-3 bg-cream-beige/60 rounded-md w-full mb-1" />
      <div className="h-3 bg-cream-beige/60 rounded-md w-2/3 mb-4" />
      <div className="mt-auto pt-3 border-t border-cocoa/5 flex items-center justify-between">
        <div className="h-5 bg-cream-beige/80 rounded w-16" />
        <div className="h-8 bg-cream-beige rounded-full w-24" />
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 rounded-full border-3 border-accent border-t-transparent animate-spin mb-3" />
      <p className="font-sans text-xs font-semibold text-cocoa-light uppercase tracking-wider">{text}</p>
    </div>
  );
};
