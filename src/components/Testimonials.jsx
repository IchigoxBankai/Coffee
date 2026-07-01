import React, { useState, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    name: 'Sarah Jenkins',
    role: 'Coffee Connoisseur',
    review: 'Absolutely the best espresso I have tasted outside of Italy. The atmosphere matches the high standard of the coffee.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    name: 'Arthur Vance',
    role: 'Chef & Food Critic',
    review: 'Their single-origin pour overs reveal notes I did not know coffee could have. A truly premium luxury experience.',
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    name: 'Elena Rostova',
    role: 'Lifestyle Blogger',
    review: 'Not only is the coffee exceptional, but the interior design and presentation are flawless. Every detail is perfect.',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const reviewTextRef = useRef(null);

  useGSAP(() => {
    // Smooth transition review text on index change
    gsap.fromTo(
      reviewTextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-24 bg-luxury-cream relative overflow-hidden"
    >
      <div className="w-[90%] max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
        
        {/* Quote Icon */}
        <div className="w-16 h-16 bg-coffee-light/30 border border-gold/30 rounded-full flex items-center justify-center">
          <Quote className="w-6 h-6 text-gold fill-gold" />
        </div>

        {/* Active Testimonial Review */}
        <div ref={reviewTextRef} className="min-h-[120px] max-w-2xl">
          <p className="font-serif text-xl md:text-2xl italic font-light text-coffee-black leading-relaxed">
            "{testimonialsData[activeIndex].review}"
          </p>
        </div>

        {/* User Avatars List / Selector */}
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="flex items-center gap-6">
            {testimonialsData.map((test, index) => (
              <button
                key={test.name}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-full transition-all duration-500 overflow-hidden ${
                  activeIndex === index 
                    ? 'w-16 h-16 border-2 border-gold scale-110 shadow-lg' 
                    : 'w-12 h-12 border border-gold/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img 
                  src={test.image} 
                  alt={test.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Active Reviewer Identity */}
          <div className="text-center">
            <h4 className="font-serif text-lg font-bold text-coffee-black">
              {testimonialsData[activeIndex].name}
            </h4>
            <span className="text-[10px] tracking-[0.2em] text-gold font-medium uppercase mt-1 block">
              {testimonialsData[activeIndex].role}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
