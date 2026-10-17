import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid follower aura
  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Radiant Glowing Follower Aura (Sunflower & Amber Light) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 36,
          height: isHovered ? 64 : 36,
          backgroundColor: isHovered
            ? 'rgba(251, 191, 36, 0.28)'
            : 'rgba(245, 158, 11, 0.18)',
          borderColor: isHovered
            ? 'rgba(251, 191, 36, 0.7)'
            : 'rgba(255, 255, 255, 0.4)',
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className="w-full h-full rounded-full border border-current backdrop-blur-xs shadow-glow-gold" />
      </motion.div>

      {/* Sharp Glass Precision Arrow Pointer */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: -2,
          translateY: -2,
        }}
      >
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: isHovered ? 1.25 : 1,
            rotate: isHovered ? -12 : 0,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 350 }}
          className="drop-shadow-[0_2px_10px_rgba(251,191,36,0.85)] filter"
        >
          {/* Outer glowing path */}
          <path
            d="M3.5 2.5L10.5 20.5L14 13.5L21 10.5L3.5 2.5Z"
            fill="url(#arrow-grad)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Inner core crystal accent */}
          <path
            d="M5 5L10 18L13 12.5L18.5 10L5 5Z"
            fill="white"
            fillOpacity="0.45"
          />
          <defs>
            <linearGradient id="arrow-grad" x1="3.5" y1="2.5" x2="21" y2="20.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    </div>
  );
}
