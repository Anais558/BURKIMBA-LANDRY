import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Compass, Shield, Search, Calculator, Globe2 } from 'lucide-react';
import { BURKIMBA_INFO } from '../data/transitData';

interface NavbarProps {
  currentPage: string;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: string, category?: string) => void;
  onOpenSourcing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenSourcing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Warm harmonious brand top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left cursor-pointer group"
        >
          <div>
            <div className="text-base sm:text-lg font-black tracking-tight text-stone-900 group-hover:text-red-600 transition-colors uppercase flex items-center gap-1">
              <span className="text-red-600 font-extrabold">BURKIMBA</span>
              <span>TRANSIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block mb-0.5" />
            </div>
            <div className="text-[10px] text-stone-500 font-medium tracking-wider uppercase hidden xs:block">
              Tampouy · Véhicules &amp; Machines
            </div>
          </div>
        </button>

        {/* E-Commerce Multi-Page Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-stone-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 cursor-pointer transition-colors relative ${
              currentPage === 'home'
                ? 'text-red-600 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600'
                : 'hover:text-red-600'
            }`}
          >
            Accueil
          </button>

          <button
            onClick={() => handleNavClick('catalogue')}
            className={`py-1 cursor-pointer transition-colors relative flex items-center gap-1 ${
              currentPage === 'catalogue'
                ? 'text-red-600 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600'
                : 'hover:text-red-600'
            }`}
          >
            <span>Catalogue</span>
            <span className="text-[9px] font-black bg-red-100 text-red-700 px-1.5 py-0.2 rounded-full">
              Boutique
            </span>
          </button>

          <button
            onClick={() => handleNavClick('simulateur')}
            className={`py-1 cursor-pointer transition-colors relative flex items-center gap-1 ${
              currentPage === 'simulateur'
                ? 'text-red-600 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600'
                : 'hover:text-red-600'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulateur Coût</span>
          </button>

          <button
            onClick={() => handleNavClick('suivi')}
            className={`py-1 cursor-pointer transition-colors relative flex items-center gap-1 ${
              currentPage === 'suivi'
                ? 'text-red-600 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600'
                : 'hover:text-red-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-red-600" />
            <span>Suivi Conteneur</span>
          </button>

          <button
            onClick={onOpenSourcing}
            className="py-1 cursor-pointer transition-colors text-amber-700 font-bold hover:text-amber-800 flex items-center gap-1"
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Sourcing Chine</span>
          </button>

        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Admin Dedicated Page Trigger */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
              currentPage === 'admin'
                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border-stone-300'
            }`}
            title="Espace administration dédié"
          >
            <Shield className="w-3.5 h-3.5 text-stone-700" />
            <span>Admin</span>
          </button>

          {/* Cart & Devis Button */}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-black text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
            aria-label="Voir le devis"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Devis</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-stone-950 bg-amber-400 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-red-600 lg:hidden rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 py-5 space-y-3 shadow-xl animate-in fade-in duration-150">
          <div className="flex flex-col space-y-1 text-sm font-bold text-stone-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-xl transition-colors ${
                currentPage === 'home' ? 'bg-red-50 text-red-600 font-black' : 'hover:bg-stone-50'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('catalogue')}
              className={`text-left px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'catalogue' ? 'bg-red-50 text-red-600 font-black' : 'hover:bg-stone-50'
              }`}
            >
              <span>Catalogue Véhicules &amp; Engins</span>
              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">Boutique</span>
            </button>
            <button
              onClick={() => handleNavClick('simulateur')}
              className={`text-left px-3 py-2.5 rounded-xl transition-colors flex items-center gap-2 ${
                currentPage === 'simulateur' ? 'bg-red-50 text-red-600 font-black' : 'hover:bg-stone-50'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>Simulateur de Coût Livré au BurkinaFaso</span>
            </button>
            <button
              onClick={() => handleNavClick('suivi')}
              className={`text-left px-3 py-2.5 rounded-xl transition-colors flex items-center gap-2 ${
                currentPage === 'suivi' ? 'bg-red-50 text-red-600 font-black' : 'hover:bg-stone-50'
              }`}
            >
              <Compass className="w-4 h-4 text-red-600" />
              <span>Suivi de Conteneur &amp; Commande</span>
            </button>
            <button
              onClick={() => { onOpenSourcing(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 rounded-xl text-amber-700 font-black hover:bg-amber-50 flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4 text-amber-500" />
              <span>Sourcing sur Mesure en Chine</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left px-3 py-2.5 rounded-xl transition-colors flex items-center gap-2 ${
                currentPage === 'admin' ? 'bg-stone-900 text-white font-black' : 'hover:bg-stone-100 text-stone-700'
              }`}
            >
              <Shield className="w-4 h-4 text-stone-400" />
              <span>Page Administration Dédiée</span>
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200">
            <a
              href={`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encodeURIComponent('Bonjour Burkimba Transit, je souhaite des renseignements.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Tampouy (+226 67 30 74 09)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
