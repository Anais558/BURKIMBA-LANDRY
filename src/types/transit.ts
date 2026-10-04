export type ProductCategory = 'vehicules' | 'engins-btp' | 'machines-agricoles';

export type AvailabilityStatus = 
  | 'sur_commande_chine'
  | 'en_transit'
  | 'disponible_ouaga';

export type ShippingMode = 
  | 'conteneur_20'
  | 'conteneur_40_hc'
  | 'roulier_roro'
  | 'flat_rack'
  | 'fret_aerien';

export type DestinationCity = 
  | 'Ouagadougou'
  | 'Bobo-Dioulasso'
  | 'Koudougou'
  | 'Ouahigouya'
  | 'Fada N\'Gourma';

export type TransitPort = 
  | 'lome'
  | 'abidjan'
  | 'cotonou'
  | 'aeroport_ouaga';

export interface ProductLogistics {
  weightKg: number;
  cbm: number; // Volume in cubic meters
  recommendedShipping: ShippingMode;
  hsCode?: string; // Nomenclature douanière
  factoryLocation: string; // Ex: Jinan, Changsha, Zhengzhou (Chine)
}

export interface TransitProduct {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  brand: string;
  model: string;
  year: number;
  condition: 'Neuf d\'Usine' | 'Occasion Certifiée Export';
  
  // Pricing
  priceChinaUSD: number; // Supplier price in China
  priceChinaCNY?: number;
  fixedDouaneFCFA?: number; // Custom manual customs override if applicable
  
  // Logistics
  logistics: ProductLogistics;
  availability: AvailabilityStatus;
  
  // Display & Media
  mainImage: string;
  gallery: string[];
  videoUrl?: string; // TikTok or demonstration video link
  
  // Specs
  specs: {
    moteur: string;
    puissance: string;
    transmission: string;
    carburant: string;
    chargeUtile?: string;
    dimensions: string;
    capacite?: string;
    garantieUsine: string;
  };
  features: string[];
  description: string;
  badge?: string;
}

export interface PriceSimulation {
  product: TransitProduct;
  exchangeRateUSD_XOF: number;
  shippingMode: ShippingMode;
  arrivalPort: TransitPort;
  destinationCity: DestinationCity;
  douaneOption: 'burkimba_cle_en_main' | 'client_charge';
  
  // Detailed breakdown in FCFA
  prixAchatChineXOF: number;
  fretXOF: number;
  fraisPortuairesTransitXOF: number;
  transportTerrestreXOF: number;
  douaneDroitsXOF: number; // Estimated customs duty
  honorairesDedouanementXOF: number; // Clearance service fees
  assuranceMaritimeXOF: number;
  
  // Final Totals
  totalLivreXOF: number;
  totalSansDouaneXOF: number;
  dateValidite: string;
}

export type OrderTrackingStep = 
  | 'commande'
  | 'achete_en_chine'
  | 'embarque'
  | 'en_mer_vol'
  | 'arrive_au_port'
  | 'en_route_convoi'
  | 'dedouane'
  | 'livre';

export interface TrackingStepInfo {
  step: OrderTrackingStep;
  label: string;
  date?: string;
  location?: string;
  completed: boolean;
  current: boolean;
  notes?: string;
}

export interface OrderItem {
  product: TransitProduct;
  quantity: number;
  simulation: PriceSimulation;
}

export interface TransitOrder {
  orderNumber: string; // Ex: BTT-2026-8492
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerCompany?: string;
  customerCity: DestinationCity;
  
  items: OrderItem[];
  totalXOF: number;
  montantPayeXOF: number;
  resteAPayerXOF: number;
  
  // Transport information
  shippingType: 'maritime' | 'aerien';
  containerNumber?: string; // Ex: MSCU9482015
  shippingCompany?: string; // Ex: MSC, Maersk, CMA CGM
  vesselName?: string; // Ex: MSC ALESSIA
  flightNumber?: string; // Ex: ET371
  airwayBill?: string; // LTA Ex: 071-8492019
  
  departurePort: string; // Ex: Port de Ningbo-Zhoushan, Chine
  arrivalPort: string; // Ex: Port Autonome de Lomé (Togo)
  currentLocationName: string; // Ex: Océan Indien - En approche Détroit de Malacca
  currentCoordinates: { lat: number; lng: number };
  departureDate: string;
  estimatedArrivalDate: string;
  
  currentStep: OrderTrackingStep;
  stepsHistory: TrackingStepInfo[];
  
  documents: {
    name: string;
    type: 'proforma' | 'recu' | 'connaissement' | 'photos_chine' | 'douane';
    url: string;
    date: string;
  }[];
}

export interface SourcingRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  category: string;
  itemName: string;
  targetBudgetUSD?: number;
  quantity: number;
  notes: string;
  referenceImage?: string;
  createdAt: string;
  status: 'nouveau' | 'en_cours_recherche_chine' | 'devis_envoye' | 'valide';
}
