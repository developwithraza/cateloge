import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  MapPin,
  Info,
  Tag,
  CheckCircle2,
  Palette,
} from 'lucide-react';

export default function AllImagesModal({ slides, startIndex = 0, isDark, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 4500;

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const slide = slides[current];

  const imgVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.03 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-2xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Panel */}
      <motion.div
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: isDark
            ? 'rgba(6, 9, 20, 0.88)'
            : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.75)',
          boxShadow: isDark
            ? '0 50px 120px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.12)'
            : '0 30px 100px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.9)',
          maxHeight: '90vh',
        }}
        initial={{ scale: 0.88, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── TOP BAR ───────────────────────────────────────────────────────── */}
        <div className={`flex items-center justify-between px-5 py-3.5 border-b ${isDark ? 'border-white/8' : 'border-black/8'}`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-glow-gold" />
            <span className={`text-sm font-bold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Image Details
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              isDark ? 'bg-amber-400/10 border-amber-400/25 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-700'
            }`}>
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slideshow toggle */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setIsPlaying((p) => !p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                  : isDark
                  ? 'bg-white/5 border-white/12 text-slate-300 hover:text-amber-300'
                  : 'bg-black/5 border-slate-200 text-slate-500 hover:text-amber-600'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Slideshow'}</span>
            </motion.button>

            {/* Close */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/12 text-slate-300 hover:text-rose-300 hover:border-rose-400/40'
                  : 'bg-black/5 border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-300'
              }`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* ── MAIN CONTENT: IMAGE THUMBNAIL SLIDER + INFO PANEL ────────────── */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">

          {/* LEFT — Compact image slider (thumbnail view + arrows) */}
          <div className="relative lg:w-2/5 overflow-hidden bg-black/30 min-h-[200px] sm:min-h-[260px]">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={slide.id}
                custom={direction}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(6,9,20,0.7) 0%, rgba(6,9,20,0.15) 60%, transparent 100%)',
                  }}
                />
                {/* Fox light mini beams */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse 100% 90% at 0% 0%, rgba(255,240,175,0.55) 0%, rgba(251,191,36,0.2) 40%, transparent 75%)',
                  filter: 'blur(16px)',
                }} />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse 100% 90% at 100% 0%, rgba(255,240,175,0.55) 0%, rgba(251,191,36,0.2) 40%, transparent 75%)',
                  filter: 'blur(16px)',
                }} />

                {/* Badge overlay */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 shadow-glow-gold backdrop-blur-sm">
                    {slide.badge}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow controls */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center glass-panel border border-white/20 text-white hover:text-amber-300 hover:border-amber-400/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center glass-panel border border-white/20 text-white hover:text-amber-300 hover:border-amber-400/50 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Progress bar */}
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10 z-30">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-none"
                style={{ width: `${isPlaying ? progress : 0}%` }}
              />
            </div>
          </div>

          {/* RIGHT — Image Information Panel (primary focus) */}
          <div className={`lg:w-3/5 flex flex-col overflow-y-auto border-t lg:border-t-0 lg:border-l ${isDark ? 'border-white/8' : 'border-black/8'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + '-info'}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.38 }}
                className="p-5 sm:p-7 flex flex-col gap-5 h-full"
              >
                {/* Title block */}
                <div>
                  <p className="text-amber-400 text-[10px] font-bold tracking-[0.22em] uppercase mb-2">
                    {slide.subtitle}
                  </p>
                  <h3 className={`text-xl sm:text-2xl font-black leading-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {slide.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {slide.description}
                  </p>
                </div>

                {/* Info tags row */}
                <div className="flex flex-wrap gap-2">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border ${
                    isDark ? 'bg-amber-500/10 border-amber-400/25 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    <Tag className="w-3 h-3" /> {slide.tag}
                  </span>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border ${
                    isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/70 border-slate-200 text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {slide.badge}
                  </span>
                </div>

                {/* Fabric specifications */}
                <div>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Fabric Specifications
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { icon: Layers, label: 'Weave Construction', value: slide.weave },
                      { icon: MapPin, label: 'Origin & Guild', value: slide.origin },
                      { icon: Info, label: 'Thread Density', value: slide.density },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                          isDark
                            ? 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-amber-400/20'
                            : 'bg-white/60 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-400/15' : 'bg-amber-100'}`}>
                          <Icon className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</p>
                          <p className={`text-[12px] font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                {slide.palette && (
                  <div>
                    <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Palette className="w-3 h-3 text-amber-400" /> Color Palette
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {slide.palette.map((col, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <div
                            className="w-9 h-9 rounded-xl border-2 border-white/25 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                            style={{ background: col }}
                            title={col}
                          />
                          <span className={`text-[9px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            {col.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── THUMBNAIL STRIP + DOT NAV ─────────────────────────────────────── */}
        <div className={`border-t flex flex-col gap-2.5 p-3 ${isDark ? 'border-white/8' : 'border-black/8'}`}>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
            {slides.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className={`relative shrink-0 w-14 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                  i === current
                    ? 'border-amber-400 shadow-glow-gold'
                    : isDark
                    ? 'border-white/10 opacity-55 hover:opacity-90 hover:border-white/30'
                    : 'border-slate-200 opacity-55 hover:opacity-90'
                }`}
              >
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                {i === current && <div className="absolute inset-0 bg-amber-400/15 rounded-xl" />}
              </motion.button>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-amber-400 shadow-glow-gold'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
