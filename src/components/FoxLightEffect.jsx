import React from 'react';
import { motion } from 'framer-motion';

export default function FoxLightEffect({ isDark }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
      {/* TOP LEFT FOX LIGHT — Volumetric Cone Beam */}
      <motion.div
        className="absolute"
        style={{ top: 0, left: 0, width: '52%', height: '70%' }}
        animate={{
          opacity: isDark ? [0.7, 0.95, 0.75] : [0.5, 0.72, 0.55],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
      >
        {/* Outer wide ambient bloom */}
        <div className="fox-beam-left w-full h-full absolute inset-0" />
        {/* Sharp cone inner warm core */}
        <div className="spotlight-cone-left w-full h-full absolute inset-0" />
        {/* Bright tip hot-spot */}
        <div
          className="absolute top-0 left-0 w-32 h-32"
          style={{
            background: 'radial-gradient(circle, rgba(255, 248, 220, 0.85) 0%, rgba(251, 191, 36, 0.45) 40%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
        {/* Floating dust motes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/70"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${10 + Math.random() * 55}%`,
              left: `${2 + Math.random() * 45}%`,
            }}
            animate={{
              y: [0, -18, 6, -10, 0],
              x: [0, 5, -4, 8, 0],
              opacity: [0, 0.7, 0.5, 0.8, 0],
              scale: [0.8, 1.3, 0.9, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + i * 1.2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* TOP RIGHT FOX LIGHT — Mirror Volumetric Cone */}
      <motion.div
        className="absolute"
        style={{ top: 0, right: 0, width: '52%', height: '70%' }}
        animate={{
          opacity: isDark ? [0.65, 0.9, 0.7] : [0.45, 0.68, 0.5],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 1.2 }}
      >
        {/* Outer wide ambient bloom */}
        <div className="fox-beam-right w-full h-full absolute inset-0" />
        {/* Sharp cone inner warm core */}
        <div className="spotlight-cone-right w-full h-full absolute inset-0" />
        {/* Bright tip hot-spot */}
        <div
          className="absolute top-0 right-0 w-32 h-32"
          style={{
            background: 'radial-gradient(circle, rgba(255, 248, 220, 0.85) 0%, rgba(251, 191, 36, 0.45) 40%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
        {/* Floating dust motes right side */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-100/70"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${8 + Math.random() * 55}%`,
              right: `${2 + Math.random() * 45}%`,
            }}
            animate={{
              y: [0, -14, 8, -12, 0],
              x: [0, -6, 3, -8, 0],
              opacity: [0, 0.65, 0.45, 0.75, 0],
              scale: [1, 1.4, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 1.1,
              repeat: Infinity,
              delay: i * 0.7 + 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Central ground haze/overlap glow where both beams meet */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-44 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(253, 230, 138, 0.35) 0%, transparent 80%)',
          filter: 'blur(18px)',
        }}
        animate={{ opacity: [0.6, 0.9, 0.65] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.5 }}
      />
    </div>
  );
}
