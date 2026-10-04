import React, { useState } from 'react';
import { X, Check, ExternalLink } from 'lucide-react';
import { TransitProduct } from '../types/transit';
import { FORMAT_FCFA, DEFAULT_SETTINGS } from '../data/transitData';
import { PriceSimulator } from './PriceSimulator';

interface VehicleModalProps {
  product: TransitProduct | null;
  onClose: () => void;
  onOrderQuote: (simulation: any) => void;
  onOpenSourcing: () => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  product,
  onClose,
  onOrderQuote,
  onOpenSourcing
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentImg = product.gallery[activeImageIndex] || product.mainImage;
  const prixAchatFCFA = Math.round(product.priceChinaUSD * DEFAULT_SETTINGS.exchangeRateUSD_XOF);
  const prixLivreFCFA = Math.round(prixAchatFCFA * 1.35);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 text-stone-900 rounded-2xl overflow-hidden shadow-xl my-2 sm:my-6 flex flex-col max-h-[94vh]">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 px-5 py-3.5 border-b border-stone-100 bg-white/95 backdrop-blur-xs flex items-center justify-between gap-3">
          <div className="text-xs text-stone-500 font-medium truncate">
            <span>{product.brand}</span>
            <span className="mx-1.5">·</span>
            <span>{product.year}</span>
            <span className="mx-1.5">·</span>
            <span>{product.condition}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Photo (NO location badge!) */}
          <div className="space-y-2">
            <div className="relative aspect-[16/10] bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
              <img
                src={currentImg}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx ? 'border-stone-900 opacity-100' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header: ONLY FCFA */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-950 leading-snug">
                {product.title}
              </h2>
              <div className="text-xs text-stone-500 mt-1">
                Poids : {product.logistics.weightKg} kg · Volume : {product.logistics.cbm} m³
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-[10px] text-stone-400 uppercase font-medium">Prix d'achat usine</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-stone-950 tabular-nums">
                {FORMAT_FCFA(prixAchatFCFA)}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                Estimé livré : {FORMAT_FCFA(prixLivreFCFA)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1.5">
              Description
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
              Équipements &amp; caractéristiques
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 bg-stone-50 rounded-lg text-stone-700">
                  <Check className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="text-xs bg-stone-50 rounded-xl p-4 space-y-2 border border-stone-200/60">
            <div className="flex justify-between py-1 border-b border-stone-200/40">
              <span className="text-stone-500">Moteur</span>
              <span className="font-medium text-stone-900">{product.specs.moteur}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-200/40">
              <span className="text-stone-500">Puissance</span>
              <span className="font-medium text-stone-900">{product.specs.puissance}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-200/40">
              <span className="text-stone-500">Transmission</span>
              <span className="font-medium text-stone-900">{product.specs.transmission}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-200/40">
              <span className="text-stone-500">Dimensions</span>
              <span className="font-medium text-stone-900">{product.specs.dimensions}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-500">Garantie</span>
              <span className="font-medium text-stone-900">{product.specs.garantieUsine}</span>
            </div>
          </div>

          {/* Simulator Component inside modal */}
          <div className="pt-2">
            <PriceSimulator 
              product={product} 
              onOrderQuote={onOrderQuote}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
