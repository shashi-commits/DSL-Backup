'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { divIcon, LatLngTuple } from 'leaflet';
import Mascot from './Mascot'; // same folder

/* --------------------------------------------------------------- */
/* 1. Types & Static Data                                          */
/* --------------------------------------------------------------- */
type MapPosition = [number, number];

interface LocationData {
  id: number;
  name: string;
  categories: string[];
  subcategory?: string;
  famousAttractions: string[];
  coordinates?: MapPosition;
}
interface WithCoords extends LocationData {
  coordinates: MapPosition;
}

/* ---- colours --------------------------------------------------- */
const categoryColors: Record<string, string> = {
  'Adventure & Nature': '#10b981',
  'Culture & Heritage': '#f59e0b',
  'Beaches & Water Sports': '#06b6d4',
  'Wildlife & Safari': '#a16207',
  'Romance & Relaxation': '#ec4899',
  'City Life & Nightlife': '#8b5cf6',
  'Wellness & Retreats': '#14b8a6',
  'Local Life & Food': '#f97316',
  'Eco & Sustainable Travel': '#65a30d',
  'Hidden Gems & Offbeat Trails': '#64748b',
  'Scenic Journeys & Road Trips': '#6366f1',
  'Photography & Scenic Spots': '#0ea5e9',
  'Spiritual & Mindful Experiences': '#f59e0b',
  'Shopping & Handicrafts': '#ef4444',
  'Festivals & Events': '#d946ef',
  'Cruises & Island Hopping': '#22d3ee',
  'Tea Country & Highlands': '#059669',
  'Shopping (Modern & Lifestyle)': '#7c3aed',
  Uncategorized: '#6b7280',
};
const getCategoryColor = (c: string) =>
  categoryColors[c] ?? categoryColors['Uncategorized'];

/* ---- mascot SVGs ----------------------------------------------- */
const mascotByCategory: Record<
  string,
  { src: string; name: string; alt: string }
> = {
  'Adventure & Nature': {
    src: '/assets/mascots/surfer-cat.svg',
    name: 'Ridge the Hiker',
    alt: 'Hiker mascot',
  },
  'Beaches & Water Sports': {
    src: '/assets/mascots/turtle.svg',
    name: 'Tiko the Turtle',
    alt: 'Turtle mascot',
  },
  'Culture & Heritage': {
    src: '/assets/mascots/lotus-monk.svg',
    name: 'Luma the Lotus Monk',
    alt: 'Monk mascot',
  },
  'Wildlife & Safari': {
    src: '/assets/mascots/elephant.svg',
    name: 'Ellie the Elephant',
    alt: 'Elephant mascot',
  },
  'Romance & Relaxation': {
    src: '/assets/mascots/tea-sprite.svg',
    name: 'Rose the Romantic',
    alt: 'Romance mascot',
  },
  'City Life & Nightlife': {
    src: '/assets/mascots/lighthouse-bird.svg',
    name: 'Neon the Night Owl',
    alt: 'Nightlife mascot',
  },
  'Wellness & Retreats': {
    src: '/assets/mascots/lotus-monk.svg',
    name: 'Seren the Sage',
    alt: 'Wellness mascot',
  },
  'Local Life & Food': {
    src: '/assets/mascots/tea-sprite.svg',
    name: 'Spice the Chef',
    alt: 'Food mascot',
  },
  'Eco & Sustainable Travel': {
    src: '/assets/mascots/leaf-fairy.svg',
    name: 'Eco the Guardian',
    alt: 'Eco mascot',
  },
  'Hidden Gems & Offbeat Trails': {
    src: '/assets/mascots/compass-gnome.svg',
    name: 'Rover the Scout',
    alt: 'Scout mascot',
  },
  'Scenic Journeys & Road Trips': {
    src: '/assets/mascots/train-sprite.svg',
    name: 'Rail the Rider',
    alt: 'Train mascot',
  },
  'Photography & Scenic Spots': {
    src: '/assets/mascots/camera-bird.svg',
    name: 'Snap the Heron',
    alt: 'Camera mascot',
  },
  'Spiritual & Mindful Experiences': {
    src: '/assets/mascots/lotus-monk.svg',
    name: 'Luma the Lotus Monk',
    alt: 'Monk mascot',
  },
  'Shopping & Handicrafts': {
    src: '/assets/mascots/gem-fox.svg',
    name: 'Gem the Curator',
    alt: 'Gem mascot',
  },
  'Festivals & Events': {
    src: '/assets/mascots/firework-cat.svg',
    name: 'Fira the Firework',
    alt: 'Festival mascot',
  },
  'Cruises & Island Hopping': {
    src: '/assets/mascots/boat-fish.svg',
    name: 'Marin the Sailor',
    alt: 'Boat mascot',
  },
  'Tea Country & Highlands': {
    src: '/assets/mascots/tea-sprite.svg',
    name: 'Chai the Tea Sprite',
    alt: 'Tea sprite mascot',
  },
  'Shopping (Modern & Lifestyle)': {
    src: '/assets/mascots/bag-bird.svg',
    name: 'Moda the Shopper',
    alt: 'Shopping mascot',
  },
  Uncategorized: {
    src: '/assets/mascots/lighthouse-bird.svg',
    name: 'Navi the Lighthouse Bird',
    alt: 'Bird mascot',
  },
};

/* --------------------------------------------------------------- */
/* 2. Map Controllers (Fix react-leaflet v4+)                      */
/* --------------------------------------------------------------- */

// Fit the map to show the whole country with improved zoom
const MapController: React.FC<{ center: LatLngTuple; coords: LatLngTuple[] }> = ({ center, coords }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    try {
      if (coords.length > 0) {
        // Fit bounds to show the whole country with better padding for clarity
        map.fitBounds(coords, { padding: [50, 50], maxZoom: 8 });
      } else {
        // Fallback to center/zoom with better default zoom level
        map.setView(center, 7.5);
      }
    } catch (e) {
      // If fitBounds fails for any reason, fallback
      try {
        map.setView(center, 7.5);
      } catch {}
    }

    // Ensure the map redraws correctly on container resize (mobile rotate/resize)
    const onResize = () => {
      try {
        map.invalidateSize();
        if (coords.length > 0) map.fitBounds(coords, { padding: [50, 50], maxZoom: 8 });
      } catch {}
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [map, center, coords]);

  return null;
};

// Disable all map interactions
const MapInteractionsController: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    if (!map || typeof window === 'undefined') return;

    // Make the map more usable on small screens (enable touch & dragging)
    const setInteractionsForWidth = (width: number) => {
      const isSmall = width < 768; // mobile & small tablets
      try {
        if (isSmall) {
          map.dragging.enable();
          map.touchZoom.enable();
          map.doubleClickZoom.enable();
          // keep scrollWheelZoom off to avoid accidental zoom while scrolling page
          map.scrollWheelZoom.disable();
          map.boxZoom.disable();
          map.keyboard.disable();
        } else {
          // Desktop: keep the map mostly static so it doesn't interfere with page scroll
          map.dragging.disable();
          map.touchZoom.disable();
          map.doubleClickZoom.disable();
          map.scrollWheelZoom.disable();
          map.boxZoom.disable();
          map.keyboard.disable();
          if (map.zoomControl) map.zoomControl.remove();
        }
      } catch (e) {
        // Some map methods can throw if layer/control not present; ignore safely
      }
    };

    setInteractionsForWidth(window.innerWidth);

    const onResize = () => setInteractionsForWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [map]);
  return null;
};

/* --------------------------------------------------------------- */
/* 3. Main Component                                               */
/* --------------------------------------------------------------- */
export default function MapComponent() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [filter, setFilter] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<WithCoords | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  /* ---- load JSON --------------------------------------------- */
  useEffect(() => {
    let active = true;
    fetch('/data/sri_lanka_locations.json')
      .then(r => r.json())
      .then((data: unknown) => {
        if (!active) return;
        const arr = Array.isArray(data) ? data : [];
        setLocations(arr as LocationData[]);
      })
      .catch(() => {
        if (!active) return;
        setLocations([
          {
            id: 16,
            name: 'Colombo',
            categories: ['City Life & Nightlife', 'Shopping (Modern & Lifestyle)'],
            famousAttractions: ['Galle Face Green', 'National Museum'],
            coordinates: [6.93, 79.86],
          },
          {
            id: 14,
            name: 'Galle Fort',
            categories: ['Culture & Heritage'],
            famousAttractions: ['Dutch colonial architecture', 'Lighthouse'],
            coordinates: [6.0258, 80.2175],
          },
        ]);
      });
    return () => {
      active = false;
    };
  }, []);

  /* ---- filter locations (coordinates already in JSON) -------- */
  const withCoords: WithCoords[] = useMemo(() => {
    const merged = locations
      .filter((l): l is WithCoords => {
        return (
          l.coordinates &&
          Array.isArray(l.coordinates) &&
          l.coordinates.length === 2 &&
          typeof l.coordinates[0] === 'number' &&
          typeof l.coordinates[1] === 'number'
        );
      });

    return merged.filter(
      m => filter[m.categories?.[0] ?? 'Uncategorized'] !== false
    );
  }, [locations, filter]);

  /* ---- initialise filter checkboxes (once) ------------------- */
  const filterInitRef = useRef(false);
  useEffect(() => {
    if (filterInitRef.current || locations.length === 0) return;

    const cats = new Set<string>();
    locations.forEach(l => cats.add(l.categories?.[0] ?? 'Uncategorized'));

    const next: Record<string, boolean> = {};
    cats.forEach(c => (next[c] = true));
    setFilter(next);
    filterInitRef.current = true;
  }, [locations]);

  /* ---- modal focus trap -------------------------------------- */
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selected) return;
    const el = modalRef.current;
    const focusables = () =>
      el
        ? Array.from(
            el.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];
    const first = focusables()[0];
    first?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = focusables();
      if (!nodes.length) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selected]);

/* ---- custom category dot icon (no SVG) --------------------- */
const createMascotIcon = (loc: WithCoords, hovered: boolean) => {
  const cat = loc.categories?.[0] ?? 'Uncategorized';
  const colour = getCategoryColor(cat);

  const size = hovered ? 18 : 14; // small solid dot
  const border = hovered ? 6 : 4; // ring thickness

  const html = `
    <div style="position:relative;width:${size + border * 2}px;height:${size + border * 2}px;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size + border * 2}px;height:${size + border * 2}px;border-radius:9999px;background:rgba(0,0,0,0.08);"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size + border}px;height:${size + border}px;border-radius:9999px;border:${border}px solid ${colour};background:white;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size}px;height:${size}px;border-radius:9999px;background:${colour};box-shadow:0 2px 6px rgba(0,0,0,0.15);"></div>
    </div>
  `;

  const total = size + border * 2;
  return divIcon({
    html,
    className: 'custom-category-dot',
    iconSize: [total, total],
    iconAnchor: [total / 2, total / 2],
  });
};

  /* --------------------------------------------------------------- */
  /* 4. Render                                                       */
  /* --------------------------------------------------------------- */
  const mapCenter: LatLngTuple = [7.8731, 80.7718];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span>Interactive</span>{' '}
            <span className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Sri Lanka Map
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hover to see details, click a marker for full info. Markers are
            colour-coded by primary category.
          </p>
        </motion.div>

        {/* LAYOUT – MAP + LEGEND */}
        <div className="flex flex-col items-center gap-8">

          {/* MAP (react-leaflet v4+ compliant) */}
          <div className="relative w-full max-w-4xl h-[55vh] sm:h-[60vh] md:h-[80vh] mx-auto rounded-3xl shadow-2xl border border-gray-200 overflow-hidden bg-white/90 backdrop-blur-sm ring-4 ring-emerald-500/10">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                maxZoom={19}
              />

              {/* Set center and zoom */}
              <MapController 
                center={mapCenter} 
                coords={withCoords.map(l => l.coordinates)}
              />

              {/* Disable all interactions */}
              <MapInteractionsController />

              {/* Markers */}
              {withCoords.map(loc => {
                const hovered = hoveredId === loc.id;
                return (
                  <Marker
                    key={loc.id}
                    position={loc.coordinates}
                    icon={createMascotIcon(loc, hovered)}
                    eventHandlers={{
                      click: () => setSelected(loc),
                      mouseover: () => setHoveredId(loc.id),
                      mouseout: () => setHoveredId(null),
                    }}
                  >
                    {hovered && (() => {
                      const cat = loc.categories?.[0] ?? 'Uncategorized';
                      const mascot = mascotByCategory[cat] ?? mascotByCategory['Uncategorized'];
                      return (
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                          <div className="p-1">
                            <div className="flex items-center gap-2">
                              <Mascot
                                name={mascot.name}
                                src={mascot.src}
                                size={22}
                                animation="idle-float"
                                decorative
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {loc.name}
                              </span>
                            </div>
                            <div className="mt-1 text-[11px] text-gray-600">
                              Categories: {loc.categories?.join(', ') ?? 'TBD'}
                            </div>
                            {loc.famousAttractions?.slice(0, 3).length ? (
                              <div className="mt-1 text-[11px] text-gray-600">
                                Highlights:{' '}
                                {loc.famousAttractions!.slice(0, 3).join(', ')}
                              </div>
                            ) : null}
                          </div>
                        </Tooltip>
                      );
                    })()}
                  </Marker>
                );
              })}

              {/* Decorative label */}
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs font-medium text-gray-700 flex items-center gap-2">
                <Icon icon="mdi:map-marker-outline" className="text-emerald-600" />
                Sri Lanka Explorer
              </div>
            </MapContainer>
          </div>

          {/* LEGEND / FILTERS */}
          <div className="w-full max-w-4xl bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="text-lg font-medium text-gray-900 mb-4">Categories</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.keys(categoryColors)
                .filter(k => k !== 'Uncategorized')
                .map(name => (
                  <label
                    key={name}
                    className="flex items-center gap-3 cursor-pointer select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={filter[name] !== false}
                      onChange={e =>
                        setFilter(p => ({ ...p, [name]: e.target.checked }))
                      }
                      className="accent-emerald-600 w-4 h-4"
                      aria-label={`Toggle ${name}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: categoryColors[name] }}
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 text-sm">
                      {name}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`${selected.name} details`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  {(() => {
                    const cat = selected.categories?.[0] ?? 'Uncategorized';
                    const m = mascotByCategory[cat] ?? mascotByCategory['Uncategorized'];
                    return (
                      <Mascot
                        name={m.name}
                        src={m.src}
                        size={36}
                        animation="entrance-pop"
                        decorative
                      />
                    );
                  })()}
                  <h3 className="text-2xl font-medium text-gray-900">
                    {selected.name}
                  </h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <Icon icon="mdi:close" className="text-xl text-gray-500" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Categories
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selected.categories?.length
                      ? selected.categories
                      : ['TBD']
                    ).map(c => (
                      <span
                        key={c}
                        className="px-3 py-1 rounded-full text-sm text-white"
                        style={{ backgroundColor: getCategoryColor(c) }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attractions */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Famous Attractions
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                    {(selected.famousAttractions?.length
                      ? selected.famousAttractions
                      : ['TBD']
                    ).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                {/* Nearby */}
                {(() => {
                  const primary = selected.categories?.[0];
                  if (!primary) return null;
                  const nearby = withCoords
                    .filter(
                      w =>
                        w.id !== selected.id && w.categories?.includes(primary)
                    )
                    .slice(0, 4);
                  if (!nearby.length) return null;
                  return (
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-500 mb-2">
                        Nearby Attractions
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        {nearby.map(n => (
                          <button
                            key={n.id}
                            onClick={() => setSelected(n)}
                            className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
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
    </section>
  );
}