import React from 'react';
import { TransitProduct } from '../types/transit';
import { FORMAT_FCFA, DEFAULT_SETTINGS } from '../data/transitData';
import { Calculator, ArrowRight, Cog, Fuel, Gauge } from 'lucide-react';

interface VehicleCardProps {
  product: TransitProduct;
  onSelect: (product: TransitProduct) => void;
  onOpenSimulator: (product: TransitProduct) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  product,
  onSelect,
  onOpenSimulator
}) => {
  const prixAchatFCFA = Math.round(product.priceChinaUSD * DEFAULT_SETTINGS.exchangeRateUSD_XOF);
  const prixLivreFCFA = Math.round(prixAchatFCFA * 1.35);

  const availabilityConfig = {
    sur_commande_chine: { label: 'Sur commande en Chine', color: 'bg-stone-900 text-stone-100' },
    en_transit: { label: 'En transit maritime', color: 'bg-amber-500 text-stone-950 font-bold' },
    disponible_ouaga: { label: 'Disponible à Ouaga', color: 'bg-emerald-600 text-white font-bold' }
  }[product.availability];

  return (
    <div className="group flex flex-col bg-white border border-stone-200 hover:border-red-400 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
      
      {/* Clean Image Container (NO location badge on the cards!) */}
      <div 
        className="relative aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer" 
        onClick={() => onSelect(product)}
      >
        <img
          src={product.mainImage}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Availability Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-0.5 text-[11px] rounded-lg shadow-xs ${availabilityConfig.color}`}>
          {availabilityConfig.label}
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/95 text-stone-700 shadow-2xs border border-stone-200/80">
          {product.brand.split(' ')[0]}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="text-red-600 font-bold">{product.brand}</span>
            <span>·</span>
            <span>{product.year}</span>
            <span>·</span>
            <span>{product.condition}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
          >
            {product.title}
          </h3>

          {/* Quick specs icons */}
          <div className="grid grid-cols-3 gap-1.5 py-1.5 px-2.5 mb-4 rounded-xl bg-stone-50 border border-stone-200/70 text-[10px] sm:text-[11px] text-stone-600">
            <div className="flex items-center gap-1 truncate" title={product.specs.transmission}>
              <Cog className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{product.specs.transmission}</span>
            </div>
            <div className="flex items-center gap-1 truncate" title={product.specs.carburant}>
              <Fuel className="w-3 h-3 text-red-500 shrink-0" />
              <span className="truncate">{product.specs.carburant}</span>
            </div>
            <div className="flex items-center gap-1 truncate" title={product.specs.puissance}>
              <Gauge className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate font-mono font-semibold">{product.specs.puissance}</span>
            </div>
          </div>
        </div>

        {/* Pricing: ONLY in FCFA */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Prix d'Achat Chine
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-900 font-mono tabular-nums">
                {FORMAT_FCFA(prixAchatFCFA)}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-black text-red-600 uppercase tracking-wider">
                Total Livré Clé en Main
              </div>
              <div className="text-base sm:text-lg font-black text-red-700 font-mono tabular-nums">
                {FORMAT_FCFA(prixLivreFCFA)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="py-2.5 px-2 text-xs font-bold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer text-center"
            >
              Fiche &amp; Détails
            </button>
            <button
              onClick={() => onOpenSimulator(product)}
              className="py-2.5 px-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all shadow-xs cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>Simuler Coût</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
