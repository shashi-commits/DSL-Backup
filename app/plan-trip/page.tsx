'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import HotelsSection from '@/app/components/HotelsSection';
import ExperiencesSection from '@/app/components/ExperiencesSection';

export default function PlanTripPage() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'experiences'>('hotels');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Plan Your{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Trip
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover exceptional accommodations and unforgettable experiences across Sri Lanka's most stunning destinations
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl"
          >
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'hotels'
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon icon="mdi:bed" className="text-2xl" />
              <span>Hotels & Stays</span>
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'experiences'
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon icon="mdi:hiking" className="text-2xl" />
              <span>Experiences</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'hotels' ? <HotelsSection /> : <ExperiencesSection />}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
