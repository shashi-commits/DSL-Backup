'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function HeroSection() {
  /* --------------------------------------------------------------
   *  Helper: availability status text (reworked to match screenshot)
   * -------------------------------------------------------------- */
  const AvailabilityStatusText = ({
    type,
    count,
  }: {
    type: 'sold' | 'left' | 'available';
    count?: number; // Optional for 'left' type
  }) => {
    switch (type) {
      case 'sold':
        // --- UPDATED: Smaller font size ---
        return <span className="text-red-400 font-medium text-xs sm:text-sm">Sold Out</span>;
      case 'left':
        // --- UPDATED: Smaller font size ---
        return <span className="text-amber-400 font-medium text-xs sm:text-sm">{count} Left</span>;
      case 'available':
        // --- UPDATED: Smaller font size for text, icon size adjusted ---
        return (
          <div className="flex items-center gap-1"> {/* Reduced gap */}
            <Icon icon="mdi:circle" className="text-green-500 text-xs" />
            <span className="text-green-400 font-medium text-xs sm:text-sm">Available</span>
          </div>
        );
      default:
        return null;
    }
  };

  /* --------------------------------------------------------------
   *  Monthly data – matches the screenshot exactly, with 'Delux'
   * -------------------------------------------------------------- */
  const months = [
    {
      name: 'October 2025',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: false,
      premium: { slots: 4, status: 'sold' },
      delux: { slots: 4, status: 'sold' }, // Changed to Delux
      note: 'All tours fully booked!',
    },
    {
      name: 'November 2026',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: false,
      premium: { slots: 4, status: 'left', left: 1 },
      delux: { slots: 4, status: 'sold' }, // Changed to Delux
      note: null,
    },
    {
      name: 'December 2026',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: false,
      premium: { slots: 4, status: 'left', left: 2 },
      delux: { slots: 4, status: 'left', left: 3 }, // Changed to Delux
      note: null,
    },
    {
      name: 'January 2026',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: true, // Card-level "Coming Soon"
      premium: { slots: 4, status: 'available' }, // Still shows 'Available' inside the card
      delux: { slots: 4, status: 'available' }, // Changed to Delux
      note: null,
    },
    {
      name: 'February 2026',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: true,
      premium: { slots: 4, status: 'available' },
      delux: { slots: 4, status: 'available' }, // Changed to Delux
      note: null,
    },
    {
      name: 'March 2026',
      monthIcon: 'mdi:calendar-month-outline',
      comingSoon: true,
      premium: { slots: 4, status: 'available' },
      delux: { slots: 4, status: 'available' }, // Changed to Delux
      note: null,
    },
  ];

  return (
    // The main section now has min-h-screen to ensure it takes at least full height
    // and bg-cover bg-center for the background image
    <section 
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-20 pb-16" // Added padding-top and padding-bottom
      style={{ backgroundImage: 'url(/sigiriya.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* ───── Gradient overlay ───── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

      {/* ───── Decorative Blurred Shapes Layer (z-20) ───── */}
      {/* Moved this layer above the main content but below the primary overlay to avoid hiding content */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-3xl opacity-70" />
      </div>

      {/* ───── Main Hero Content ───── */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex-grow flex flex-col justify-center items-center pt-8"> {/* Added flex-grow */}
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm mb-6 sm:mb-8"
        >
          <Icon icon="mdi:sparkles" className="text-yellow-400" />
          AI-Powered Travel Recommendations
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg"
        >
          Discover the
          <br />
          <span className="font-medium bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
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
          Explore Sri Lanka&apos;s breathtaking destinations with personalized AI
          recommendations. From pristine beaches to ancient temples, discover your
          perfect adventure.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
        >
          <Link
            href="/destinations"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
          >
            Explore Destinations
          </Link>

          <a
            href="#ai-recommendations"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <Icon icon="mdi:brain" className="text-lg" />
            Get AI Recommendations
          </a>
        </motion.div>

        {/* Stats --- BEAUTIFIED --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto" // --- UPDATED gap and max-w
        >
          {/* Stat Box 1 */}
          <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-light text-white mb-2">12+</div>
            <div className="text-white/70 text-sm">Destinations</div>
          </div>
          {/* Stat Box 2 */}
          <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-light text-white mb-2">6</div>
            <div className="text-white/70 text-sm">Categories</div>
          </div>
          {/* Stat Box 3 */}
          <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-light text-white mb-2">AI</div>
            <div className="text-white/70 text-sm">Powered</div>
          </div>
        </motion.div>
      </div>

      {/* ──────── NEW: Monthly Tour Packages (below the main hero content, still relative to the section) ──────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="relative z-30 mt-20 max-w-[1440px] mx-auto px-4" // Use relative z-30 to keep it above overlays
      >
        {/* Section title --- BEAUTIFIED --- */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white">
             Package{' '}
            {/* --- UPDATED: Added Gradient --- */}
            <span className="font-medium bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
              Availability
            </span>
          </h2>
          <p className="text-sm text-white/70 mt-1">
            4 exclusive trips per category • Book early for premium experiences
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Increased gap to 10 */}
          {months.map((m, idx) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + idx * 0.08 }}
              // --- UPDATED: Increased px-12 for wider cards to space header elements ---
              className={`relative ${m.comingSoon ? 'bg-white/2 backdrop-blur-none' : 'bg-white/10 backdrop-blur-lg'} rounded-2xl py-8 px-12 border border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:border-white/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1`}
            >
              {/* Month header */}
              <div className="flex items-center justify-between mb-6"> {/* Increased mb-4 to mb-6 */}
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Icon icon={m.monthIcon} className="text-emerald-400" />
                  {m.name}
                </h3>
                {m.comingSoon && (
                  <span className={`px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs transform ${'translate-x-9 -translate-y-5'}`}>
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Premium */}
              <div className="flex items-center justify-between mb-4"> {/* Increased mb-3 to mb-4 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:star" className="text-white text-xs" />
                  </div>
                  <div>
                    <span className="text-white/90 text-sm">Premium</span>
                    <p className="text-xs opacity-70 text-white/70">4 slots/month</p>
                  </div>
                </div>

                {/* --- FIXED: Using AvailabilityStatusText --- */}
                {m.premium.status === 'sold' && (
                  <AvailabilityStatusText type="sold" />
                )}
                {m.premium.status === 'left' && (
                  <AvailabilityStatusText type="left" count={m.premium.left} />
                )}
                {m.premium.status === 'available' && (
                  <AvailabilityStatusText type="available" />
                )}
              </div>

              {/* Separator for better organization */}
              <hr className="my-4 border-white/20" />

              {/* Delux (formerly Platinum) */}
              <div className="flex items-center justify-between mb-4"> {/* Added mb-4 for consistency */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:diamond" className="text-white text-xs" />
                  </div>
                  <div>
                    <span className="text-white/90 text-sm">Delux</span> {/* Changed to Delux */}
                    <p className="text-xs opacity-70 text-white/70">4 slots/month</p>
                  </div>
                </div>

                {/* --- FIXED: Using AvailabilityStatusText --- */}
                {m.delux.status === 'sold' && (
                  <AvailabilityStatusText type="sold" />
                )}
                {m.delux.status === 'left' && (
                  <AvailabilityStatusText type="left" count={m.delux.left} />
                )}
                {m.delux.status === 'available' && (
                  <AvailabilityStatusText type="available" />
                )}
              </div>

              {/* Optional note (Oct only) */}
              {m.note && (
                <p className="mt-6 text-sm text-white/50 italic text-center"> {/* Increased mt-3 to mt-6 */}
                  {m.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Tours button --- BEAUTIFIED --- */}
        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            View All Tours
            <Icon icon="mdi:arrow-right" className="text-lg" />
          </Link>
        </div>
      </motion.div>


      {/* ───── Scroll indicator (at the very bottom of the entire section) ───── */}
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
          <Icon icon="material-symbols:keyboard-arrow-down" className="text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}