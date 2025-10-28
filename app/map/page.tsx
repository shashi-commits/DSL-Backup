'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import InteractiveMap from '@/app/components/InteractiveMap';
import Footer from '@/app/components/Footer';

export default function MapPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-24">
        <InteractiveMap />
      </section>
      <Footer />
    </main>
  );
}
