import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    image: 'https://images.unsplash.com/photo-1510972527408-3a6a0e6d6824?q=80&w=150&auto=format&fit=crop',
    title: 'Espresso',
    description: 'Intense and full-bodied single origin shot with golden crema.',
  },
  {
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=150&auto=format&fit=crop',
    title: 'Latte',
    description: 'Light espresso topped with silky, textured warm microfoam.',
  },
  {
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=150&auto=format&fit=crop',
    title: 'Macchiato',
    description: 'Bold espresso marked with a delicate dollop of milk foam.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=150&auto=format&fit=crop',
    title: 'Cold Brew',
    description: 'Steeped in cold water for a smooth, refreshing caffeine punch.',
  },
];

const Features = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="features" 
      className="py-20 bg-luxury-cream border-b border-gold/10"
    >
      <div className="w-[90%] max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-coffee-black text-center mb-16">
          Features
        </h2>

        {/* Feature Cards Grid with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {featuresData.map((feat, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`flex flex-col items-center text-center px-6 ${
                index < 3 ? 'lg:border-r lg:border-gold/20' : ''
              }`}
            >
              {/* Circular coffee thumb image with brown outer ring */}
              <div className="w-20 h-20 rounded-full p-1 border-2 border-gold flex items-center justify-center mb-6 overflow-hidden bg-white shadow-md hover:scale-110 transition-transform duration-300">
                <img 
                  src={feat.image} 
                  alt={feat.title} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="font-serif text-lg font-bold text-coffee-black mb-2">
                {feat.title}
              </h3>
              
              <p className="text-coffee-deep/70 text-xs leading-relaxed font-light max-w-[200px]">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
