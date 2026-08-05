'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6 md:p-8 shadow-xl">
      {/* Background Decorative Blob */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-xl mx-auto text-center">
        <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-md">
          <Mail className="w-6 h-6 text-blue-200" />
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight">
          Berlangganan Buletin Berita Harian
        </h3>
        <p className="text-blue-100 text-sm leading-relaxed">
          Dapatkan ringkasan berita terpopuler, analisis mendalam, dan kabar terkini langsung di kotak masuk email Anda setiap pagi.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-sm font-semibold animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Terima kasih! Anda telah terdaftar.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              required
              placeholder="Masukkan alamat email Anda..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors shadow-lg text-sm shrink-0"
            >
              Langganan Gratis
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
