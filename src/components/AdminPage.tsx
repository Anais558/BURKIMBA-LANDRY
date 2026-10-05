import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Ship, 
  RefreshCw, 
  DollarSign, 
  Package, 
  FileText, 
  Plus, 
  Check, 
  History, 
  ArrowLeft,
  Users,
  Compass,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { TransitOrder, OrderTrackingStep, TransitProduct } from '../types/transit';
import { 
  DEFAULT_SETTINGS, 
  MOCK_TRACKING_ORDERS, 
  TRANSIT_PRODUCTS, 
  FORMAT_FCFA 
} from '../data/transitData';
import { BrandEmblem } from './BrandEmblem';

interface AdminPageProps {
  onBackToStore: () => void;
}

const STEP_LABELS: Record<OrderTrackingStep, string> = {
  commande: '1. Commandé',
  achete_en_chine: '2. Acheté en Chine',
  embarque: '3. Embarqué',
  en_mer_vol: '4. En Mer / En Vol',
  arrive_au_port: '5. Arrivé au Port',
  en_route_convoi: '6. En Route (Convoi)',
  dedouane: '7. Dédouané',
  livre: '8. Livré'
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

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'carte' | 'produits' | 'tarifs' | 'commandes' | 'journal'>('carte');
  const [adminRole, setAdminRole] = useState<'admin_principal' | 'gestionnaire'>('admin_principal');
  
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_SETTINGS.exchangeRateUSD_XOF);
  const [orders, setOrders] = useState<TransitOrder[]>(MOCK_TRACKING_ORDERS);
  const [products, setProducts] = useState<TransitProduct[]>(TRANSIT_PRODUCTS);
  const [actionLogs, setActionLogs] = useState<string[]>([
    '05/10/2026 09:30 - Connexion Direction Générale (Poste Tampouy)',
    '05/10/2026 08:45 - Taux de conversion appliqué : 1 USD = 615 FCFA',
    '04/10/2026 16:20 - Conteneur CMAU8194021 passé à "Arrivé au Port de Lomé" par le Gestionnaire',
    '02/10/2026 14:10 - Bon de commande BTT-2026-8492 validé pour 102 700 000 FCFA'
  ]);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 3500);
  };

  const handleAdvanceContainerStep = (orderNumber: string) => {
    setOrders(prev => prev.map(order => {
      if (order.orderNumber === orderNumber) {
        const nextStep = NEXT_STEP_MAP[order.currentStep];
        if (!nextStep) {
          showNotification(`La commande ${orderNumber} est déjà entièrement livrée.`);
          return order;
        }

        const logEntry = `${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - Conteneur ${order.containerNumber} avancé à "${STEP_LABELS[nextStep]}" par ${adminRole === 'admin_principal' ? 'DG' : 'Gestionnaire'}. Notification client WhatsApp envoyée.`;
        setActionLogs(logs => [logEntry, ...logs]);
        showNotification(`Étape mise à jour : "${STEP_LABELS[nextStep]}" pour ${order.containerNumber}. Client notifié !`);

        return {
          ...order,
          currentStep: nextStep,
          currentLocationName: nextStep === 'arrive_au_port' 
            ? 'Port Autonome de Lomé (Quai Conteneurs)'
            : nextStep === 'en_route_convoi'
            ? 'Corridor Lomé - Cinkansé - Ouaga (Convoi escorté)'
            : nextStep === 'dedouane'
            ? 'Entrepôt Ouaga Inter (Quitus fiscal délivré)'
            : nextStep === 'livre'
            ? 'Showroom Tampouy (Remise des clés)'
            : order.currentLocationName
        };
      }
      return order;
    }));
  };

  const handleUpdateExchangeRate = (newRate: number) => {
    setExchangeRate(newRate);
    const log = `${new Date().toLocaleDateString('fr-FR')} - Taux officiel fixé à 1 USD = ${newRate} FCFA par ${adminRole === 'admin_principal' ? 'DG' : 'Gestionnaire'}`;
    setActionLogs(prev => [log, ...prev]);
    showNotification(`Taux de conversion mis à jour : 1 USD = ${newRate} FCFA`);
  };

  const totalCA = orders.reduce((sum, o) => sum + o.totalXOF, 0);
  const totalPaye = orders.reduce((sum, o) => sum + o.montantPayeXOF, 0);
  const totalReste = orders.reduce((sum, o) => sum + o.resteAPayerXOF, 0);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
      
      {/* Top Header of Dedicated Admin Page */}
      <header className="sticky top-0 z-40 bg-stone-950 border-b border-stone-800 shadow-md">
        
        {/* Brand Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs font-bold text-stone-200 border border-stone-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Retour Boutique</span>
            </button>

            <div className="hidden xs:block h-6 w-px bg-stone-800" />

            <div className="flex items-center gap-2">
              <BrandEmblem size="sm" variant="red-gold" withTagline={false} />
              <div>
                <div className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                  <span className="text-red-500">BURKIMBA</span>
                  <span>ADMINISTRATION</span>
                  <span className="text-[10px] font-mono bg-red-950 text-red-300 border border-red-800 px-1.5 py-0.5 rounded font-bold">
                    PRO
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 hidden sm:block">
                  Direction Générale &amp; Gestion des Expéditions Chine
                </div>
              </div>
            </div>
          </div>

          {/* Role switcher & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
              <button
                type="button"
                onClick={() => setAdminRole('admin_principal')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
                  adminRole === 'admin_principal'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                DG Principal
              </button>
              <button
                type="button"
                onClick={() => setAdminRole('gestionnaire')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
                  adminRole === 'gestionnaire'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Gestionnaire
              </button>
            </div>
          </div>

        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar border-t border-stone-800/80 text-xs font-bold pt-1">
          <button
            onClick={() => setActiveTab('carte')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'carte'
                ? 'border-red-500 text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Ship className="w-4 h-4 text-amber-400" />
            <span>Suivi des Expéditions ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('produits')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'produits'
                ? 'border-red-500 text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Catalogue Chine ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tarifs')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'tarifs'
                ? 'border-red-500 text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Taux de Change &amp; Fret</span>
          </button>

          <button
            onClick={() => setActiveTab('commandes')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'commandes'
                ? 'border-red-500 text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Commandes &amp; Acomptes</span>
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'journal'
                ? 'border-red-500 text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-amber-400" />
            <span>Journal d'Activité</span>
          </button>
        </div>
      </header>

      {/* Notification Toast in Admin */}
      {notificationBanner && (
        <div className="bg-red-600 text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm animate-in slide-in-from-top duration-200">
          <Check className="w-4 h-4 text-amber-300" />
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Admin KPI Header Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4">
            <div className="text-xs text-stone-400 font-medium">Chiffre d'Affaires Engagé</div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
              {FORMAT_FCFA(totalCA)}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Acomptes encaissés : {FORMAT_FCFA(totalPaye)}</span>
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4">
            <div className="text-xs text-stone-400 font-medium">Conteneurs en Transit</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
              {orders.length} Expéditions
            </div>
            <div className="text-[10px] text-stone-400 mt-1">
              Lomé, Abidjan &amp; Mer de Chine
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4">
            <div className="text-xs text-stone-400 font-medium">Solde Client à Percevoir</div>
            <div className="text-xl sm:text-2xl font-black text-red-400 font-mono mt-1">
              {FORMAT_FCFA(totalReste)}
            </div>
            <div className="text-[10px] text-stone-400 mt-1">
              À régler à la livraison au showroom
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4">
            <div className="text-xs text-stone-400 font-medium">Taux de Change Régulé</div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
              1 USD = {exchangeRate} FCFA
            </div>
            <div className="text-[10px] text-stone-400 mt-1">
              Appliqué en direct au simulateur
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full">
        
        {/* TAB 1: Expéditions & Suivi maritime des conteneurs */}
        {activeTab === 'carte' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Expéditions en Cours &amp; Pilotage Conteneurs</span>
                  <span className="text-[10px] font-mono bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded font-bold">
                    Satellite Live
                  </span>
                </h2>
                <p className="text-xs text-stone-400">
                  Faites avancer le statut de chaque conteneur en 1 clic. Le client reçoit un message WhatsApp automatique sans avoir besoin d'appeler.
                </p>
              </div>
            </div>

            {/* Container tracking cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {orders.map((ord) => {
                const nextStep = NEXT_STEP_MAP[ord.currentStep];

                return (
                  <div
                    key={ord.orderNumber}
                    className="bg-stone-950 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-amber-400">
                            {ord.containerNumber}
                          </span>
                          <span className="text-xs text-stone-400">
                            ({ord.shippingCompany})
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold bg-red-950 text-red-400 px-2.5 py-0.5 rounded border border-red-800">
                          {ord.orderNumber}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h3 className="text-base font-bold text-white">
                          {ord.items[0]?.product.title} (x{ord.items[0]?.quantity})
                        </h3>
                        <div className="text-xs text-stone-400 mt-1 flex flex-wrap gap-2">
                          <span>Client : <strong className="text-stone-200">{ord.customerName}</strong></span>
                          <span>·</span>
                          <span>Tel : {ord.customerPhone}</span>
                          <span>·</span>
                          <span>Ville : {ord.customerCity}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3.5 bg-stone-900 rounded-xl border border-stone-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Statut actuel :</span>
                          <span className="font-bold text-white bg-red-900/60 px-2.5 py-0.5 rounded border border-red-700">
                            {STEP_LABELS[ord.currentStep]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Position :</span>
                          <span className="text-amber-300 font-medium">
                            {ord.currentLocationName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Arrivée prévue :</span>
                          <span className="text-emerald-400 font-mono font-bold">
                            {ord.estimatedArrivalDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 1-Click Action to advance container */}
                    <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-xs text-stone-400">
                        {nextStep ? `Prochaine étape : ${STEP_LABELS[nextStep]}` : 'Expédition finalisée'}
                      </div>

                      {nextStep && (
                        <button
                          onClick={() => handleAdvanceContainerStep(ord.orderNumber)}
                          className="w-full sm:w-auto px-4 py-2 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Passer à "{STEP_LABELS[nextStep]}"</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Produits et Catalogue Chine (ONLY FCFA) */}
        {activeTab === 'produits' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Gestion du Catalogue Chine</h2>
                <p className="text-xs text-stone-400">
                  Modifiez les prix fournisseurs en FCFA, les spécifications et la disponibilité sur le catalogue client.
                </p>
              </div>
              <button
                onClick={() => showNotification("Formulaire d'ajout d'équipement prêt")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Article</span>
              </button>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-stone-900 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Équipement</th>
                      <th className="py-3 px-3">Origine Usine</th>
                      <th className="py-3 px-3">Prix d'Achat FCFA</th>
                      <th className="py-3 px-3">Total Livré Estimé</th>
                      <th className="py-3 px-4 text-right">Disponibilité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {products.map((p) => {
                      const prixAchat = Math.round(p.priceChinaUSD * exchangeRate);
                      const prixLivre = Math.round(prixAchat * 1.35);

                      return (
                        <tr key={p.id} className="hover:bg-stone-900/50">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{p.title}</div>
                            <div className="text-[10px] text-stone-400 font-mono">{p.brand} · Réf {p.id}</div>
                          </td>
                          <td className="py-3 px-3 text-stone-300 font-medium">
                            {p.logistics.factoryLocation}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-white tabular-nums">
                            {FORMAT_FCFA(prixAchat)}
                          </td>
                          <td className="py-3 px-3 font-mono font-black text-red-400 tabular-nums">
                            {FORMAT_FCFA(prixLivre)}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-emerald-400">
                            {p.availability === 'disponible_ouaga' ? 'Disponible Ouaga' : p.availability === 'en_transit' ? 'En transit mer' : 'Sur commande'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Tarifs, Fret & Barème Douanier */}
        {activeTab === 'tarifs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Barème Douanier &amp; Taux de Change</h2>
              <p className="text-xs text-stone-400">
                Ajustez le taux de conversion officiel et les pourcentages de douane CAF.
              </p>
            </div>

            {/* Exchange rate card */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Taux Officiel Appliqué au Simulateur
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Actuel : <strong className="text-white font-mono text-sm">1 USD = {exchangeRate} FCFA</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(Number(e.target.value))}
                    disabled={adminRole === 'gestionnaire'}
                    className="w-28 px-3 py-2 text-xs font-mono font-bold bg-stone-900 border border-stone-700 rounded-xl text-white"
                  />
                  <button
                    onClick={() => handleUpdateExchangeRate(exchangeRate)}
                    disabled={adminRole === 'gestionnaire'}
                    className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer disabled:opacity-50"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-800 text-xs">
                <span className="text-stone-400">Préréglages marché :</span>
                {[605, 610, 615, 620, 625].map(rate => (
                  <button
                    key={rate}
                    onClick={() => handleUpdateExchangeRate(rate)}
                    disabled={adminRole === 'gestionnaire'}
                    className="px-2.5 py-1 text-xs font-mono bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-stone-300 cursor-pointer"
                  >
                    {rate} FCFA
                  </button>
                ))}
              </div>
            </div>

            {/* Customs Rates */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Droits de Douane Estimés sur Valeur CAF
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <div className="text-stone-400">Véhicules &amp; Camions</div>
                  <div className="text-xl font-bold font-mono text-red-400 mt-1">23% CAF</div>
                  <div className="text-[10px] text-stone-500 mt-1">Valeur de référence douane</div>
                </div>
                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <div className="text-stone-400">Engins BTP &amp; Mines</div>
                  <div className="text-xl font-bold font-mono text-amber-400 mt-1">12% CAF</div>
                  <div className="text-[10px] text-stone-500 mt-1">Régime préférentiel terrassement</div>
                </div>
                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <div className="text-stone-400">Machines Agricoles</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">6% CAF</div>
                  <div className="text-[10px] text-stone-500 mt-1">Soutien aux producteurs</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Commandes & Acomptes */}
        {activeTab === 'commandes' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Registre des Commandes &amp; Acomptes</h2>
            <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-stone-900 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">N° Commande</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Total Livré FCFA</th>
                      <th className="py-3 px-3">Acompte Reçu (40%)</th>
                      <th className="py-3 px-4 text-right">Reste à l'Arrivée (60%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {orders.map((o) => (
                      <tr key={o.orderNumber} className="hover:bg-stone-900/50">
                        <td className="py-3 px-4 font-mono font-bold text-amber-400">
                          {o.orderNumber}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{o.customerName}</div>
                          <div className="text-[10px] text-stone-400">{o.customerCity} · {o.customerPhone}</div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-white">
                          {FORMAT_FCFA(o.totalXOF)}
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                          {FORMAT_FCFA(o.montantPayeXOF)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-red-400 font-bold">
                          {FORMAT_FCFA(o.resteAPayerXOF)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Journal d'Activité */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Journal Sécurisé des Actions (2FA)</h2>
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 font-mono text-xs text-stone-300 space-y-2.5">
              {actionLogs.map((log, idx) => (
                <div key={idx} className="pb-2.5 border-b border-stone-800/80 last:border-b-0 break-words flex items-start gap-2">
                  <span className="text-amber-400 font-bold">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
