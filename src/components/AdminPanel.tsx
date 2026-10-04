import React, { useState } from 'react';
import { 
  RefreshCw, 
  DollarSign, 
  Package, 
  FileText, 
  Plus, 
  History,
  X
} from 'lucide-react';
import { TransitOrder, OrderTrackingStep, TransitProduct } from '../types/transit';
import { 
  DEFAULT_SETTINGS, 
  MOCK_TRACKING_ORDERS, 
  TRANSIT_PRODUCTS, 
  FORMAT_FCFA 
} from '../data/transitData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEP_LABELS: Record<OrderTrackingStep, string> = {
  commande: 'Commandé',
  achete_en_chine: 'Acheté en Chine',
  embarque: 'Embarqué',
  en_mer_vol: 'En Mer / En Vol',
  arrive_au_port: 'Arrivé au Port',
  en_route_convoi: 'En Route',
  dedouane: 'Dédouané',
  livre: 'Livré'
};

const NEXT_STEP_MAP: Record<OrderTrackingStep, OrderTrackingStep | null> = {
  commande: 'achete_en_chine',
  achete_en_chine: 'embarque',
  embarque: 'en_mer_vol',
  en_mer_vol: 'arrive_au_port',
  arrive_au_port: 'en_route_convoi',
  en_route_convoi: 'dedouane',
  dedouane: 'livre',
  livre: null
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'carte' | 'produits' | 'tarifs' | 'commandes' | 'journal'>('carte');
  const [adminRole, setAdminRole] = useState<'admin_principal' | 'gestionnaire'>('admin_principal');
  
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_SETTINGS.exchangeRateUSD_XOF);
  const [orders, setOrders] = useState<TransitOrder[]>(MOCK_TRACKING_ORDERS);
  const [products, setProducts] = useState<TransitProduct[]>(TRANSIT_PRODUCTS);
  const [actionLogs, setActionLogs] = useState<string[]>([
    '04/10/2026 12:45 - Connexion Administrateur (Bureau Tampouy)',
    '04/10/2026 11:30 - Taux de conversion : 1 USD = 615 FCFA',
    '03/10/2026 16:20 - Conteneur CMAU8194021 passé à "Arrivé au Port de Lomé"',
    '02/10/2026 09:15 - Commande validée BTT-2026-8492'
  ]);

  if (!isOpen) return null;

  const handleAdvanceContainerStep = (orderNumber: string) => {
    setOrders(prev => prev.map(order => {
      if (order.orderNumber === orderNumber) {
        const nextStep = NEXT_STEP_MAP[order.currentStep];
        if (!nextStep) return order;

        const logEntry = `${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - Conteneur ${order.containerNumber} avancé à "${STEP_LABELS[nextStep]}".`;
        setActionLogs(logs => [logEntry, ...logs]);

        return {
          ...order,
          currentStep: nextStep,
          currentLocationName: nextStep === 'arrive_au_port' 
            ? 'Port Autonome de Lomé'
            : nextStep === 'en_route_convoi'
            ? 'En convoi vers Ouagadougou'
            : nextStep === 'dedouane'
            ? 'Dédouané à Ouaga Inter'
            : nextStep === 'livre'
            ? 'Livré au Showroom Tampouy'
            : order.currentLocationName
        };
      }
      return order;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      
      {/* Admin Window Container */}
      <div className="relative w-full max-w-5xl bg-white border border-stone-200 text-stone-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-sm font-bold text-stone-900">Administration Burkimba Transit</div>
            <div className="text-xs text-stone-500">Pilotage du catalogue, des conteneurs et des tarifs</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setAdminRole('admin_principal')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  adminRole === 'admin_principal' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-600'
                }`}
              >
                DG
              </button>
              <button
                type="button"
                onClick={() => setAdminRole('gestionnaire')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  adminRole === 'gestionnaire' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-600'
                }`}
              >
                Gestionnaire
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1 px-4 border-b border-stone-200 overflow-x-auto no-scrollbar text-xs font-medium shrink-0 bg-white">
          <button
            onClick={() => setActiveTab('carte')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'carte' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Expéditions ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('produits')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'produits' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Catalogue ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('tarifs')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tarifs' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Tarifs &amp; Douane
          </button>
          <button
            onClick={() => setActiveTab('commandes')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'commandes' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Commandes
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'journal' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Journal
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: Expéditions */}
          {activeTab === 'carte' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((ord) => {
                const nextStep = NEXT_STEP_MAP[ord.currentStep];
                return (
                  <div key={ord.orderNumber} className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-stone-900">{ord.containerNumber}</span>
                      <span className="font-mono text-stone-500">{ord.orderNumber}</span>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-stone-900">{ord.items[0]?.product.title}</div>
                      <div className="text-xs text-stone-500">Client : {ord.customerName} · {ord.customerCity}</div>
                    </div>

                    <div className="text-xs bg-white p-2.5 rounded-lg border border-stone-200/60 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Étape actuelle :</span>
                        <span className="font-medium text-stone-900">{STEP_LABELS[ord.currentStep]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Position :</span>
                        <span className="text-stone-800">{ord.currentLocationName}</span>
                      </div>
                    </div>

                    {nextStep && (
                      <button
                        onClick={() => handleAdvanceContainerStep(ord.orderNumber)}
                        className="w-full py-2 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Passer à "{STEP_LABELS[nextStep]}"</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Produits (ONLY FCFA) */}
          {activeTab === 'produits' && (
            <div className="bg-white border border-stone-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Article</th>
                    <th className="py-2.5 px-2">Prix d'achat FCFA</th>
                    <th className="py-2.5 px-2">Disponibilité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5 px-3 font-medium text-stone-900">{p.title}</td>
                      <td className="py-2.5 px-2 font-mono font-semibold">{FORMAT_FCFA(p.priceChinaUSD * exchangeRate)}</td>
                      <td className="py-2.5 px-2 text-stone-600">{p.availability === 'disponible_ouaga' ? 'À Ouaga' : p.availability === 'en_transit' ? 'En mer' : 'Sur commande'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Tarifs */}
          {activeTab === 'tarifs' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-semibold text-stone-900 mb-1">Taux de change USD → FCFA</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(Number(e.target.value))}
                    disabled={adminRole === 'gestionnaire'}
                    className="w-24 px-3 py-1.5 bg-white border border-stone-300 rounded-lg font-mono font-semibold"
                  />
                  <span className="text-stone-500">1 USD = {exchangeRate} FCFA</span>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-semibold text-stone-900 mb-2">Taux douaniers appliqués sur CAF</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <div className="text-stone-500">Véhicules &amp; Camions</div>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">23% CAF</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <div className="text-stone-500">Engins BTP</div>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">12% CAF</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <div className="text-stone-500">Machines Agricoles</div>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">6% CAF</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Commandes */}
          {activeTab === 'commandes' && (
            <div className="bg-white border border-stone-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Réf</th>
                    <th className="py-2.5 px-2">Client</th>
                    <th className="py-2.5 px-2">Total livré</th>
                    <th className="py-2.5 px-2">Acompte</th>
                    <th className="py-2.5 px-3 text-right">Reste</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((o) => (
                    <tr key={o.orderNumber}>
                      <td className="py-2.5 px-3 font-mono font-semibold">{o.orderNumber}</td>
                      <td className="py-2.5 px-2 font-medium">{o.customerName}</td>
                      <td className="py-2.5 px-2 font-mono font-semibold">{FORMAT_FCFA(o.totalXOF)}</td>
                      <td className="py-2.5 px-2 font-mono text-stone-600">{FORMAT_FCFA(o.montantPayeXOF)}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-950">{FORMAT_FCFA(o.resteAPayerXOF)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: Journal */}
          {activeTab === 'journal' && (
            <div className="space-y-2 text-xs font-mono text-stone-600">
              {actionLogs.map((log, idx) => (
                <div key={idx} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/60">
                  {log}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
