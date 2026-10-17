import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, MapPin, Info, Star, Heart, Download, Share2 } from 'lucide-react';

export default function ImageModal({ item, isDark, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;

  const isSlide = 'weave' in item;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop blur overlay */}
        <motion.div
          className="absolute inset-0 backdrop-blur-xl bg-black/70"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Panel */}
        <motion.div
          className={`relative w-full max-w-4xl rounded-3xl overflow-hidden ${
            isDark
              ? 'glass-panel border-white/12 shadow-[0_40px_100px_rgba(0,0,0,0.85)]'
              : 'glass-panel-light border-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.25)]'
          }`}
          initial={{ scale: 0.88, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className={`absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              isDark
                ? 'bg-black/50 border-white/20 text-white hover:border-rose-400/50 hover:text-rose-300'
                : 'bg-white/70 border-slate-200 text-slate-700 hover:border-rose-400 hover:text-rose-600'
            }`}
          >
            <X className="w-4 h-4" />
          </motion.button>

          <div className="flex flex-col sm:flex-row h-full">
            {/* Image Panel */}
            <div className="relative sm:w-3/5 h-72 sm:h-auto overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Fox light mini effect in modal */}
              <div
                className="absolute top-0 left-0 w-1/2 h-1/2 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 100% 90% at 0% 0%, rgba(255,240,175,0.45) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                }}
              />
              <div
                className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 100% 90% at 100% 0%, rgba(255,240,175,0.45) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                }}
              />
              {/* Gradient for text contrast */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

              {isSlide && item.palette && (
                <div className="absolute bottom-4 left-4 flex gap-2 items-center">
                  {item.palette.map((col, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white/40 shadow-md"
                      style={{ background: col }}
                      title={col}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="sm:w-2/5 p-6 flex flex-col gap-4 overflow-y-auto">
              {/* Tag + Rating */}
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  {item.tag || (isSlide && item.badge)}
                </span>
                {!isSlide && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-300">{item.rating}</span>
                    <span className="text-[10px] text-slate-400">({item.likes?.toLocaleString()})</span>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                {(item.subtitle) && (
                  <p className="text-amber-400 text-[11px] font-semibold tracking-widest uppercase mb-1">
                    {item.subtitle}
                  </p>
                )}
                <h3 className={`text-xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
              </div>

              {/* Description (slides only) */}
              {isSlide && item.description && (
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              )}

              {/* Fabric specs (slides) */}
              {isSlide && (
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Layers, label: 'Weave', value: item.weave },
                    { icon: MapPin, label: 'Origin', value: item.origin },
                    { icon: Info, label: 'Density', value: item.density },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                        isDark ? 'bg-white/5 border border-white/8' : 'bg-white/60 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {label}
                      </span>
                      <span className={`text-[11px] ml-auto font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2 pt-4 border-t border-white/10">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-glow-gold hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all">
                  Request Sample
                </button>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDark
                      ? 'border-white/15 text-slate-300 hover:text-amber-300 hover:border-amber-400/30 hover:bg-amber-500/10'
                      : 'border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDark
                      ? 'border-white/15 text-slate-300 hover:text-amber-300 hover:border-amber-400/30 hover:bg-amber-500/10'
                      : 'border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
