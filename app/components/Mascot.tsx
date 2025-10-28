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

const getAnimationProps = (animation: Animation) => {
  switch (animation) {
    case 'idle-float':
      return {
        animate: {
          y: [0, -6, 0],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };
    case 'entrance-pop':
      return {
        initial: { scale: 0 },
        animate: {
          scale: [0, 1.2, 1],
        },
        transition: {
          duration: 0.4,
          ease: 'easeOut' as const,
        },
      };
    default:
      return {};
  }
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
      {...getAnimationProps(animation)}
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
