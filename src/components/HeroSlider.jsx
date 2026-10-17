import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, LayoutGrid } from 'lucide-react';
import FoxLightEffect from './FoxLightEffect';

export default function HeroSlider({ slides, isDark, onOpenAllImages }) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 5500;

  const goTo = useCallback((index, dir) => {
    setDirection(dir !== undefined ? dir : 1);
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, -1), [current, slides.length, goTo]);

  useEffect(() => {
    if (isPlaying) {
      let start = null;
      progressRef.current = requestAnimationFrame(function tick(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        setProgress(Math.min((elapsed / DURATION) * 100, 100));
        if (elapsed < DURATION) progressRef.current = requestAnimationFrame(tick);
      });
      intervalRef.current = setTimeout(next, DURATION);
    }
    return () => {
      clearTimeout(intervalRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [isPlaying, current, next]);

  // Reset on category change
  useEffect(() => {
    setCurrent(0);
    setProgress(0);
  }, [slides]);

  const slide = slides[current];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.96 }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
      <div
        className={`relative rounded-3xl overflow-hidden ${
          isDark
            ? 'border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]'
            : 'border border-white/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]'
        }`}
        style={{ height: 'calc(100vh - 120px)', minHeight: 420, maxHeight: 780 }}
      >
        {/* ── Full-screen Background Image Slider ── */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Very subtle vignette only at edges — keeps image clear */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ★ FOX LIGHT BEAMS (top-left & top-right) ★ */}
        <FoxLightEffect isDark={isDark} />

        {/* ── TOP-RIGHT: All Images button ── */}
        <div className="absolute top-4 right-4 z-30">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => onOpenAllImages && onOpenAllImages(current)}
            className="glass-panel flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold text-white hover:text-amber-300 hover:border-amber-400/50 hover:shadow-glow-fox transition-all group"
          >
            <LayoutGrid className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">All Images</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 tabular-nums">
              {slides.length}
            </span>
          </motion.button>
        </div>

        {/* ── BOTTOM CONTROLS ── */}
        <div className="absolute bottom-0 inset-x-0 z-30 flex items-end justify-between px-5 pb-5">

          {/* Dot navigation (center bottom) */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-7 h-2.5 bg-amber-400 shadow-glow-gold'
                    : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Right controls: play, prev, next */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying((p) => !p)}
              className="glass-panel w-9 h-9 rounded-full flex items-center justify-center text-amber-300 border-white/15 hover:border-amber-400/50 hover:shadow-glow-gold transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="glass-panel w-9 h-9 rounded-full flex items-center justify-center text-white border-white/15 hover:text-amber-300 hover:border-amber-400/40 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="glass-panel w-9 h-9 rounded-full flex items-center justify-center text-white border-white/15 hover:text-amber-300 hover:border-amber-400/40 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-glow-gold"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
