'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import AIRecommendations from '@/app/components/AIRecommendations';
import Footer from '@/app/components/Footer';

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-24">
        <AIRecommendations />
      </section>
      <Footer />
    </main>
  );
}
