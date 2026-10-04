import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Compass, Shield, Globe2 } from 'lucide-react';
import { BURKIMBA_INFO } from '../data/transitData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenSourcing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenAdmin,
  onOpenSourcing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark (Clean & Understated) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-stone-900 hover:text-stone-600 transition-colors uppercase whitespace-nowrap flex items-center gap-1.5"
        >
          <span className="font-extrabold tracking-wide">BURKIMBA</span>
          <span className="text-stone-500 font-normal">TRANSIT</span>
        </a>

        {/* Minimal Navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('catalogue')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1"
          >
            Catalogue
          </button>
          <button
            onClick={() => handleNavClick('simulateur-global')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1"
          >
            Simulateur
          </button>
          <button
            onClick={() => handleNavClick('suivi')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1"
          >
            Suivi conteneur
          </button>
          <button
            onClick={onOpenSourcing}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 text-stone-900 font-semibold"
          >
            Sourcing sur mesure
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1"
          >
            Contact
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Admin link */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
            title="Espace équipe"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Cart / Devis button */}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Voir le devis"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Devis</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-stone-900 bg-white rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-950 lg:hidden rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-5 py-4 space-y-3 shadow-md animate-in fade-in duration-150">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('catalogue')}
              className="text-left py-1.5 hover:text-stone-950 transition-colors"
            >
              Catalogue
            </button>
            <button
              onClick={() => handleNavClick('simulateur-global')}
              className="text-left py-1.5 hover:text-stone-950 transition-colors"
            >
              Simulateur de coût
            </button>
            <button
              onClick={() => handleNavClick('suivi')}
              className="text-left py-1.5 hover:text-stone-950 transition-colors"
            >
              Suivi de commande &amp; conteneur
            </button>
            <button
              onClick={() => { onOpenSourcing(); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-950 font-semibold hover:text-stone-700 transition-colors"
            >
              Sourcing sur mesure en Chine
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-1.5 hover:text-stone-950 transition-colors"
            >
              Contact &amp; Showroom Tampouy
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encodeURIComponent('Bonjour Burkimba Transit, je souhaite des renseignements.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp (+226 67 30 74 09)</span>
            </a>

            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="text-left text-xs text-stone-500 py-1"
            >
              Accès Administration
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
