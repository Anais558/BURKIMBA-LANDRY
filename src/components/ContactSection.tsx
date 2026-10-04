import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';
import { BURKIMBA_INFO } from '../data/transitData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Camion Benne');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*MESSAGE - BURKIMBA TRANSIT*\n` +
      `Nom : ${name}\n` +
      `Téléphone : ${phone}\n` +
      `Projet : ${interest}\n` +
      `Message : ${message || 'Souhaite une cotation'}`;
    
    window.open(`https://wa.me/${BURKIMBA_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
            Bureau &amp; Showroom
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Tampouy, Secteur 21 · Ouagadougou, Burkina Faso
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          
          {/* Coordinates */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-stone-900">
              Coordonnées
            </h3>

            <div className="space-y-3 text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Showroom Tampouy</div>
                  <div>Secteur 21, Ouagadougou</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`tel:${BURKIMBA_INFO.phone}`} className="font-mono text-stone-900 hover:underline">
                  {BURKIMBA_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`https://wa.me/${BURKIMBA_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-mono text-stone-900 hover:underline">
                  {BURKIMBA_INFO.whatsappDisplay} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`mailto:${BURKIMBA_INFO.email}`} className="text-stone-900 hover:underline">
                  {BURKIMBA_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/60 text-[11px] text-stone-500">
              Ouvert du lundi au samedi de 07h30 à 18h30.
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-3">
              Envoyer un message
            </h3>

            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-stone-900 mx-auto" />
                <p className="text-xs font-semibold text-stone-900">Message envoyé sur WhatsApp</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-stone-500 underline cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Projet
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none"
                  >
                    <option value="Camions Bennes HOWO">Camions Bennes HOWO</option>
                    <option value="Tracteurs Semi-Remorques">Tracteurs Semi-Remorques</option>
                    <option value="Pelles & Chargeuses BTP">Pelles &amp; Chargeuses BTP</option>
                    <option value="Tracteurs Agricoles YTO">Tracteurs Agricoles YTO</option>
                    <option value="Autre demande">Autre équipement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Précisions sur votre demande..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Envoyer
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
