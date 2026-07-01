import React, { useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop',
    name: 'Cappuccino',
    rating: '4.9',
  },
  {
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop',
    name: 'Latte Art',
    rating: '4.8',
  },
  {
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop',
    name: 'Cold Brew',
    rating: '4.9',
  },
  {
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop',
    name: 'Espresso',
    rating: '4.7',
  },
];

const Gallery = () => {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Reveal left content
    gsap.fromTo(
      leftContentRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );

    // Reveal cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="menu" 
      className="py-20 bg-luxury-cream border-b border-gold/10"
    >
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading and CTAs (span 5) */}
        <div 
          ref={leftContentRef} 
          className="lg:col-span-4 flex flex-col items-start text-left gap-5"
        >
          <div className="flex items-center gap-2 text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Visit Us TODAY</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-coffee-black leading-tight">
            Morning Happy -
          </h2>
          
          <p className="text-coffee-deep/80 text-xs font-light leading-relaxed max-w-sm">
            Awaken your senses with our exquisite handcrafted coffee blends. Made from organic beans harvested with precision care and passion.
          </p>

          <div className="flex gap-3 mt-2">
            <a 
              href="#book" 
              className="px-5 py-2.5 bg-coffee-deep hover:bg-gold text-white font-semibold text-xs tracking-wider rounded-full transition-all duration-300 shadow-sm"
            >
              BOOK A TABLE
            </a>
            <a 
              href="#menu" 
              className="px-5 py-2.5 bg-white hover:bg-gold/10 text-coffee-black border border-gold/30 font-semibold text-xs tracking-wider rounded-full transition-all duration-300"
            >
              SEE MENU
            </a>
          </div>
        </div>

        {/* Right Column: Cards Carousel/Grid (span 8) */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryData.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white rounded-2xl p-3 border border-gold/10 hover:border-gold/30 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-coffee-black mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Rating */}
              <div className="text-left px-1 pb-1">
                <h4 className="font-serif text-sm font-bold text-coffee-black mb-1 group-hover:text-gold transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="text-[10px] font-bold text-coffee-black">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
