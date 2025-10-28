'use client';

import React from 'react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Mascot from '@/app/components/Mascot';
import data from '@/data/destinations.json';

interface Destination {
  id: string;
  name: string;
  region: string;
  categories: string[];
  overview: string;
  description?: string;
  nearbyAttractions: string[];
  bestTimeToVisit: string;
  activities: string[];
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Wildlife': 'bg-green-100 text-green-700 border-green-200',
    'Cultural & Historical': 'bg-amber-100 text-amber-700 border-amber-200',
    'Beach & Coastal': 'bg-blue-100 text-blue-700 border-blue-200',
    'Adventure & Sports': 'bg-red-100 text-red-700 border-red-200',
    'Nature & Scenic': 'bg-teal-100 text-teal-700 border-teal-200',
    'Religious & Spiritual': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const mascotByPrimaryCategory: Record<string, { src: string; name: string; alt: string; anim: 'idle-bob' | 'idle-float' | 'hover-wiggle' | 'entrance-pop' | 'pulse-glow' }> = {
  'Wildlife': { src: '/assets/mascots/elephant.svg', name: 'Ellie the Elephant', alt: 'Elephant mascot', anim: 'idle-float' },
  'Beach & Coastal': { src: '/assets/mascots/surfer-cat.svg', name: 'Kiki the Surfer Cat', alt: 'Surfer cat mascot', anim: 'hover-wiggle' },
  'Cultural & Historical': { src: '/assets/mascots/lotus-monk.svg', name: 'Luma the Lotus Monk', alt: 'Lotus monk mascot', anim: 'idle-float' },
  'Adventure & Sports': { src: '/assets/mascots/surfer-cat.svg', name: 'Kiki the Surfer Cat', alt: 'Surfer cat mascot', anim: 'hover-wiggle' },
  'Nature & Scenic': { src: '/assets/mascots/tea-sprite.svg', name: 'Chai the Tea Sprite', alt: 'Tea sprite mascot', anim: 'idle-bob' },
  'Religious & Spiritual': { src: '/assets/mascots/lotus-monk.svg', name: 'Luma the Lotus Monk', alt: 'Lotus monk mascot', anim: 'entrance-pop' },
};

export default async function DestinationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = useMemo<Destination | undefined>(() => {
    return data.destinations.find((d: Destination) => d.id === id);
  }, [id]);

  if (!destination) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="pt-28 pb-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Icon icon="mdi:alert-circle" className="text-5xl text-red-500 mb-4 mx-auto" />
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              <span data-editor-id="app/destinations/[id]/page.tsx:55:13">Destination not found</span>
            </h1>
            <p className="text-gray-600 mb-6">
              <span data-editor-id="app/destinations/[id]/page.tsx:58:13">The page you are looking for doesn&apos;t exist or may have been moved.</span>
            </p>
            <Link href="/destinations" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
              <Icon icon="mdi:arrow-left" />
              <span data-editor-id="app/destinations/[id]/page.tsx:61:13">Back to Destinations</span>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const primaryCat = destination.categories[0];
  const mascot = mascotByPrimaryCategory[primaryCat] || mascotByPrimaryCategory['Nature & Scenic'];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-emerald-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="flex items-start gap-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-light text-gray-900">
                  <span data-editor-id="app/destinations/[id]/page.tsx:82:15">{destination.name}</span>
                </h1>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-xl text-sm text-gray-700">
                  <Icon icon="mdi:map-marker" className="text-emerald-500" />
                  <span data-editor-id="app/destinations/[id]/page.tsx:86:15">{destination.region}</span>
                </div>
              </div>
              <div className="ml-auto hidden md:block">
                <Mascot name={mascot.name} src={mascot.src} alt={mascot.alt} size={80} animation={mascot.anim} decorative />
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6 flex flex-wrap gap-2">
              {destination.categories.map((cat) => (
                <span key={cat} className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cat)}`}>
                  <span data-editor-id={`app/destinations/[id]/page.tsx:97:17:${cat}`}>{cat}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:112:19">Overview</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <span data-editor-id="app/destinations/[id]/page.tsx:115:19">{destination.overview}</span>
              </p>

              {destination.description && (
                <p className="text-gray-600 leading-relaxed mt-4">
                  <span data-editor-id="app/destinations/[id]/page.tsx:120:21">{destination.description}</span>
                </p>
              )}
            </div>

            {/* Photo Gallery (placeholders to keep the site fast and consistent) */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span data-editor-id="app/destinations/[id]/page.tsx:129:19">Photo Gallery</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[0,1,2,3,4,5].map((i) => (
                  <div key={i} className="relative aspect-[16/10] rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span data-editor-id={`app/destinations/[id]/page.tsx:135:23:${i}`} className="text-gray-500 text-sm">Photo coming soon</span>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-90">
                      <Mascot name={mascot.name} src={mascot.src} alt={mascot.alt} size={36} animation="pulse-glow" decorative />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:151:21">Best time to visit</span>
              </h3>
              <div className="flex items-center gap-2 text-gray-700">
                <Icon icon="mdi:calendar" className="text-emerald-500" />
                <span data-editor-id="app/destinations/[id]/page.tsx:154:21">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:160:21">Nearby attractions</span>
              </h3>
              <ul className="space-y-2">
                {destination.nearbyAttractions.map((a, idx) => (
                  <li key={`${a}-${idx}`} className="flex items-center gap-2 text-gray-700 text-sm">
                    <Icon icon="mdi:map" className="text-blue-500" />
                    <span data-editor-id={`app/destinations/[id]/page.tsx:165:25:${idx}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:173:21">Popular activities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((act, idx) => (
                  <span key={`${act}-${idx}`} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    <span data-editor-id={`app/destinations/[id]/page.tsx:177:25:${idx}`}>{act}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:185:21">Plan your trip</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="leading-relaxed">
                  <span data-editor-id="app/destinations/[id]/page.tsx:188:23">Use the interactive map to explore nearby towns and plan routes easily.</span>
                </p>
                <Link href="/recommendations" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-colors">
                  <Icon icon="mdi:brain" />
                  <span data-editor-id="app/destinations/[id]/page.tsx:191:23">Get AI recommendations</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
