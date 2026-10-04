import { 
  TransitProduct, 
  PriceSimulation, 
  TransitOrder, 
  ShippingMode, 
  TransitPort, 
  DestinationCity 
} from '../types/transit';

import heroFleetImg from '../assets/images/hero_heavy_fleet_1791115752572.jpg';
import dumpHowoImg from '../assets/images/truck_dump_howo_1791115765218.jpg';
import actrosImg from '../assets/images/truck_mercedes_actros_1791115776458.jpg';
import landCruiserImg from '../assets/images/car_land_cruiser_suv_1791115786276.jpg';
import excavatorImg from '../assets/images/machinery_excavator_1791115795779.jpg';

export { heroFleetImg, dumpHowoImg, actrosImg, landCruiserImg, excavatorImg };

export const BURKIMBA_INFO = {
  name: 'BURKIMBA TRANSIT TRANSPORT',
  shortName: 'BURKIMBA TRANSIT',
  slogan: 'Importation Clés en Main Chine - Burkina Faso',
  subSlogan: 'La Marque des Déterminées',
  address: 'Tampouy, Secteur 21, Ouagadougou, Burkina Faso',
  email: 'burkimbalife@gmail.com',
  whatsapp: '+22667307409',
  whatsappDisplay: '+226 67 30 74 09',
  phone: '+22663110899',
  phoneDisplay: '+226 63 11 08 99',
  facebook: 'Burkimba Life',
  instagram: 'burkimba lifeofficial',
  tiktok: '@burkimbatransit',
  rccm: 'BF-OUA-01-2023-B13-09412',
  ifu: '00192847T',
  openingHours: 'Lundi au Samedi : 07h30 - 18h30 (Suivi conteneurs 24h/7j)'
};

// Global default exchange rate & admin settings (Editable in Admin Panel)
export const DEFAULT_SETTINGS = {
  exchangeRateUSD_XOF: 615, // 1 USD = 615 FCFA
  lastRateUpdate: '04 Octobre 2026',
  ports: {
    lome: { name: 'Port Autonome de Lomé (Togo)', transitLeadDays: 28, delayToOuagaDays: 5, portFeesXOF: 850000 },
    abidjan: { name: 'Port Autonome d\'Abidjan (Côte d\'Ivoire)', transitLeadDays: 32, delayToOuagaDays: 6, portFeesXOF: 950000 },
    cotonou: { name: 'Port Autonome de Cotonou (Bénin)', transitLeadDays: 30, delayToOuagaDays: 7, portFeesXOF: 900000 },
    aeroport_ouaga: { name: 'Aéroport International de Ouagadougou', transitLeadDays: 7, delayToOuagaDays: 1, portFeesXOF: 450000 }
  },
  landTransportToCity: {
    'Ouagadougou': 1200000,
    'Bobo-Dioulasso': 1450000,
    'Koudougou': 1300000,
    'Ouahigouya': 1500000,
    'Fada N\'Gourma': 1600000
  },
  customsDutyRateCAF: {
    'vehicules': 0.23, // 23% valeur CAF
    'engins-btp': 0.12, // 12% valeur CAF
    'machines-agricoles': 0.06 // 6% valeur CAF (régime préférentiel agriculture)
  },
  transitAgencyFeeXOF: 350000
};

export const TRANSIT_PRODUCTS: TransitProduct[] = [
  {
    id: 'howo-8x4-dump-chine',
    title: 'Sinotruk HOWO 8x4 Benne Lourde Carrière 400CH Neuf Usine',
    category: 'vehicules',
    categoryLabel: 'Véhicules & Camions',
    brand: 'Sinotruk HOWO',
    model: 'ZZ3317N3867W Euro 2 Spécial Mines',
    year: 2026,
    condition: 'Neuf d\'Usine',
    priceChinaUSD: 44500, // ~27.3M FCFA prix d'achat usine
    logistics: {
      weightKg: 15400,
      cbm: 42.5,
      recommendedShipping: 'roulier_roro',
      hsCode: '8704.23.00',
      factoryLocation: 'Jinan, Shandong, Chine'
    },
    availability: 'sur_commande_chine',
    mainImage: dumpHowoImg,
    gallery: [dumpHowoImg, heroFleetImg],
    videoUrl: 'https://tiktok.com/@burkimbatransit/video/howo8x4',
    specs: {
      moteur: 'WD615.47 6 cylindres Turbo Intercooler Tropicalisé',
      puissance: '400 ch (294 kW)',
      transmission: 'HW19710 Manuelle 10 vitesses synchronisées',
      carburant: 'Diesel',
      chargeUtile: '35 Tonnes (Benne 22 m³ fond 16mm)',
      dimensions: '9 250 x 2 500 x 3 450 mm',
      capacite: 'Réservoir 400 L aluminium double filtre décanteur',
      garantieUsine: '12 mois pièces ou 60 000 km'
    },
    features: [
      'Fond de benne renforcé en acier haute résistance 16mm pour minerai',
      'Vérin hydraulique frontal Hyva haut rendement',
      'Ponts arrières à double réduction avec blocage de différentiel',
      'Cabine couchette HW76 pressurisée avec climatisation grand froid',
      'Pare-chocs tout-terrain surélevé et grille de radiateur acier'
    ],
    description: 'Le camion benne le plus vendu et le plus robuste en Afrique de l\'Ouest. Conçu spécialement pour les conditions des carrières de granit et mines du Burkina Faso. Livré directement depuis l\'usine de Jinan avec garantie constructeur.',
    badge: 'Best-Seller Mines'
  },
  {
    id: 'sany-sy215c-excavator',
    title: 'Pelle Hydraulique sur Chenilles SANY SY215C Heavy Duty 22T',
    category: 'engins-btp',
    categoryLabel: 'Engins BTP & Mines',
    brand: 'SANY Heavy Industry',
    model: 'SY215C Tier 3 Spécial Afrique',
    year: 2026,
    condition: 'Neuf d\'Usine',
    priceChinaUSD: 68000,
    logistics: {
      weightKg: 21900,
      cbm: 58.0,
      recommendedShipping: 'flat_rack',
      hsCode: '8429.52.00',
      factoryLocation: 'Changsha, Hunan, Chine'
    },
    availability: 'en_transit',
    mainImage: excavatorImg,
    gallery: [excavatorImg, heroFleetImg],
    videoUrl: 'https://tiktok.com/@burkimbatransit/video/sany215',
    specs: {
      moteur: 'Isuzu 6BG1-X 6 cylindres Turbo Diesel Injection Directe',
      puissance: '158 ch / 118 kW à 2000 tr/min',
      transmission: 'Translation hydrostatique 2 vitesses avec freins automatiques',
      carburant: 'Diesel',
      chargeUtile: 'Godet renforcé 1.0 m³ roche (Option 1.2 m³)',
      dimensions: '9 680 x 2 980 x 3 440 mm',
      capacite: 'Profondeur de fouille maximale 6 600 mm',
      garantieUsine: '12 mois ou 2 000 heures de travail'
    },
    features: [
      'Pompes hydrauliques Kawasaki japonaises haute fiabilité',
      'Cabine ROPS/FOPS insonorisée avec climatisation tropicale haute puissance',
      'Ligne hydraulique auxiliaire installée pour brise-roche hydraulique (BRH)',
      'Chenilles à maillons renforcés pour terrains latéritiques abrasifs',
      'Système télématique de géolocalisation et diagnostic à distance'
    ],
    description: 'Engin lourd de terrassement et excavation indispensable pour les barrages hydro-agricoles, carrières et chantiers de génie civil au Faso. Faible consommation de carburant et disponibilité immédiate des pièces détachées.',
    badge: 'En Mer (Lomé)'
  },
  {
    id: 'mercedes-actros-tracteur',
    title: 'Mercedes-Benz Actros 1845 LS StreamSpace Tracteur Routier',
    category: 'vehicules',
    categoryLabel: 'Véhicules & Camions',
    brand: 'Mercedes-Benz',
    model: 'Actros 1845 LS Euro 5',
    year: 2024,
    condition: 'Occasion Certifiée Export',
    priceChinaUSD: 52000,
    logistics: {
      weightKg: 8200,
      cbm: 38.0,
      recommendedShipping: 'roulier_roro',
      hsCode: '8701.20.00',
      factoryLocation: 'Hub Export Ningbo / Shanghai'
    },
    availability: 'disponible_ouaga',
    mainImage: actrosImg,
    gallery: [actrosImg, heroFleetImg],
    specs: {
      moteur: 'Mercedes-Benz OM 471 6 cylindres en ligne',
      puissance: '450 ch (330 kW)',
      transmission: 'Mercedes PowerShift 3 Automatique 12 rapports',
      carburant: 'Diesel',
      chargeUtile: 'P.T.R.A. 44 Tonnes',
      dimensions: '6 150 x 2 500 x 3 700 mm',
      capacite: 'Double réservoir aluminium total 900 Litres',
      garantieUsine: 'Garantie Burkimba Transit 6 mois chaîne cinématique'
    },
    features: [
      'Ralentisseur hydraulique Voith Retarder haute sécurité en descente',
      'Cabine StreamSpace plancher plat 2 couchettes grand confort',
      'Suspension pneumatique intégrale arrière réglable depuis la cabine',
      'Selle d\'attelage Jost 2" renforcée pour convois lourds',
      'Climatisation stationnaire d\'origine'
    ],
    description: 'Tracteur routier d\'élite pour les convois de marchandises sur les corridors Abidjan-Ouaga, Lomé-Ouaga et Cotonou-Ouaga. Visible et disponible immédiatement pour essai sur parc à Tampouy.',
    badge: 'Sur Parc Tampouy'
  },
  {
    id: 'toyota-land-cruiser-300-chine',
    title: 'Toyota Land Cruiser 300 V6 3.3L Twin-Turbo 4x4 Neuf Usine',
    category: 'vehicules',
    categoryLabel: 'Véhicules & Camions',
    brand: 'Toyota',
    model: 'Land Cruiser 300 GR-Sport / VX-R',
    year: 2026,
    condition: 'Neuf d\'Usine',
    priceChinaUSD: 85000,
    logistics: {
      weightKg: 2650,
      cbm: 16.5,
      recommendedShipping: 'conteneur_20',
      hsCode: '8703.24.00',
      factoryLocation: 'Hub Export Guangzhou'
    },
    availability: 'sur_commande_chine',
    mainImage: landCruiserImg,
    gallery: [landCruiserImg, heroFleetImg],
    specs: {
      moteur: 'F33A-FTV V6 3.3 Litres Twin-Turbo Diesel',
      puissance: '309 ch (700 Nm de couple)',
      transmission: 'Automatique Direct Shift 10 vitesses',
      carburant: 'Diesel',
      chargeUtile: '7 Places assises cuir nappa perforé',
      dimensions: '4 985 x 1 980 x 1 945 mm',
      capacite: 'Double réservoir 110 L avec autonomie 1 200 km',
      garantieUsine: '3 ans ou 100 000 km'
    },
    features: [
      'Suspension adaptative électronique E-KDSS pour virages et tout-terrain',
      'Caméras panoramiques 360° avec visualisation du sol sous châssis',
      'Glacière centrale réfrigérée grand format',
      'Double écran tactile avec système audio JBL 14 haut-parleurs',
      'Jantes alliage spécifiques GR-Sport et pneus tout-terrain renforcés'
    ],
    description: 'Le symbole absolu de prestige, de puissance et de fiabilité au Burkina Faso. Protégé dans conteneur scellé dédié 20 pieds depuis la Chine jusqu\'au dédouanement à Ouagadougou.',
    badge: 'Prestige VIP'
  },
  {
    id: 'yto-x1204-tractor',
    title: 'Tracteur Agricole YTO X1204 120CH 4RM avec Cabine Climatisée',
    category: 'machines-agricoles',
    categoryLabel: 'Machines Agricoles & Industrielles',
    brand: 'YTO Group',
    model: 'X1204 4WD Heavy Agricultural',
    year: 2026,
    condition: 'Neuf d\'Usine',
    priceChinaUSD: 24500,
    logistics: {
      weightKg: 5200,
      cbm: 24.0,
      recommendedShipping: 'conteneur_40_hc',
      hsCode: '8701.93.00',
      factoryLocation: 'Luoyang, Henan, Chine'
    },
    availability: 'sur_commande_chine',
    mainImage: heroFleetImg,
    gallery: [heroFleetImg],
    videoUrl: 'https://tiktok.com/@burkimbatransit/video/ytotractor',
    specs: {
      moteur: 'YTO LR6M5-23 6 cylindres Turbo Diesel Injection Directe',
      puissance: '120 ch (88.2 kW) à 2300 tr/min',
      transmission: 'Boîte mécanique 12F + 4R avec synchroniseur',
      carburant: 'Diesel',
      chargeUtile: 'Capacité de relevage hydraulique 3 500 kg',
      dimensions: '4 750 x 2 140 x 2 950 mm',
      capacite: 'Prise de force PTO 540 / 1000 tr/min',
      garantieUsine: '18 mois pièces détachées usine'
    },
    features: [
      'Cabine panoramique étanche anti-poussière avec climatisation renforcée',
      'Relevage arrière catégorie 2 à 3 points avec vérins auxiliaires',
      'Pneumatiques agricoles haute motricité pour terres argileuses et plaines',
      'Contrepoids avant et arrière inclus d\'origine usine',
      'Charrue à disques réversible 4 corps fournie en option pack'
    ],
    description: 'Le tracteur agricole le plus performant pour les coopératives, fermes agro-industrielles et producteurs de céréales au Burkina Faso. Taux de douane réduit à 6% dans le cadre de la promotion agricole.',
    badge: 'Soutien Agriculture'
  },
  {
    id: 'weichai-generator-150kva',
    title: 'Groupe Électrogène Industriel Insonorisé Weichai 150 kVA',
    category: 'machines-agricoles',
    categoryLabel: 'Machines Agricoles & Industrielles',
    brand: 'Weichai Power / Stamford',
    model: 'WPG165F1 Silent Canopy',
    year: 2026,
    condition: 'Neuf d\'Usine',
    priceChinaUSD: 16800,
    logistics: {
      weightKg: 2100,
      cbm: 7.5,
      recommendedShipping: 'conteneur_20',
      hsCode: '8502.12.00',
      factoryLocation: 'Weifang, Shandong, Chine'
    },
    availability: 'sur_commande_chine',
    mainImage: heroFleetImg,
    gallery: [heroFleetImg],
    specs: {
      moteur: 'Weichai WP6D152E200 Turbo Diesel 6 cylindres',
      puissance: '150 kVA / 120 kW Continu (165 kVA Secours)',
      transmission: 'Alternateur sans balais type Stamford à régulation électronique AVR',
      carburant: 'Diesel (Consommation 28 L/h à 75% charge)',
      chargeUtile: 'Tension 400V / 230V Triphasé 50 Hz',
      dimensions: '3 200 x 1 100 x 1 700 mm',
      capacite: 'Réservoir intégré châssis 350 Litres (12h autonomie)',
      garantieUsine: '12 mois ou 1 500 heures'
    },
    features: [
      'Capotage insonorisé et étanche IP54 peinture époxy anti-corrosion',
      'Armoire de démarrage automatique inverseur de source ATS intégrée',
      'Module de contrôle numérique SmartGen avec affichage alertes et tensions',
      'Disjoncteur général de protection magnétothermique 4 pôles',
      'Bouton d\'arrêt d\'urgence extérieur sécurisé'
    ],
    description: 'Solution d\'énergie autonome continue pour sites miniers, usines d\'égrenage de coton, cliniques et grands chantiers. Démarrage automatique instantané en cas de coupure du réseau.',
    badge: 'Énergie Continue'
  }
];

// Calculation engine matching Section 3: Le simulateur de prix
export function calculateFullLandedPrice(
  product: TransitProduct,
  settings = DEFAULT_SETTINGS,
  options: {
    shippingMode?: ShippingMode;
    arrivalPort?: TransitPort;
    destinationCity?: DestinationCity;
    douaneOption?: 'burkimba_cle_en_main' | 'client_charge';
  } = {}
): PriceSimulation {
  const mode = options.shippingMode || product.logistics.recommendedShipping;
  const port = options.arrivalPort || 'lome';
  const city = options.destinationCity || 'Ouagadougou';
  const douaneOption = options.douaneOption || 'burkimba_cle_en_main';

  const rate = settings.exchangeRateUSD_XOF;
  const prixAchatChineXOF = Math.round(product.priceChinaUSD * rate);

  // Fret calculation based on shipping mode and port
  let baseFretUSD = 2800; // default 20ft container to Lomé
  if (mode === 'conteneur_40_hc') baseFretUSD = 4600;
  if (mode === 'roulier_roro') baseFretUSD = Math.max(3800, Math.round(product.logistics.cbm * 110));
  if (mode === 'flat_rack') baseFretUSD = 5800;
  if (mode === 'fret_aerien') baseFretUSD = Math.round(product.logistics.weightKg * 6.5);

  // Adjust for port
  if (port === 'abidjan') baseFretUSD += 200;
  if (port === 'cotonou') baseFretUSD += 100;
  if (port === 'aeroport_ouaga' && mode !== 'fret_aerien') {
    // Override to air if airport selected
    baseFretUSD = Math.round(product.logistics.weightKg * 6.5);
  }

  const fretXOF = Math.round(baseFretUSD * rate);

  // Port and transit handling
  const portConfig = settings.ports[port] || settings.ports.lome;
  const fraisPortuairesTransitXOF = portConfig.portFeesXOF;

  // Land transport to destination city in Burkina Faso
  const transportTerrestreXOF = port === 'aeroport_ouaga' 
    ? 150000 
    : (settings.landTransportToCity[city] || settings.landTransportToCity.Ouagadougou);

  // Maritime insurance (1.5% of purchase + freight)
  const assuranceMaritimeXOF = Math.round(0.015 * (prixAchatChineXOF + fretXOF));
  
  // CAF Value = Prix d'achat + Fret + Assurance
  const valeurCAFXOF = prixAchatChineXOF + fretXOF + assuranceMaritimeXOF;

  // Customs duty calculation on CAF value
  let douaneDroitsXOF = 0;
  if (product.fixedDouaneFCFA) {
    douaneDroitsXOF = product.fixedDouaneFCFA;
  } else {
    const dutyRate = settings.customsDutyRateCAF[product.category] || 0.20;
    douaneDroitsXOF = Math.round(valeurCAFXOF * dutyRate);
  }

  const honorairesDedouanementXOF = settings.transitAgencyFeeXOF;
  const douaneTotaleXOF = douaneDroitsXOF + honorairesDedouanementXOF;

  // Total calculation
  const totalSansDouaneXOF = prixAchatChineXOF + fretXOF + fraisPortuairesTransitXOF + transportTerrestreXOF;
  const totalLivreXOF = douaneOption === 'burkimba_cle_en_main'
    ? totalSansDouaneXOF + douaneTotaleXOF
    : totalSansDouaneXOF;

  // Validity date: 15 days from now
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + 15);
  const dateValidite = dateObj.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return {
    product,
    exchangeRateUSD_XOF: rate,
    shippingMode: mode,
    arrivalPort: port,
    destinationCity: city,
    douaneOption,
    prixAchatChineXOF,
    fretXOF,
    fraisPortuairesTransitXOF,
    transportTerrestreXOF,
    douaneDroitsXOF,
    honorairesDedouanementXOF,
    assuranceMaritimeXOF,
    totalLivreXOF,
    totalSansDouaneXOF,
    dateValidite
  };
}

export const FORMAT_FCFA = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA';
};

export const FORMAT_USD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Mock real-world orders for the tracking portal (Section 5)
export const MOCK_TRACKING_ORDERS: TransitOrder[] = [
  {
    orderNumber: 'BTT-2026-8492',
    createdAt: '18 Septembre 2026',
    customerName: 'Oumarou Ouédraogo',
    customerPhone: '+226 70 20 44 11',
    customerCompany: 'Société Minière du Sahel SA',
    customerCity: 'Ouagadougou',
    items: [
      {
        product: TRANSIT_PRODUCTS[0], // Howo 8x4
        quantity: 2,
        simulation: calculateFullLandedPrice(TRANSIT_PRODUCTS[0])
      }
    ],
    totalXOF: 104000000,
    montantPayeXOF: 41600000, // 40% acompte
    resteAPayerXOF: 62400000,
    shippingType: 'maritime',
    containerNumber: 'MSCU9482015',
    shippingCompany: 'MSC Mediterranean Shipping Co.',
    vesselName: 'MSC ALESSIA (Voyage CN8402)',
    departurePort: 'Port de Ningbo-Zhoushan, Chine',
    arrivalPort: 'Port Autonome de Lomé (Togo)',
    currentLocationName: 'Océan Indien - En approche du Cap des Aiguilles',
    currentCoordinates: { lat: -34.8, lng: 20.1 },
    departureDate: '24 Septembre 2026',
    estimatedArrivalDate: '16 Octobre 2026',
    currentStep: 'en_mer_vol',
    stepsHistory: [
      { step: 'commande', label: 'Commande Validée & Acompte Reçu', date: '18 Septembre 2026', completed: true, current: false },
      { step: 'achete_en_chine', label: 'Véhicules Achetés en Usine Jinan', date: '20 Septembre 2026', completed: true, current: false },
      { step: 'embarque', label: 'Chargement & Empotage au Port de Ningbo', date: '24 Septembre 2026', completed: true, current: false },
      { step: 'en_mer_vol', label: 'En Mer / Navigation Corridor Afrique', date: 'En cours', location: 'Océan Indien', completed: false, current: true, notes: 'Navigation fluide, ETA Lomé maintenu au 16/10' },
      { step: 'arrive_au_port', label: 'Arrivée Port de Lomé & Débarquement', date: 'Prévu le 16 Octobre 2026', completed: false, current: false },
      { step: 'en_route_convoi', label: 'Convoi Terrestre Sécurisé vers Ouaga', date: 'Prévu du 18 au 22 Octobre', completed: false, current: false },
      { step: 'dedouane', label: 'Dédouanement Ouaga Inter & Carte Grise', date: 'Prévu le 23 Octobre', completed: false, current: false },
      { step: 'livre', label: 'Livraison Clés en Main Showroom Tampouy', date: 'Prévu le 25 Octobre', completed: false, current: false }
    ],
    documents: [
      { name: 'Facture Proforma BTT-2026-8492.pdf', type: 'proforma', url: '#', date: '18/09/2026' },
      { name: 'Reçu d\'Acompte 40% (41 600 000 FCFA).pdf', type: 'recu', url: '#', date: '19/09/2026' },
      { name: 'Connaissement Maritime B/L MSCU9482015.pdf', type: 'connaissement', url: '#', date: '24/09/2026' },
      { name: 'Photos de Contrôle & Chargement Usine Jinan (12 photos).zip', type: 'photos_chine', url: '#', date: '22/09/2026' }
    ]
  },
  {
    orderNumber: 'BTT-2026-7731',
    createdAt: '02 Septembre 2026',
    customerName: 'Moussa Sawadogo',
    customerPhone: '+226 76 55 90 00',
    customerCompany: 'Entreprise de Terrassement & BTP',
    customerCity: 'Ouagadougou',
    items: [
      {
        product: TRANSIT_PRODUCTS[1], // SANY Excavator
        quantity: 1,
        simulation: calculateFullLandedPrice(TRANSIT_PRODUCTS[1])
      }
    ],
    totalXOF: 68500000,
    montantPayeXOF: 50000000,
    resteAPayerXOF: 18500000,
    shippingType: 'maritime',
    containerNumber: 'CMAU8194021',
    shippingCompany: 'CMA CGM',
    vesselName: 'CMA CGM AFRICA FOUR',
    departurePort: 'Port de Shanghai, Chine',
    arrivalPort: 'Port Autonome de Lomé (Togo)',
    currentLocationName: 'À quai - Port Autonome de Lomé (Quai Conteneurs)',
    currentCoordinates: { lat: 6.13, lng: 1.28 },
    departureDate: '06 Septembre 2026',
    estimatedArrivalDate: '03 Octobre 2026',
    currentStep: 'arrive_au_port',
    stepsHistory: [
      { step: 'commande', label: 'Commande Validée', date: '02 Septembre 2026', completed: true, current: false },
      { step: 'achete_en_chine', label: 'Engin Acheté Usine Changsha', date: '04 Septembre 2026', completed: true, current: false },
      { step: 'embarque', label: 'Embarquement Flat Rack Shanghai', date: '06 Septembre 2026', completed: true, current: false },
      { step: 'en_mer_vol', label: 'Traversée Maritime', date: '07 Septembre - 03 Octobre', completed: true, current: false },
      { step: 'arrive_au_port', label: 'Débarqué au Port de Lomé', date: '03 Octobre 2026', location: 'Lomé, Togo', completed: false, current: true, notes: 'Formalités de transit et pose balise GPS convoi en cours' },
      { step: 'en_route_convoi', label: 'Départ Convoi Remorque Plateau vers Ouaga', date: 'Prévu le 06 Octobre', completed: false, current: false },
      { step: 'dedouane', label: 'Dédouanement Ouaga Inter', date: 'Prévu le 10 Octobre', completed: false, current: false },
      { step: 'livre', label: 'Mise à Disposition Chantier', date: 'Prévu le 12 Octobre', completed: false, current: false }
    ],
    documents: [
      { name: 'Dossier Technique & Devis SANY SY215C.pdf', type: 'proforma', url: '#', date: '02/09/2026' },
      { name: 'Attestation de Débarquement Lomé.pdf', type: 'douane', url: '#', date: '03/10/2026' }
    ]
  }
];
