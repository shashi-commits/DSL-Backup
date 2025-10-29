'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const categories = [
  {
    id: 'adventure-nature',
    name: '🌿 Adventure & Nature',
    icon: 'mdi:hiking',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    subcategories: [
      'Hiking & Trekking (Ella Rock, Knuckles, Adam\'s Peak)',
      'Water Rafting & Kayaking (Kitulgala, Kalu Ganga)',
      'Caving & Rock Climbing (Belilena, Sigiriya)',
      'Mountain Biking Trails (Nuwara Eliya, Haputale)',
      'Camping & Glamping (Horton Plains, Meemure)'
    ]
  },
  {
    id: 'culture-heritage',
    name: '🏛️ Culture & Heritage',
    icon: 'mdi:temple-buddhist',
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    subcategories: [
      'Ancient Cities (Anuradhapura, Polonnaruwa, Sigiriya)',
      'Colonial Architecture (Galle Fort, Nuwara Eliya)',
      'Traditional Arts & Crafts (Masks, Batik, Pottery)',
      'Cultural Shows & Performances (Kandy, Colombo)',
      'Archaeological Sites & Museums (Sigiriya Museum, Colombo Museum)'
    ]
  },
  {
    id: 'beaches-water-sports',
    name: '🌊 Beaches & Water Sports',
    icon: 'mdi:surfing',
    gradient: 'from-blue-400 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    subcategories: [
      'Surfing (Arugam Bay, Weligama, Hikkaduwa)',
      'Snorkeling & Diving (Pigeon Island, Unawatuna)',
      'Whale & Dolphin Watching (Mirissa, Kalpitiya)',
      'Jet Ski & Parasailing (Bentota, Negombo)',
      'Sunset Cruises & Beach Dining (Tangalle, Mirissa)'
    ]
  },
  {
    id: 'wildlife-safari',
    name: '🐘 Wildlife & Safari',
    icon: 'mdi:elephant',
    gradient: 'from-yellow-600 to-amber-600',
    bgGradient: 'from-yellow-50 to-amber-50',
    subcategories: [
      'Jeep Safaris (Yala, Udawalawe, Minneriya)',
      'Birdwatching (Bundala, Kumana)',
      'Elephant Encounters (Pinnawala, Udawalawe)',
      'Turtle Conservation (Kosgoda, Rekawa)',
      'Leopard & Sloth Bear Tracking (Wilpattu)'
    ]
  },
  {
    id: 'romance-relaxation',
    name: '💕 Romance & Relaxation',
    icon: 'mdi:heart',
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    subcategories: [
      'Couple\'s Spa & Ayurveda Treatments',
      'Private Beach Dinners',
      'Luxury Boutique Resorts',
      'Scenic Train Journeys (Kandy–Ella)',
      'Candlelight Picnics or Tea Estate Walks'
    ]
  },
  {
    id: 'city-nightlife',
    name: '🌆 City Life & Nightlife',
    icon: 'mdi:city',
    gradient: 'from-purple-400 to-indigo-500',
    bgGradient: 'from-purple-50 to-indigo-50',
    subcategories: [
      'Rooftop Bars & Beach Clubs (Colombo, Galle)',
      'Street Food Markets (Pettah, Galle Face)',
      'Live Music & Jazz Nights',
      'Art Galleries & Contemporary Cafés',
      'Casinos & Fine Dining'
    ]
  },
  {
    id: 'wellness-retreats',
    name: '🧘‍♀️ Wellness & Retreats',
    icon: 'mdi:meditation',
    gradient: 'from-green-500 to-teal-500',
    bgGradient: 'from-green-50 to-teal-50',
    subcategories: [
      'Yoga & Meditation Retreats (Ulpotha, Ella)',
      'Ayurveda & Detox Centers',
      'Spa Resorts in Hill Country',
      'Mindfulness & Healing Workshops',
      'Hot Springs & Herbal Baths'
    ]
  },
  {
    id: 'local-life-food',
    name: '🍛 Local Life & Food',
    icon: 'mdi:food',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    subcategories: [
      'Cooking Classes & Market Visits',
      'Village Tours & Homestays',
      'Tea Plantation Experiences',
      'Street Food Trails (Colombo, Kandy)',
      'Spice Garden Visits (Matale)'
    ]
  },
  {
    id: 'eco-sustainable',
    name: '🌱 Eco & Sustainable Travel',
    icon: 'mdi:leaf',
    gradient: 'from-lime-500 to-green-600',
    bgGradient: 'from-lime-50 to-green-50',
    subcategories: [
      'Eco-Lodges & Rainforest Retreats',
      'Wildlife & Marine Conservation Volunteering',
      'Organic Farm Stays',
      'Sustainable Tourism Experiences',
      'Reforestation & Community Projects'
    ]
  },
  {
    id: 'hidden-gems',
    name: '🏕️ Hidden Gems & Offbeat Trails',
    icon: 'mdi:compass',
    gradient: 'from-slate-500 to-gray-600',
    bgGradient: 'from-slate-50 to-gray-50',
    subcategories: [
      'Meemure Village Trek',
      'Mannar Island Exploration',
      'Riverston & Knuckles Hikes',
      'Belihuloya Nature Escapes',
      'Remote & Secluded Beaches (Tangalle, Kudawa)'
    ]
  },
  {
    id: 'scenic-journeys',
    name: '🚆 Scenic Journeys & Road Trips',
    icon: 'mdi:train',
    gradient: 'from-indigo-500 to-blue-600',
    bgGradient: 'from-indigo-50 to-blue-50',
    subcategories: [
      'Hill Country Train Ride (Kandy–Ella)',
      'Southern Coastal Drive (Colombo–Galle–Matara)',
      'North & East Discovery (Trincomalee, Jaffna)',
      'Tea Country Road Trips (Hatton, Haputale)',
      'Tuk-Tuk or Motorbike Adventures'
    ]
  },
  {
    id: 'photography-scenic',
    name: '📸 Photography & Scenic Spots',
    icon: 'mdi:camera',
    gradient: 'from-sky-500 to-blue-600',
    bgGradient: 'from-sky-50 to-blue-50',
    subcategories: [
      'Sunrise & Sunset Points (Lipton\'s Seat, Adam\'s Peak)',
      'Waterfalls & Lakes (Ramboda, Gregory Lake)',
      'Iconic Landmarks (Nine Arches, Sigiriya Rock)',
      'Wildlife Photography (Yala, Wilpattu)',
      'Cultural Festivals & Local Life Shots'
    ]
  },
  {
    id: 'spiritual-mindful',
    name: '🧘 Spiritual & Mindful Experiences',
    icon: 'mdi:lotus',
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-50 to-yellow-50',
    subcategories: [
      'Temple Stays & Meditation Centers',
      'Pilgrimage Trails (Adam\'s Peak, Mihintale)',
      'Yoga in Nature (Ella, Arugam Bay)',
      'Sound Healing & Energy Sessions',
      'Silent & Vipassana Retreats'
    ]
  },
  {
    id: 'shopping-handicrafts',
    name: '🛍️ Shopping & Handicrafts',
    icon: 'mdi:diamond',
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
    subcategories: [
      'Gemstones & Jewelry (Ratnapura, Galle, Colombo)',
      'Handloom & Batik Textiles',
      'Wooden Masks & Sculptures (Ambalangoda)',
      'Artisan Markets (Good Market, Laksala, Barefoot)',
      'Antique & Souvenir Shops (Galle Fort)'
    ]
  },
  {
    id: 'festivals-events',
    name: '🎉 Festivals & Events',
    icon: 'mdi:firework',
    gradient: 'from-fuchsia-500 to-pink-600',
    bgGradient: 'from-fuchsia-50 to-pink-50',
    subcategories: [
      'Kandy Esala Perahera',
      'Vesak & Poson Lantern Festivals',
      'Sinhala & Tamil New Year',
      'Colombo Food & Jazz Festivals',
      'Temple Fairs & Cultural Carnivals'
    ]
  },
  {
    id: 'cruises-island-hopping',
    name: '🚤 Cruises & Island Hopping',
    icon: 'mdi:ferry',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-50 to-blue-50',
    subcategories: [
      'Whale-Watching Cruises (Mirissa)',
      'Catamaran Sailing (Trincomalee, Bentota)',
      'Island Visits (Delft, Mannar, Pigeon Island)',
      'Sunset Lagoon Cruises',
      'Deep Sea Fishing Expeditions'
    ]
  },
  {
    id: 'tea-country',
    name: '☕ Tea Country & Highlands',
    icon: 'mdi:tea',
    gradient: 'from-emerald-600 to-green-700',
    bgGradient: 'from-emerald-50 to-green-50',
    subcategories: [
      'Tea Plantation & Factory Tours (Nuwara Eliya, Hatton)',
      'Scenic Estate Stays',
      'Hiking & Viewpoints (Lipton\'s Seat, Ella Gap)',
      'Colonial Bungalows & Gardens',
      'Lakes, Waterfalls & Misty Trails'
    ]
  },
  {
    id: 'shopping-modern',
    name: '🛒 Shopping (Modern & Lifestyle)',
    icon: 'mdi:shopping',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    subcategories: [
      'Shopping Malls & Fashion Stores (One Galle Face, Marino Mall)',
      'Local Boutiques & Designer Labels (Colombo, Kandy)',
      'Souvenir & Craft Stores (Barefoot, Odel, Paradise Road)',
      'Street Markets & Night Bazaars (Pettah, Negombo)',
      'Tea, Spices & Wellness Product Shops'
    ]
  }
];

export default function CategoriesSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[0] | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Display only 6 categories initially
  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCategory(null);
    };
    if (selectedCategory) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedCategory]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            <span data-editor-id="app/components/CategoriesSection.tsx:61:13">Explore by</span>{' '}
            <span data-editor-id="app/components/CategoriesSection.tsx:62:13" className="font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Interest
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span data-editor-id="app/components/CategoriesSection.tsx:66:13">
              Discover Sri Lanka through 18 unique categories, each offering unforgettable experiences 
              tailored to your interests and travel style.
            </span>
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedCategory(category)}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${category.bgGradient} border-2 border-white/50 cursor-pointer group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background Icon Pattern */}
              <div className="absolute -top-6 -right-6 w-32 h-32 opacity-5 group-hover:opacity-10 transition-all duration-300 group-hover:rotate-12">
                <Icon icon={category.icon} className="text-[120px] text-gray-900" />
              </div>

              {/* Icon Badge */}
              <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} mb-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <Icon icon={category.icon} className="text-white text-3xl" />
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Category Name */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                {category.name}
              </h3>
              
              {/* Subcategories Count */}
              <div className="relative flex items-center text-sm text-gray-600 mb-4">
                <Icon icon="mdi:format-list-bulleted" className="mr-2 text-lg" />
                <span className="font-medium">{category.subcategories.length} Experiences</span>
              </div>

              {/* Click to explore indicator */}
              <div className="relative flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                <span>Click to explore</span>
                <Icon icon="mdi:arrow-right" className="ml-2 text-base group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {categories.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => setShowAll(!showAll)}
              className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
            >
              <span>{showAll ? 'Show Less Categories' : `Explore All ${categories.length} Categories`}</span>
              <Icon 
                icon={showAll ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
                className="text-2xl group-hover:translate-y-1 transition-transform" 
              />
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCategory.gradient} shadow-lg`}>
                    <Icon icon={selectedCategory.icon} className="text-white text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedCategory.subcategories.length} Unique Experiences
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                  aria-label="Close"
                >
                  <Icon icon="mdi:close" className="text-2xl text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-all" />
                </button>
              </div>

              {/* Subcategories List */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:star-circle" className="text-emerald-600 text-xl" />
                  What You Can Experience
                </h4>
                <ul className="space-y-3">
                  {selectedCategory.subcategories.map((sub, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-emerald-50 hover:to-blue-50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed flex-1 pt-1">{sub}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => router.push('/plan-trip')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Plan Your Trip</span>
                  <Icon icon="mdi:arrow-right" className="text-xl" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
