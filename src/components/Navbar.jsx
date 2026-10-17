import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles, Compass, Search, Bookmark } from 'lucide-react';

export default function Navbar({ isDark, onToggleTheme, onOpenSearch }) {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 py-3.5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-2xl px-5 py-3 transition-all duration-300 flex items-center justify-between ${
            isDark
              ? 'glass-panel text-white shadow-glass-dark border-white/10'
              : 'glass-panel-light text-slate-900 shadow-glass border-white/60'
          }`}
        >
          {/* Top-Left: Logo & Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-glow-gold overflow-hidden cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
              <div className="absolute inset-0 bg-white/30 opacity-0 hover:opacity-100 transition-opacity" />
            </motion.div>

            <div className="cursor-pointer">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  LUMIÈRE
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  ATELIER
                </span>
              </div>
              <p className={`text-[11px] tracking-wide font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Haute Textile & Silk Catalogue
              </p>
            </div>
          </div>

          {/* Center Navigation Highlights (Hidden on small screens) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
              isDark ? 'text-slate-200 hover:text-amber-300 hover:bg-white/5' : 'text-slate-700 hover:text-amber-600 hover:bg-black/5'
            }`}>
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Couture Index</span>
            </button>
            <div className="w-1 h-1 rounded-full bg-amber-400/50" />
            <span className={`text-xs px-2.5 py-1 rounded-full border ${
              isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}>
              Edition 2026 • Winter/Spring
            </span>
          </div>

          {/* Top-Right: Actions & Light / Dark Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSearch}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
              title="Search catalogue"
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Light / Dark Mode Toggle Switch */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                isDark
                  ? 'bg-slate-900/70 border-amber-400/30 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-white/90 border-amber-300 text-amber-600 shadow-glass-sm'
              }`}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    rotate: isDark ? 0 : 180,
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    rotate: isDark ? -180 : 0,
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
                </motion.div>
              </div>

              <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
                {isDark ? 'Dark Noir' : 'Lumière Gold'}
              </span>
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
