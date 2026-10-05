import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { AdminPage } from './components/AdminPage';
import { PriceSimulator } from './components/PriceSimulator';
import { TrackingPortal } from './components/TrackingPortal';
import { VehicleModal } from './components/VehicleModal';
import { CartDrawer } from './components/CartDrawer';
import { ProformaModal } from './components/ProformaModal';
import { SourcingChinaModal } from './components/SourcingChinaModal';
import { Footer } from './components/Footer';
import { TRANSIT_PRODUCTS, BURKIMBA_INFO } from './data/transitData';
import { TransitProduct, PriceSimulation } from './types/transit';
import { MessageSquare, Check, X, Calculator, Compass, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue' | 'simulateur' | 'suivi' | 'admin'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('btt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<TransitProduct | null>(null);
  const [standaloneSimulatorProduct, setStandaloneSimulatorProduct] = useState<TransitProduct>(TRANSIT_PRODUCTS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProformaOpen, setIsProformaOpen] = useState(false);
  const [isSourcingOpen, setIsSourcingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('btt_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (simulation: PriceSimulation) => {
    setCart((prev) => {
      const existsIndex = prev.findIndex((item) => item.product?.id === simulation.product.id);
      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex].quantity += 1;
        updated[existsIndex].simulation = simulation;
        showToast(`Article mis à jour : ${simulation.product.title}`);
        return updated;
      } else {
        showToast(`Ajouté au devis : ${simulation.product.title}`);
        return [...prev, { product: simulation.product, simulation, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
    showToast('Article retiré du devis');
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, quantity } : item))
    );
  };

  const handleNavigate = (page: string, category?: string) => {
    if (page === 'admin') {
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'catalogue' || page === 'catalog') {
      if (category) {
        setActiveCategory(category);
      }
      setCurrentPage('catalogue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'simulateur' || page === 'simulator' || page === 'simulateur-global') {
      setCurrentPage('simulateur');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'suivi' || page === 'tracking') {
      setCurrentPage('suivi');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'contact' || page === 'showroom') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    // Default 'home'
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. DEDICATED FULL-PAGE ADMIN VIEW (Clean, Light & Modern)
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <AdminPage onBackToStore={() => handleNavigate('home')} />
        
        {/* Toast in Admin */}
        {toastMessage && (
          <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-red-600 text-white rounded-xl shadow-xl text-xs font-semibold">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-300" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // 2. MAIN E-COMMERCE CLIENT STORE VIEWS
  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans max-w-[100vw] overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onOpenSourcing={() => setIsSourcingOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        
        {/* PAGE 1: ACCUEIL */}
        {currentPage === 'home' && (
          <HomePage
            products={TRANSIT_PRODUCTS}
            onNavigateToCatalog={(cat) => handleNavigate('catalogue', cat)}
            onNavigateToTracking={() => handleNavigate('suivi')}
            onNavigateToSimulator={(prod) => {
              if (prod) setStandaloneSimulatorProduct(prod);
              handleNavigate('simulateur');
            }}
            onNavigateToContact={() => handleNavigate('contact')}
            onOpenSourcing={() => setIsSourcingOpen(true)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* PAGE 2: CATALOGUE DÉDIÉ (E-commerce scrolling with sidebar filters & only FCFA) */}
        {currentPage === 'catalogue' && (
          <CatalogPage
            products={TRANSIT_PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenSimulator={(p) => {
              setStandaloneSimulatorProduct(p);
              handleNavigate('simulateur');
            }}
            onOpenSourcing={() => setIsSourcingOpen(true)}
            initialCategory={activeCategory}
          />
        )}

        {/* PAGE 3: SIMULATEUR DE COÛT LIVRÉ AU BurkinaFaso */}
        {currentPage === 'simulateur' && (
          <div className="bg-stone-50 min-h-screen py-8 sm:py-12 border-b border-stone-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="text-xs text-stone-500 font-medium mb-3 flex items-center gap-1.5">
                <button
                  onClick={() => handleNavigate('home')}
                  className="hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Accueil</span>
                </button>
                <span>/</span>
                <span className="text-stone-900 font-bold">Simulateur de Coût Livré au BurkinaFaso</span>
              </div>

              {/* Title & Description */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Calcul Transparent 100% en FCFA</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                  Simulateur de Coût Tout Compris
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-3xl">
                  Sélectionnez un véhicule ou engin ci-dessous. Le calcul intègre automatiquement le prix d'achat usine en Chine, le fret maritime jusqu'au port de transit (Lomé, Cotonou ou Abidjan), le convoi routier et le dédouanement complet jusqu'au showroom de Tampouy à Ouagadougou.
                </p>

                {/* Equipment Selector Pills */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {TRANSIT_PRODUCTS.map((prod) => {
                    const isSelected = standaloneSimulatorProduct.id === prod.id;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => setStandaloneSimulatorProduct(prod)}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-red-600 text-white border-red-600 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-red-300 hover:bg-stone-50'
                        }`}
                      >
                        <span>{prod.brand} {prod.model.split(' ')[0]}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected ? 'bg-white/20 text-white font-bold' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {prod.category === 'vehicules' ? 'Camion' : prod.category === 'engins-btp' ? 'BTP' : 'Agri'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Standalone Simulator Widget */}
              <PriceSimulator
                product={standaloneSimulatorProduct}
                onOrderQuote={handleAddToCart}
                isStandalone={true}
              />
            </div>
          </div>
        )}

        {/* PAGE 4: SUIVI DE CONTENEUR & COMMANDE */}
        {currentPage === 'suivi' && (
          <div className="bg-stone-50 min-h-screen py-8 sm:py-12 border-b border-stone-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="text-xs text-stone-500 font-medium mb-4 flex items-center gap-1.5">
                <button
                  onClick={() => handleNavigate('home')}
                  className="hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Accueil</span>
                </button>
                <span>/</span>
                <span className="text-stone-900 font-bold">Portail de Suivi Satellite</span>
              </div>

              <TrackingPortal />
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => handleNavigate('admin')}
        onOpenSourcing={() => setIsSourcingOpen(true)}
      />

      {/* Vehicle Detail Modal */}
      <VehicleModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrderQuote={handleAddToCart}
        onOpenSourcing={() => {
          setSelectedProduct(null);
          setIsSourcingOpen(true);
        }}
      />

      {/* China Sourcing Modal */}
      <SourcingChinaModal
        isOpen={isSourcingOpen}
        onClose={() => setIsSourcingOpen(false)}
      />

      {/* Cart & Quote Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onGenerateProforma={() => setIsProformaOpen(true)}
      />

      {/* Proforma Invoice Modal */}
      <ProformaModal
        isOpen={isProformaOpen}
        onClose={() => setIsProformaOpen(false)}
        items={cart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-stone-900 text-white rounded-xl shadow-lg text-xs font-semibold animate-in slide-in-from-bottom duration-150">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Contact Button */}
      <a
        href={`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encodeURIComponent('Bonjour Burkimba Transit, je souhaite des renseignements sur vos véhicules et machines importés de Chine.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg transition-transform hover:scale-103 cursor-pointer border border-emerald-500"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageSquare className="w-4 h-4 text-white shrink-0" />
        <span className="hidden sm:inline">WhatsApp Tampouy</span>
      </a>

    </div>
  );
}
