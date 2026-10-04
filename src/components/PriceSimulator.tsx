import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MessageSquare, 
  FileText, 
  Info, 
  Check 
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
      `*DEMANDE DE DEVIS - BURKIMBA TRANSIT*`,
      `Article : ${product.title}`,
      `Mode : ${shippingMode.replace('_', ' ').toUpperCase()}`,
      `Port : ${DEFAULT_SETTINGS.ports[arrivalPort].name}`,
      `Destination : ${destinationCity}`,
      `Douane : ${douaneOption === 'burkimba_cle_en_main' ? 'Clé en main (prise en charge)' : 'À ma charge'}`,
      `-----------------------------------------`,
      `• Achat usine : ${FORMAT_FCFA(simulation.prixAchatChineXOF)}`,
      `• Fret international : ${FORMAT_FCFA(simulation.fretXOF)}`,
      `• Frais portuaires & transit : ${FORMAT_FCFA(simulation.fraisPortuairesTransitXOF)}`,
      `• Transport vers ${destinationCity} : ${FORMAT_FCFA(simulation.transportTerrestreXOF)}`,
      douaneOption === 'burkimba_cle_en_main' 
        ? `• Droits de douane & transit : ${FORMAT_FCFA(simulation.douaneDroitsXOF + simulation.honorairesDedouanementXOF)}`
        : `• Droits de douane (indicatif) : ${FORMAT_FCFA(simulation.douaneDroitsXOF)}`,
      `-----------------------------------------`,
      `*TOTAL ESTIMÉ LIVRÉ : ${FORMAT_FCFA(simulation.totalLivreXOF)}*`
    ];
    return encodeURIComponent(lines.join('\n'));
  }, [product, simulation, shippingMode, arrivalPort, destinationCity, douaneOption]);

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className={`bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs ${className}`}>
      
      {/* Simulator Header */}
      <div className="pb-4 mb-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-stone-950">
            Simulateur de coût livré
          </h3>
          <p className="text-xs text-stone-500">
            {product.title}
          </p>
        </div>
      </div>

      {/* Selectable Options Grid (Clean & Sober) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        
        {/* 1. Mode d'expédition */}
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1">
            Mode d'expédition
          </label>
          <select
            value={shippingMode}
            onChange={(e) => setShippingMode(e.target.value as ShippingMode)}
            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none"
          >
            <option value="conteneur_20">Conteneur 20'</option>
            <option value="conteneur_40_hc">Conteneur 40' High Cube</option>
            <option value="roulier_roro">Roulier (Ro-Ro)</option>
            <option value="flat_rack">Plateau (Flat Rack)</option>
            <option value="fret_aerien">Fret aérien</option>
          </select>
        </div>

        {/* 2. Port de débarquement */}
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1">
            Port d'arrivée
          </label>
          <select
            value={arrivalPort}
            onChange={(e) => setArrivalPort(e.target.value as TransitPort)}
            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none"
          >
            <option value="lome">Port de Lomé</option>
            <option value="abidjan">Port d'Abidjan</option>
            <option value="cotonou">Port de Cotonou</option>
            <option value="aeroport_ouaga">Aéroport Ouaga (Aérien)</option>
          </select>
        </div>

        {/* 3. Ville de livraison finale */}
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1">
            Ville de destination
          </label>
          <select
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value as DestinationCity)}
            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none"
          >
            <option value="Ouagadougou">Ouagadougou</option>
            <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
            <option value="Koudougou">Koudougou</option>
            <option value="Ouahigouya">Ouahigouya</option>
            <option value="Fada N'Gourma">Fada N'Gourma</option>
          </select>
        </div>

        {/* 4. Option Douane */}
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1">
            Option douane
          </label>
          <select
            value={douaneOption}
            onChange={(e) => setDouaneOption(e.target.value as any)}
            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none"
          >
            <option value="burkimba_cle_en_main">Burkimba gère la douane</option>
            <option value="client_charge">Je gère la douane à l'arrivée</option>
          </select>
        </div>

      </div>

      {/* Line-by-Line Breakdown Table: ONLY in FCFA */}
      <div className="bg-stone-50/70 rounded-xl border border-stone-200 overflow-hidden mb-5">
        <div className="divide-y divide-stone-200 text-xs">
          {/* Ligne 1 : Prix d'achat */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-stone-700">1. Prix d'achat en usine</span>
            <span className="font-mono font-semibold text-stone-900 tabular-nums">
              {FORMAT_FCFA(simulation.prixAchatChineXOF)}
            </span>
          </div>

          {/* Ligne 2 : Fret international */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-stone-700">2. Fret international</span>
            <span className="font-mono font-semibold text-stone-900 tabular-nums">
              {FORMAT_FCFA(simulation.fretXOF)}
            </span>
          </div>

          {/* Ligne 3 : Frais portuaires */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-stone-700">3. Frais portuaires &amp; transit</span>
            <span className="font-mono font-semibold text-stone-900 tabular-nums">
              {FORMAT_FCFA(simulation.fraisPortuairesTransitXOF)}
            </span>
          </div>

          {/* Ligne 4 : Transport terrestre */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-stone-700">4. Acheminement vers {destinationCity}</span>
            <span className="font-mono font-semibold text-stone-900 tabular-nums">
              {FORMAT_FCFA(simulation.transportTerrestreXOF)}
            </span>
          </div>

          {/* Ligne 5 : Douane */}
          <div className="p-3 flex items-center justify-between bg-stone-100/50">
            <div>
              <span className="text-stone-700 font-medium">5. Droits de douane &amp; honoraires</span>
              {douaneOption === 'client_charge' && (
                <span className="text-[10px] text-stone-500 block">Non inclus au total</span>
              )}
            </div>
            <span className="font-mono font-semibold text-stone-900 tabular-nums">
              {douaneOption === 'burkimba_cle_en_main' 
                ? FORMAT_FCFA(simulation.douaneDroitsXOF + simulation.honorairesDedouanementXOF)
                : <span className="text-stone-500 font-normal">{FORMAT_FCFA(simulation.douaneDroitsXOF)} (indicatif)</span>
              }
            </span>
          </div>
        </div>

        {/* Total Row: Purely in FCFA */}
        <div className="p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Coût Total Livré Estimé
            </div>
            <div className="text-[11px] text-stone-500">
              Livraison à {destinationCity} {douaneOption === 'burkimba_cle_en_main' ? 'clés en main' : 'hors douane'}
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-bold font-mono text-stone-950 tabular-nums">
            {FORMAT_FCFA(simulation.totalLivreXOF)}
          </div>
        </div>
      </div>

      {/* Mention légale sobre */}
      <p className="text-[11px] text-stone-500 italic mb-5">
        Estimation indicative valable jusqu'au {simulation.dateValidite}. Le devis ferme est confirmé avant la commande.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        <button
          onClick={handleOpenWhatsApp}
          className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[42px]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Demander un devis sur WhatsApp</span>
        </button>

        {onOrderQuote && (
          <button
            onClick={() => onOrderQuote(simulation)}
            className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[42px]"
          >
            <FileText className="w-4 h-4 text-stone-600" />
            <span>Ajouter au bon de commande</span>
          </button>
        )}
      </div>

    </div>
  );
};
