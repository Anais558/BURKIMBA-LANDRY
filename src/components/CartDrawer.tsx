import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { FORMAT_FCFA, BURKIMBA_INFO, DEFAULT_SETTINGS } from '../data/transitData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onGenerateProforma: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onGenerateProforma
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.simulation?.totalLivreXOF || item.product?.priceChinaUSD * 615 * 1.35 || 0) * (item.quantity || 1),
    0
  );

  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const getWhatsAppCartMessage = () => {
    let msg = `*DEVIS BURKIMBA TRANSIT*\n\n`;
    items.forEach((item, idx) => {
      const p = item.product || item.vehicle;
      const sim = item.simulation;
      const itemTotal = (sim?.totalLivreXOF || p.priceChinaUSD * 615 * 1.35) * item.quantity;
      msg += `${idx + 1}. ${p.title} (x${item.quantity}) : ${FORMAT_FCFA(itemTotal)}\n`;
    });
    msg += `\n*TOTAL ESTIMÉ LIVRÉ : ${FORMAT_FCFA(totalAmount)}*`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white border-l border-stone-200 shadow-xl flex flex-col text-stone-900">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-stone-950">
              Devis &amp; Panier ({totalCount})
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-16 text-center text-stone-500">
                <p className="text-sm font-medium mb-4">
                  Votre bon de commande est vide
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explorer le catalogue
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const p = item.product || item.vehicle;
                const sim = item.simulation;
                const price = sim?.totalLivreXOF || p.priceChinaUSD * 615 * 1.35;

                return (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-xl flex gap-3 relative border border-stone-200/60"
                  >
                    <img
                      src={p.mainImage}
                      alt={p.title}
                      className="w-16 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {p.title}
                      </h4>
                      <div className="text-xs font-mono font-bold text-stone-950 mt-0.5 tabular-nums">
                        {FORMAT_FCFA(price)}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                        <div className="flex items-center gap-1 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, (item.quantity || 1) - 1))}
                            className="w-6 h-6 rounded bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono font-semibold">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, (item.quantity || 1) + 1)}
                            className="w-6 h-6 rounded bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                          title="Retirer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Total: ONLY FCFA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="flex items-baseline justify-between text-sm sm:text-base font-bold font-mono">
                <span className="text-stone-600">Total estimé :</span>
                <span className="text-stone-950 tabular-nums">{FORMAT_FCFA(totalAmount)}</span>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onGenerateProforma();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
                >
                  Facture proforma PDF
                </button>

                <a
                  href={`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${getWhatsAppCartMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Envoyer sur WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
