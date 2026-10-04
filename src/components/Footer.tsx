import React from 'react';
import { BURKIMBA_INFO } from '../data/transitData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenSourcing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenAdmin,
  onOpenSourcing 
}) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2">
            <div className="text-base font-bold text-white tracking-tight">
              BURKIMBA TRANSIT TRANSPORT
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Importation de véhicules, camions gros porteurs, engins BTP et machines industrielles de Chine vers le Burkina Faso.
            </p>
            <div className="text-[11px] text-stone-500 font-mono pt-1">
              RCCM : {BURKIMBA_INFO.rccm} · IFU : {BURKIMBA_INFO.ifu}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulateur-global')} className="hover:text-white transition-colors cursor-pointer">
                  Simulateur de coût
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('suivi')} className="hover:text-white transition-colors cursor-pointer">
                  Suivi de conteneur
                </button>
              </li>
              <li>
                <button onClick={onOpenSourcing} className="hover:text-white transition-colors cursor-pointer">
                  Sourcing sur mesure
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Bureau Tampouy
            </div>
            <div className="space-y-1 text-stone-400">
              <div>Secteur 21 · Ouagadougou</div>
              <div>Tél : <a href={`tel:${BURKIMBA_INFO.phone}`} className="hover:text-white font-mono">{BURKIMBA_INFO.phoneDisplay}</a></div>
              <div>WhatsApp : <a href={`https://wa.me/${BURKIMBA_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">{BURKIMBA_INFO.whatsappDisplay}</a></div>
              <div>
                <button onClick={onOpenAdmin} className="text-stone-500 hover:text-stone-300 mt-2 block">
                  Espace Administration
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Burkimba Transit Transport. Tous droits réservés.
          </div>
          <div>
            Ouagadougou · Bobo-Dioulasso · Lomé · Shanghai
          </div>
        </div>

      </div>
    </footer>
  );
};
