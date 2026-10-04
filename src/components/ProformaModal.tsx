import React, { useState } from 'react';
import { X, Printer, Send } from 'lucide-react';
import { BURKIMBA_INFO, FORMAT_FCFA } from '../data/transitData';

interface ProformaModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onOrderSuccess?: () => void;
}

export const ProformaModal: React.FC<ProformaModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Ouagadougou');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const quoteNumber = `BTT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const quoteDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.simulation?.totalLivreXOF || item.product?.priceChinaUSD * 615 * 1.35 || 0) * (item.quantity || 1),
    0
  );

  const acompteExige = Math.round(totalAmount * 0.40);
  const soldeALivraison = totalAmount - acompteExige;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    let msg = `*DEVIS PROFORMA - BURKIMBA TRANSIT*\n`;
    msg += `N° : ${quoteNumber}\n`;
    msg += `Client : ${customerName || 'Client'} (${customerPhone || 'Non spécifié'})\n`;
    msg += `Ville : ${customerCity}\n\n`;
    items.forEach((item, idx) => {
      const p = item.product || item.vehicle;
      const sim = item.simulation;
      const itemTotal = (sim?.totalLivreXOF || p.priceChinaUSD * 615 * 1.35) * item.quantity;
      msg += `${idx + 1}. ${p.title} (x${item.quantity}) : ${FORMAT_FCFA(itemTotal)}\n`;
    });
    msg += `\n*TOTAL ESTIMÉ LIVRÉ : ${FORMAT_FCFA(totalAmount)}*\n`;
    msg += `Acompte 40% : ${FORMAT_FCFA(acompteExige)}\n`;
    msg += `Solde à la livraison : ${FORMAT_FCFA(soldeALivraison)}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
    if (onOrderSuccess) onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white text-stone-900 rounded-2xl shadow-xl overflow-hidden my-2 border border-stone-200 print:m-0 print:border-none print:shadow-none print:w-full max-h-[96vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-stone-100 text-stone-900 flex items-center justify-between border-b border-stone-200 print:hidden shrink-0">
          <div className="text-xs font-mono font-semibold">
            <span>Devis Proforma</span>
            <span className="mx-2 text-stone-400">·</span>
            <span>{quoteNumber}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Proforma Document Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 font-sans">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-stone-200 gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-950">
                BURKIMBA TRANSIT TRANSPORT
              </h1>
              <p className="text-xs text-stone-500">
                Importation directe Chine - Burkina Faso
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Tampouy, Secteur 21 · Ouagadougou · Tél: {BURKIMBA_INFO.phoneDisplay}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-600">
              <div className="font-mono font-bold text-stone-900">{quoteNumber}</div>
              <div>Date : {quoteDate}</div>
              <div className="text-[10px] text-stone-400 font-mono mt-1">
                RCCM: {BURKIMBA_INFO.rccm}
              </div>
            </div>
          </div>

          {/* Client info inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-3">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Nom du client :
              </label>
              <input
                type="text"
                placeholder="Ex: Oumarou Ouédraogo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Téléphone :
              </label>
              <input
                type="tel"
                placeholder="+226 70 00 00 00"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Ville de livraison :
              </label>
              <input
                type="text"
                placeholder="Ouagadougou"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Items Table: ONLY FCFA */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-900 text-stone-900 font-mono text-[11px]">
                  <th className="py-2 px-2">Désignation</th>
                  <th className="py-2 px-2 text-center">Quantité</th>
                  <th className="py-2 px-2 text-right">Total livré estimé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {items.map((item, idx) => {
                  const p = item.product || item.vehicle;
                  const sim = item.simulation;
                  const itemTotal = (sim?.totalLivreXOF || p.priceChinaUSD * 615 * 1.35) * item.quantity;

                  return (
                    <tr key={idx}>
                      <td className="py-3 px-2">
                        <div className="font-semibold text-stone-950">{p.title}</div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {p.brand} · {p.condition}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-medium">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-stone-900 tabular-nums">
                        {FORMAT_FCFA(itemTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-stone-200">
            <div className="text-xs text-stone-500 space-y-1">
              <div>Acompte de 40% au lancement de la commande.</div>
              <div>Solde de 60% à la livraison au showroom de Tampouy.</div>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Acompte 40% :</span>
                <span className="font-mono font-semibold">{FORMAT_FCFA(acompteExige)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Solde à livraison :</span>
                <span className="font-mono font-semibold">{FORMAT_FCFA(soldeALivraison)}</span>
              </div>
              <div className="flex justify-between text-stone-950 font-bold text-sm pt-2 border-t border-stone-300">
                <span>TOTAL ESTIMÉ :</span>
                <span className="font-mono">{FORMAT_FCFA(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Submit Action */}
          <div className="pt-2 print:hidden">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
            >
              Envoyer la demande sur WhatsApp
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
