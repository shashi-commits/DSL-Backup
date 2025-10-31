'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import destinationsData from '../../data/destinations.json';

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Wildlife': 'bg-green-100 text-green-700 border-green-200',
    'Cultural & Historical': 'bg-amber-100 text-amber-700 border-amber-200',
    'Beach & Coastal': 'bg-blue-100 text-blue-700 border-blue-200',
    'Adventure & Sports': 'bg-red-100 text-red-700 border-red-200',
    'Nature & Scenic': 'bg-teal-100 text-teal-700 border-teal-200',
    'Religious & Spiritual': 'bg-purple-100 text-purple-700 border-purple-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
};

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...destinationsData.categories.map(cat => cat.name)];

  const filteredDestinations = useMemo(() => {
    let filtered = destinationsData.destinations;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dest => 
        dest.categories.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(query) ||
        dest.region.toLowerCase().includes(query) ||
        dest.overview.toLowerCase().includes(query) ||
        dest.activities.some(activity => activity.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
              <span data-editor-id="app/destinations/page.tsx:52:15">All</span>{' '}
              <span data-editor-id="app/destinations/page.tsx:53:15" className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Destinations
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              <span data-editor-id="app/destinations/page.tsx:57:15">
                Discover {destinationsData.destinations.length} incredible destinations across Sri Lanka, 
                from ancient cultural sites to pristine beaches and wildlife sanctuaries.
              </span>
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, regions, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Icon icon="material-symbols:search" className="absolute left-4 top-4 text-xl text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                <span data-editor-id={`app/destinations/page.tsx:88:17:${category}`}>
                  {category}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDestinations.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="text-gray-600">
                  <span data-editor-id="app/destinations/page.tsx:103:19">
                    Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    {searchQuery.trim() && ` matching "${searchQuery}"`}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Destination Image */}
                    <div className="h-64 relative overflow-hidden bg-gray-100">
                      <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/12" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-600 text-sm font-medium rounded-full">
                          <span data-editor-id={`app/destinations/page.tsx:127:27:${destination.id}`}>
                            {destination.region}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        <span data-editor-id={`app/destinations/page.tsx:136:25:${destination.id}`}>
                          {destination.name}
                        </span>
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        <span data-editor-id={`app/destinations/page.tsx:142:25:${destination.id}`}>
                          {destination.overview}
                        </span>
                      </p>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}
                          >
                            <span data-editor-id={`app/destinations/page.tsx:152:29:${destination.id}-${category}`}>
                              {category}
                            </span>
                          </span>
                        ))}
                        {destination.categories.length > 2 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <span data-editor-id={`app/destinations/page.tsx:158:29:${destination.id}`}>
                              +{destination.categories.length - 2} more
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Best Time to Visit */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Icon icon="mdi:calendar" className="text-emerald-500" />
                        <span data-editor-id={`app/destinations/page.tsx:168:25:${destination.id}`}>
                          Best time: {destination.bestTimeToVisit}
                        </span>
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={`/destinations/${destination.id}`}
                        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                      >
                        <span data-editor-id="app/destinations/page.tsx:178:25">View Details</span>
                        <Icon icon="material-symbols:arrow-right-alt" className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Icon icon="mdi:compass-off" className="text-6xl text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                <span data-editor-id="app/destinations/page.tsx:193:17">No destinations found</span>
              </h3>
              <p className="text-gray-600 mb-6">
                <span data-editor-id="app/destinations/page.tsx:196:17">
                  Try adjusting your search criteria or category filter to find destinations.
                </span>
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors duration-300"
              >
                <span data-editor-id="app/destinations/page.tsx:206:17">Clear Filters</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}