import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Crown,
  Feather,
  Layers,
  Sun,
  Flame,
  Wind,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Crown,
  Feather,
  Layers,
  Sun,
  Flame,
  Wind,
  HeartHandshake,
};

export default function CategoryTabs({
  categories,
  activeCategoryId,
  onSelectCategory,
  isDark,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-3 my-2">
      {/* Outer Glass Container */}
      <div
        className={`relative rounded-2xl p-2 transition-all duration-300 ${
          isDark
            ? 'glass-card border-white/10 shadow-glass-dark'
            : 'glass-panel-light border-white/60 shadow-glass'
        }`}
      >
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
            isDark
              ? 'bg-slate-900/80 hover:bg-amber-500/30 text-amber-300 border border-white/15'
              : 'bg-white/80 hover:bg-amber-100 text-amber-700 border border-slate-200'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
            isDark
              ? 'bg-slate-900/80 hover:bg-amber-500/30 text-amber-300 border border-white/15'
              : 'bg-white/80 hover:bg-amber-100 text-amber-700 border border-slate-200'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scrollable Category Row */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth px-10 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Sparkles;
            const isActive = cat.id === activeCategoryId;

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative group shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 select-none ${
                  isActive
                    ? isDark
                      ? 'text-amber-200 font-semibold'
                      : 'text-amber-900 font-semibold'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {/* Active Sliding Pill Indicator with Glass Highlights */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className={`absolute inset-0 rounded-xl ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-orange-500/25 border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md'
                        : 'bg-gradient-to-r from-amber-200/80 via-amber-100/90 to-yellow-200/80 border border-amber-300 shadow-glass-sm'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Category Icon */}
                <span
                  className={`relative z-10 p-1.5 rounded-lg transition-transform duration-300 group-hover:rotate-6 ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                        : 'bg-amber-500 text-white shadow-md'
                      : isDark
                      ? 'bg-white/10 text-amber-300'
                      : 'bg-black/5 text-amber-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>

                {/* Category Name */}
                <span className="relative z-10 whitespace-nowrap tracking-wide">
                  {cat.name}
                </span>

                {/* Count Badge */}
                <span
                  className={`relative z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        : 'bg-amber-200 text-amber-900 border-amber-300'
                      : isDark
                      ? 'bg-white/5 text-slate-400 border-white/10'
                      : 'bg-black/5 text-slate-500 border-slate-200'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
