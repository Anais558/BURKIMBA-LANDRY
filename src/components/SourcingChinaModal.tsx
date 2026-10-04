import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { BURKIMBA_INFO } from '../data/transitData';

interface SourcingChinaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcingChinaModal: React.FC<SourcingChinaModalProps> = ({ isOpen, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Véhicules & Camions');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specs, setSpecs] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*DEMANDE DE SOURCING SUR MESURE EN CHINE*`,
      `Client : ${customerName}`,
      `Téléphone : ${customerPhone}`,
      `Catégorie : ${category}`,
      `Équipement recherché : ${itemName}`,
      `Spécifications : ${specs || 'Standard usine'}`,
      `\nMerci de me recontacter avec les options disponibles.`
    ];

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden my-2 max-h-[96vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-950">
              Sourcing sur mesure en Chine
            </h3>
            <p className="text-xs text-stone-500">
              Vous ne trouvez pas votre modèle ? Nous le cherchons pour vous en usine.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-stone-900 mx-auto" />
              <h4 className="text-base font-bold text-stone-900">Demande enregistrée</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Notre équipe basée à Tampouy et nos agents en Chine prennent en charge votre demande.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nom &amp; Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Téléphone WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 00 00"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                >
                  <option value="Véhicules & Camions">Véhicules &amp; Camions</option>
                  <option value="Engins BTP & Mines">Engins BTP &amp; Mines</option>
                  <option value="Machines Agricoles">Machines Agricoles</option>
                  <option value="Machines Industrielles">Machines Industrielles &amp; Groupes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Matériel ou engin recherché *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Porte-char 50T, niveleuse, camion plateau..."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Précisions techniques (optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Spécifications particulières, année souhaitée, budget..."
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer min-h-[42px]"
              >
                Envoyer la demande de recherche
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
