// app/components/MapComponent.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
// --- TYPE & DATA UPDATES ---

// Changed from MapPosition to Leaflet's type
type MapPosition = LatLngExpression; 

type LocationData = {
  id: number;
  name: string;
  categories: string[];
  famousAttractions: string[];
  position?: MapPosition; // optional; prefer from JSON
};

type WithCoords = LocationData & { coordinates: MapPosition };

const categoryColors: Record<string, string> = {
  'Wildlife': '#10b981',
  'Cultural & Historical': '#f59e0b',
  'Beach & Coastal': '#06b6d4',
  'Adventure & Sports': '#ef4444',
  'Nature & Scenic': '#22c55e',
  'Religious & Spiritual': '#eab308',
  'Uncategorized': '#6b7280',
};

const getCategoryColor = (category: string) => categoryColors[category] || categoryColors['Uncategorized'];

// NEW: Real Latitude/Longitude coordinates for all 30 locations
const coordinateMap: Record<number, MapPosition> = {
  1: [7.1160, 79.8850],  // Katunayake
  2: [6.9271, 79.8612],  // Colombo
  3: [7.2131, 79.8388],  // Negombo
  4: [6.4220, 79.9961],  // Bentota
  5: [6.1367, 80.1000],  // Hikkaduwa
  6: [6.0535, 80.2210],  // Galle
  7: [5.9696, 80.4376],  // Weligama
  8: [5.9493, 80.5471],  // Matara
  9: [6.0249, 80.7936],  // Tangalle
  10: [7.2906, 80.6337], // Kandy
  11: [7.2950, 80.4023], // Pinnawala
  12: [7.4880, 80.6220], // Dambulla
  13: [7.9571, 80.7600], // Sigiriya Rock
  14: [8.0469, 80.9767], // Wasgamuwa
  15: [8.0322, 80.8143], // Minneriya
  16: [7.9333, 81.0000], // Polonnaruwa
  17: [8.3352, 80.4109], // Anuradhapura
  18: [6.7983, 80.8030], // Horton Plains
  19: [6.9680, 80.7811], // Nuwara Eliya
  20: [6.8667, 81.0466], // Ella
  21: [6.3683, 81.4287], // Yala
  22: [6.4206, 80.8860], // Udawalawe
  23: [6.8091, 80.4994], // Adams Peak
  24: [8.5874, 81.2152], // Trincomalee
  25: [8.6942, 81.1853], // Nilaveli
  26: [6.8413, 81.8281], // Arugam Bay
  27: [9.6615, 80.0255], // Jaffna
  28: [9.6053, 79.7228], // Delft Island
  29: [8.4287, 80.0150], // Wilpattu
  30: [7.7550, 81.6050], // Batticaloa
};



// This is your original component, just renamed
export default function MapComponent() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [filter, setFilter] = useState<Record<string, boolean>>({});
  // hoveredId is no longer needed, Leaflet <Tooltip> handles hover
  const [selected, setSelected] = useState<WithCoords | null>(null);

  // All your existing hooks for loading data,
  // merging coordinates, and initializing filters
  // work perfectly with the new Lat/Lng data.
  
  // Load JSON once
  useEffect(() => {
    let active = true;
    fetch('/data/sri_lanka_locations.json')
      .then((r) => r.json())
      .then((data: unknown) => {
        if (!active) return;
        const arr = Array.isArray(data) ? (data as LocationData[]) : [];
        setLocations(arr);
      })
      .catch((err) => {
        console.error("Failed to load map data:", err); // Added for debugging
        if (!active) return;
        setLocations([
          { id: 2, name: 'Colombo', categories: ['Cultural & Historical', 'Beach & Coastal'], famousAttractions: ['Galle Face Green'], position: coordinateMap[2] },
          { id: 6, name: 'Galle', categories: ['Cultural & Historical', 'Beach & Coastal'], famousAttractions: ['Galle Fort'], position: coordinateMap[6] },
        ]);
      });
    return () => { active = false; };
  }, []);

  // Merge coordinates and apply category filter
  const withCoords: WithCoords[] = useMemo(() => {
    const merged = locations
      .map((l) => ({ ...l, coordinates: l.position ?? coordinateMap[l.id] }))
      .filter((l): l is WithCoords => Boolean(l.coordinates));

    return merged.filter((m) => filter[m.categories?.[0] || 'Uncategorized'] !== false);
  }, [locations, filter]);

  // Initialize filters when locations first load
  useEffect(() => {
    if (locations.length === 0 || Object.keys(filter).length > 0) return;
    const merged = locations
      .map((l) => ({ ...l, coordinates: l.position ?? coordinateMap[l.id] }))
      .filter((l): l is WithCoords => Boolean(l.coordinates));
    const next: Record<string, boolean> = {};
    merged.forEach((m) => {
      const cat = m.categories?.[0] || 'Uncategorized';
      if (!(cat in next)) next[cat] = true;
    });
    setFilter(next);
  }, [locations, filter]);

  // Modal a11y: focus trap + esc to close
  // This hook is unchanged and works perfectly
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    const el = modalRef.current;
    const focusables = () => (el ? Array.from(el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) : []);
    const firstFocus = focusables()[0];
    firstFocus?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'Tab') {
        const nodes = focusables();
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);


  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/InteractiveMap.tsx:header:prefix">Interactive</span>{' '}
            <span data-editor-id="app/components/InteractiveMap.tsx:header:title" className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Sri Lanka Map
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span data-editor-id="app/components/InteractiveMap.tsx:header:subtitle">
              Hover to see details, click a marker for full info. Markers are color-coded by primary category.
            </span>
          </p>
        </motion.div>

        {/* --- NEW MAP IMPLEMENTATION --- */}
        <div className="relative">
          <div className="relative mx-auto max-w-5xl h-[400px] md:h-[600px] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10">
            <MapContainer 
              // @ts-expect-error - react-leaflet type mismatch with Next.js 15
              center={[7.8731, 80.7718]}
              zoom={8}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Markers */}
              {withCoords.map((d) => {
                // =============================================
                // ## THIS IS THE FIX ##
                //
                // We check if it's a valid array, not an object
                if (!Array.isArray(d.coordinates) || d.coordinates.length !== 2) {
                  console.warn(`Skipping location ${d.name} due to invalid coordinates.`);
                  return null;
                }
                // =============================================
                
                const attractions = (d.famousAttractions || []).slice(0, 3);
                
                return (
                  <Marker
                    key={d.id}
                    position={d.coordinates}
                    eventHandlers={{
                      click: () => setSelected(d),
                    }}
                  >
                    {/* This replaces the old absolute-positioned hover div */}
                    <Tooltip>
                      <div className="p-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{d.name}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-gray-600">
                          <span>Categories: {d.categories?.join(', ') || 'TBD'}</span>
                        </div>
                        {attractions.length > 0 && (
                          <div className="mt-1 text-[11px] text-gray-600">
                            <span>Highlights: {attractions.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Legend / Filters (unchanged) */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 z-40">
              <div className="text-sm font-medium text-gray-900 mb-3">
                <span data-editor-id="app/components/InteractiveMap.tsx:legend:title">Categories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.keys(categoryColors)
                  .filter((k) => k !== 'Uncategorized')
                  .map((name) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={filter[name] !== false}
                        onChange={(e) => setFilter((prev) => ({ ...prev, [name]: e.target.checked }))}
                        className="accent-emerald-600"
                        aria-label={`Toggle ${name}`}
                      />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[name] }} />
                      <span className="text-gray-600">{name}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>

          {/* Modal (unchanged) */}
          {/* This logic works perfectly as-is */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  ref={modalRef}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${selected.name} details`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-medium text-gray-900">
                      <span data-editor-id={`app/components/InteractiveMap.tsx:modal:title:${selected.id}`}>{selected.name}</span>
                    </h3>
                    <button
                      onClick={() => setSelected(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close"
                    >
                      <Icon icon="mdi:close" className="text-xl text-gray-500" />
                    </button>
                  </div>
                  
                  {/* All modal content (categories, attractions, nearby) */}
                  {/* is unchanged and will work perfectly. */}

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Categories</div>
                    <div className="flex flex-wrap gap-2">
                      {(selected.categories && selected.categories.length > 0 ? selected.categories : ['TBD']).map((c) => (
                        <span key={c} className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: getCategoryColor(c) }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Famous Attractions</div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                      {(selected.famousAttractions && selected.famousAttractions.length > 0 ? selected.famousAttractions : ['TBD']).map((a, idx) => (
                        <li key={`${selected.id}-a-${idx}`}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  {(() => {
                    const primary = selected.categories?.[0];
                    if (!primary) return null;
                    const nearby = withCoords.filter((w) => w.id !== selected.id && w.categories?.includes(primary)).slice(0, 4);
                    if (nearby.length === 0) return null;
                    return (
                      <div className="mb-2">
                        <div className="text-sm font-medium text-gray-500 mb-2">Nearby Attractions</div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {nearby.map((n) => (
                            <button
                              key={n.id}
                              onClick={() => setSelected(n)}
                              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`Open ${n.name}`}
                            >
                              {n.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300"
                      onClick={() => setSelected(null)}
                    >
                      Close
                    </button>
                  </div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}