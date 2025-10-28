'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Recommendation {
  destination: string;
  reason: string;
  categories: string[];
  highlights: string[];
  id: string;
  fullDestination?: {
    name: string;
    region: string;
    overview: string;
    bestTimeToVisit: string;
    activities: string[];
  };
}

interface APIResponse {
  recommendations: Recommendation[];
  query: string;
  message?: string;
  fallback?: boolean;
}

const exampleQueries = [
  "Beach destinations with cultural significance",
  "Adventure activities in hill country",
  "Wildlife watching and nature experiences",
  "Sacred temples and spiritual journeys",
  "Romantic getaway with scenic views",
  "Family-friendly destinations with activities"
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Wildlife': 'bg-green-100 text-green-700',
    'Cultural & Historical': 'bg-amber-100 text-amber-700',
    'Beach & Coastal': 'bg-blue-100 text-blue-700',
    'Adventure & Sports': 'bg-red-100 text-red-700',
    'Nature & Scenic': 'bg-teal-100 text-teal-700',
    'Religious & Spiritual': 'bg-purple-100 text-purple-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export default function AIRecommendations() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data: APIResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get recommendations');
      }

      setRecommendations(data.recommendations || []);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  return (
    <section id="ai-recommendations" className="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 text-sm mb-6">
            <Icon icon="mdi:brain" />
            <span data-editor-id="app/components/AIRecommendations.tsx:84:13">AI-Powered</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/AIRecommendations.tsx:88:13">Get</span>{' '}
            <span data-editor-id="app/components/AIRecommendations.tsx:89:13" className="font-medium bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Personalized Recommendations
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span data-editor-id="app/components/AIRecommendations.tsx:94:13">
              Tell us what kind of experience you&apos;re looking for, and our AI will suggest 
              the perfect Sri Lankan destinations tailored to your interests.
            </span>
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., I want beaches with cultural sites and turtle watching..."
                className="w-full px-6 py-4 pr-16 text-gray-900 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Icon icon="mdi:loading" className="text-lg animate-spin" />
                ) : (
                  <Icon icon="material-symbols:search" className="text-lg" />
                )}
              </button>
            </div>
          </form>

          {/* Example Queries */}
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-3 text-center">
              <span data-editor-id="app/components/AIRecommendations.tsx:133:15">Try these examples:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="px-4 py-2 text-sm bg-white hover:bg-indigo-50 border border-gray-200 rounded-full transition-colors duration-200 hover:border-indigo-300"
                  disabled={loading}
                >
                  <span data-editor-id={`app/components/AIRecommendations.tsx:142:19:${index}`}>
                    {example}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <Icon icon="mdi:alert-circle" className="text-red-500 text-lg" />
                <span data-editor-id="app/components/AIRecommendations.tsx:161:17" className="text-red-700">
                  {error}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  <span data-editor-id="app/components/AIRecommendations.tsx:178:19">Your Personalized Recommendations</span>
                </h3>
                <p className="text-gray-600">
                  <span data-editor-id="app/components/AIRecommendations.tsx:181:19">
                    Based on your interests, here are the perfect destinations for you:
                  </span>
                </p>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={`${rec.id}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-900">
                          <span data-editor-id={`app/components/AIRecommendations.tsx:197:27:${rec.id}`}>
                            {rec.destination}
                          </span>
                        </h4>
                        {rec.fullDestination?.region && (
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                            <span data-editor-id={`app/components/AIRecommendations.tsx:203:29:${rec.id}`}>
                              {rec.fullDestination.region}
                            </span>
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        <span data-editor-id={`app/components/AIRecommendations.tsx:210:25:${rec.id}`}>
                          {rec.reason}
                        </span>
                      </p>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rec.categories.map((category) => (
                          <span
                            key={category}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                          >
                            <span data-editor-id={`app/components/AIRecommendations.tsx:220:29:${rec.id}-${category}`}>
                              {category}
                            </span>
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          <span data-editor-id="app/components/AIRecommendations.tsx:230:27">Key Highlights:</span>
                        </div>
                        <ul className="space-y-1">
                          {rec.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Icon icon="mdi:check-circle" className="text-green-500 text-xs" />
                              <span data-editor-id={`app/components/AIRecommendations.tsx:236:31:${rec.id}-${i}`}>
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Best Time to Visit */}
                      {rec.fullDestination?.bestTimeToVisit && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon icon="mdi:calendar" className="text-indigo-500" />
                            <span data-editor-id="app/components/AIRecommendations.tsx:248:29">Best time:</span>
                            <span data-editor-id={`app/components/AIRecommendations.tsx:249:29:${rec.id}`}>
                              {rec.fullDestination.bestTimeToVisit}
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon icon="mdi:compass-off" className="text-6xl text-gray-400 mb-4 mx-auto" />
                  <h4 className="text-xl font-medium text-gray-900 mb-2">
                    <span data-editor-id="app/components/AIRecommendations.tsx:261:21">No recommendations found</span>
                  </h4>
                  <p className="text-gray-600">
                    <span data-editor-id="app/components/AIRecommendations.tsx:264:21">
                      Try refining your search with different keywords or interests.
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}