import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { value: '12+', label: 'Years of Roasting' },
  { value: '45+', label: 'Coffee Varieties' },
  { value: '99%', label: 'Happy Customers' },
];

const Experience = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);

  useGSAP(() => {
    // Animate Title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );

    // Animate Stats Numbers with counter-up effect
    statsRef.current.forEach((statEl) => {
      if (!statEl) return;
      const numEl = statEl.querySelector('.stat-number');
      const labelEl = statEl.querySelector('.stat-label');
      const targetVal = parseFloat(numEl.getAttribute('data-value'));
      const isPercent = numEl.getAttribute('data-value').includes('%');
      const counter = { val: 0 };

      gsap.fromTo(
        [numEl, labelEl],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statEl,
            start: 'top 85%',
          },
          onStart: () => {
            gsap.to(counter, {
              val: targetVal,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                numEl.textContent = Math.floor(counter.val) + (isPercent ? '%' : '+');
              },
            });
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-luxury-cream relative overflow-hidden flex items-center justify-center border-b border-gold/10"
    >
      {/* Decorative SVG curves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 C300 50, 700 350, 1100 200 C1300 120, 1500 180, 1600 200" stroke="#c3a375" strokeWidth="1.5" />
          <path d="M-50 250 C400 100, 600 300, 1200 150 C1350 100, 1450 120, 1550 150" stroke="#dbc1ac" strokeWidth="1" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="w-[90%] max-w-6xl mx-auto flex flex-col items-center relative z-10 text-center gap-16">
        
        {/* Title */}
        <div ref={titleRef} className="max-w-2xl">
          <span className="text-gold font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            CRAFTED WITH PRECISION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-coffee-black leading-tight">
            Experience Coffee Like <br />
            <span className="text-gold italic font-normal">Never Before</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="flex flex-col items-center gap-2"
            >
              {/* Stat Number */}
              <span 
                data-value={stat.value}
                className="stat-number font-serif text-5xl md:text-7xl font-bold text-coffee-deep tabular-nums"
              >
                0+
              </span>
              
              {/* Divider Line */}
              <div className="w-12 h-0.5 bg-gold/50 my-2" />
              
              {/* Label */}
              <span className="stat-label text-coffee-black/60 tracking-wider text-sm font-medium uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
