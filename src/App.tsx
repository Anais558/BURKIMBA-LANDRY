import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCatalog } from './components/VehicleCatalog';
import { VehicleModal } from './components/VehicleModal';
import { PriceSimulator } from './components/PriceSimulator';
import { TrackingPortal } from './components/TrackingPortal';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProformaModal } from './components/ProformaModal';
import { SourcingChinaModal } from './components/SourcingChinaModal';
import { AdminPanel } from './components/AdminPanel';
import { TRANSIT_PRODUCTS, BURKIMBA_INFO } from './data/transitData';
import { TransitProduct, PriceSimulation } from './types/transit';
import { MessageSquare, Check, X } from 'lucide-react';

export default function App() {
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
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
    }, 3000);
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
    showToast('Article retiré');
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, quantity } : item))
    );
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'vehicules' || sectionId === 'engins-btp' || sectionId === 'machines-agricoles') {
      setActiveCategory(sectionId);
      const catElement = document.getElementById('catalogue');
      if (catElement) {
        catElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans max-w-[100vw] overflow-x-hidden">
      
      {/* Minimal Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSourcing={() => setIsSourcingOpen(true)}
      />

      {/* Main Flow */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        
        {/* Section 1: Hero */}
        <Hero
          onExploreCatalog={() => scrollToSection('catalogue')}
          onTrackOrder={() => scrollToSection('suivi')}
          onOpenSourcing={() => setIsSourcingOpen(true)}
        />

        {/* Section 2: Catalogue */}
        <VehicleCatalog
          products={TRANSIT_PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenSimulator={(p) => setSelectedProduct(p)}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => setActiveCategory(cat)}
        />

        {/* Section 3: Simulateur de coût livré global */}
        <section id="simulateur-global" className="py-12 sm:py-16 bg-stone-50 text-stone-900 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                Simulateur de coût livré au Faso
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
                Choisissez un équipement pour visualiser le calcul complet : achat, fret, transit et douane.
              </p>

              {/* Selector pills */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {TRANSIT_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setStandaloneSimulatorProduct(prod)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      standaloneSimulatorProduct.id === prod.id
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {prod.brand} {prod.model.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Standalone Simulator Widget */}
            <PriceSimulator
              product={standaloneSimulatorProduct}
              onOrderQuote={handleAddToCart}
              isStandalone={true}
            />
          </div>
        </section>

        {/* Section 4: Suivi conteneur */}
        <TrackingPortal />

        {/* Section 5: Processus */}
        <ServicesSection />

        {/* Section 6: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSourcing={() => setIsSourcingOpen(true)}
      />

      {/* Product Detail Modal */}
      <VehicleModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrderQuote={handleAddToCart}
        onOpenSourcing={() => {
          setSelectedProduct(null);
          setIsSourcingOpen(true);
        }}
      />

      {/* Sourcing Modal */}
      <SourcingChinaModal
        isOpen={isSourcingOpen}
        onClose={() => setIsSourcingOpen(false)}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onGenerateProforma={() => setIsProformaOpen(true)}
      />

      {/* Proforma Modal */}
      <ProformaModal
        isOpen={isProformaOpen}
        onClose={() => setIsProformaOpen(false)}
        items={cart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-stone-900 text-white rounded-xl shadow-lg text-xs font-medium animate-in slide-in-from-bottom duration-150">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-stone-300" />
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

      {/* Discreet WhatsApp Button */}
      <a
        href={`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encodeURIComponent('Bonjour Burkimba Transit, je souhaite des renseignements.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium shadow-md transition-transform hover:scale-102 cursor-pointer border border-stone-700"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="hidden sm:inline">WhatsApp Tampouy</span>
      </a>

    </div>
  );
}
