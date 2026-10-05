import React, { useState, useMemo } from 'react';
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
  AlertCircle,
  Search,
  Phone,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { TransitOrder, OrderTrackingStep, TransitProduct } from '../types/transit';
import { 
  DEFAULT_SETTINGS, 
  MOCK_TRACKING_ORDERS, 
  TRANSIT_PRODUCTS, 
  FORMAT_FCFA,
  BURKIMBA_INFO 
} from '../data/transitData';
import { BrandEmblem } from './BrandEmblem';

interface AdminPageProps {
  onBackToStore: () => void;
}

const STEP_LABELS: Record<OrderTrackingStep, string> = {
  commande: '1. Commandé',
  achete_en_chine: '2. Acheté en Chine',
  embarque: '3. Embarqué au Port',
  en_mer_vol: '4. En Mer (Transit)',
  arrive_au_port: '5. Arrivé au Port (Lomé)',
  en_route_convoi: '6. En Route (Convoi)',
  dedouane: '7. Dédouané (Ouaga Inter)',
  livre: '8. Livré au Client'
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
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [searchProductQuery, setSearchProductQuery] = useState('');
  
  const [actionLogs, setActionLogs] = useState<string[]>([
    '05/10/2026 10:15 - Consultation du tableau de bord Direction Générale (Tampouy)',
    '05/10/2026 09:30 - Taux officiel appliqué : 1 USD = 615 FCFA',
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

        const containerRef = order.containerNumber || order.orderNumber;
        const logEntry = `${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - Conteneur ${containerRef} avancé à "${STEP_LABELS[nextStep]}". Client notifié par WhatsApp.`;
        setActionLogs(logs => [logEntry, ...logs]);
        showNotification(`Étape mise à jour : "${STEP_LABELS[nextStep]}" pour ${containerRef}. Client notifié !`);

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

  const handleToggleProductAvailability = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const nextAvailability: Record<string, any> = {
          disponible_ouaga: 'en_transit',
          en_transit: 'sur_commande_chine',
          sur_commande_chine: 'disponible_ouaga'
        };
        const updated = nextAvailability[p.availability] || 'disponible_ouaga';
        showNotification(`Disponibilité mise à jour pour : ${p.title}`);
        return { ...p, availability: updated };
      }
      return p;
    }));
  };

  const handleUpdateExchangeRate = (newRate: number) => {
    if (newRate <= 0) return;
    setExchangeRate(newRate);
    const log = `${new Date().toLocaleDateString('fr-FR')} - Taux officiel fixé à 1 USD = ${newRate} FCFA`;
    setActionLogs(prev => [log, ...prev]);
    showNotification(`Taux de conversion mis à jour : 1 USD = ${newRate} FCFA`);
  };

  const totalCA = useMemo(() => orders.reduce((sum, o) => sum + o.totalXOF, 0), [orders]);
  const totalPaye = useMemo(() => orders.reduce((sum, o) => sum + o.montantPayeXOF, 0), [orders]);
  const totalReste = useMemo(() => orders.reduce((sum, o) => sum + o.resteAPayerXOF, 0), [orders]);

  const filteredOrders = useMemo(() => {
    if (!searchOrderQuery.trim()) return orders;
    const q = searchOrderQuery.toLowerCase();
    return orders.filter(o => 
      o.orderNumber.toLowerCase().includes(q) ||
      (o.containerNumber && o.containerNumber.toLowerCase().includes(q)) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.toLowerCase().includes(q) ||
      o.customerCity.toLowerCase().includes(q)
    );
  }, [orders, searchOrderQuery]);

  const filteredProducts = useMemo(() => {
    if (!searchProductQuery.trim()) return products;
    const q = searchProductQuery.toLowerCase();
    return products.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }, [products, searchProductQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* Top Header of Dedicated Admin Page (Clean, Light & Modern) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        
        {/* Brand Accent Top Line */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Return to store button + Brand info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-300 transition-colors cursor-pointer shadow-xs shrink-0"
              title="Quitter l'administration et revenir à la boutique client"
            >
              <ArrowLeft className="w-4 h-4 text-red-600" />
              <span className="hidden sm:inline">Retour Boutique</span>
              <span className="sm:hidden">Boutique</span>
            </button>

            <div className="hidden xs:block h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5">
              <BrandEmblem size="sm" variant="red-gold" withTagline={false} />
              <div>
                <div className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5 leading-none">
                  <span className="text-red-600">BURKIMBA</span>
                  <span>ADMINISTRATION</span>
                  <span className="text-[10px] font-mono bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded font-bold ml-1">
                    PRO
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block mt-1 font-medium">
                  Direction Générale Tampouy · Pilotage Expéditions &amp; Stocks
                </div>
              </div>
            </div>
          </div>

          {/* Right: Role selection & Active status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Système Connecté</span>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setAdminRole('admin_principal')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-bold cursor-pointer ${
                  adminRole === 'admin_principal'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                DG Tampouy
              </button>
              <button
                type="button"
                onClick={() => setAdminRole('gestionnaire')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-bold cursor-pointer ${
                  adminRole === 'gestionnaire'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Gestionnaire
              </button>
            </div>
          </div>

        </div>

        {/* Tab Navigation: Clean, bright and high visibility */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar border-t border-slate-200 text-xs font-bold pt-1 bg-white">
          <button
            onClick={() => setActiveTab('carte')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'carte'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ship className="w-4 h-4 text-blue-600" />
            <span>Suivi des Expéditions ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('produits')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'produits'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-amber-500" />
            <span>Catalogue &amp; Stocks ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tarifs')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'tarifs'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Taux de Change &amp; Fret</span>
          </button>

          <button
            onClick={() => setActiveTab('commandes')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'commandes'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Commandes &amp; Acomptes</span>
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'journal'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>Journal d'Activité</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notificationBanner && (
        <div className="bg-red-600 text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm animate-in slide-in-from-top duration-150">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Clean KPI Metrics Cards (Light Theme with White Background) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Conteneurs en Transit</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Ship className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {orders.length} Expéditions
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Ports de Lomé, Abidjan &amp; Convois
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Véhicules Référencés</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {products.length} Modèles
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Camions, Engins BTP &amp; Agricole
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Acomptes Encaissés (40%)</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              {FORMAT_FCFA(totalPaye)}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Solde restant : {FORMAT_FCFA(totalReste)}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Taux de Change Régulé</span>
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              1 $ = {exchangeRate} F
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Prix affichés 100% en FCFA
            </div>
          </div>

        </div>
      </div>

      {/* Main Admin Workspace (Spacious, Clear & Light) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full">
        
        {/* TAB 1: EXPÉDITIONS & CONTENEURS */}
        {activeTab === 'carte' && (
          <div className="space-y-5">
            
            {/* Header + Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Expéditions en Cours &amp; Pilotage des Conteneurs</span>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    Satellite Live
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Avancez l'étape d'un conteneur en 1 clic pour notifier automatiquement le client par WhatsApp.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="N° conteneur, client, commande..."
                  value={searchOrderQuery}
                  onChange={(e) => setSearchOrderQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Container tracking cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredOrders.map((ord) => {
                const nextStep = NEXT_STEP_MAP[ord.currentStep];

                return (
                  <div
                    key={ord.orderNumber}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Bar with Container code and Order ID */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            {ord.containerNumber}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            {ord.shippingCompany}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                          {ord.orderNumber}
                        </span>
                      </div>

                      {/* Equipment title & Customer Info */}
                      <div className="mt-3.5">
                        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                          {ord.items[0]?.product.title}
                          {ord.items[0]?.quantity > 1 && (
                            <span className="text-red-600 ml-1 font-bold">(x{ord.items[0].quantity})</span>
                          )}
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Client</span>
                            <strong className="text-slate-800 font-semibold">{ord.customerName}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Téléphone</span>
                            <span className="text-slate-700 font-mono font-medium">{ord.customerPhone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination</span>
                            <span className="text-slate-700 font-medium">{ord.customerCity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Box */}
                      <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Étape actuelle :</span>
                          <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            {STEP_LABELS[ord.currentStep]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Localisation actuelle :</span>
                          <span className="text-slate-800 font-semibold">
                            {ord.currentLocationName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Livraison estimée :</span>
                          <span className="text-emerald-700 font-mono font-bold">
                            {ord.estimatedArrivalDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action: Next Step Button */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        {nextStep ? (
                          <span>Prochaine : <strong className="text-slate-800">{STEP_LABELS[nextStep]}</strong></span>
                        ) : (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Expédition clôturée et livrée</span>
                          </span>
                        )}
                      </div>

                      {nextStep && (
                        <button
                          onClick={() => handleAdvanceContainerStep(ord.orderNumber)}
                          className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-slate-950" />
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

        {/* TAB 2: CATALOGUE & STOCKS (Light & Clear) */}
        {activeTab === 'produits' && (
          <div className="space-y-5">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Gestion du Catalogue Chine &amp; Stocks Faso
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Les prix sont calculés en FCFA d'après le taux de change officiel de {exchangeRate} FCFA.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filtrer un modèle..."
                    value={searchProductQuery}
                    onChange={(e) => setSearchProductQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  onClick={() => showNotification("Nouveau véhicule pré-rempli dans le catalogue")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>

            {/* Clean Products Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Équipement</th>
                      <th className="py-3 px-3">Origine Usine</th>
                      <th className="py-3 px-3">Prix d'Achat FCFA</th>
                      <th className="py-3 px-3">Total Livré Clé en Main</th>
                      <th className="py-3 px-4 text-right">Disponibilité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const prixAchat = Math.round(p.priceChinaUSD * exchangeRate);
                      const prixLivre = Math.round(prixAchat * 1.35);

                      const availabilityBadge = {
                        disponible_ouaga: { label: 'Disponible Ouaga', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                        en_transit: { label: 'En transit maritime', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
                        sur_commande_chine: { label: 'Sur commande Chine', bg: 'bg-slate-100 text-slate-700 border-slate-200' }
                      }[p.availability] || { label: p.availability, bg: 'bg-slate-100 text-slate-700 border-slate-200' };

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.mainImage}
                                alt={p.title}
                                className="w-12 h-9 object-cover rounded-lg border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{p.title}</div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  {p.brand} · Réf. {p.id} · {p.year}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 font-medium">
                            {p.logistics.factoryLocation}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-900">
                            {FORMAT_FCFA(prixAchat)}
                          </td>
                          <td className="py-3 px-3 font-mono font-black text-red-600">
                            {FORMAT_FCFA(prixLivre)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleToggleProductAvailability(p.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${availabilityBadge.bg}`}
                              title="Cliquer pour changer l'état de disponibilité"
                            >
                              {availabilityBadge.label}
                            </button>
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

        {/* TAB 3: TAUX DE CHANGE & PARAMÈTRES FRET */}
        {activeTab === 'tarifs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Currency settings */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Taux Officiel USD / FCFA</h3>
              </div>

              <p className="text-xs text-slate-500">
                Ajustez le taux de conversion officiel appliqué immédiatement sur l'ensemble de la boutique et du simulateur.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Valeur de 1 Dollar US ($) en FCFA
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => handleUpdateExchangeRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-red-600 text-slate-900"
                  />
                  <span className="text-xs font-mono font-bold text-slate-600">FCFA</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span>Exemple camion $45 000 :</span>
                  <strong className="font-mono text-slate-900">{FORMAT_FCFA(45000 * exchangeRate)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Exemple benne $38 000 :</span>
                  <strong className="font-mono text-slate-900">{FORMAT_FCFA(38000 * exchangeRate)}</strong>
                </div>
              </div>
            </div>

            {/* Freight & Corridor settings */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Ship className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Barème Maritime &amp; Corridor Terrestre</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 uppercase block mb-1">Port Autonome de Lomé (Togo)</span>
                  <p className="text-xs text-slate-500 mb-3">Corridor principal avec escorte douanière sécurisée vers Ouagadougou.</p>
                  <div className="text-xs space-y-1 text-slate-700 font-mono">
                    <div className="flex justify-between">
                      <span>Transit corridor :</span>
                      <strong>1 850 000 FCFA / conteneur</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Délai moyen convoi :</span>
                      <strong>4 à 6 jours</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 uppercase block mb-1">Port de Cotonou (Bénin)</span>
                  <p className="text-xs text-slate-500 mb-3">Option alternative pour matériel roulant lourd et bennes.</p>
                  <div className="text-xs space-y-1 text-slate-700 font-mono">
                    <div className="flex justify-between">
                      <span>Transit corridor :</span>
                      <strong>1 920 000 FCFA / conteneur</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Délai moyen convoi :</span>
                      <strong>5 à 7 jours</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => showNotification("Paramètres logistiques enregistrés")}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Enregistrer les Modifications
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: COMMANDES & ACOMPTES */}
        {activeTab === 'commandes' && (
          <div className="space-y-5">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Registre des Commandes &amp; Acomptes Reçus
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Suivi des règlements : 40% à la validation d'achat en usine, solde de 60% à la livraison au showroom de Tampouy.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">N° Commande</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Total Livré FCFA</th>
                      <th className="py-3 px-3">Acompte Reçu (40%)</th>
                      <th className="py-3 px-4 text-right">Reste à l'Arrivée (60%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.orderNumber} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {o.orderNumber}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{o.customerName}</div>
                          <div className="text-[10px] text-slate-500">{o.customerCity} · {o.customerPhone}</div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          {FORMAT_FCFA(o.totalXOF)}
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-700 font-bold">
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{FORMAT_FCFA(o.montantPayeXOF)}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-red-600 font-bold">
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

        {/* TAB 5: JOURNAL D'ACTIVITÉ */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Journal d'Activité &amp; Traçabilité
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Historique des modifications de statut, notifications WhatsApp envoyées et ajustements tarifaires.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              {actionLogs.map((log, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-100 last:border-b-0 text-xs text-slate-700 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 font-mono text-slate-800 leading-relaxed">
                    {log}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
