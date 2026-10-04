import React from 'react';
import { Ship, FileCheck, Truck, Globe2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const steps = [
    {
      icon: Globe2,
      num: '01',
      title: 'Achat direct usine',
      desc: 'Négociation et inspection technique avant empotage en Chine.'
    },
    {
      icon: Ship,
      num: '02',
      title: 'Fret maritime',
      desc: 'Expédition en conteneur sécurisé ou navire roulier.'
    },
    {
      icon: FileCheck,
      num: '03',
      title: 'Transit & Douane',
      desc: 'Formalités portuaires et dédouanement complet Ouaga Inter.'
    },
    {
      icon: Truck,
      num: '04',
      title: 'Livraison',
      desc: 'Convoi par remorque jusqu\'au showroom de Tampouy ou votre chantier.'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
            Processus d'importation
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Un accompagnement transparent de l'usine jusqu'à la remise des clés.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-stone-50 border border-stone-200/80 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-stone-400">
                    <Icon className="w-5 h-5 text-stone-700" />
                    <span className="font-mono text-xs font-semibold">{item.num}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-950 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
