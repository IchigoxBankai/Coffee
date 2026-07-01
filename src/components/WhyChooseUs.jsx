import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useGSAP(() => {
    // Fade in both panels
    if (leftCardRef.current && rightCardRef.current && containerRef.current) {
      gsap.fromTo(
        [leftCardRef.current, rightCardRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-16 bg-luxury-cream"
    >
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card: Why Choose Us (Split Layout) */}
        <div 
          ref={leftCardRef}
          className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden shadow-md border border-gold/10"
        >
          {/* Why Choose Us Text (Dark Brown) */}
          <div className="bg-coffee-black p-10 flex flex-col justify-center text-left gap-4">
            <span className="text-gold font-semibold tracking-wider text-xs uppercase">
              OUR PROMISE
            </span>
            <h3 className="font-serif text-3xl font-bold text-white leading-tight">
              Why Choose Us?
            </h3>
            <p className="text-gold-light/80 text-xs font-light leading-relaxed">
              Premium beans, expert roasting, and unforgettable flavors crafted daily by master baristas.
            </p>
            <div className="mt-2">
              <a 
                href="#our-story" 
                className="inline-block px-6 py-3 bg-white hover:bg-gold text-coffee-black hover:text-white font-semibold text-xs tracking-wider rounded-full transition-all duration-300"
              >
                EXPLORE MORE
              </a>
            </div>
          </div>
          {/* Coffee Cup Image */}
          <div 
            className="min-h-[250px] md:min-h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop')` }}
          />
        </div>

        {/* Right Card: Offer Card (Light Warm Beige) */}
        <div 
          ref={rightCardRef}
          className="bg-coffee-light/40 rounded-[2rem] p-10 md:p-12 border border-gold/20 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm"
        >
          {/* Elegant curved decorative line */}
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10 C 50 40, 60 70, 90 90" stroke="#000" strokeWidth="2" />
            </svg>
          </div>

          <span className="text-coffee-dark font-semibold tracking-[0.25em] text-xs uppercase mb-2">
            Organic Arabica Beans
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-coffee-black mb-4">
            20% Off from 10 am
          </h3>
          <p className="text-coffee-deep/80 text-xs font-light max-w-sm leading-relaxed mb-6">
            Sip on your favorite handcrafted hot and cold brews during our morning happy hours. Exclusions apply.
          </p>
          <a 
            href="#menu" 
            className="px-8 py-3.5 bg-coffee-deep hover:bg-gold text-white font-semibold text-xs tracking-wider rounded-full transition-all duration-300 shadow-md shadow-coffee-black/10"
          >
            ORDER TODAY
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
