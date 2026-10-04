import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Download, 
  Check,
  Ship
} from 'lucide-react';
import { TransitOrder, OrderTrackingStep } from '../types/transit';
import { MOCK_TRACKING_ORDERS, FORMAT_FCFA, BURKIMBA_INFO } from '../data/transitData';

const ALL_STEPS: { step: OrderTrackingStep; label: string }[] = [
  { step: 'commande', label: 'Commandé' },
  { step: 'achete_en_chine', label: 'Acheté en Chine' },
  { step: 'embarque', label: 'Embarqué' },
  { step: 'en_mer_vol', label: 'En Mer / En Vol' },
  { step: 'arrive_au_port', label: 'Arrivé au Port' },
  { step: 'en_route_convoi', label: 'En Route' },
  { step: 'dedouane', label: 'Dédouané' },
  { step: 'livre', label: 'Livré' }
];

export const TrackingPortal: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<TransitOrder | null>(MOCK_TRACKING_ORDERS[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const found = MOCK_TRACKING_ORDERS.find(
      o => o.orderNumber.toUpperCase() === query || 
           o.containerNumber?.toUpperCase() === query ||
           o.customerPhone.includes(query) ||
           o.customerName.toUpperCase().includes(query)
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      setErrorMessage(`Aucune expédition trouvée pour "${searchInput}".`);
    }
  };

  const getStepIndex = (step: OrderTrackingStep) => {
    return ALL_STEPS.findIndex(s => s.step === step);
  };

  const handleDownloadDoc = (docName: string) => {
    setDownloadSuccessMsg(`Document "${docName}" prêt`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 2500);
  };

  return (
    <section id="suivi" className="py-12 sm:py-16 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="max-w-xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
            Suivi de commande &amp; conteneur
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Suivez l'avancement de votre matériel depuis l'embarquement jusqu'à Ouagadougou.
          </p>

          {/* Clean Search Bar */}
          <form onSubmit={handleSearch} className="mt-5 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="N° de commande ou de conteneur..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
            >
              Suivre
            </button>
          </form>

          {errorMessage && (
            <p className="text-xs text-stone-600 mt-2">
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-stone-500">
            <span>Exemples :</span>
            <button
              type="button"
              onClick={() => { setSelectedOrder(MOCK_TRACKING_ORDERS[0]); setSearchInput('BTT-2026-8492'); }}
              className="text-stone-800 underline cursor-pointer font-mono"
            >
              BTT-2026-8492
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => { setSelectedOrder(MOCK_TRACKING_ORDERS[1]); setSearchInput('BTT-2026-7731'); }}
              className="text-stone-800 underline cursor-pointer font-mono"
            >
              BTT-2026-7731
            </button>
          </div>
        </div>

        {/* Selected Order Display */}
        {selectedOrder ? (
          <div className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden max-w-4xl mx-auto">
            
            {/* Top Order Bar */}
            <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-900">
                    {selectedOrder.orderNumber}
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs text-stone-500">
                    {selectedOrder.createdAt}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {selectedOrder.items[0]?.product.title}
                </h3>
              </div>

              <div className="sm:text-right">
                <div className="text-xs font-semibold text-stone-900 flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>{selectedOrder.currentLocationName}</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Arrivée prévue : <span className="font-semibold text-stone-800">{selectedOrder.estimatedArrivalDate}</span>
                </div>
              </div>
            </div>

            {/* 8-Step Progress Bar (Clean minimal dots) */}
            <div className="p-4 sm:p-6 border-b border-stone-100">
              <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-8 gap-2 text-center text-xs">
                {ALL_STEPS.map((s, idx) => {
                  const currentIndex = getStepIndex(selectedOrder.currentStep);
                  const isCompleted = idx < currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div
                      key={s.step}
                      className={`p-2 rounded-xl border transition-colors ${
                        isCurrent
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : isCompleted
                          ? 'border-stone-200 bg-stone-50 text-stone-700'
                          : 'border-stone-100 text-stone-400 bg-white'
                      }`}
                    >
                      <div className="text-[10px] mb-1">
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="text-[10px] leading-tight">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details & Financial Summary (ONLY FCFA) */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                  Informations de transport
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">N° Conteneur :</span>
                  <span className="font-mono font-medium text-stone-900">{selectedOrder.containerNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Compagnie :</span>
                  <span className="text-stone-900">{selectedOrder.shippingCompany}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Navire :</span>
                  <span className="text-stone-900">{selectedOrder.vesselName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Port de départ :</span>
                  <span className="text-stone-900">{selectedOrder.departurePort}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                  Règlement de la commande
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Total devis livré :</span>
                  <span className="font-mono font-semibold text-stone-900">{FORMAT_FCFA(selectedOrder.totalXOF)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Acompte réglé :</span>
                  <span className="font-mono text-stone-700">{FORMAT_FCFA(selectedOrder.montantPayeXOF)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-900 font-semibold">Reste à l'arrivée :</span>
                  <span className="font-mono font-bold text-stone-950">{FORMAT_FCFA(selectedOrder.resteAPayerXOF)}</span>
                </div>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </section>
  );
};
