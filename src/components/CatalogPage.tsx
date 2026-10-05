import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, X, Filter, Check, Globe2 } from 'lucide-react';
import { TransitProduct, ProductCategory } from '../types/transit';
import { VehicleCard } from './VehicleCard';
import { DEFAULT_SETTINGS, FORMAT_FCFA } from '../data/transitData';

interface CatalogPageProps {
  products: TransitProduct[];
  onSelectProduct: (product: TransitProduct) => void;
  onOpenSimulator: (product: TransitProduct) => void;
  onOpenSourcing: () => void;
  initialCategory?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'vehicules', label: 'Véhicules, Camions & 4x4' },
  { id: 'engins-btp', label: 'Engins BTP & Mines' },
  { id: 'machines-agricoles', label: 'Machines Agricoles & Usines' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'Tous les budgets' },
  { id: 'under_20m', label: 'Moins de 20 Millions FCFA', max: 20000000 },
  { id: '20m_35m', label: '20M à 35 Millions FCFA', min: 20000000, max: 35000000 },
  { id: '35m_50m', label: '35M à 50 Millions FCFA', min: 35000000, max: 50000000 },
  { id: 'above_50m', label: 'Plus de 50 Millions FCFA', min: 50000000 }
];

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  onSelectProduct,
  onOpenSimulator,
  onOpenSourcing,
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute products and apply all filters
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (selectedAvailability !== 'all' && p.availability !== selectedAvailability) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'all') {
        if (selectedCondition === 'neuf' && !p.condition.includes('Neuf')) return false;
        if (selectedCondition === 'occasion' && !p.condition.includes('Occasion')) return false;
      }

      // Price range in FCFA (Prix d'achat Chine en FCFA)
      const priceFCFA = p.priceChinaUSD * DEFAULT_SETTINGS.exchangeRateUSD_XOF;
      if (selectedPriceRange !== 'all') {
        const range = PRICE_RANGES.find(r => r.id === selectedPriceRange);
        if (range) {
          if (range.min !== undefined && priceFCFA < range.min) return false;
          if (range.max !== undefined && priceFCFA > range.max) return false;
        }
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesModel = p.model.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCategory = p.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceChinaUSD - b.priceChinaUSD;
      if (sortBy === 'price-desc') return b.priceChinaUSD - a.priceChinaUSD;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [products, selectedCategory, selectedAvailability, selectedCondition, selectedPriceRange, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedAvailability('all');
    setSelectedCondition('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedAvailability !== 'all' || selectedCondition !== 'all' || selectedPriceRange !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="bg-stone-50 min-h-screen pb-16">
      
      {/* Top Banner with Breadcrumbs */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
            <span className="hover:text-red-600 transition-colors">Accueil</span>
            <span>/</span>
            <span className="text-stone-900 font-bold">Catalogue E-commerce Chine</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2 border border-red-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Vente Directe Usines · Déstockage &amp; Importation</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                Catalogue Véhicules, Camions &amp; Engins
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl">
                Matériels neufs et révisés certifiés export. Tous les prix sont indiqués en <strong className="text-stone-900 font-bold">FCFA</strong> avec calcul automatique du coût d'acheminement jusqu'au Faso.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer self-start"
            >
              <Filter className="w-4 h-4 text-amber-300" />
              <span>Filtrer les équipements ({filteredProducts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS (Sticky on left) */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-900 tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <span>Filtres Catalogue</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Effacer</span>
                </button>
              )}
            </div>

            {/* Search Input in Sidebar */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Modèle, marque..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Catégorie
              </label>
              <div className="space-y-1.5 text-xs">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count = cat.id === 'all'
                    ? products.length
                    : products.filter(p => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter (in FCFA) */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Budget en FCFA
              </label>
              <div className="space-y-1.5 text-xs">
                {PRICE_RANGES.map((r) => {
                  const isSelected = selectedPriceRange === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedPriceRange(r.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'text-red-700 font-bold bg-red-50'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-red-600 bg-red-600' : 'border-stone-300 bg-white'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Disponibilité
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-red-600"
              >
                <option value="all">Toutes disponibilités</option>
                <option value="disponible_ouaga">Disponible à Ouaga</option>
                <option value="en_transit">En transit maritime</option>
                <option value="sur_commande_chine">Sur commande en Chine</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                État du matériel
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-red-600"
              >
                <option value="all">Tous (Neuf et Occasion)</option>
                <option value="neuf">Neuf d'Usine 0 km</option>
                <option value="occasion">Occasion Certifiée</option>
              </select>
            </div>

            {/* Sourcing Callout Card */}
            <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-xl text-xs space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Besoin d'un autre engin ?</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Nos acheteurs en Chine cherchent votre machine sur mesure directement auprès des fabricants.
              </p>
              <button
                onClick={onOpenSourcing}
                className="w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
              >
                Faire une recherche
              </button>
            </div>

          </aside>

          {/* MAIN CATALOG RESULTS AREA */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Top Toolbar: Active Filters & Sorting */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-500 font-mono">
                  <strong className="text-red-600 font-bold text-sm">{filteredProducts.length}</strong> équipements trouvés
                </span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                    <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span>
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-red-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedPriceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    <span>{PRICE_RANGES.find(r => r.id === selectedPriceRange)?.label}</span>
                    <button onClick={() => setSelectedPriceRange('all')} className="hover:text-amber-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <span className="text-stone-500 font-medium">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-bold focus:outline-none focus:border-red-600"
                >
                  <option value="featured">Sélection Recommandée</option>
                  <option value="price-asc">Prix FCFA : Moins cher</option>
                  <option value="price-desc">Prix FCFA : Plus cher</option>
                  <option value="year-desc">Année : Plus récent</option>
                </select>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <VehicleCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onOpenSimulator={onOpenSimulator}
                  />
                ))}
              </div>
            ) : (
              /* Zero Results Fallback */
              <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <Filter className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  Aucun matériel ne correspond à vos filtres
                </h3>
                <p className="text-xs text-stone-500">
                  Essayez d'élargir votre recherche ou de réinitialiser les critères.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                  <button
                    onClick={onOpenSourcing}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Demande sur mesure
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white p-5 flex flex-col justify-between shadow-2xl text-stone-900">
              
              <div className="space-y-5 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-950">
                    <Filter className="w-4 h-4 text-red-600" />
                    <span>Filtres du catalogue</span>
                  </div>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-stone-400 hover:text-stone-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <div className="text-xs font-bold uppercase text-stone-800 mb-2">Catégorie</div>
                  <div className="space-y-1 text-xs">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                          selectedCategory === cat.id ? 'bg-red-600 text-white font-bold' : 'bg-stone-50 text-stone-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget FCFA */}
                <div>
                  <div className="text-xs font-bold uppercase text-stone-800 mb-2">Budget FCFA</div>
                  <div className="space-y-1 text-xs">
                    {PRICE_RANGES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedPriceRange(r.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                          selectedPriceRange === r.id ? 'bg-amber-400 font-bold text-stone-950' : 'text-stone-600'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <div className="text-xs font-bold uppercase text-stone-800 mb-1.5">Disponibilité</div>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full text-xs font-bold p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                  >
                    <option value="all">Toutes disponibilités</option>
                    <option value="disponible_ouaga">Disponible à Ouaga</option>
                    <option value="en_transit">En transit maritime</option>
                    <option value="sur_commande_chine">Sur commande en Chine</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons in drawer */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Voir les {filteredProducts.length} résultats
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl"
                >
                  Réinitialiser
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
