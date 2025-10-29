'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface LocationExperience {
  location: string;
  category: string;
  emoji: string;
  activities: string[];
}

export default function ExperiencesSection() {
  const [experiencesData, setExperiencesData] = useState<LocationExperience[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/data/experiences.json')
      .then(res => res.json())
      .then(data => setExperiencesData(data))
      .catch(() => setExperiencesData([]));
  }, []);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(experiencesData.map(l => l.category)))];

  // Filter experiences
  const filteredLocations = experiencesData.filter(location => {
    const matchesCategory = selectedCategory === 'All' || location.category === selectedCategory;
    const matchesSearch = location.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.activities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by location or activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Icon icon="mdi:filter-variant" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredLocations.map((location, index) => (
          <motion.div
            key={location.location}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-[32rem]"
          >
            {/* Header */}
            <div className="relative h-40 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-500 p-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <span className="text-5xl mb-2 block transform transition-transform group-hover:scale-110 duration-300">{location.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white leading-tight">{location.location}</h3>
                    <p className="text-sm text-white/90 mt-1">{location.category}</p>
                  </div>
                </div>
              </div>
              {/* Decorative pattern */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 transform rotate-12 transition-transform group-hover:rotate-45 duration-700">
                <Icon icon="mdi:compass" className="text-white text-[140px]" />
              </div>
            </div>

            {/* Activities List */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <Icon icon="mdi:format-list-checks" className="text-emerald-600 text-xl" />
                <h4 className="font-semibold text-gray-900">Activities & Experiences</h4>
              </div>
              <ul className="space-y-3 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                {location.activities.map((activity, actIndex) => (
                  <motion.li
                    key={actIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: actIndex * 0.05 }}
                    className="flex items-start gap-3 group/item hover:bg-emerald-50/50 p-2 rounded-lg transition-all duration-300 cursor-pointer transform hover:translate-x-1"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {actIndex + 1}
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed flex-1 group-hover/item:text-gray-900">
                      {activity}
                    </span>
                    <Icon 
                      icon="mdi:arrow-right-circle" 
                      className="text-emerald-500 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:translate-x-1" 
                    />
                  </motion.li>
                ))}
              </ul>

              {/* Action Button */}
              <button className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center gap-2">
                <Icon icon="mdi:map-marker-plus" className="text-xl" />
                <span>Add to Itinerary</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredLocations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Icon icon="mdi:emoticon-sad-outline" className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No experiences found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
}
