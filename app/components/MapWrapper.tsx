'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span>Interactive</span>{' '}
            <span className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Sri Lanka Map
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Loading map...
          </p>
        </div>
      </div>
    </div>
  ),
});

export default MapComponent;
