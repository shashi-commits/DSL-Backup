'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const footerNavigation = {
  explore: [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Categories', href: '/categories' },
    { name: 'Interactive Map', href: '/map' },
    { name: 'AI Recommendations', href: '/recommendations' },
  ],
  categories: [
    { name: 'Wildlife', href: '/categories/wildlife' },
    { name: 'Cultural & Historical', href: '/categories/cultural' },
    { name: 'Beach & Coastal', href: '/categories/beach' },
    { name: 'Adventure & Sports', href: '/categories/adventure' },
  ],
  support: [
    { name: 'Travel Guide', href: '/guide' },
    { name: 'Planning Tips', href: '/tips' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Cookies', href: '/cookies' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: 'ic:baseline-facebook',
    },
    {
      name: 'Instagram',
      href: '#',
      icon: 'mdi:instagram',
    },
    {
      name: 'Twitter',
      href: '#',
      icon: 'mdi:twitter',
    },
    {
      name: 'YouTube',
      href: '#',
      icon: 'mdi:youtube',
    },
  ],
};

export default function Footer() {
  const renderSection = ({ title, items }: { title: string; items: { name: string; href: string }[] }) => (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        <span data-editor-id={`app/components/Footer.tsx:51:9:${title}`}>{title}</span>
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href} 
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
            >
              <span data-editor-id={`app/components/Footer.tsx:59:15:${item.name}`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
                <Icon icon="mdi:island" className="text-white text-xl" />
              </div>
              <span className="text-xl font-semibold text-white">
                <span data-editor-id="app/components/Footer.tsx:78:17">Discover Sri Lanka</span>
              </span>
            </Link>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              <span data-editor-id="app/components/Footer.tsx:83:15">
                Your ultimate guide to exploring the pearl of the Indian Ocean. 
                Discover breathtaking destinations with AI-powered personalized recommendations 
                and immerse yourself in Sri Lanka&apos;s rich culture and natural beauty.
              </span>
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={item.name}
                >
                  <Icon icon={item.icon} className="text-lg text-gray-300 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="text-white">
            {renderSection({ title: 'Explore', items: footerNavigation.explore })}
          </div>
          
          <div className="text-white">
            {renderSection({ title: 'Categories', items: footerNavigation.categories })}
          </div>
          
          <div className="text-white">
            {renderSection({ title: 'Support', items: footerNavigation.support })}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-3xl p-8 backdrop-blur-sm border border-emerald-500/20">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h3 className="text-xl font-semibold text-white mb-2">
                  <span data-editor-id="app/components/Footer.tsx:121:19">Stay Updated</span>
                </h3>
                <p className="text-gray-300">
                  <span data-editor-id="app/components/Footer.tsx:124:19">
                    Get the latest travel tips, destination guides, and exclusive offers 
                    delivered straight to your inbox.
                  </span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[400px]">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Icon icon="mdi:email-outline" className="absolute right-3 top-3.5 text-gray-400" />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  <span data-editor-id="app/components/Footer.tsx:142:19">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              <span data-editor-id="app/components/Footer.tsx:152:15">
                © 2024 Discover Sri Lanka. All rights reserved.
              </span>
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  <span data-editor-id={`app/components/Footer.tsx:163:19:${item.name}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}