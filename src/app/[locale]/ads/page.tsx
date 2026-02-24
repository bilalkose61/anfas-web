"use client";

import { use, useState } from "react";

const stats = [
  { valueTr: "250.000+", valueEn: "250,000+", labelTr: "Yıllık Ziyaretçi", labelEn: "Annual Visitors" },
  { valueTr: "30+",      valueEn: "30+",       labelTr: "Yıllık Fuar",      labelEn: "Annual Fairs" },
  { valueTr: "40.000m²", valueEn: "70,000m²",  labelTr: "Fuar Alanı",       labelEn: "Exhibition Area" },
  { valueTr: "17+",      valueEn: "17+",        labelTr: "Ülkeden Katılım",  labelEn: "Countries" },
];

const pages = Array.from({ length: 13 }, (_, i) => `/reklam-sponsor/sayfa-${String(i + 1).padStart(2, "0")}.jpg`);

export default function AdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tr = locale === "tr";

  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(pages.length - 1, c + 1));

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/ads-cover.jpg"
          alt={tr ? "Reklam Alanları" : "Advertising Spaces"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.38) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">
              ANFAŞ — Antalya Fuarcılık A.Ş.
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Reklam\nAlanları" : "Advertising\nSpaces"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? "Markanızı doğru kitleyle buluşturun"
              : "Connect your brand with the right audience"}
          </p>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-2 md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <span className="text-white text-4xl md:text-5xl font-black tracking-tighter">
                  {tr ? s.valueTr : s.valueEn}
                </span>
                <span className="text-slate-400 text-[11px] font-bold tracking-[0.3em] uppercase">
                  {tr ? s.labelTr : s.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROŞÜR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "BROŞÜR" : "BROCHURE"}
        </span>

        {/* Broşür görüntüleyici */}
        <div className="flex flex-col items-center gap-6">

          {/* Ana görsel */}
          <div className="relative w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 aspect-[3/4]">
            <img
              src={pages[current]}
              alt={`${tr ? "Sayfa" : "Page"} ${current + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Sol ok */}
            <button
              onClick={prev}
              disabled={current === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-slate-900">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Sağ ok */}
            <button
              onClick={next}
              disabled={current === pages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-slate-900">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Sayfa numarası */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-black tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
              {current + 1} / {pages.length}
            </div>
          </div>

          {/* Thumbnail şeridi */}
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-2xl w-full scrollbar-hide">
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-14 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                  ${current === i ? "border-blue-600 scale-105 shadow-lg" : "border-transparent hover:border-slate-300"}`}
              >
                <img src={page} alt={`${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* İletişim CTA */}
          <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] w-full max-w-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-blue-400 text-[9px] font-bold tracking-[0.4em] uppercase mb-3">
                  {tr ? "BİZİMLE İLETİŞİME GEÇİN" : "CONTACT US"}
                </p>
                <h3 className="text-white text-2xl font-black tracking-tight uppercase mb-2">
                  {tr ? "Reklam Alanı Rezervasyonu" : "Ad Space Reservation"}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tr
                    ? "Broşürde yer alan reklam alanları için bizimle iletişime geçin."
                    : "Contact us for advertising spaces featured in the brochure."}
                </p>
              </div>
              <a
                href={`/${locale}/contact`}
                className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                {tr ? "İletişime Geç" : "Contact Us"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}