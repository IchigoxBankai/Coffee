import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);
  const leftContentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [hasFrames, setHasFrames] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Setup GSAP Animations
  useGSAP(() => {
    // 1. Initial fade-in of text content and buttons
    gsap.fromTo(
      leftContentRef.current.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // 2. Continuous float animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });

    if (!hasFrames) {
      // Fallback Scroll Animation (zoom into static cup image)
      gsap.to(fallbackRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false
        },
        scale: 1.6,
        y: -50,
        opacity: 0.8,
        filter: 'blur(4px)',
        ease: 'none'
      });

      // Fade out left text on scroll
      gsap.to(leftContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
        opacity: 0,
        y: -100,
        ease: 'none'
      });
    }
  }, { scope: containerRef, dependencies: [hasFrames] });

  // Frame preloader and Canvas animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const totalFrames = 200; // 0 to 199
    const frameImages = [];
    let loadedCount = 0;

    // Helper to get frame filepath
    const getFrameUrl = (index) => {
      // Look in public/assets/coffee_frames_20fps/frame_0000.jpg up to frame_0199.jpg
      const paddedIndex = String(index).padStart(4, '0');
      return `/assets/coffee_frames_20fps/frame_${paddedIndex}.jpg`;
    };

    // Attempt to load frame sequence
    const loadFrames = () => {
      let failed = false;

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);

        img.onload = () => {
          if (failed) return;
          frameImages[i] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));

          if (loadedCount === totalFrames) {
            setHasFrames(true);
            renderFrame(0);
            initCanvasScroll(frameImages);
          }
        };

        img.onerror = () => {
          // If first few images fail, fall back to static image
          if (i < 5) {
            failed = true;
            setHasFrames(false);
          }
        };
      }
    };

    const renderFrame = (index) => {
      if (!frameImages[index] || !canvas) return;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image preserving cover aspect ratio
      const img = frameImages[index];
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      
      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const initCanvasScroll = (images) => {
      const scrollObj = { frame: 0 };
      
      gsap.to(scrollObj, {
        frame: totalFrames - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
        onUpdate: () => renderFrame(scrollObj.frame)
      });

      // Fade out left text on scroll
      gsap.to(leftContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
        opacity: 0,
        y: -100,
        ease: 'none'
      });
    };

    // Handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (frameImages.length === totalFrames) {
        renderFrame(0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    loadFrames();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen overflow-hidden bg-luxury-black flex items-center"
      id="home"
    >
      {/* Dynamic Canvas for Scrolling Frames */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-700 ${
          hasFrames ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Static Fallback Hero View (Shown if canvas frames are not present) */}
      {!hasFrames && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div 
            ref={fallbackRef}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-110"
            style={{ backgroundImage: `url('/assets/hero-cup.jpg')` }}
          />
          {/* Dark Overlay for cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/70 to-transparent z-1" />
        </div>
      )}

      {/* Steam Effect (Overlay on cup) */}
      <div className="absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent animate-pulse" />

      {/* Main Content Layout */}
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 relative z-20 h-full py-20 pointer-events-none">
        
        {/* Left Panel: Luxury Text & CTAs */}
        <div 
          ref={leftContentRef} 
          className="flex flex-col justify-center items-start gap-6 text-left pointer-events-auto"
        >
          <span className="text-gold font-semibold tracking-[0.25em] text-xs md:text-sm uppercase">
            ESTABLISHED 2026
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-white">
            Savor the <br />
            <span className="text-gold italic font-normal">Perfect</span> Brew!
          </h1>
          <p className="text-gold-light/80 text-base md:text-lg max-w-md font-light leading-relaxed">
            Experience premium handcrafted coffee made with passion and perfection. Every bean is carefully selected and slow-roasted to awaken your senses.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a 
              href="#menu" 
              className="px-8 py-4 bg-gold hover:bg-gold-dark text-luxury-black hover:text-white font-semibold text-sm tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-gold/20"
            >
              EXPLORE MENU
            </a>
            <a 
              href="#order" 
              className="px-8 py-4 border border-white/30 hover:border-gold hover:bg-gold/10 text-white font-semibold text-sm tracking-wider rounded-full transition-all duration-300"
            >
              ORDER NOW
            </a>
          </div>
        </div>

        {/* Right side is intentionally empty for the cup visual to sit comfortably */}
        <div className="hidden md:block" />
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 text-gold-light/60 hover:text-gold transition-colors duration-300"
        onClick={() => {
          const nextSection = document.getElementById('features');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default Hero;
