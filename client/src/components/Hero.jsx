import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 96;

export const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedFramesRef = useRef(new Set());
  const lastDrawnIndexRef = useRef(-1);
  const rafScheduledRef = useRef(false);
  const scrollDistanceRef = useRef(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 1. Initialize image sequence array
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    // Measure and resize canvas with capped devicePixelRatio for high-DPI displays
    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      if (lastDrawnIndexRef.current >= 0) {
        drawFrameByIndex(lastDrawnIndexRef.current, true);
      }
    };

    const measureScrollDistance = () => {
      if (containerRef.current) {
        scrollDistanceRef.current = Math.max(
          containerRef.current.offsetHeight - window.innerHeight,
          1
        );
      }
    };

    // 2. Draw frame to canvas with object-cover and object-[left_center]
    const drawFrameByIndex = (index, force = false) => {
      if (!canvas || !ctx) return;
      if (!force && index === lastDrawnIndexRef.current) return;

      let img = imagesRef.current[index];
      // If requested frame is not yet ready, fallback to closest loaded frame
      if (!img || !img.complete || !loadedFramesRef.current.has(index)) {
        if (lastDrawnIndexRef.current >= 0 && imagesRef.current[lastDrawnIndexRef.current]?.complete) {
          img = imagesRef.current[lastDrawnIndexRef.current];
        } else {
          let nearest = -1;
          let minDiff = Infinity;
          for (const loadedIdx of loadedFramesRef.current) {
            const diff = Math.abs(loadedIdx - index);
            if (diff < minDiff) {
              minDiff = diff;
              nearest = loadedIdx;
            }
          }
          if (nearest >= 0) {
            img = imagesRef.current[nearest];
          }
        }
      }

      if (!img || !img.complete) return;

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;
      const scale = Math.max(w / imgW, h / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;

      const renderX = 0; // Left aligned
      const renderY = (h - renderH) / 2; // Center aligned vertically

      ctx.drawImage(img, renderX, renderY, renderW, renderH);
      lastDrawnIndexRef.current = index;
    };

    // 3. Scroll handler: calculate target frame and draw on requestAnimationFrame
    const updateFrameOnScroll = () => {
      const scrollDist = scrollDistanceRef.current;
      const progress = Math.min(Math.max(window.scrollY / scrollDist, 0), 1);
      const targetIndex = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      drawFrameByIndex(targetIndex);
    };

    const handleScroll = () => {
      if (!rafScheduledRef.current) {
        rafScheduledRef.current = true;
        requestAnimationFrame(() => {
          rafScheduledRef.current = false;
          updateFrameOnScroll();
        });
      }
    };

    // 4. Intelligent progressive frame preloader with HTMLImageElement.decode()
    const loadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const num = String(index + 1).padStart(4, '0');
        img.src = `/cake-sequence/frame-${num}.webp`;

        const onReady = () => {
          loadedFramesRef.current.add(index);
          const currentScrollDist = scrollDistanceRef.current;
          const currentProgress = Math.min(Math.max(window.scrollY / currentScrollDist, 0), 1);
          const currentTarget = Math.min(Math.floor(currentProgress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
          if (currentTarget === index || lastDrawnIndexRef.current === -1) {
            drawFrameByIndex(currentTarget, true);
          }
          resolve();
        };

        if ('decode' in img) {
          img.decode().then(onReady).catch(() => {
            img.onload = onReady;
            img.onerror = () => resolve();
          });
        } else {
          img.onload = onReady;
          img.onerror = () => resolve();
        }

        images[index] = img;
      });
    };

    // Preload Priority:
    // 1. Frame 0 immediately
    // 2. Next 24 frames immediately
    // 3. Remaining frames progressively in batches
    (async () => {
      await loadFrame(0);
      updateCanvasDimensions();
      updateFrameOnScroll();

      const initialBatch = [];
      for (let i = 1; i < Math.min(25, TOTAL_FRAMES); i++) {
        initialBatch.push(loadFrame(i));
      }
      await Promise.all(initialBatch);

      for (let i = 25; i < TOTAL_FRAMES; i += 15) {
        const batch = [];
        for (let j = i; j < Math.min(i + 15, TOTAL_FRAMES); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }
    })();

    measureScrollDistance();
    updateCanvasDimensions();
    updateFrameOnScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      measureScrollDistance();
      updateCanvasDimensions();
      updateFrameOnScroll();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FCFAF7] md:bg-[#E8DED1] lg:h-[180vh]"
    >
      <section
        className="relative w-full overflow-hidden bg-[#FCFAF7] md:bg-[#E8DED1] md:min-h-[100dvh] lg:sticky lg:top-0 lg:h-screen lg:min-h-0 flex flex-col justify-between"
        aria-label="Cozy Crumbs Hero"
      >
        {/* =========================================================================
            1. DESKTOP/TABLET BACKGROUND VISUAL LAYER (Hidden on Mobile)
           ========================================================================= */}
        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {/* Static Cake Image: Tablet (768px-1023px) and Desktop reduced-motion fallback */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-[left_center]"
            style={{
              backgroundImage: "url('/hero-bg.jpg')",
            }}
          />

          {/* Cinematic Cake Animation: Laptop/Desktop Only (>= 1024px), Zero-Lag WebP Canvas */}
          <div className="hidden lg:block motion-reduce:hidden absolute inset-0 pointer-events-none">
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              aria-label="Cozy Crumbs Artisanal Cake Animation"
            />
          </div>

          {/* Gradient Overlay - exact preservation of existing styling */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8DED1]/40 to-[#E8DED1]/95 lg:to-[#E8DED1]/85 pointer-events-none"
            aria-hidden="true"
          />
        </div>

      {/* =========================================================================
          2. MOBILE HERO VIEW
         ========================================================================= */}
      <div className="md:hidden relative z-10 w-full px-5 pt-28 pb-10 flex flex-col items-center text-center">
        {/* Headline: Baking Joy, Creating Sweet Memories. */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-[2.75rem] font-black tracking-tight leading-[1.08] mb-4"
        >
          <span className="text-[#3A2923] block">Baking Joy,</span>
          <span className="text-[#8C735A] block">Creating</span>
          <span className="text-[#8C735A] block">Sweet Memories.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs sm:text-[13px] text-[#6F5746] leading-relaxed max-w-[280px] mb-6"
        >
          Handcrafted cakes, warm artisanal breads &amp; flaky golden pastries, baked fresh every morning.
        </motion.p>

        {/* Dark Pill CTA: EXPLORE MENU -> */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3A2923] active:bg-[#24130D] text-[#FCFAF7] text-xs font-bold tracking-[0.18em] uppercase shadow-[0_6px_20px_rgba(58,41,35,0.25)] active:scale-95 transition-transform duration-150"
          >
            <span>EXPLORE MENU</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Mobile Signature Cake Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full max-w-sm relative rounded-[28px] overflow-hidden shadow-soft-xl border border-black/5 bg-[#E8DED1] aspect-[4/3.4]"
        >
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
            alt="Signature Cake"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

          {/* Top Right: Frosted Pill Tag */}
          <div className="absolute top-3.5 right-3.5 bg-white/30 backdrop-blur-md border border-white/30 text-white font-sans font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-xs">
            SIGNATURE CAKES
          </div>

          {/* Bottom Left: Freshly baked daily indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Freshly baked daily</span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          3. DESKTOP HERO VIEW
         ========================================================================= */}
      <div className="hidden md:flex relative z-10 max-w-7xl w-full mx-auto px-8 lg:px-12 pt-36 md:pt-44 lg:pt-48 pb-20 flex-1 flex-col justify-center items-end">
        <div className="w-full max-w-lg lg:max-w-xl text-left ml-auto">
          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-sans text-5xl md:text-6xl lg:text-[5.25rem] font-black tracking-tight leading-[1.04] mb-8"
          >
            <span className="text-[#3A2923] block">Baking Joy,</span>
            <span className="text-[#8C735A] block">Creating</span>
            <span className="text-[#8C735A] block">Sweet Memories.</span>
          </motion.h1>

          {/* CTA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-[13px] font-bold tracking-[0.2em] uppercase shadow-[0_8px_24px_rgba(58,41,35,0.25)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>EXPLORE MENU</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
  );
};
