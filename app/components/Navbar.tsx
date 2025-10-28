'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Categories', href: '/categories' },
  { name: 'Map', href: '/map' },
  { name: 'AI Recommendations', href: '/#ai-recommendations' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
              <Icon icon="mdi:island" className="text-white text-lg" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              <span data-editor-id="app/components/Navbar.tsx:24:14">Discover Sri Lanka</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium"
              >
                <span data-editor-id={`app/components/Navbar.tsx:35:17:${item.name}`}>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Search Button & Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              <Icon icon="material-symbols:search" className="text-lg" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span data-editor-id={`app/components/Navbar.tsx:68:21:${item.name}`}>{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}