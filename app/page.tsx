'use client';

import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import CategoriesSection from '@/app/components/CategoriesSection';
import InteractiveMap from '@/app/components/InteractiveMap';
import AIRecommendations from '@/app/components/AIRecommendations';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <CategoriesSection />
      
      {/* Interactive Map */}
      <InteractiveMap />
      
      {/* AI Recommendations */}
      <AIRecommendations />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}