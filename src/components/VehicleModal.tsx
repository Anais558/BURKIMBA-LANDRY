import React, { useState } from 'react';
import { X, Check, ExternalLink, ShieldCheck, MapPin, Video, FileText } from 'lucide-react';
import { TransitProduct } from '../types/transit';
import { FORMAT_FCFA, DEFAULT_SETTINGS, BURKIMBA_INFO } from '../data/transitData';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl bg-white border border-stone-200 text-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-2 sm:my-6 flex flex-col max-h-[94vh]">
        
        {/* Top ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600 shrink-0" />

        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 px-5 py-3.5 border-b border-stone-200 bg-stone-50/95 backdrop-blur-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono truncate">
            <span className="text-red-600 font-extrabold uppercase">{product.brand}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-600 truncate">{product.categoryLabel}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 font-bold">Réf. {product.id}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {product.videoUrl && (
              <a
                href={product.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-red-600" />
                <span>Vidéo TikTok</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-red-600 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-7 space-y-6 sm:space-y-8">
          
          {/* Main Photo (NO location badge on the photo!) */}
          <div className="space-y-2">
            <div className="relative aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={currentImg}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-white/95 backdrop-blur rounded-lg border border-stone-200 text-stone-900 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{product.condition}</span>
                <span>·</span>
                <span>Année {product.year}</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx ? 'border-red-600 ring-2 ring-red-600/20 opacity-100' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Pricing: ONLY in FCFA */}
          <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-red-600 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{product.brand} · {product.model}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 leading-tight">
                {product.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-2 font-mono">
                <span>Poids : {product.logistics.weightKg} kg</span>
                <span>·</span>
                <span>Volume : {product.logistics.cbm} m³</span>
                <span>·</span>
                <span>Expédition : {product.logistics.recommendedShipping.replace('_', ' ').toUpperCase()}</span>
              </div>
            </div>

            <div className="md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-200">
              <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">
                Prix d'Achat Usine
              </div>
              <div className="text-2xl font-black font-mono text-stone-900 tabular-nums">
                {FORMAT_FCFA(prixAchatFCFA)}
              </div>
              <div className="text-xs text-red-700 font-bold font-mono mt-0.5">
                Total estimé livré : {FORMAT_FCFA(prixLivreFCFA)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-red-600 font-black mb-2">
              Présentation &amp; Usage au Faso
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Features Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-red-600 font-black mb-3">
              Points Forts &amp; Conformité Export
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Specifications Sheet */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-red-600 font-black mb-3">
              Caractéristiques Techniques d'Usine
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs border border-stone-200 rounded-2xl overflow-hidden bg-white">
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Motorisation :</span>
                <span className="font-bold text-stone-900 text-right">{product.specs.moteur}</span>
              </div>
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Puissance Développée :</span>
                <span className="font-bold text-stone-900 text-right">{product.specs.puissance}</span>
              </div>
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Transmission :</span>
                <span className="font-bold text-stone-900 text-right">{product.specs.transmission}</span>
              </div>
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Dimensions Hors-Tout :</span>
                <span className="font-bold text-stone-900 text-right">{product.specs.dimensions}</span>
              </div>
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Charge Utile :</span>
                <span className="font-bold text-stone-900 text-right">{product.specs.chargeUtile || product.specs.capacite || 'Standard'}</span>
              </div>
              <div className="p-3.5 border-b border-stone-200 flex justify-between">
                <span className="text-stone-500">Origine Usine :</span>
                <span className="font-bold text-stone-900 text-right">{product.logistics.factoryLocation}</span>
              </div>
              <div className="p-3.5 md:col-span-2 flex justify-between bg-amber-50/70 border-t border-amber-200">
                <span className="text-stone-800 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Garantie Constructeur :
                </span>
                <span className="font-bold text-red-700 text-right">{product.specs.garantieUsine}</span>
              </div>
            </div>
          </div>

          {/* Integrated Price Simulator */}
          <div className="pt-4 border-t-2 border-stone-200">
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
