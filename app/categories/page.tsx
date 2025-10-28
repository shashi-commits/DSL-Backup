'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import CategoriesSection from '@/app/components/CategoriesSection';
import Footer from '@/app/components/Footer';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-24">
        <CategoriesSection />
      </section>
      <Footer />
    </main>
  );
}
