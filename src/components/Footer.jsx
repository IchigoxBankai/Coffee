import React from 'react';
import { Coffee, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-gold-light/80 py-16 border-t border-gold/10" id="contact">
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Brand column */}
        <div className="flex flex-col gap-6">
          <a href="#" className="flex items-center gap-2 group">
            <Coffee className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              L'ORÉAL CAFÉ
            </span>
          </a>
          <p className="text-xs font-light leading-relaxed text-gold-light/60">
            Crafting state-of-the-art sensory experiences with ethical sourcing and exceptional taste. Visit our luxury sanctuaries.
          </p>
          <div className="flex gap-4">
            {/* Custom SVG Social Icons */}
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gold-light hover:text-luxury-black hover:bg-gold hover:border-gold transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gold-light hover:text-luxury-black hover:bg-gold hover:border-gold transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gold-light hover:text-luxury-black hover:bg-gold hover:border-gold transition-all duration-300"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm font-bold text-white tracking-widest uppercase">
            EXPLORE
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-light">
            {['Home', 'Menu', 'Our Story', 'Locations', 'Book a Table'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-gold transition-colors duration-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm font-bold text-white tracking-widest uppercase">
            CONTACT
          </h4>
          <ul className="flex flex-col gap-3 text-xs font-light">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>122 Luxury Plaza, Boulevard East</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <span>+1 (800) 555-BREW</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <span>reserve@lorealcafe.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm font-bold text-white tracking-widest uppercase">
            NEWSLETTER
          </h4>
          <p className="text-xs font-light text-gold-light/60">
            Subscribe to receive exclusive access to private reserve coffees and secret tasting events.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center border border-white/10 rounded-full overflow-hidden bg-white/5 focus-within:border-gold transition-colors"
          >
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent text-xs text-white px-4 py-3 w-full outline-none placeholder:text-gold-light/30"
            />
            <button 
              type="submit"
              className="px-4 py-3 bg-gold hover:bg-gold-dark text-luxury-black font-semibold text-xs transition-colors duration-300"
            >
              JOIN
            </button>
          </form>
        </div>

      </div>

      <div className="w-[90%] max-w-6xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <span className="text-[10px] text-gold-light/40 tracking-wider">
          © 2026 L'ORÉAL CAFÉ. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-6 text-[10px] text-gold-light/40 tracking-wider">
          <a href="#" className="hover:text-gold">PRIVACY POLICY</a>
          <a href="#" className="hover:text-gold">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
