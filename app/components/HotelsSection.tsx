'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Hotel {
  name: string;
  rating: number;
  type: string;
  image: string;
}

interface LocationHotels {
  location: string;
  category: string;
  emoji: string;
  hotels: Hotel[];
}

export default function HotelsSection() {
  const [hotelsData, setHotelsData] = useState<LocationHotels[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/data/hotels.json')
      .then(res => res.json())
      .then(data => setHotelsData(data))
      .catch(() => setHotelsData([]));
  }, []);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(hotelsData.map(l => l.category)))];

  // Filter hotels
  const filteredLocations = hotelsData.filter(location => {
    const matchesCategory = selectedCategory === 'All' || location.category === selectedCategory;
    const matchesSearch = location.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.hotels.some(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < rating ? 'mdi:star' : 'mdi:star-outline'}
        className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

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
                placeholder="Search by location or hotel name..."
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

      {/* Hotels Grid */}
      <div className="space-y-16">
        {filteredLocations.map((location, locationIndex) => (
          <motion.div
            key={location.location}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: locationIndex * 0.1 }}
          >
            {/* Location Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-3 rounded-2xl">
                <span className="text-3xl">{location.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{location.location}</h2>
                  <p className="text-sm text-gray-600">{location.category}</p>
                </div>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-emerald-200 to-transparent rounded-full"></div>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {location.hotels.map((hotel, hotelIndex) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: hotelIndex * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                >
                  {/* Hotel Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon icon="mdi:bed-king" className="text-6xl text-gray-400 opacity-50" />
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <div className="flex items-center gap-1">
                        {renderStars(hotel.rating)}
                      </div>
                    </div>
                    {/* Type Badge */}
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {hotel.type}
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {hotel.name}
                    </h3>
                    
                    {/* Action Button */}
                    <button className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                      <span>View Details</span>
                      <Icon icon="mdi:arrow-right" className="text-lg" />
                    </button>
                  </div>
                </motion.div>
              ))}
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
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No hotels found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
}
