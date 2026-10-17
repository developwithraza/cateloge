import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MouseCursor from './components/MouseCursor';
import SoneflowBackground from './components/SoneflowBackground';
import StickyHeader from './components/StickyHeader';
import HeroSlider from './components/HeroSlider';
import AllImagesModal from './components/AllImagesModal';
import { categories, catalogItems } from './data/catalogData';
import './index.css';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('silk');
  const [allImagesOpen, setAllImagesOpen] = useState(false);
  const [allImagesStartIndex, setAllImagesStartIndex] = useState(0);

  const currentCatalog = catalogItems[activeCategoryId] || catalogItems['silk'];

  return (
    <div className={isDark ? 'dark' : ''}>
      <MouseCursor />
      <SoneflowBackground isDark={isDark} />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Sticky Glass Header: Logo | Categories | Toggle ─── */}
        <StickyHeader
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(id) => setActiveCategoryId(id)}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />

        {/* ── Category / Slider transition ──────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 pt-2"
          >
            {/* ── Full-screen Clean Hero Slider ─────────────── */}
            <HeroSlider
              slides={currentCatalog.heroSlides}
              isDark={isDark}
              onOpenAllImages={(idx) => {
                setAllImagesStartIndex(idx);
                setAllImagesOpen(true);
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer className={`py-5 text-center text-[10px] font-medium tracking-widest uppercase border-t transition-colors duration-500 ${
          isDark ? 'text-slate-700 border-white/5' : 'text-slate-400 border-black/5'
        }`}>
          <span className="text-amber-500/50">✦</span>
          {'  '}Lumière Atelier — Haute Textile Catalogue © 2026{'  '}
          <span className="text-amber-500/50">✦</span>
        </footer>
      </div>

      {/* ── All Images Modal ──────────────────────────────── */}
      <AnimatePresence>
        {allImagesOpen && (
          <AllImagesModal
            slides={currentCatalog.heroSlides}
            startIndex={allImagesStartIndex}
            isDark={isDark}
            onClose={() => setAllImagesOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
