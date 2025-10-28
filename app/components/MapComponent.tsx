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
  famousAttractions: string[];
  position?: MapPosition;
}
interface WithCoords extends LocationData {
  coordinates: MapPosition;
}

/* ---- colours --------------------------------------------------- */
const categoryColors: Record<string, string> = {
  Wildlife: '#10b981',
  'Cultural & Historical': '#f59e0b',
  'Beach & Coastal': '#06b6d4',
  'Adventure & Sports': '#ef4444',
  'Nature & Scenic': '#22c55e',
  'Religious & Spiritual': '#eab308',
  Uncategorized: '#6b7280',
};
const getCategoryColor = (c: string) =>
  categoryColors[c] ?? categoryColors['Uncategorized'];

/* ---- real coordinates (all 30) -------------------------------- */
const coordinateMap: Record<number, MapPosition> = {
  1: [7.1160, 79.8850], 2: [6.9271, 79.8612], 3: [7.2131, 79.8388],
  4: [6.4220, 79.9961], 5: [6.1367, 80.1000], 6: [6.0535, 80.2210],
  7: [5.9696, 80.4376], 8: [5.9493, 80.5471], 9: [6.0249, 80.7936],
  10: [7.2906, 80.6337], 11: [7.2950, 80.4023], 12: [7.4880, 80.6220],
  13: [7.9571, 80.7600], 14: [8.0469, 80.9767], 15: [8.0322, 80.8143],
  16: [7.9333, 81.0000], 17: [8.3352, 80.4109], 18: [6.7983, 80.8030],
  19: [6.9680, 80.7811], 20: [6.8667, 81.0466], 21: [6.3683, 81.4287],
  22: [6.4206, 80.8860], 23: [6.8091, 80.4994], 24: [8.5874, 81.2152],
  25: [8.6942, 81.1853], 26: [6.8413, 81.8281], 27: [9.6615, 80.0255],
  28: [9.6053, 79.7228], 29: [8.4287, 80.0150], 30: [7.7550, 81.6050],
};

/* ---- mascot SVGs ----------------------------------------------- */
const mascotByCategory: Record<
  string,
  { src: string; name: string; alt: string }
> = {
  Wildlife: {
    src: '/assets/mascots/elephant.svg',
    name: 'Ellie the Elephant',
    alt: 'Elephant mascot',
  },
  'Beach & Coastal': {
    src: '/assets/mascots/turtle.svg',
    name: 'Tiko the Turtle',
    alt: 'Turtle mascot',
  },
  'Cultural & Historical': {
    src: '/assets/mascots/lotus-monk.svg',
    name: 'Luma the Lotus Monk',
    alt: 'Monk mascot',
  },
  'Adventure & Sports': {
    src: '/assets/mascots/surfer-cat.svg',
    name: 'Kiki the Surfer Cat',
    alt: 'Surfer cat mascot',
  },
  'Nature & Scenic': {
    src: '/assets/mascots/tea-sprite.svg',
    name: 'Chai the Tea Sprite',
    alt: 'Tea sprite mascot',
  },
  'Religious & Spiritual': {
    src: '/assets/mascots/lotus-monk.svg',
    name: 'Luma the Lotus Monk',
    alt: 'Monk mascot',
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

// Set center and zoom
const MapController: React.FC<{ center: LatLngTuple }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 8);
  }, [map, center]);
  return null;
};

// Disable all map interactions
const MapInteractionsController: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.zoomControl) map.zoomControl.remove();

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
            id: 2,
            name: 'Colombo',
            categories: ['Cultural & Historical', 'Beach & Coastal'],
            famousAttractions: ['Galle Face Green'],
            position: coordinateMap[2],
          },
          {
            id: 6,
            name: 'Galle',
            categories: ['Cultural & Historical', 'Beach & Coastal'],
            famousAttractions: ['Galle Fort'],
            position: coordinateMap[6],
          },
        ]);
      });
    return () => {
      active = false;
    };
  }, []);

  /* ---- merge coordinates + filter (SAFE) --------------------- */
  const withCoords: WithCoords[] = useMemo(() => {
    const merged = locations
      .map(l => {
        const c = coordinateMap[l.id];
        if (
          Array.isArray(c) &&
          c.length === 2 &&
          typeof c[0] === 'number' &&
          typeof c[1] === 'number'
        ) {
          return { ...l, coordinates: c as MapPosition };
        }
        return null;
      })
      .filter((l): l is WithCoords => l !== null);

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

  /* ---- custom mascot icon (ring + SVG) ----------------------- */
  const createMascotIcon = (loc: WithCoords, hovered: boolean) => {
    const cat = loc.categories?.[0] ?? 'Uncategorized';
    const colour = getCategoryColor(cat);
    const mascot = mascotByCategory[cat] ?? mascotByCategory['Uncategorized'];

    const size = hovered ? 48 : 36;
    const ringR = hovered ? 22 : 16;
    const imgSize = hovered ? 28 : 22;

    const html = `
      <div style="position:relative;width:${size}px;height:${size}px;" data-loc-id="${loc.id}">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${size / 2}" cy="${size / 2}" r="${ringR}"
                  fill="none" stroke="${colour}" stroke-width="3"/>
        </svg>
        <img src="${mascot.src}" alt="${mascot.alt}"
             style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                    width:${imgSize}px;height:${imgSize}px;pointer-events:none;"/>
      </div>
    `;

    return divIcon({
      html,
      className: 'custom-mascot-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
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
          <div className="relative w-[800px] h-[800px] mx-auto rounded-3xl shadow-2xl border border-gray-200 overflow-hidden bg-white/90 backdrop-blur-sm ring-4 ring-emerald-500/10">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              // No interaction props allowed
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                maxZoom={19}
              />

              {/* Set center and zoom */}
              <MapController center={mapCenter} />

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
                    {hovered && (
                      <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                        <div className="p-1">
                          <div className="flex items-center gap-2">
                            <Mascot
                              name={mascotByCategory[loc.categories?.[0] ?? 'Uncategorized'].name}
                              src={mascotByCategory[loc.categories?.[0] ?? 'Uncategorized'].src}
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
                    )}
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
          <div className="w-[800px] bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
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