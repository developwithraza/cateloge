import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Sparkles as SparklesIcon,
  Crown,
  Feather,
  Layers,
  Sun as SunIcon,
  Flame,
  Wind,
  HeartHandshake,
} from 'lucide-react';

const iconMap = {
  Sparkles: SparklesIcon,
  Crown,
  Feather,
  Layers,
  Sun: SunIcon,
  Flame,
  Wind,
  HeartHandshake,
};

export default function StickyHeader({ categories, activeCategoryId, onSelectCategory, isDark, onToggleTheme }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 px-3 py-2.5">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto rounded-2xl flex items-center gap-3 px-4 py-2.5"
        style={{
          background: isDark
            ? 'rgba(6, 9, 20, 0.72)'
            : 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(255,255,255,0.75)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.1)'
            : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.95)',
        }}
      >
        {/* ── LEFT: Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.div
            whileHover={{ rotate: 18, scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 shadow-glow-gold cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
          </motion.div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-extrabold tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent leading-none">
              LUMIÈRE
            </p>
            <p className={`text-[8px] tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              ATELIER
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={`w-px h-6 shrink-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {/* ── CENTER: Scroll left arrow ───────────────────────────────── */}
        <button
          onClick={() => scroll('left')}
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isDark ? 'text-slate-400 hover:text-amber-300' : 'text-slate-400 hover:text-amber-600'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* ── CENTER: Category Tabs ───────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.iconName] || SparklesIcon;
            const isActive = cat.id === activeCategoryId;

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? isDark ? 'text-amber-200' : 'text-amber-900'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="stickyActivePill"
                    className={`absolute inset-0 rounded-xl ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-500/22 to-orange-500/18 border border-amber-400/35'
                        : 'bg-gradient-to-r from-amber-200/90 to-yellow-100/90 border border-amber-300'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <span className={`relative z-10 transition-all ${
                  isActive
                    ? isDark ? 'text-amber-400' : 'text-amber-600'
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  <Icon className="w-3 h-3" />
                </span>

                {/* Label */}
                <span className="relative z-10">{cat.name}</span>

                {/* Count badge */}
                <span className={`relative z-10 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? isDark ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-300/60 text-amber-900'
                    : isDark ? 'bg-white/5 text-slate-500' : 'bg-black/5 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── CENTER: Scroll right arrow ──────────────────────────────── */}
        <button
          onClick={() => scroll('right')}
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isDark ? 'text-slate-400 hover:text-amber-300' : 'text-slate-400 hover:text-amber-600'
          }`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Divider */}
        <div className={`w-px h-6 shrink-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {/* ── RIGHT: Theme Toggle — Icon only ────────────────────────── */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
            isDark
              ? 'bg-slate-900/60 border-amber-400/30 text-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.22)] hover:shadow-glow-gold hover:border-amber-400/60'
              : 'bg-white/70 border-amber-300 text-amber-600 shadow-glass-sm hover:bg-amber-50'
          }`}
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
              transition={{ duration: 0.28 }}
              className="absolute"
            >
              <Moon className="w-4 h-4 fill-amber-400/20" />
            </motion.div>
            <motion.div
              animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
              transition={{ duration: 0.28 }}
              className="absolute"
            >
              <Sun className="w-4 h-4 fill-amber-400" />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    </header>
  );
}
