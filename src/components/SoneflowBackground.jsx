import React from 'react';
import { motion } from 'framer-motion';

export default function SoneflowBackground({ isDark }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Base background */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-[#060910] via-[#0b0f19] to-[#080b14]'
            : 'bg-gradient-to-br from-[#f0ece5] via-[#faf7f2] to-[#ede8e0]'
        }`}
      />

      {/* DARK Theme Soneflow Orbs */}
      {isDark && (
        <>
          {/* Main Sunflower/Amber golden glow — top left quadrant */}
          <motion.div
            className="absolute rounded-full soneflow-orb-1 animate-soneflow-slow"
            style={{
              width: 700,
              height: 700,
              top: '-15%',
              left: '-10%',
              willChange: 'transform',
            }}
          />

          {/* Amber + Rose mid drift — top right */}
          <motion.div
            className="absolute rounded-full soneflow-orb-2 animate-soneflow-reverse"
            style={{
              width: 600,
              height: 600,
              top: '-8%',
              right: '-8%',
              willChange: 'transform',
            }}
          />

          {/* Violet + Sky bottom left accent */}
          <motion.div
            className="absolute rounded-full soneflow-orb-3 animate-soneflow-slow"
            style={{
              width: 500,
              height: 500,
              bottom: '5%',
              left: '15%',
              willChange: 'transform',
              animationDelay: '-8s',
            }}
          />

          {/* Secondary warm amber — bottom right */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 420,
              height: 420,
              bottom: '10%',
              right: '5%',
              background:
                'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.1) 50%, transparent 80%)',
              willChange: 'transform',
            }}
            animate={{
              x: [0, 40, -20, 30, 0],
              y: [0, -30, 50, -20, 0],
              scale: [1, 1.12, 0.95, 1.06, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center subtle amber pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 800,
              height: 800,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 65%)',
            }}
            animate={{ scale: [1, 1.1, 0.95, 1.08, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* LIGHT Theme Soneflow Orbs */}
      {!isDark && (
        <>
          {/* Warm sunflower glow top left */}
          <motion.div
            className="absolute rounded-full soneflow-orb-light-1 animate-soneflow-slow"
            style={{
              width: 650,
              height: 650,
              top: '-12%',
              left: '-8%',
            }}
          />

          {/* Rose + Peach drift right */}
          <motion.div
            className="absolute rounded-full soneflow-orb-light-2 animate-soneflow-reverse"
            style={{
              width: 550,
              height: 550,
              top: '-5%',
              right: '-6%',
            }}
          />

          {/* Soft violet bottom accent */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 450,
              height: 450,
              bottom: '8%',
              left: '20%',
              background:
                'radial-gradient(circle, rgba(167,139,250,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 80%)',
            }}
            animate={{
              x: [0, -30, 20, -15, 0],
              y: [0, 25, -35, 15, 0],
              scale: [1, 1.08, 0.94, 1.05, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
          />
        </>
      )}

      {/* Grain/noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
