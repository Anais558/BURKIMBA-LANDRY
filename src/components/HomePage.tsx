import React from 'react';
import { Hero } from './Hero';
import { ServicesSection } from './ServicesSection';
import { ContactSection } from './ContactSection';
import { TransitProduct } from '../types/transit';
import { VehicleCard } from './VehicleCard';
import { ArrowRight, Truck, HardHat, Tractor, ShieldCheck, Calculator, Compass, Sparkles } from 'lucide-react';

interface HomePageProps {
  products: TransitProduct[];
  onNavigateToCatalog: (category?: string) => void;
  onNavigateToTracking: () => void;
  onNavigateToSimulator: (product?: TransitProduct) => void;
  onNavigateToContact: () => void;
  onOpenSourcing: () => void;
  onSelectProduct: (product: TransitProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigateToCatalog,
  onNavigateToTracking,
  onNavigateToSimulator,
  onNavigateToContact,
  onOpenSourcing,
  onSelectProduct
}) => {
  // Top 3 featured machines
  const featuredProducts = products.slice(0, 3);

  const categoriesCards = [
    {
      id: 'vehicules',
      title: 'Camions & Gros Porteurs',
      desc: 'Bennes Sinotruk HOWO 8x4, 6x4, tracteurs routiers semi-remorques et bus.',
      icon: Truck,
      count: products.filter(p => p.category === 'vehicules').length
    },
    {
      id: 'engins-btp',
      title: 'Engins BTP & Carrières',
      desc: 'Pelleteuses hydrauliques SANY, chargeuses XCMG, niveleuses et bulldozers.',
      icon: HardHat,
      count: products.filter(p => p.category === 'engins-btp').length
    },
    {
      id: 'machines-agricoles',
      title: 'Machines Agricoles & Usines',
      desc: 'Tracteurs YTO, groupes électrogènes Weichai insonorisés et agro-transformation.',
      icon: Tractor,
      count: products.filter(p => p.category === 'machines-agricoles').length
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <Hero
        onExploreCatalog={() => onNavigateToCatalog('all')}
        onTrackOrder={onNavigateToTracking}
        onOpenSourcing={onOpenSourcing}
      />

      {/* 2. Top Categories Showcase */}
      <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-red-600 font-extrabold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Gammes Disponibles à l'Importation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                Explorez par Catégorie de Matériel
              </h2>
            </div>

            <button
              onClick={() => onNavigateToCatalog('all')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Accéder à tout le catalogue</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoriesCards.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigateToCatalog(cat.id)}
                  className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-red-400 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-stone-950 group-hover:text-red-600 transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                        {cat.count} modèles
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mt-2">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1 text-xs font-bold text-red-600">
                    <span>Parcourir cette catégorie</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Featured Products Grid (with ONLY FCFA) */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-red-600 font-extrabold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Sélection Usine en Vedette</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                Équipements les Plus Demandés
              </h2>
              <p className="mt-1 text-xs sm:text-base text-stone-600">
                Disponibles immédiatement sur commande avec départ usine garanti et inspection technique préalable.
              </p>
            </div>

            <button
              onClick={() => onNavigateToCatalog('all')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>Voir tout le catalogue ({products.length})</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <VehicleCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onOpenSimulator={() => onNavigateToSimulator(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Sourcing & Custom Search Banner */}
      <section className="py-12 bg-stone-950 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-red-950/40 p-6 sm:p-10 rounded-3xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Recherche Spécifique en Chine</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Vous ne trouvez pas votre équipement exact ?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Nos agents francophones basés à Shanghai, Jinan et Guangzhou recherchent votre véhicule, camion ou machine industrielle directement sur les parcs constructeurs selon votre cahier des charges.
              </p>
            </div>

            <button
              onClick={onOpenSourcing}
              className="py-3 px-6 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              Lancer une recherche en Chine
            </button>
          </div>
        </div>
      </section>

      {/* 5. Processus Logistique 4 étapes */}
      <ServicesSection />

      {/* 6. Contact & Tampouy Showroom */}
      <ContactSection />

    </div>
  );
};
