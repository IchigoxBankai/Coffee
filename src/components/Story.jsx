import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // Parallax background effect
    if (bgRef.current && containerRef.current) {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Text Reveal
    if (textRef.current && containerRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="our-story"
      className="relative w-full h-[550px] overflow-hidden flex items-center justify-center bg-coffee-black"
    >
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] bg-cover bg-center"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/story-bg.jpg')` }}
      />

      {/* Luxury Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/40 to-luxury-black/70 z-1" />

      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-6"
      >
        <span className="text-gold font-semibold tracking-[0.3em] text-xs md:text-sm uppercase">
          OUR HERITAGE
        </span>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
          Warm moments. <br className="md:hidden" />
          <span className="text-gold italic font-normal">Perfect coffee.</span>
        </h2>
        <p className="text-gold-light/85 text-sm md:text-base font-light max-w-xl leading-relaxed">
          From a small boutique roastery to an award-winning luxury café experience. We craft more than coffee; we craft space for memories to bloom.
        </p>
        <div className="mt-4">
          <a
            href="#story-link"
            className="px-8 py-4 bg-white hover:bg-gold hover:text-luxury-black text-coffee-black font-semibold text-sm tracking-wider rounded-full transition-all duration-300 shadow-xl shadow-black/10"
          >
            DISCOVER STORY
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
