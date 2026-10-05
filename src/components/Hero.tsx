import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Ship, Globe2, Calculator } from 'lucide-react';
import { heroFleetImg, BURKIMBA_INFO } from '../data/transitData';
import { BrandEmblem } from './BrandEmblem';

interface HeroProps {
  onExploreCatalog: () => void;
  onTrackOrder: () => void;
  onOpenSourcing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreCatalog, 
  onTrackOrder,
  onOpenSourcing 
}) => {
  return (
    <section id="top" className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-stone-200">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFleetImg}
          alt="Flotte de camions et engins Burkimba Transit Transport"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        
        {/* Harmonious Brand Badge */}
        <div className="flex flex-col items-center mb-6">
          <BrandEmblem size="md" variant="light" withTagline={false} className="mb-3" />
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-stone-900/80 border border-amber-400/40 text-xs sm:text-sm font-semibold tracking-wider text-amber-300 uppercase shadow-sm">
            <span className="text-red-400 font-bold">BURKIMBA TRANSIT TRANSPORT</span>
            <span className="text-stone-500">·</span>
            <span className="text-amber-200">De l'Usine en Chine jusqu'au BurkinaFaso</span>
            <span className="text-stone-500 hidden sm:inline">·</span>
            <span className="text-stone-300 hidden sm:inline">Tampouy</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5 drop-shadow-md">
          Véhicules, Engins BTP &amp; Machines Importés de Chine au <span className="text-amber-400">Faso</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-xs">
          Commandez directement sortie usine. Obtenez le coût total livré en <strong className="text-white font-bold">FCFA</strong> (achat, fret, transit et douane clé en main) et suivez votre conteneur par satellite jusqu'à Ouagadougou.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-12 sm:mb-16">
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer border border-red-500 min-h-[44px]"
          >
            <span>Explorer le Catalogue E-commerce</span>
            <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
          </button>

          <button
            onClick={onTrackOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-black text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer border border-amber-300 min-h-[44px]"
          >
            <Compass className="w-4 h-4 text-stone-950 shrink-0" />
            <span>Suivre un Conteneur en Mer</span>
          </button>

          <button
            onClick={onOpenSourcing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-stone-900/90 hover:bg-stone-800 rounded-xl border border-stone-700 transition-all cursor-pointer min-h-[44px]"
          >
            <Globe2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sourcing sur Mesure</span>
          </button>
        </div>

        {/* Harmonious Proof Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto pt-6 border-t border-stone-800/80 text-left">
          <div className="p-3.5 bg-white/95 rounded-xl border-l-4 border-l-red-600 border border-stone-200 shadow-md text-stone-900">
            <div className="flex items-center gap-1.5 mb-1 text-red-600 font-black text-xs uppercase">
              <Globe2 className="w-4 h-4 text-red-600 shrink-0" />
              <span>Achat Direct Usines Chine</span>
            </div>
            <p className="text-xs text-stone-600">HOWO, SANY, XCMG, YTO sans intermédiaire au tarif usine.</p>
          </div>

          <div className="p-3.5 bg-white/95 rounded-xl border-l-4 border-l-amber-500 border border-stone-200 shadow-md text-stone-900">
            <div className="flex items-center gap-1.5 mb-1 text-amber-600 font-black text-xs uppercase">
              <Calculator className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Prix 100% en FCFA</span>
            </div>
            <p className="text-xs text-stone-600">Fret, manutention portuaire et douane calculés en toute transparence.</p>
          </div>

          <div className="p-3.5 bg-white/95 rounded-xl border-l-4 border-l-red-600 border border-stone-200 shadow-md text-stone-900">
            <div className="flex items-center gap-1.5 mb-1 text-red-600 font-black text-xs uppercase">
              <Ship className="w-4 h-4 text-red-600 shrink-0" />
              <span>Traçabilité Satellite</span>
            </div>
            <p className="text-xs text-stone-600">Position du navire et convoi terrestre notifiés sur WhatsApp.</p>
          </div>

          <div className="p-3.5 bg-white/95 rounded-xl border-l-4 border-l-amber-500 border border-stone-200 shadow-md text-stone-900">
            <div className="flex items-center gap-1.5 mb-1 text-amber-600 font-black text-xs uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Livraison à Tampouy</span>
            </div>
            <p className="text-xs text-stone-600">Quitus fiscal et inspection sur parc sécurisé à Ouagadougou.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
