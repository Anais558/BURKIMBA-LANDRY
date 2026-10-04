import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { TransitProduct } from '../types/transit';
import { VehicleCard } from './VehicleCard';

interface VehicleCatalogProps {
  products: TransitProduct[];
  onSelectProduct: (product: TransitProduct) => void;
  onOpenSimulator: (product: TransitProduct) => void;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Tout le catalogue' },
  { id: 'vehicules', label: 'Véhicules & Camions' },
  { id: 'engins-btp', label: 'Engins BTP & Mines' },
  { id: 'machines-agricoles', label: 'Machines & Agricole' }
];

export const VehicleCatalog: React.FC<VehicleCatalogProps> = ({
  products,
  onSelectProduct,
  onOpenSimulator,
  activeCategory = 'all',
  onCategoryChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
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
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesModel = p.model.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesDesc) {
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
  }, [products, activeCategory, selectedAvailability, selectedCondition, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAvailability('all');
    setSelectedCondition('all');
    setSortBy('featured');
    if (onCategoryChange) {
      onCategoryChange('all');
    }
  };

  return (
    <section id="catalogue" className="py-12 sm:py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
              Catalogue Chine
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 max-w-lg">
              Véhicules neufs et révisés avec calcul immédiat du coût d'acheminement au Burkina Faso.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-mono">
            <span>{filteredProducts.length} articles disponibles</span>
          </div>
        </div>

        {/* Minimal Filter Bar */}
        <div className="space-y-3 mb-8">
          {/* Top row: search + selects */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Rechercher un modèle, une marque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
              />
            </div>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none"
            >
              <option value="all">Toutes disponibilités</option>
              <option value="disponible_ouaga">Disponible à Ouaga</option>
              <option value="en_transit">En transit</option>
              <option value="sur_commande_chine">Sur commande</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none"
            >
              <option value="featured">Tri : Recommandés</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
              <option value="year-desc">Année : Récente</option>
            </select>
          </div>

          {/* Clean Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200 max-w-md mx-auto p-6">
            <p className="text-sm text-stone-900 font-semibold mb-1">
              Aucun résultat pour cette recherche
            </p>
            <p className="text-xs text-stone-500 mb-4">
              Modifiez vos critères ou réinitialisez les filtres.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
