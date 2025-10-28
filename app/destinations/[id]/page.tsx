import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
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


export default async function DestinationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = data.destinations.find((d: Destination) => d.id === id);

  if (!destination) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="pt-28 pb-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
              <span className="text-5xl mb-4 block">⚠️</span>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              <span data-editor-id="app/destinations/[id]/page.tsx:55:13">Destination not found</span>
            </h1>
            <p className="text-gray-600 mb-6">
              <span data-editor-id="app/destinations/[id]/page.tsx:58:13">The page you are looking for doesn&apos;t exist or may have been moved.</span>
            </p>
            <Link href="/destinations" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
              <span>← Back to Destinations</span>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }


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
          <div className="lg:col-span-2">
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span data-editor-id="app/destinations/[id]/page.tsx:151:21">Best time to visit</span>
              </h3>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-emerald-500">📅</span>
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
                    <span className="text-blue-500">📍</span>
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
                <Link href="/#ai-recommendations" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-colors">
                  <span>🧠 Get AI recommendations</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
