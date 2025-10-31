'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  photo: string;
}

/* 10 realistic reviews – 5-star heavy, a few 4-star */
const reviews: Review[] = [
  { id: 1, name: 'Sarah M.', rating: 5, comment: 'Unforgettable! AI nailed the perfect itinerary. Sigiriya sunrise was magical.', date: 'Oct 2025', verified: true, photo: 'https://thumbs.dreamstime.com/b/studio-shot-young-beautiful-tourist-woman-against-white-background-profile-view-happy-young-beautiful-tourist-woman-looking-144652763.jpg' },
  { id: 2, name: 'Rajesh K.', rating: 5, comment: 'Platinum package = luxury + hidden gems. Worth every rupee.', date: 'Sep 2025', verified: true, photo: 'https://media.istockphoto.com/id/672156132/photo/profile-view-of-young-happy-indian-tourist-man-smiling-while-looking-at-bottle-of-beer-against.jpg?s=1024x1024&w=is&k=20&c=JMP7m46TVV5N06hyme7VEg2_--K8Nn6ms_DrXX3Hwh4=' },
  { id: 3, name: 'Emma L.', rating: 4, comment: 'Great overall. November slot filled fast – book early!', date: 'Nov 2025', verified: false, photo: 'https://media.istockphoto.com/id/1759448630/photo/happy-caucasian-young-student-female-looking-at-camera-enjoying-with-a-perfect-white-teeth.jpg?s=612x612&w=0&k=20&c=KbfDI3FjAdGYK5QxTx3PJdxFyx9ZNgvOBd0P7E3Ah38=' },
  { id: 4, name: 'Liam P.', rating: 5, comment: 'The private guide made all the difference. Highly recommend!', date: 'Oct 2025', verified: true, photo: 'https://img.freepik.com/free-photo/happy-young-surfer-snapback-looking-smiling-cheerfully-after-winning-sports-contest-surfers-holding-his-white-surfboard-his-arm_273609-1551.jpg?semt=ais_hybrid&w=740&q=80' },
  { id: 5, name: 'Aisha R.', rating: 5, comment: 'From beaches to temples – everything was seamless.', date: 'Aug 2025', verified: true, photo: 'https://www.shutterstock.com/image-photo/muslim-woman-selfie-social-media-260nw-2314271227.jpg' },
  { id: 6, name: 'Noah T.', rating: 5, comment: 'AI suggestions were spot-on. Never thought I’d love Kandy this much!', date: 'Jul 2025', verified: true, photo: 'https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg' },
  { id: 7, name: 'Isabella G.', rating: 4, comment: 'Loved the experience, just a little crowded at Yala.', date: 'Oct 2025', verified: false, photo: 'https://www.shutterstock.com/image-photo/headshot-portrait-smiling-millennial-latino-260nw-2013742835.jpg' },
  { id: 8, name: 'Arjun S.', rating: 5, comment: 'Premium package gave us the best views and zero hassle.', date: 'Sep 2025', verified: true, photo: 'https://www.shutterstock.com/image-photo/happy-handsome-young-indian-man-260nw-2315729087.jpg' },
  { id: 9, name: 'Olivia B.', rating: 5, comment: 'The tea-plantation stay was pure bliss. Thank you!', date: 'Jun 2025', verified: true, photo: 'https://images.pexels.com/photos/12217886/pexels-photo-12217886.jpeg' },
  { id: 10, name: 'Mateo C.', rating: 5, comment: 'Best family vacation ever. Kids still talk about the turtle hatchery.', date: 'May 2025', verified: true, photo: 'https://img.freepik.com/premium-photo/young-hispanic-man-profile-view-looking-happy-excited-shouting-calling-copy-space-side-blue_1194-45764.jpg' },
];

export default function ReviewsSection() {
  const [filter, setFilter] = useState<number | null>(null);

  const StarRating = ({ rating, size = 'text-xl' }: { rating: number; size?: string }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          icon={i <= rating ? 'mdi:star' : 'mdi:star-outline'}
          className={`${i <= rating ? 'text-yellow-400' : 'text-gray-300'} ${size}`}
        />
      ))}
    </div>
  );

  const filtered = filter ? reviews.filter((r) => r.rating === filter) : reviews;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-3">
            What Our <span className="font-medium bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">Travelers Say</span>
          </h2>
          <p className="text-gray-600">Real adventures, real feedback</p>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16"
        >
          <div className="text-center">
            <div className="text-7xl font-bold text-gray-900">{avg}</div>
            <StarRating rating={5} size="text-3xl" />
            <p className="text-gray-500 text-base mt-2">Based on {reviews.length}+ reviews</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => setFilter(filter === r ? null : r)}
                className={`px-5 py-2.5 rounded-full text-base font-medium transition-all ${
                  filter === r
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r} Star{r !== 1 && 's'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={rev.photo} 
                  alt={rev.name} 
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                />
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h4 className="text-gray-900 font-medium flex items-center gap-1.5 text-lg">
                      {rev.name}
                      {rev.verified && (
                        <span className="ml-1 inline-flex items-center" title="Verified">
                          <Icon icon="mdi:check-decagram" className="text-emerald-400 text-base" aria-hidden="true" />
                          <span className="sr-only">Verified</span>
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-500 text-sm">{rev.date}</p>
                  </div>
                  <StarRating rating={rev.rating} />
                </div>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">{rev.comment}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all hover:scale-105 shadow-xl">
            <Icon icon="mdi:pencil" className="text-xl" />
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
}