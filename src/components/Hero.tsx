import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Ship, Check } from 'lucide-react';
import { heroFleetImg, BURKIMBA_INFO } from '../data/transitData';

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
    <section id="top" className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-stone-200 bg-stone-950">
      {/* Background Hero Image with soft, elegant dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFleetImg}
          alt="Flotte Burkimba Transit Transport"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-medium tracking-wide mb-6 border border-white/15 backdrop-blur-xs">
          <span>Burkimba Transit Transport</span>
          <span className="text-stone-400">·</span>
          <span>Chine → Ouagadougou</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-4">
          Véhicules, camions &amp; engins importés de Chine
        </h1>

        {/* Short, light subtitle */}
        <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          Prix sortie usine, fret maritime et dédouanement complet livré à Ouagadougou. Suivez votre conteneur en temps réel.
        </p>

        {/* Clean, minimalist Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-xl transition-all cursor-pointer"
          >
            <span>Voir le catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onTrackOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Suivre un conteneur</span>
          </button>
        </div>

        {/* Minimalist 3-point summary */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-300 font-normal pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Tarifs directs usines Chine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            <span>Coût total livré en FCFA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            <span>Showroom &amp; bureau à Tampouy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
