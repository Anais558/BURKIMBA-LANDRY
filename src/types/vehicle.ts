export type VehicleCategory = 'gros-porteurs' | 'engins-btp' | 'suv-4x4' | 'berlines' | 'utilitaires';

export type VehicleCondition = 'Neuf 0 km' | 'Occasion Europe Révisée' | 'Occasion Première Main';

export type AvailabilityStatus = 
  | 'En stock à Ouaga (Tampouy)' 
  | 'En transit (Port Lomé)' 
  | 'Sur commande spéciale';

export interface Vehicle {
  id: string;
  title: string;
  category: VehicleCategory;
  categoryLabel: string;
  brand: string;
  model: string;
  year: number;
  priceXOF: number; // In FCFA
  mileage: string;
  transmission: 'Automatique' | 'Manuelle' | 'Semi-Automatique';
  fuel: 'Diesel' | 'Essence' | 'Hybride';
  power: string;
  payloadCapacity?: string;
  axles?: string;
  availability: AvailabilityStatus;
  condition: VehicleCondition;
  location: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  specs: {
    moteur: string;
    cylindree: string;
    puissanceFiscale?: string;
    suspension: string;
    freinage: string;
    climatisation: string;
    dedouanement: string;
    garantie: string;
  };
  description: string;
  badge?: string;
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
  addedAt: string;
}

export interface ProformaQuote {
  quoteNumber: string;
  date: string;
  customerName: string;
  customerCompany?: string;
  customerPhone: string;
  customerEmail?: string;
  customerCity: string;
  items: CartItem[];
  totalXOF: number;
  notes?: string;
  paymentMethod: 'Virement bancaire' | 'Orange Money' | 'Moov Money' | 'Chèque certifié' | 'Comptant à l\'agence';
}
