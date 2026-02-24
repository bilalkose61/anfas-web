"use client";

import { use, useEffect, useRef, useState } from "react";

type Props = { params: Promise<{ locale: string }> };

const halls = [
  { id: "hol1", nameTr: "Hol 1", nameEn: "Hall 1", sqm: 17621 },
  { id: "hol2", nameTr: "Hol 2", nameEn: "Hall 2", sqm: 26771 },
  { id: "hol3", nameTr: "Hol 3", nameEn: "Hall 3", sqm: 26697 },
  { id: "hol4", nameTr: "Hol 4", nameEn: "Hall 4", sqm: 49678 },
  { id: "fuaye", nameTr: "Fuaye", nameEn: "Foyer", sqm: 1900 },
  { id: "sundurma", nameTr: "Sundurma", nameEn: "Porch", sqm: 1400 },
];

const maxSqm = Math.max(...halls.map(h => h.sqm));

const colors = [
  "from-blue-600 to-blue-400",
  "from-cyan-600 to-cyan-400",
  "from-indigo-600 to-indigo-400",
  "from-blue-700 to-blue-500",
  "from-slate-500 to-slate-400",
  "from-slate-400 to-slate-300",
];


function AnimatedBar({ sqm, maxSqm, color, delay }: { sqm: number; maxSqm: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth((sqm / maxSqm) * 100), delay);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [sqm, maxSqm, delay]);
  return (
    <div ref={ref} className="h-full w-full">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
    </div>
  );
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: { photos: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} disabled={index === 0}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-20 transition-all">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <img src={photos[index]} alt="" className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} disabled={index === photos.length - 1}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-20 transition-all">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-black tracking-widest">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

export default function VenuePage({ params }: Props) {
  const { locale } = use(params);
  const tr = locale === "tr";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen font-sans">

      {lightboxIndex !== null && (
        <Lightbox
          photos={["/images/venue-floor-plan.jpg"]}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(galleryPhotos.length - 1, (i ?? 0) + 1))}
        />
      )}

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/venue-cover.jpg" alt={tr ? "Fuar Alanı" : "Exhibition Venue"}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-black text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Fuar\nAlanı" : "Exhibition\nVenue"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-black mt-6 max-w-md leading-relaxed">
            {tr ? "60.000 m² toplam sergi alanı ile Antalya'nın kalbi" : "The heart of Antalya with 60,000 m² total exhibition area"}
          </p>
        </div>
      </section>

      {/* İSTATİSTİK BANDI */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { value: "60.000 m²", labelTr: "Toplam Alan",  labelEn: "Total Area" },
              { value: "40.000 m²", labelTr: "Kapalı Alan",  labelEn: "Indoor Area" },
              { value: "20.000 m²", labelTr: "Açık Alan",    labelEn: "Outdoor Area" },
              { value: "1999",      labelTr: "Kuruluş Yılı", labelEn: "Founded" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-2 md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <span className="text-white text-3xl md:text-4xl font-black tracking-tighter">{s.value}</span>
                <span className="text-slate-400 text-[11px] font-black tracking-[0.3em] uppercase">{tr ? s.labelTr : s.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRAFİK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "ALAN DAĞILIMI" : "AREA DISTRIBUTION"}
        </span>
        <div className="flex flex-col gap-6">
          {halls.map((hall, i) => (
            <div key={hall.id} className="group flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-[10px] font-black tracking-widest w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-slate-900 text-base font-black uppercase tracking-tight">{tr ? hall.nameTr : hall.nameEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 text-lg font-black tracking-tight">{hall.sqm.toLocaleString("tr-TR")}</span>
                  <span className="text-slate-400 text-sm font-black">m²</span>
                  <span className="text-slate-300 text-xs font-black ml-2">%{Math.round((hall.sqm / maxSqm) * 100)}</span>
                </div>
              </div>
              <div className="h-5 bg-slate-100 rounded-full overflow-hidden">
                <AnimatedBar sqm={hall.sqm} maxSqm={maxSqm} color={colors[i]} delay={i * 150} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: "40.000 m²", labelTr: "Kapalı Alan", labelEn: "Indoor Area", color: "bg-blue-600" },
            { value: "20.000 m²", labelTr: "Açık Alan",   labelEn: "Outdoor Area", color: "bg-cyan-500" },
            { value: "60.000 m²", labelTr: "Toplam",      labelEn: "Total", color: "bg-slate-900" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-2xl px-6 py-5">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
              <div>
                <p className="text-slate-900 text-xl font-black tracking-tight">{item.value}</p>
                <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase">{tr ? item.labelTr : item.labelEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALAN PLANI */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-8">
          02 — {tr ? "ALAN PLANI" : "FLOOR PLAN"}
        </span>
        <div className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl cursor-zoom-in" onClick={() => setLightboxIndex(0)}>
          <img src="/images/venue-floor-plan.jpg" alt={tr ? "Fuar Alanı Planı" : "Venue Floor Plan"} className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500" />
        </div>
        <p className="text-slate-400 text-xs font-black mt-3 text-center tracking-widest uppercase">
          {tr ? "Büyütmek için tıklayın" : "Click to enlarge"}
        </p>
      </section>

      {/* HAKKINDA METİN */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-8">
          03 — {tr ? "HAKKIMIZDA" : "ABOUT"}
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">
          <div className="flex flex-col gap-6">
            <p className="text-slate-700 text-lg font-black leading-relaxed">
              {tr
                ? "ANFAŞ - Antalya Fuarcılık İşletme ve Yatırım A.Ş. tarafından 1999 yılında hizmete açılan Antalya Expo Center Fuar ve Kongre Merkezi; 2016 yılında gerçekleştirilen yenileme çalışmalarının ardından 20.000 m²'lik kullanım alanından %100 büyüyerek 40.000 m² kapalı 20.000 m² açık olmak üzere toplam 60.000 m²'lik sergi alanına ulaşmıştır."
                : "Antalya Expo Center Fair and Congress Center, opened in 1999 by ANFAŞ - Antalya Fuarcılık İşletme ve Yatırım A.Ş., has grown 100% from 20,000 m² to a total of 60,000 m² — 40,000 m² indoors and 20,000 m² outdoors — following the 2016 renovation."}
            </p>
            <p className="text-slate-600 text-base font-black leading-relaxed">
              {tr
                ? "Büyüyen alanı ile birlikte Antalya Expo Center; organizasyon profilini genişleterek, çok sayıda genel ve ihtisas fuarlarına ev sahipliği yapmaya, fuarlar ve etkinlikleri tek çatı altında gerçekleştirmeye devam etmektedir."
                : "With its expanded area, Antalya Expo Center continues to broaden its organizational profile, hosting numerous general and specialized fairs, and bringing fairs and events together under one roof."}
            </p>
            <p className="text-slate-600 text-base font-black leading-relaxed">
              {tr
                ? "Antalya Expo Center, fuar alanına ek olarak 10 ila 1.000 kişi arasında değişerek bölünebilen 15 toplantı salonu ile kongre merkezi olarak hizmet vermektedir. Fuarlarla kongreleri eş zamanlı yapma imkanı sunan ANFAŞ salonları; kongre, konferans, seminer, panel, gala, lansman, defile, gösteri ve özel günleri unutulmaz kılmaktadır."
                : "In addition to the exhibition area, Antalya Expo Center serves as a congress center with 15 meeting halls accommodating 10 to 1,000 people. ANFAŞ halls make congresses, conferences, seminars, panels, galas, launches, fashion shows and special days unforgettable."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { value: "%100", labelTr: "Büyüme (2016 sonrası)", labelEn: "Growth since 2016" },
              { value: "15",   labelTr: "Toplantı Salonu",       labelEn: "Meeting Halls" },
              { value: "1999", labelTr: "Açılış Yılı",           labelEn: "Opening Year" },
              { value: "2016", labelTr: "Yenileme Yılı",         labelEn: "Renovation Year" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-7 py-5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-100 border border-transparent transition-all duration-300">
                <span className="text-slate-500 text-sm font-black">{tr ? item.labelTr : item.labelEn}</span>
                <span className="text-slate-900 text-2xl font-black tracking-tight">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALT İSTATİSTİK */}
      <section className="bg-slate-900 mb-16 mx-6 md:mx-12 max-w-7xl xl:mx-auto rounded-[2.5rem] overflow-hidden">
        <div className="px-8 md:px-14 py-14">
          <p className="text-blue-400 text-[9px] font-black tracking-[0.5em] uppercase mb-10">
            04 — {tr ? "RAKAMLARLA ANFAŞ" : "ANFAŞ IN NUMBERS"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { value: "250.000+", labelTr: "Yıllık Ziyaretçi", labelEn: "Annual Visitors" },
              { value: "30+",      labelTr: "Yıllık Fuar",      labelEn: "Annual Fairs" },
              { value: "5.000+",   labelTr: "Katılımcı Firma",  labelEn: "Exhibitor Companies" },
              { value: "17+",      labelTr: "Ülkeden Katılım",  labelEn: "Participating Countries" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-2 md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <span className="text-white text-3xl md:text-4xl font-black tracking-tighter">{s.value}</span>
                <span className="text-slate-400 text-[11px] font-black tracking-[0.3em] uppercase">{tr ? s.labelTr : s.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}