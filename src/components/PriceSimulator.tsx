import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MessageSquare, 
  FileText, 
  Info, 
  Check, 
  Ship, 
  Plane, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { TransitProduct, ShippingMode, TransitPort, DestinationCity } from '../types/transit';
import { 
  calculateFullLandedPrice, 
  FORMAT_FCFA, 
  DEFAULT_SETTINGS, 
  BURKIMBA_INFO 
} from '../data/transitData';

interface PriceSimulatorProps {
  product: TransitProduct;
  onOrderQuote?: (simulation: any) => void;
  className?: string;
  isStandalone?: boolean;
}

export const PriceSimulator: React.FC<PriceSimulatorProps> = ({
  product,
  onOrderQuote,
  className = '',
  isStandalone = false
}) => {
  const [shippingMode, setShippingMode] = useState<ShippingMode>(product.logistics.recommendedShipping);
  const [arrivalPort, setArrivalPort] = useState<TransitPort>('lome');
  const [destinationCity, setDestinationCity] = useState<DestinationCity>('Ouagadougou');
  const [douaneOption, setDouaneOption] = useState<'burkimba_cle_en_main' | 'client_charge'>('burkimba_cle_en_main');

  const simulation = useMemo(() => {
    return calculateFullLandedPrice(product, DEFAULT_SETTINGS, {
      shippingMode,
      arrivalPort,
      destinationCity,
      douaneOption
    });
  }, [product, shippingMode, arrivalPort, destinationCity, douaneOption]);

  const whatsappMessage = useMemo(() => {
    const lines = [
      `*DEMANDE DE COTATION FERME - BURKIMBA TRANSIT*`,
      `Équipement : ${product.title}`,
      `Mode d'expédition : ${shippingMode.replace('_', ' ').toUpperCase()}`,
      `Port de débarquement : ${DEFAULT_SETTINGS.ports[arrivalPort].name}`,
      `Destination finale : ${destinationCity}`,
      `Option Douane : ${douaneOption === 'burkimba_cle_en_main' ? 'Clé en main (prise en charge)' : 'À ma charge à l\'arrivée'}`,
      `-----------------------------------------`,
      `• Prix d'Achat Usine Chine : ${FORMAT_FCFA(simulation.prixAchatChineXOF)}`,
      `• Fret International : ${FORMAT_FCFA(simulation.fretXOF)}`,
      `• Frais Portuaires & Transit : ${FORMAT_FCFA(simulation.fraisPortuairesTransitXOF)}`,
      `• Acheminement Terrestre vers ${destinationCity} : ${FORMAT_FCFA(simulation.transportTerrestreXOF)}`,
      douaneOption === 'burkimba_cle_en_main' 
        ? `• Droits de Douane & Honoraires : ${FORMAT_FCFA(simulation.douaneDroitsXOF + simulation.honorairesDedouanementXOF)}`
        : `• Droits de Douane (indicatif) : ${FORMAT_FCFA(simulation.douaneDroitsXOF)}`,
      `-----------------------------------------`,
      `*TOTAL ESTIMÉ LIVRÉ : ${FORMAT_FCFA(simulation.totalLivreXOF)}*`,
      `\nMerci de me confirmer la disponibilité et le compte pour l'acompte.`
    ];
    return encodeURIComponent(lines.join('\n'));
  }, [product, simulation, shippingMode, arrivalPort, destinationCity, douaneOption]);

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className={`bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm ${className}`}>
      
      {/* Header */}
      <div className="pb-4 mb-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-stone-950">
              Simulateur de Coût Total Livré au Faso
            </h3>
            <p className="text-xs text-stone-600 font-medium truncate max-w-sm sm:max-w-md">
              {product.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 self-start sm:self-auto font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Calcul transparent en <strong>FCFA</strong></span>
        </div>
      </div>

      {/* Selectable Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        
        {/* 1. Mode d'expédition */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            1. Mode d'expédition
          </label>
          <select
            value={shippingMode}
            onChange={(e) => setShippingMode(e.target.value as ShippingMode)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-red-600"
          >
            <option value="conteneur_20">Conteneur 20' Dédié</option>
            <option value="conteneur_40_hc">Conteneur 40' High Cube</option>
            <option value="roulier_roro">Roulier Spécialisé (Ro-Ro)</option>
            <option value="flat_rack">Plateau (Flat Rack)</option>
            <option value="fret_aerien">Fret Aérien Express</option>
          </select>
        </div>

        {/* 2. Port de débarquement */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            2. Port d'Arrivée
          </label>
          <select
            value={arrivalPort}
            onChange={(e) => setArrivalPort(e.target.value as TransitPort)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-red-600"
          >
            <option value="lome">Port de Lomé (Corridor Togo)</option>
            <option value="abidjan">Port d'Abidjan (Corridor RCI)</option>
            <option value="cotonou">Port de Cotonou (Bénin)</option>
            <option value="aeroport_ouaga">Aéroport Ouaga (Aérien)</option>
          </select>
        </div>

        {/* 3. Ville de livraison */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            3. Destination Finale
          </label>
          <select
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value as DestinationCity)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-red-600"
          >
            <option value="Ouagadougou">Ouagadougou (Showroom Tampouy)</option>
            <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
            <option value="Koudougou">Koudougou</option>
            <option value="Ouahigouya">Ouahigouya</option>
            <option value="Fada N'Gourma">Fada N'Gourma</option>
          </select>
        </div>

        {/* 4. Option Douane */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            4. Option Douane
          </label>
          <select
            value={douaneOption}
            onChange={(e) => setDouaneOption(e.target.value as any)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-red-600"
          >
            <option value="burkimba_cle_en_main">Burkimba s'occupe de ma douane</option>
            <option value="client_charge">Je gère ma douane à l'arrivée</option>
          </select>
        </div>

      </div>

      {/* Line-by-Line Breakdown Table: ONLY in FCFA */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden mb-5">
        <div className="divide-y divide-stone-200 text-xs">
          
          {/* Ligne 1 : Achat usine */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white transition-colors">
            <div>
              <span className="font-bold text-stone-900">1. Prix d'achat en usine Chine</span>
              <span className="text-[11px] text-stone-500 block">Facture fournisseur export certifié</span>
            </div>
            <span className="font-mono font-bold text-stone-900 tabular-nums text-sm">
              {FORMAT_FCFA(simulation.prixAchatChineXOF)}
            </span>
          </div>

          {/* Ligne 2 : Fret international */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white transition-colors">
            <div>
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                {shippingMode === 'fret_aerien' ? <Plane className="w-3.5 h-3.5 text-blue-600" /> : <Ship className="w-3.5 h-3.5 text-blue-600" />}
                <span>2. Fret international maritime/aérien</span>
              </span>
              <span className="text-[11px] text-stone-500 block">Empotage et traversée vers {DEFAULT_SETTINGS.ports[arrivalPort].name}</span>
            </div>
            <span className="font-mono font-bold text-stone-900 tabular-nums text-sm">
              {FORMAT_FCFA(simulation.fretXOF)}
            </span>
          </div>

          {/* Ligne 3 : Frais portuaires */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white transition-colors">
            <div>
              <span className="font-bold text-stone-900">3. Frais portuaires &amp; transit</span>
              <span className="text-[11px] text-stone-500 block">Manutention quai, scanning conteneur, badge et B/L</span>
            </div>
            <span className="font-mono font-bold text-stone-900 tabular-nums text-sm">
              {FORMAT_FCFA(simulation.fraisPortuairesTransitXOF)}
            </span>
          </div>

          {/* Ligne 4 : Transport terrestre */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white transition-colors">
            <div>
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>4. Acheminement terrestre sécurisé vers {destinationCity}</span>
              </span>
              <span className="text-[11px] text-stone-500 block">Convoi routier remorque porte-char avec escorte</span>
            </div>
            <span className="font-mono font-bold text-stone-900 tabular-nums text-sm">
              {FORMAT_FCFA(simulation.transportTerrestreXOF)}
            </span>
          </div>

          {/* Ligne 5 : Douane */}
          <div className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-colors ${
            douaneOption === 'burkimba_cle_en_main' ? 'bg-amber-50/70' : 'bg-stone-100/60'
          }`}>
            <div>
              <span className="font-bold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>5. Douane &amp; Déclaration fiscale</span>
                {douaneOption === 'burkimba_cle_en_main' ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Inclus clé en main
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                    À la charge du client à l'arrivée
                  </span>
                )}
              </span>
              <span className="text-[11px] text-stone-500 block">Calculé sur valeur CAF (prix + fret + assurance)</span>
            </div>

            <div className="text-left sm:text-right">
              <span className="font-mono font-bold text-stone-900 tabular-nums text-sm">
                {douaneOption === 'burkimba_cle_en_main' 
                  ? FORMAT_FCFA(simulation.douaneDroitsXOF + simulation.honorairesDedouanementXOF)
                  : <span className="text-stone-400 line-through text-xs font-normal">Retiré du total</span>
                }
              </span>
              {douaneOption === 'client_charge' && (
                <div className="text-[11px] text-stone-500 font-mono">
                  (Estimation indicative : {FORMAT_FCFA(simulation.douaneDroitsXOF)})
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Total Row: Purely in FCFA */}
        <div className="p-4 sm:p-5 bg-white border-t-2 border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs sm:text-sm font-black uppercase text-red-600 tracking-wider">
              TOTAL ESTIMÉ LIVRÉ CLÉS EN MAIN
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Livraison prévue à {destinationCity} {douaneOption === 'burkimba_cle_en_main' ? 'avec quitus fiscal inclus' : 'hors frais de douane'}
            </div>
          </div>

          <div className="text-xl sm:text-3xl font-black font-mono text-red-700 tabular-nums">
            {FORMAT_FCFA(simulation.totalLivreXOF)}
          </div>
        </div>
      </div>

      {/* Mention légale obligatoire */}
      <div className="flex items-start gap-2 p-3 bg-stone-100 rounded-xl border border-stone-200 text-stone-600 text-xs mb-5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="italic">
          « Estimation indicative, valable jusqu'au {simulation.dateValidite}. Le devis ferme est confirmé par Burkimba Transit Transport avant toute commande. »
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={handleOpenWhatsApp}
          className="flex-1 py-3 px-5 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 text-stone-950" />
          <span>Demander le Devis Ferme via WhatsApp</span>
        </button>

        {onOrderQuote && (
          <button
            onClick={() => onOrderQuote(simulation)}
            className="py-3 px-5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-red-600/20 min-h-[44px]"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Ajouter au Bon de Commande</span>
          </button>
        )}
      </div>

    </div>
  );
};
