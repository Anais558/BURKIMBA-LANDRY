import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Ship, MessageSquare } from 'lucide-react';
import { FORMAT_FCFA, COMPANY_INFO } from '../data/vehicles';

export const FinanceCalculator: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(45000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [durationMonths, setDurationMonths] = useState<number>(36);
  const [selectedPort, setSelectedPort] = useState<'lome' | 'abidjan' | 'cotonou'>('lome');

  // Banking leasing estimation (typical UEMOA rates: ~9.5% annual)
  const annualInterestRate = 0.095;
  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanAmount = vehiclePrice - downPaymentAmount;
  const monthlyRate = annualInterestRate / 12;
  
  const monthlyPayment = Math.round(
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, durationMonths))) /
    (Math.pow(1 + monthlyRate, durationMonths) - 1)
  );

  const portTransitCosts = {
    lome: { name: 'Port Autonome de Lomé (Togo)', transitDays: '4 à 6 jours', costFCFA: 1850000 },
    abidjan: { name: 'Port Autonome d\'Abidjan (Côte d\'Ivoire)', transitDays: '5 à 7 jours', costFCFA: 2200000 },
    cotonou: { name: 'Port Autonome de Cotonou (Bénin)', transitDays: '5 à 8 jours', costFCFA: 1950000 }
  };

  const currentPort = portTransitCosts[selectedPort];

  const handleWhatsAppSimulation = () => {
    const msg = `Bonjour Burkimba Life Tampouy,\nJe souhaite étudier une solution de financement / leasing pour un budget de ${FORMAT_FCFA(vehiclePrice)} avec un apport de ${downPaymentPercent}% sur ${durationMonths} mois (mensualité estimée : ${FORMAT_FCFA(monthlyPayment)}/mois). Convoi via ${currentPort.name}.\nPouvez-vous me mettre en relation avec votre conseiller financier ?`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="simulateur" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest mb-2 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Aide à la Décision &amp; Trésorerie</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Simulateur Crédit-Bail, Leasing &amp; Transit Maritime
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Calculez instantanément les mensualités de financement pour votre entreprise de transport, mine ou génie civil, ainsi que l'acheminement sécurisé jusqu'au showroom de Tampouy.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left Column in Pure White) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            
            {/* Vehicle Value Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">
                  Valeur du véhicule ou équipement lourd :
                </label>
                <span className="text-sm font-black text-red-700 font-mono tabular-nums">
                  {FORMAT_FCFA(vehiclePrice)}
                </span>
              </div>
              <input
                type="range"
                min={15000000}
                max={150000000}
                step={1000000}
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1">
                <span>15 000 000 FCFA</span>
                <span>80 000 000 FCFA</span>
                <span>150 000 000 FCFA</span>
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">
                  Apport Initial de Trésorerie :
                </label>
                <span className="text-sm font-black text-stone-900 font-mono tabular-nums">
                  {downPaymentPercent}% ({FORMAT_FCFA(downPaymentAmount)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 40].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    onClick={() => setDownPaymentPercent(percent)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      downPaymentPercent === percent
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-red-400'
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Months */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">
                  Durée du financement bancaire :
                </label>
                <span className="text-sm font-black text-stone-900 font-mono tabular-nums">
                  {durationMonths} mois ({Math.round(durationMonths / 12)} ans)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 48].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setDurationMonths(months)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      durationMonths === months
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-red-400'
                    }`}
                  >
                    {months} mois
                  </button>
                ))}
              </div>
            </div>

            {/* Port Selection for Corridors */}
            <div className="pt-2 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 block mb-2">
                Port d'acheminement maritime (Corridor d'approvisionnement) :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { key: 'lome', name: 'Port de Lomé' },
                  { key: 'abidjan', name: 'Port d\'Abidjan' },
                  { key: 'cotonou', name: 'Port de Cotonou' }
                ].map((port) => (
                  <button
                    key={port.key}
                    type="button"
                    onClick={() => setSelectedPort(port.key as any)}
                    className={`py-2 px-3 text-xs rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedPort === port.key
                        ? 'bg-amber-100/80 text-stone-950 border-amber-400 font-bold shadow-2xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:text-stone-900'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5 text-red-600" />
                    <span>{port.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Box (Right Column in White/Red Theme) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-2 border-red-200 shadow-lg space-y-6">
            <div>
              <div className="text-xs text-red-600 uppercase font-black tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span>Estimation Mensualité Leasing</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-red-700 font-mono tabular-nums mt-1">
                {FORMAT_FCFA(monthlyPayment)}
                <span className="text-xs font-semibold text-stone-500"> /mois</span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-normal">
                Hors assurance tous risques et frais de dossier bancaires.
              </p>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3 pt-4 border-t border-stone-200 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Montant à financer :</span>
                <span className="font-mono text-stone-900 font-bold tabular-nums">{FORMAT_FCFA(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Apport comptant ({downPaymentPercent}%) :</span>
                <span className="font-mono text-stone-900 font-bold tabular-nums">{FORMAT_FCFA(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Corridor sélectionné :</span>
                <span className="text-stone-900 font-medium">{currentPort.name}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Délai convoi Ouagadougou :</span>
                <span className="text-emerald-700 font-bold">{currentPort.transitDays}</span>
              </div>
            </div>

            {/* Partners badge */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs text-stone-800 font-medium leading-relaxed">
                Accords de partenariat avec les banques de la place (Coris Bank, BOA, Ecobank, Vista Bank, BICIAB).
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppSimulation}
                className="w-full py-3.5 px-4 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-400/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Soumettre cette simulation par WhatsApp</span>
              </button>
              
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full py-2.5 px-4 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>Joindre le service commercial ({COMPANY_INFO.phoneDisplay})</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
