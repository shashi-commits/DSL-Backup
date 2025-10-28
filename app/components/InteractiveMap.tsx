// app/components/InteractiveMap.tsx
'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

// This component will load your *actual* map component, 
// but will disable Server-Side Rendering (SSR) for it.
export default function InteractiveMap() {
  
  // Use Next.js's dynamic import
  const MapComponent = useMemo(() => dynamic(
    () => import('@/app/components/MapComponent'), // Path to your new component
    { 
      loading: () => (
        // Show a loading spinner while the map loads
        <div className="flex h-[600px] w-full items-center justify-center rounded-3xl bg-gray-100">
          <Icon icon="mdi:loading" className="animate-spin text-4xl text-emerald-600" />
        </div>
      ),
      ssr: false // This is the crucial part!
    }
  ), []);

  return <MapComponent />;
}