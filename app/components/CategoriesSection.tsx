'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const categories = [
  {
    id: 'wildlife',
    name: 'Wildlife',
    description: 'Experience Sri Lanka\'s incredible biodiversity with leopards, elephants, and exotic birds',
    icon: 'mdi:elephant',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  {
    id: 'cultural-historical',
    name: 'Cultural & Historical',
    description: 'Explore ancient ruins, temples, and UNESCO World Heritage sites',
    icon: 'mdi:temple',
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 'beach-coastal',
    name: 'Beach & Coastal',
    description: 'Relax on pristine beaches and enjoy tropical coastal experiences',
    icon: 'mdi:beach',
    gradient: 'from-blue-400 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    id: 'adventure-sports',
    name: 'Adventure & Sports',
    description: 'Thrilling activities from hiking to water sports and rock climbing',
    icon: 'mdi:hiking',
    gradient: 'from-red-400 to-pink-500',
    bgGradient: 'from-red-50 to-pink-50',
  },
  {
    id: 'nature-scenic',
    name: 'Nature & Scenic',
    description: 'Breathtaking landscapes, tea plantations, and natural wonders',
    icon: 'mdi:mountain',
    gradient: 'from-teal-400 to-green-500',
    bgGradient: 'from-teal-50 to-green-50',
  },
  {
    id: 'religious-spiritual',
    name: 'Religious & Spiritual',
    description: 'Sacred sites, temples, and spiritual experiences',
    icon: 'mdi:lotus',
    gradient: 'from-indigo-400 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/CategoriesSection.tsx:61:13">Explore by</span>{' '}
            <span data-editor-id="app/components/CategoriesSection.tsx:62:13" className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Interest
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span data-editor-id="app/components/CategoriesSection.tsx:66:13">
              Discover Sri Lanka through six unique categories, each offering unforgettable experiences 
              tailored to your interests and travel style.
            </span>
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${category.bgGradient} border border-gray-100 cursor-pointer group overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Icon icon={category.icon} className="text-8xl text-gray-600" />
              </div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon icon={category.icon} className="text-white text-2xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span data-editor-id={`app/components/CategoriesSection.tsx:92:17:${category.id}`}>
                  {category.name}
                </span>
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                <span data-editor-id={`app/components/CategoriesSection.tsx:98:17:${category.id}`}>
                  {category.description}
                </span>
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span data-editor-id="app/components/CategoriesSection.tsx:116:13">View All Categories</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}