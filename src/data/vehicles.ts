import { Vehicle } from '../types/vehicle';

// High-fidelity generated images
import heroFleetImg from '../assets/images/hero_heavy_fleet_1791115752572.jpg';
import dumpHowoImg from '../assets/images/truck_dump_howo_1791115765218.jpg';
import actrosImg from '../assets/images/truck_mercedes_actros_1791115776458.jpg';
import landCruiserImg from '../assets/images/car_land_cruiser_suv_1791115786276.jpg';
import excavatorImg from '../assets/images/machinery_excavator_1791115795779.jpg';

export { heroFleetImg, dumpHowoImg, actrosImg, landCruiserImg, excavatorImg };

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'howo-8x4-dump-2024',
    title: 'Sinotruk HOWO 8x4 Benne Lourde Carrière 400 CH',
    category: 'gros-porteurs',
    categoryLabel: 'Gros Porteurs',
    brand: 'Sinotruk',
    model: 'HOWO 371 / 400 Euro 2 Spécial Mines',
    year: 2024,
    priceXOF: 52000000,
    mileage: '0 km (Neuf)',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    power: '400 ch (294 kW)',
    payloadCapacity: '35 Tonnes (Benne 22 m³)',
    axles: '8x4 Renforcé',
    availability: 'En stock à Ouaga (Tampouy)',
    condition: 'Neuf 0 km',
    location: 'Showroom Tampouy, Ouagadougou',
    mainImage: dumpHowoImg,
    gallery: [dumpHowoImg, heroFleetImg],
    features: [
      'Benne en acier haute résistance 16mm fond / 12mm côtés',
      'Vérin hydraulique frontal Hyva haut rendement',
      'Ponts arrières à double réduction avec blocage de différentiel',
      'Cabine HW76 avec couchette climatisée',
      'Protection de calandre et pare-choc acier tout-terrain',
      'Réservoir carburant 400 L tropicalisé avec double décanteur'
    ],
    specs: {
      moteur: 'WD615.47 6 cylindres en ligne Turbo Intercooler',
      cylindree: '9 726 cc',
      puissanceFiscale: '38 CV',
      suspension: 'Ressorts à lames paraboliques super renforcés (10/12)',
      freinage: 'Double circuit pneumatique avec ABS WABCO & frein sur échappement',
      climatisation: 'Grand froid tropicalisé d\'origine usine',
      dedouanement: 'Dédouanement Ouaga Inter inclus avec carte grise immédiate',
      garantie: 'Garantie constructeur 12 mois ou 60 000 km'
    },
    description: 'Le camion benne de référence pour les chantiers miniers, carrières de granit et grands travaux BTP au Burkina Faso. Châssis double longeron renforcé, moteur robuste sans électronique complexe pour supporter le carburant local.',
    badge: 'Best-Seller Mines'
  },
  {
    id: 'mercedes-actros-1845-2023',
    title: 'Mercedes-Benz Actros 1845 LS StreamSpace 4x2',
    category: 'gros-porteurs',
    categoryLabel: 'Gros Porteurs',
    brand: 'Mercedes-Benz',
    model: 'Actros 1845 LS Euro 5',
    year: 2023,
    priceXOF: 64500000,
    mileage: '85 000 km',
    transmission: 'Automatique',
    fuel: 'Diesel',
    power: '450 ch (330 kW)',
    payloadCapacity: 'P.T.R.A. 44 Tonnes',
    axles: '4x2 Tracteur Routier',
    availability: 'En stock à Ouaga (Tampouy)',
    condition: 'Occasion Europe Révisée',
    location: 'Showroom Tampouy, Ouagadougou',
    mainImage: actrosImg,
    gallery: [actrosImg, heroFleetImg],
    features: [
      'Boîte robotisée Mercedes PowerShift 3 à 12 rapports',
      'Cabine StreamSpace 2,30 m avec couchette confort luxe',
      'Ralentisseur Voith Retarder hydraulique haute puissance',
      'Pack aérodynamique complet avec déflecteurs latéraux',
      'Double réservoir aluminium (total 900 Litres)',
      'Selle d\'attelage Jost renforcée'
    ],
    specs: {
      moteur: 'Mercedes-Benz OM 471 6 cylindres Common Rail haute pression',
      cylindree: '12 809 cc',
      puissanceFiscale: '42 CV',
      suspension: 'Pneumatique intégrale réglable avec mémoire',
      freinage: 'Disques ventilés avec EBS, ASR, ESP & régulateur prédictif',
      climatisation: 'Climatisation automatique + chauffage stationnaire',
      dedouanement: 'Dédouané complet Ouaga avec quitus fiscal',
      garantie: 'Garantie Burkimba Life 6 mois chaîne cinématique'
    },
    description: 'Tracteur routier d\'exception parfait pour les convois de marchandises corridor Abidjan-Ouaga, Lomé-Ouaga et Cotonou-Ouaga. Fiabilité légendaire Mercedes-Benz, consommation de carburant optimisée et confort royal pour le chauffeur.',
    badge: 'Sélection Long-Courrier'
  },
  {
    id: 'toyota-land-cruiser-300-2024',
    title: 'Toyota Land Cruiser 300 V6 3.3L Twin-Turbo 4x4',
    category: 'suv-4x4',
    categoryLabel: '4x4 & SUV',
    brand: 'Toyota',
    model: 'Land Cruiser 300 GR-Sport / VX-R',
    year: 2024,
    priceXOF: 98000000,
    mileage: '0 km (Neuf)',
    transmission: 'Automatique',
    fuel: 'Diesel',
    power: '309 ch (700 Nm de couple)',
    payloadCapacity: '7 Places assises cuir perforé',
    axles: '4x4 Permanent Intégral',
    availability: 'En stock à Ouaga (Tampouy)',
    condition: 'Neuf 0 km',
    location: 'Showroom Tampouy, Ouagadougou',
    mainImage: landCruiserImg,
    gallery: [landCruiserImg, heroFleetImg],
    features: [
      'Transmission automatique 10 vitesses Direct Shift',
      'Système de suspension dynamique cinétique E-KDSS',
      'Multi-Terrain Select avec caméras 360° sous châssis',
      'Sellerie cuir nappa noir/bordeaux avec sièges ventilés et massants',
      'Écran tactile 12.3" avec système audio JBL 14 haut-parleurs',
      'Glacière centrale intégrée et double réservoir carburant 110 L'
    ],
    specs: {
      moteur: 'F33A-FTV V6 3.3 Litres Twin-Turbo Diesel',
      cylindree: '3 346 cc',
      puissanceFiscale: '22 CV',
      suspension: 'Indépendante double triangulation avant, essieu rigide 4 bras arrière avec amortisseurs adaptatifs',
      freinage: 'Disques ventilés 4 roues avec ABS tout-terrain et assistance en descente',
      climatisation: 'Quadri-zone automatique tropicalisée avec purificateur Nanoe X',
      dedouanement: 'Dédouanement complet inclus, prêt à immatriculer série 11',
      garantie: 'Garantie officielle 3 ans ou 100 000 km'
    },
    description: 'Le sommet du luxe et de l\'endurance sur les pistes africaines. Le Land Cruiser 300 domine aussi bien le goudron de Ouagadougou que les zones minières les plus exigeantes. Un statut prestigieux pour les dirigeants déterminés.',
    badge: 'Prestige VIP'
  },
  {
    id: 'cat-320-excavator-2023',
    title: 'Pelle Hydraulique sur Chenilles 22T Spécial BTP & Mines',
    category: 'engins-btp',
    categoryLabel: 'Engins BTP',
    brand: 'Caterpillar',
    model: '320 GC Heavy Duty',
    year: 2023,
    priceXOF: 78000000,
    mileage: '1 200 Heures de travail',
    transmission: 'Automatique',
    fuel: 'Diesel',
    power: '146 ch (108 kW)',
    payloadCapacity: 'Godet renforcé 1.2 m³ / Flèche 5.7 m',
    axles: 'Chenilles acier 600 mm',
    availability: 'En transit (Port Lomé)',
    condition: 'Occasion Europe Révisée',
    location: 'Arrivage prévu parc Tampouy sous 10 jours',
    mainImage: excavatorImg,
    gallery: [excavatorImg, heroFleetImg],
    features: [
      'Godet roche renforcé avec dents Hardox interchangeables',
      'Cabine pressurisée insonorisée ROPS/FOPS avec climatisation renforcée',
      'Circuit hydraulique auxiliaire haute pression pour marteau brise-roche (BRH)',
      'Pompes hydrauliques à pistons axiaux à cylindrée variable',
      'Moniteur tactile 8" avec gestion des modes éco et puissance',
      'Chenilles à maillons étanches et lubrifiés pour sols abrasifs'
    ],
    specs: {
      moteur: 'Moteur Cat C4.4 Turbo Diesel Injection Électronique',
      cylindree: '4 400 cc',
      puissanceFiscale: 'Non applicable (Engin BTP)',
      suspension: 'Châssis porteur lourd en X mécano-soudé',
      freinage: 'Freins de tourelle et de translation hydrauliques à disques multiples',
      climatisation: 'Filtre haute densité anti-poussière latéritique + compresseur grand débit',
      dedouanement: 'Régime d\'admission temporaire ou mise à la consommation directe',
      garantie: 'Garantie pièces moteur & hydraulique 6 mois'
    },
    description: 'Engin lourd d\'excavation indispensable pour les entreprises de terrassement, barrages hydro-agricoles, mines d\'or et génie civil. Vendu entièrement révisé avec rapport d\'inspection technique complet.',
    badge: 'Prêt pour Chantier'
  },
  {
    id: 'toyota-hilux-2024-invincible',
    title: 'Toyota Hilux Double Cabine 2.8 D-4D 4x4 Automatique',
    category: 'suv-4x4',
    categoryLabel: '4x4 & SUV',
    brand: 'Toyota',
    model: 'Hilux Revo GR-Sport / Invincible 4x4',
    year: 2024,
    priceXOF: 34500000,
    mileage: '0 km (Neuf)',
    transmission: 'Automatique',
    fuel: 'Diesel',
    power: '204 ch (500 Nm)',
    payloadCapacity: 'Charge utile 1 Tonne / Remorquage 3.5 T',
    axles: '4x4 Enclenchable avec blocage arrière',
    availability: 'En stock à Ouaga (Tampouy)',
    condition: 'Neuf 0 km',
    location: 'Showroom Tampouy, Ouagadougou',
    mainImage: landCruiserImg,
    gallery: [landCruiserImg],
    features: [
      'Transmission automatique 6 vitesses avec mode Sport & Eco',
      'Pare-buffle avant acier et arceau de benne inox sport',
      'Bac de benne renforcé avec protection polyuréthane',
      'Caméra de recul et radars de stationnement avant/arrière',
      'Écran tactile multimédia compatible Apple CarPlay / Android Auto',
      'Phares LED Matrix et feux antibrouillard grande portée'
    ],
    specs: {
      moteur: '1GD-FTV 2.8L 4 cylindres Turbo Diesel D-4D',
      cylindree: '2 755 cc',
      puissanceFiscale: '12 CV',
      suspension: 'Double triangulation avant, ressorts à lames renforcées arrière',
      freinage: 'Disques ventilés avant avec ABS, EBD et contrôle de trajectoire VSC',
      climatisation: 'Automatique bi-zone tropicalisée',
      dedouanement: 'Dédouané complet Ouaga avec carte grise',
      garantie: 'Garantie 3 ans constructeur'
    },
    description: 'Le pick-up légendaire le plus robuste et le plus recherché d\'Afrique de l\'Ouest. Confortable pour la ville, imbattable sur pistes de brousse, chantiers et escortes.',
    badge: 'Dispo Immédiate'
  },
  {
    id: 'renault-kerax-440-dump',
    title: 'Renault Trucks Kerax 440 DXi Benne 6x4 Travaux Publics',
    category: 'gros-porteurs',
    categoryLabel: 'Gros Porteurs',
    brand: 'Renault Trucks',
    model: 'Kerax 440 Heavy Duty 6x4',
    year: 2022,
    priceXOF: 43000000,
    mileage: '142 000 km',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    power: '440 ch (324 kW)',
    payloadCapacity: '26 Tonnes (Benne 16 m³)',
    axles: '6x4 Châssis Surélevé',
    availability: 'En transit (Port Lomé)',
    condition: 'Occasion Europe Révisée',
    location: 'Transit maritime vers Ouaga',
    mainImage: dumpHowoImg,
    gallery: [dumpHowoImg],
    features: [
      'Garde au sol exceptionnelle 385 mm sous essieu',
      'Boîte manuelle ZF 16 vitesses avec servoshift',
      'Benne Marrel tout acier avec porte arrière automatique',
      'Échappement vertical pour éviter les tourbillons de poussière',
      'Pneumatiques 13R22.5 neufs spécial pistes africaines',
      'Ralentisseur moteur Optibrake haute retenue'
    ],
    specs: {
      moteur: 'DXi 11 6 cylindres en ligne Injection Haute Pression',
      cylindree: '10 800 cc',
      puissanceFiscale: '37 CV',
      suspension: 'Ressorts à lames multi-feuilles avec barres stabilisatrices lourdes',
      freinage: 'Tambours protégés tout-terrain avec régulation électronique',
      climatisation: 'Manuelle puissante révisée à neuf',
      dedouanement: 'Dossier de transit sécurisé avec caution douanière',
      garantie: 'Garantie atelier Burkimba Life 3 mois'
    },
    description: 'Conçu spécialement pour les travaux les plus sévères. Le Kerax 440 offre une longévité inégalée dans le transport de granulats, sable et latérite.',
    badge: 'Occasion Europe'
  },
  {
    id: 'toyota-hiace-commuter-2024',
    title: 'Toyota Hiace Commuter 15 Places Tropicalisé Neuf',
    category: 'utilitaires',
    categoryLabel: 'Utilitaires & Minibus',
    brand: 'Toyota',
    model: 'Hiace Grand Cabin 2.8 D-4D',
    year: 2024,
    priceXOF: 28500000,
    mileage: '0 km (Neuf)',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    power: '177 ch',
    payloadCapacity: '15 Passagers + Bagages',
    axles: '4x2 Renforcé',
    availability: 'En stock à Ouaga (Tampouy)',
    condition: 'Neuf 0 km',
    location: 'Showroom Tampouy, Ouagadougou',
    mainImage: heroFleetImg,
    gallery: [heroFleetImg],
    features: [
      '15 sièges individuels avec ceintures 3 points',
      'Double climatisation avant et diffuseurs plafonniers passagers arrière',
      'Marchepied électrique escamotable et porte latérale large',
      'Radio Bluetooth avec micro d\'annonce pour chauffeur/guide',
      'Suspension arrière à lames renforcée spécial routes africaines',
      'Porte-bagages de pavillon en acier avec échelle arrière'
    ],
    specs: {
      moteur: '2.8L D-4D 4 cylindres Turbo Diesel',
      cylindree: '2 755 cc',
      puissanceFiscale: '10 CV',
      suspension: 'Ressorts hélicoïdaux avant, essieu rigide lames arrière',
      freinage: 'Disques avant, tambours arrière avec ABS',
      climatisation: 'Double compresseur indépendant grande capacité',
      dedouanement: 'Immatriculation et carte de transport public possible',
      garantie: '2 ans ou 50 000 km'
    },
    description: 'Le roi incontesté du transport interurbain au Faso. Fiable, économique en carburant et extrêmement rentable pour les compagnies de transport et institutions.',
    badge: 'Rentabilité Maximale'
  },
  {
    id: 'citerne-hydrocarbures-45000l',
    title: 'Semi-Remorque Citerne Hydrocarbures 45 000 Litres Tri-Essieux',
    category: 'gros-porteurs',
    categoryLabel: 'Gros Porteurs',
    brand: 'CIMAC / Schmitz',
    model: 'Citerne Aluminium 5 Compartiments',
    year: 2023,
    priceXOF: 38000000,
    mileage: '0 km (Neuf)',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    power: 'P.T.A.C. 50 Tonnes',
    payloadCapacity: '45 000 Litres (Essence / Gasoil)',
    axles: 'Tri-essieux BPW 12 Tonnes avec 1er essieu relevable',
    availability: 'Sur commande spéciale',
    condition: 'Neuf 0 km',
    location: 'Commande usine livrée Ouaga sous 25 jours',
    mainImage: actrosImg,
    gallery: [actrosImg],
    features: [
      'Cuve en alliage d\'aluminium 5 compartiments (10k + 10k + 8k + 9k + 8k)',
      'Système de dépotage et chargement par le bas (Bottom Loading)',
      'Vannes de fond pneumatiques avec coupure d\'urgence',
      'Passerelle supérieure antidérapante avec garde-corps repliable',
      'Équipement complet de sécurité incendie (extincteurs 9kg et liaison équipotentielle)',
      'Freinage EBS WABCO avec capteurs de stabilité anti-renversement'
    ],
    specs: {
      moteur: 'Non motorisé (Semi-remorque attelable)',
      cylindree: 'N/A',
      puissanceFiscale: 'N/A',
      suspension: 'Pneumatique BPW avec manomètre de pression de charge',
      freinage: 'EBS-E WABCO avec système anti-renversement RSS',
      climatisation: 'N/A',
      dedouanement: 'Homologation SONABHY Burkina Faso et certificat de jaugeage officiel',
      garantie: 'Garantie étanchéité cuve 3 ans'
    },
    description: 'Citerne certifiée aux normes internationales de transport d\'hydrocarbures, prête pour agrément SONABHY. Conçue pour résister aux contraintes thermiques et aux pistes de desserte.',
    badge: 'Homologué SONABHY'
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Tous les Véhicules', count: VEHICLES_DATA.length },
  { id: 'gros-porteurs', label: 'Gros Porteurs & Camions', count: VEHICLES_DATA.filter(v => v.category === 'gros-porteurs').length },
  { id: 'engins-btp', label: 'Engins BTP & Mines', count: VEHICLES_DATA.filter(v => v.category === 'engins-btp').length },
  { id: 'suv-4x4', label: '4x4 & SUV de Luxe', count: VEHICLES_DATA.filter(v => v.category === 'suv-4x4').length },
  { id: 'utilitaires', label: 'Utilitaires & Minibus', count: VEHICLES_DATA.filter(v => v.category === 'utilitaires').length }
];

export const COMPANY_INFO = {
  name: 'BURKIMBA LIFE',
  slogan: 'La Marque des Déterminées',
  subtitle: 'Vente de Voitures, Camions Gros Porteurs & Engins BTP',
  address: 'Tampouy, Secteur 21, Ouagadougou, Burkina Faso',
  email: 'burkimbalife@gmail.com',
  whatsapp: '+22667307409',
  whatsappDisplay: '+226 67 30 74 09',
  phone: '+22663110899',
  phoneDisplay: '+226 63 11 08 99',
  facebook: 'Burkimba Life',
  facebookUrl: 'https://facebook.com',
  instagram: 'burkimba lifeofficial',
  instagramUrl: 'https://instagram.com',
  rccm: 'BF-OUA-01-2023-B13-09412',
  ifu: '00192847T',
  openingHours: 'Lundi au Samedi : 07h30 - 18h30 | Dimanche sur rendez-vous'
};

export const FORMAT_FCFA = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA';
};

export const FORMAT_EUR = (amountFCFA: number): string => {
  // 1 EUR = 655.957 FCFA (Fixed CFA parity)
  const eur = Math.round(amountFCFA / 655.957);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(eur);
};
