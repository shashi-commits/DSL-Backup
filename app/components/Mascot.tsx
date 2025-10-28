// app/components/Mascot.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Animation = 'idle-float' | 'entrance-pop' | 'none';

interface MascotProps {
  src: string;
  alt: string;
  name: string;
  size?: number;
  animation?: Animation;
  decorative?: boolean;
}

const animationVariants: Record<Animation, object> = {
  'idle-float': {
    y: [0, -6, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  'entrance-pop': {
    scale: [0, 1.2, 1],
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  none: {},
};

export default function Mascot({
  src,
  name,
  size = 32,
  animation = 'none',
  decorative = false,
}: Omit<MascotProps, 'alt'>) {
  return (
    <motion.div
      className="inline-block"
      variants={animationVariants[animation]}
      animate={animation !== 'none' ? animation : undefined}
      initial={animation === 'entrance-pop' ? { scale: 0 } : false}
      aria-hidden={decorative}
    >
      <Image
        src={src}
        alt={decorative ? '' : `${name} mascot`}
        width={size}
        height={size}
        className="drop-shadow-sm"
        priority
      />
    </motion.div>
  );
}
