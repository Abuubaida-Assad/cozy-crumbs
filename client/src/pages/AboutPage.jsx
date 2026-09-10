import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Sparkles, CheckCircle2, ShieldCheck, Users, Flame, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage = () => {
  const milestones = [
    { year: '2016', title: 'The First Spark', desc: 'Started in a boutique kitchen with small-batch sourdough loaves and authentic tea cakes.' },
    { year: '2019', title: 'Artisanal Expansion', desc: 'Opened our central bakery kitchen in Hyderabad with European stone hearth deck ovens.' },
    { year: '2023', title: 'Celebration Mastery', desc: 'Delivered over 250,000 custom celebration cakes, signature puffs, and wedding spreads.' },
    { year: '2026', title: 'A Beloved Tradition', desc: 'Expanding to 5 vibrant outlets across Hyderabad while preserving zero-compromise artisanal baking.' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Pure Honest Ingredients',
      desc: 'We never compromise on pure churned dairy butter, Belgian dark chocolate, unbleached flour, and farm-fresh dairy.',
    },
    {
      icon: Flame,
      title: 'Dawn Baking Guarantee',
      desc: 'Our deck ovens light up at 4:00 AM every single morning to ensure unmatched oven-fresh warmth and crispness.',
    },
    {
      icon: ShieldCheck,
      title: '100% In-House Production',
      desc: 'No outsourcing or pre-mixed powders. Every dough, ganache, glaze, and filling is handcrafted in our hygiene-certified kitchens.',
    },
    {
      icon: Users,
      title: 'Celebration Centric',
      desc: 'Whether a humble evening tea snack or a lavish multi-tier wedding cake, every crumb is crafted with joy.',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-sans text-accent font-bold tracking-[0.25em] uppercase text-xs mb-2 sm:mb-3 block">
            OUR STORY • ARTISANAL BAKERY
          </span>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cocoa tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
            Baking With Soul, <br />
            <span className="text-accent">Crafting Sweet Memories.</span>
          </h1>
          <blockquote className="font-display text-base sm:text-xl italic text-cocoa/80 max-w-xl mx-auto border-l-2 border-accent pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0">
            &ldquo;From a small kitchen to a place where every celebration gets a little sweeter.&rdquo;
          </blockquote>
        </div>

        {/* Story Section 1: Editorial Image & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan Pastry and Sourdough preparation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-accent">THE ARTISANAL JOURNEY</span>
            <h2 className="font-display text-3xl font-bold text-cocoa">
              A Decade of Dedication to Real Baking
            </h2>
            <p className="font-sans text-sm sm:text-base text-cocoa/80 leading-relaxed">
              Cozy Crumbs began with a simple belief: that baked goods should nourish both heart and memory. In a world full of artificial additives and commercial pre-mixes, we chose the slower, honorable path of artisanal craftsmanship.
            </p>
            <p className="font-sans text-sm sm:text-base text-cocoa/80 leading-relaxed">
              Every day, our master bakers hand-knead natural sourdoughs, slow-churn rich chocolate ganaches, and whip fresh cream frostings from scratch. The result is pure, authentic flavor that creates unforgettable moments at the table.
            </p>
          </div>
        </div>

        {/* Story Section 2: Core Bakery Values */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">OUR PILLARS</span>
            <h2 className="font-display text-3xl font-bold text-cocoa">What Makes Cozy Crumbs Special</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-cocoa/10 shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1 text-center sm:text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-pastel-sand/70 flex items-center justify-center text-accent mb-4 mx-auto sm:mx-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-base font-bold text-cocoa mb-2">{v.title}</h3>
                    <p className="font-sans text-xs text-cocoa/75 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Section 3: Timeline */}
        <div className="bg-cream-beige/40 rounded-3xl p-6 sm:p-10 md:p-12 mb-16 sm:mb-20 border border-cocoa/5">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">GROWTH & HERITAGE</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cocoa">Our Milestone Journey</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-accent mb-1.5 sm:mb-2 font-display">{m.year}</span>
                <div className="w-3 h-3 rounded-full bg-accent mb-2.5 sm:mb-3 ring-4 ring-white" />
                <h4 className="font-display text-base font-bold text-cocoa mb-1">{m.title}</h4>
                <p className="font-sans text-xs text-cocoa/70 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-6 sm:py-10">
          <Link to="/menu" className="w-full sm:w-auto btn-primary py-4 px-8 sm:px-10 text-xs sm:text-sm justify-center">
            <span>EXPLORE OUR BAKERY CATALOG</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
