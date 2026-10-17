import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, Star, ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

function GalleryCard({ item, isDark, onPreview }) {
  const [liked, setLiked] = useState(false);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
        isDark
          ? 'glass-card border border-white/10'
          : 'glass-card border border-white/60 bg-white/50'
      }`}
      style={{ aspectRatio: '3/4' }}
      onClick={() => onPreview(item)}
    >
      {/* Image */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        animate={{ scale: hovering ? 1.06 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(to top, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.35) 50%, rgba(5,8,20,0) 100%)',
          opacity: hovering ? 1 : 0.7,
        }}
      />

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
        <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 shadow-glow-gold backdrop-blur-sm">
          {item.tag}
        </span>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.88 }}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((l) => !l);
          }}
          className={`p-2 rounded-full backdrop-blur-md border transition-all ${
            liked
              ? 'bg-rose-500/80 border-rose-400 text-white shadow-[0_0_16px_rgba(244,63,94,0.5)]'
              : 'bg-black/30 border-white/20 text-white hover:border-rose-400/50'
          }`}
        >
          <Heart
            className="w-3.5 h-3.5"
            fill={liked ? 'currentColor' : 'none'}
          />
        </motion.button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4">
        <p className="text-amber-300 text-[10px] font-semibold tracking-widest uppercase mb-1">
          {item.subtitle}
        </p>
        <h4 className="text-white text-sm font-bold leading-snug mb-2">
          {item.title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-semibold text-amber-300">
              {item.rating}
            </span>
            <span className="text-[10px] text-slate-400">
              • {item.likes.toLocaleString()} likes
            </span>
          </div>
          <motion.div
            animate={{ x: hovering ? 0 : 8, opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1 text-amber-400 text-[11px] font-semibold"
          >
            <Maximize2 className="w-3 h-3" />
            <span>View</span>
          </motion.div>
        </div>
      </div>

      {/* Specular glass edge highlight on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: hovering ? 1 : 0,
          boxShadow: hovering
            ? 'inset 0 1px 1px rgba(255,255,255,0.35), 0 0 0 1px rgba(251,191,36,0.35), 0 20px 40px rgba(0,0,0,0.5)'
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function RelatedGallery({ gallery, relatedTabs, isDark, onPreview }) {
  const [activeTab, setActiveTab] = useState(relatedTabs[0]?.id || 'lookbook');
  const currentItems = gallery[activeTab] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Related Gallery
          </h3>
          <p
            className={`text-xs mt-1 font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Explore curated imagery by style perspective
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
            isDark
              ? 'border-amber-400/30 text-amber-300 hover:bg-amber-500/10'
              : 'border-amber-300 text-amber-700 hover:bg-amber-50'
          }`}
        >
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div
        className={`relative rounded-2xl p-1.5 mb-6 inline-flex gap-1 ${
          isDark
            ? 'glass-panel border-white/10'
            : 'glass-panel-light border-white/60'
        }`}
      >
        {relatedTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.96 }}
            className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 z-10 ${
              activeTab === tab.id
                ? isDark
                  ? 'text-amber-200'
                  : 'text-amber-900'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeGalleryTab"
                className={`absolute inset-0 rounded-xl ${
                  isDark
                    ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/20 border border-amber-400/35'
                    : 'bg-gradient-to-r from-amber-200 to-yellow-100 border border-amber-300'
                }`}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {currentItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isDark={isDark}
              onPreview={onPreview}
            />
          ))}

          {currentItems.length === 0 && (
            <motion.div
              variants={cardVariants}
              className="col-span-full flex flex-col items-center py-16 gap-4"
            >
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-400/50" />
              </div>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Gallery loading for this perspective...
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
