// app/components/Mascot.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

/**
 * 1. Define the animations from your JSON as Framer Motion variants.
 */
const animationLibrary: Variants = {
  // Looping idle animations
  "idle-bob": {
    // 'animate' is the name of the state we are defining
    animate: {
      y: ["0px", "-8px", "0px"], // Bob up and down by 8px
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  "idle-float": {
    animate: {
      y: ["0px", "-10px", "0px"], // Float up and down by 10px
      transition: {
        duration: 4,
        repeat: Infinity, // Loop forever
        ease: "easeInOut",
      },
    },
  },

  // One-shot entrance animations
  "entrance-pop": {
    // 'initial' is the starting state
    initial: {
      scale: 0.5,
      opacity: 0,
    },
    // 'animate' is the end state
    animate: {
      // --- THIS IS THE FIX ---
      // We only define the *final* state. The spring will
      // animate from 'initial' and 'overshoot' automatically.
      scale: 1,
      opacity: 1,
      // ----------------------
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  },

  // Hover animations
  "hover-wiggle": {
    // 'hover' is the state we apply on mouse hover
    hover: {
      rotate: [0, 8, -8, 8, 0], // Wiggle rotation
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  },
};

// 2. Define the component's props
type MascotProps = {
  src: string;
  alt: string;
  size: number;
  // This prop will accept the animation names from your JSON
  animation: string;
  className?: string;
  decorative?: boolean;
};

/**
 * 3. The Mascot Component
 */
export default function Mascot({
  src,
  alt,
  size,
  animation,
  className,
  decorative = false,
}: MascotProps) {
  
  // Find the correct animation rules from our library
  const selectedVariant = animationLibrary[animation as keyof typeof animationLibrary];

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      
      // Pass the selected animation rules to Framer Motion
      variants={selectedVariant}
      
      // Tell Framer Motion which state to use for which action
      initial="initial"   // Use the "initial" state (if it exists)
      animate="animate"   // Use the "animate" state (if it exists)
      whileHover="hover"  // Use the "hover" state (if it exists)
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        aria-hidden={decorative} // Hides from screen readers if purely decorative
        priority // Good to add for hero images (LCP)
      />
    </motion.div>
  );
}