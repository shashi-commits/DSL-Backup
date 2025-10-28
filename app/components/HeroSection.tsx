'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Mascot from '@/app/components/Mascot'; // Assuming this path is correct

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer (z-0)
        Using inline style for the background image URL.
        Ensure 'Sigiriya-Rock-Fortress.webp' is in your /public folder 
        or adjust the path (e.g., /assets/images/Sigiriya-Rock-Fortress.webp)
      */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/sigiriya.jpg)' }}
      />

      {/* Decorative Blurred Shapes Layer (z-10)
        Placed on top of the image but behind the gradient overlay
      */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-3xl opacity-70" />
      </div>

      {/* Gradient Overlay Layer (z-20)
        This dark gradient ensures text contrast and adds a stylish, cinematic feel.
      */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

      {/* Content Layer (z-30)
        All content is placed on this layer to be on top of the background and overlays.
      */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-8"
        >
          <Icon icon="mdi:sparkles" className="text-yellow-400" />
          <span data-editor-id="app/components/HeroSection.tsx:26:11">
            AI-Powered Travel Recommendations
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-light text-white mb-6 leading-tight drop-shadow-lg"
        >
          <span data-editor-id="app/components/HeroSection.tsx:36:11">
            Discover the
          </span>
          <br />
          <span
            data-editor-id="app/components/HeroSection.tsx:37:11"
            className="font-medium bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent"
          >
            Pearl of the Indian Ocean
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          <span data-editor-id="app/components/HeroSection.tsx:49:11">
            Explore Sri Lanka&apos;s breathtaking destinations with personalized
            AI recommendations. From pristine beaches to ancient temples,
            discover your perfect adventure.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/destinations"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span data-editor-id="app/components/HeroSection.tsx:63:13">
              Explore Destinations
            </span>
          </Link>

          <a
            href="#ai-recommendations"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <Icon icon="mdi:brain" className="text-lg" />
            <span data-editor-id="app/components/HeroSection.tsx:67:13">
              Get AI Recommendations
            </span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:79:15">
                12+
              </span>
            </div>
            <div className="text-white/70 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:82:15">
                Destinations
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:87:15">
                6
              </span>
            </div>
            <div className="text-white/70 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:90:15">
                Categories
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">
              <span data-editor-id="app/components/HeroSection.tsx:95:15">
                AI
              </span>
            </div>
            <div className="text-white/70 text-sm">
              <span data-editor-id="app/components/HeroSection.tsx:98:15">
                Powered
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator (z-30) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/70"
        >
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="text-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Decorative Mascots (z-30) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <Mascot
          name="Tiko the Turtle"
          src="/assets/mascots/turtle.svg"
          alt="Cute turtle swimming"
          animation="idle-bob"
          size={90}
          decorative
          className="hidden sm:block absolute bottom-16 left-6"
        />
        <Mascot
          name="Navi the Lighthouse Bird"
          src="/assets/mascots/lighthouse-bird.svg"
          alt="Tiny bird fluttering"
          animation="idle-float"
          size={80}
          decorative
          className="hidden md:block absolute top-20 right-10"
        />
      </div>
    </section>
  );
}