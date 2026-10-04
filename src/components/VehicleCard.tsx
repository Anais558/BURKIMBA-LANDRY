import React from 'react';
import { TransitProduct } from '../types/transit';
import { FORMAT_FCFA, DEFAULT_SETTINGS, BURKIMBA_INFO } from '../data/transitData';
import { ArrowRight } from 'lucide-react';

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
  // Estimated total landed price in FCFA
  const prixAchatFCFA = Math.round(product.priceChinaUSD * DEFAULT_SETTINGS.exchangeRateUSD_XOF);
  const prixLivreFCFA = Math.round(prixAchatFCFA * 1.35);

  const availabilityLabel = {
    sur_commande_chine: 'Sur commande',
    en_transit: 'En transit',
    disponible_ouaga: 'Disponible à Ouaga'
  }[product.availability];

  return (
    <div className="group flex flex-col bg-white border border-stone-200/80 rounded-2xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200">
      
      {/* Clean Image Container (NO location badge on the cards!) */}
      <div 
        className="relative aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer" 
        onClick={() => onSelect(product)}
      >
        <img
          src={product.mainImage}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Minimalist discreet status pill */}
        <div className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-white/90 backdrop-blur-xs text-stone-800 shadow-2xs border border-stone-200/60">
          {availabilityLabel}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtle Category & Year */}
          <div className="text-[11px] text-stone-500 mb-1 font-medium">
            <span>{product.brand}</span>
            <span className="mx-1.5">·</span>
            <span>{product.year}</span>
            <span className="mx-1.5">·</span>
            <span>{product.condition}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
          >
            {product.title}
          </h3>

          {/* Key specs (Discreet & minimal) */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-4 pb-3 border-b border-stone-100">
            <span>{product.specs.transmission}</span>
            <span>·</span>
            <span>{product.specs.carburant}</span>
            <span>·</span>
            <span className="font-mono">{product.specs.puissance}</span>
          </div>
        </div>

        {/* Pricing & CTA: ONLY in FCFA */}
        <div>
          <div className="mb-3">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">
              Prix d'achat
            </div>
            <div className="text-base sm:text-lg font-bold text-stone-900 font-mono tabular-nums">
              {FORMAT_FCFA(prixAchatFCFA)}
            </div>
            <div className="text-[11px] text-stone-500">
              Coût estimé livré : <span className="font-semibold text-stone-800">{FORMAT_FCFA(prixLivreFCFA)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="py-2 px-3 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 transition-colors cursor-pointer text-center"
            >
              Fiche technique
            </button>
            <button
              onClick={() => onOpenSimulator(product)}
              className="py-2 px-3 text-xs font-medium rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
            >
              <span>Simuler</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
