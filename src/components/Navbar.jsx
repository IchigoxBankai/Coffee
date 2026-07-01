import React, { useState, useEffect } from 'react';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 transition-all duration-500">
      <div 
        className={`flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'bg-luxury-cream/80 backdrop-blur-xl border-gold/30 shadow-lg shadow-coffee-black/5' 
            : 'bg-luxury-cream/40 backdrop-blur-md border-gold/10'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Coffee className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif text-xl font-bold tracking-wider text-coffee-black group-hover:text-gold transition-colors duration-300">
            L'ORÉAL CAFÉ
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Menu', 'Our Story', 'Locations', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium tracking-wide text-coffee-deep hover:text-gold transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Order CTA */}
        <div className="hidden md:block">
          <a
            href="#menu"
            className="px-6 py-2.5 bg-coffee-deep text-luxury-cream text-xs font-semibold tracking-wider rounded-full hover:bg-gold transition-all duration-300 border border-transparent hover:border-gold-light shadow-md shadow-coffee-black/10 hover:shadow-gold/20"
          >
            ORDER ONLINE
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-coffee-deep hover:text-gold transition-colors duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-luxury-cream/95 backdrop-blur-2xl border border-gold/20 rounded-3xl p-6 transition-all duration-500 origin-top shadow-xl shadow-coffee-black/10 ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-5 text-center">
          {['Home', 'Menu', 'Our Story', 'Locations', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-coffee-deep hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <hr className="border-gold/20 my-2" />
          <a
            href="#menu"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-coffee-deep text-luxury-cream text-sm font-semibold tracking-wider rounded-full hover:bg-gold transition-all duration-300 shadow-md shadow-coffee-black/10"
          >
            ORDER ONLINE
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
