"use client";

import { use, useState, useEffect, useRef } from "react";

type Props = { params: Promise<{ locale: string }> };

const halls = [
  {
    id: "buyuk-salon",
    photos: ["/images/halls/hall-buyuk-salon-1.jpg", "/images/halls/hall-buyuk-salon-2.jpg", "/images/halls/hall-buyuk-salon-3.jpg"],
    nameTr: "ANFAŞ Büyük Salon", nameEn: "ANFAŞ Main Hall",
    tagTr: "Antalya'nın En Büyük Salonu", tagEn: "Antalya's Largest Hall",
    descTr: "1000 kişilik tiyatro düzeniyle Antalya'nın en büyük kongre salonudur. Geniş sahne alanı, gelişmiş ses ve ışık sistemleri ile her türlü büyük organizasyon için idealdir.",
    descEn: "With a theater layout for 1,000 people, it is the largest congress hall in Antalya. Ideal for all large-scale events with advanced audio-visual systems.",
    sqm: 850, width: 46, length: 18.8, height: 5.8,
    capacity: { theater: 1000, gala1: 640, gala2: 500, classroom: 500, boardroom: "-", uShape: "-" },
    accent: "#2563eb",
  },
  {
    id: "karanfil",
    photos: ["/images/halls/hall-karanfil-1.jpg", "/images/halls/hall-karanfil-2.jpg", "/images/halls/hall-karanfil-3.jpg"],
    nameTr: "Salon Karanfil", nameEn: "Carnation Hall",
    tagTr: "Çok Amaçlı Salon", tagEn: "Multipurpose Hall",
    descTr: "180 kişilik kapasitesi ve çok yönlü düzenleme seçenekleriyle toplantı, seminer ve özel etkinlikler için ideal bir salon.",
    descEn: "With a capacity of 180 and versatile layout options, ideal for meetings, seminars and private events.",
    sqm: 215, width: 17.97, length: 16.97, height: 2.58,
    capacity: { theater: 180, gala1: 100, gala2: 90, classroom: "-", boardroom: "-", uShape: "-" },
    accent: "#0891b2",
  },
  {
    id: "leylak",
    photos: ["/images/halls/hall-leylak-1.jpg", "/images/halls/hall-leylak-2.jpg", "/images/halls/hall-leylak-3.jpg"],
    nameTr: "Salon Leylak", nameEn: "Lilac Hall",
    tagTr: "Eğitim & Seminer", tagEn: "Training & Seminar",
    descTr: "Esnek düzenleme seçenekleri ile toplantı, eğitim ve organizasyonlar için uygun, modern bir salon.",
    descEn: "A modern hall suitable for meetings, training and events with flexible arrangement options.",
    sqm: 116, width: 17.7, length: 6.55, height: 2.58,
    capacity: { theater: 100, gala1: 42, gala2: "-", classroom: 48, boardroom: 32, uShape: 34 },
    accent: "#7c3aed",
  },
  {
    id: "manolya",
    photos: ["/images/halls/hall-manolya-1.jpg", "/images/halls/hall-manolya-2.jpg", "/images/halls/hall-manolya-3.jpg"],
    nameTr: "Salon Manolya", nameEn: "Magnolia Hall",
    tagTr: "İş Toplantıları", tagEn: "Business Meetings",
    descTr: "Küçük grup toplantıları ve iş görüşmeleri için tasarlanmış, konforlu ve modern bir salon.",
    descEn: "A comfortable and modern hall designed for small group meetings and business discussions.",
    sqm: 84, width: 9.35, length: 8.7, height: 2.58,
    capacity: { theater: 80, gala1: "-", gala2: "-", classroom: "-", boardroom: 18, uShape: 20 },
    accent: "#059669",
  },
  {
    id: "orkide",
    photos: ["/images/halls/hall-orkide-1.jpg", "/images/halls/hall-orkide-2.jpg", "/images/halls/hall-orkide-3.jpg"],
    nameTr: "Salon Orkide", nameEn: "Orchid Hall",
    tagTr: "Çok Amaçlı", tagEn: "Multipurpose",
    descTr: "Seminer ve çalışma grupları için uygun, pratik düzenleme seçenekleri sunan çok amaçlı bir salon.",
    descEn: "A multipurpose hall with practical layout options suitable for seminars and working groups.",
    sqm: 58, width: 8.7, length: 6.5, height: 2.58,
    capacity: { theater: 50, gala1: "-", gala2: "-", classroom: 24, boardroom: 14, uShape: 20 },
    accent: "#dc2626",
  },
  {
    id: "papatya",
    photos: ["/images/halls/hall-papatya-1.jpg", "/images/halls/hall-papatya-2.jpg", "/images/halls/hall-papatya-3.jpg"],
    nameTr: "Salon Papatya", nameEn: "Daisy Hall",
    tagTr: "Eğitim & Konferans", tagEn: "Training & Conference",
    descTr: "Eğitim seminerleri ve küçük konferanslar için ideal, ferah ve aydınlık bir salon.",
    descEn: "A bright and spacious hall ideal for training seminars and small conferences.",
    sqm: 116, width: 17.7, length: 6.55, height: 2.58,
    capacity: { theater: 100, gala1: 42, gala2: "-", classroom: 48, boardroom: 32, uShape: 34 },
    accent: "#d97706",
  },
  {
    id: "gul",
    photos: ["/images/halls/hall-gul-1.jpg", "/images/halls/hall-gul-2.jpg", "/images/halls/hall-gul-3.jpg"],
    nameTr: "Salon Gül", nameEn: "Rose Hall",
    tagTr: "Esnek Düzenleme", tagEn: "Flexible Layout",
    descTr: "Toplantı ve seminerler için esnek yapısıyla tercih edilen, konforlu bir salon.",
    descEn: "A comfortable hall preferred for its flexible structure for meetings and seminars.",
    sqm: 58, width: 7.8, length: 6.6, height: 2.58,
    capacity: { theater: 50, gala1: "-", gala2: "-", classroom: 24, boardroom: 16, uShape: 18 },
    accent: "#be185d",
  },
  {
    id: "vip",
    photos: ["/images/halls/hall-vip-1.jpg", "/images/halls/hall-vip-2.jpg", "/images/halls/hall-vip-3.jpg"],
    nameTr: "Salon VIP", nameEn: "VIP Hall",
    tagTr: "Özel & Prestijli", tagEn: "Exclusive & Prestigious",
    descTr: "Özel toplantılar ve yönetim kurulu görüşmeleri için lüks donanımlı, özel VIP salonu.",
    descEn: "A luxuriously equipped private VIP hall for exclusive meetings and board sessions.",
    sqm: 44, width: 10.07, length: 5.36, height: 2.58,
    capacity: { theater: "-", gala1: "-", gala2: "-", classroom: "-", boardroom: 14, uShape: 12 },
    accent: "#92400e",
  },
];

function HallSection({ hall, tr, index }: { hall: typeof halls[0]; tr: boolean; index: number }) {
  const [photo, setPhoto] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance photos
  useEffect(() => {
    const t = setInterval(() => setPhoto(p => (p + 1) % hall.photos.length), 4000);
    return () => clearInterval(t);
  }, [hall.photos.length]);

  const isEven = index % 2 === 0;
  const caps = [
    { labelTr: "Tiyatro", labelEn: "Theater", value: hall.capacity.theater },
    { labelTr: "Gala I",  labelEn: "Gala I",  value: hall.capacity.gala1 },
    { labelTr: "Gala II", labelEn: "Gala II", value: hall.capacity.gala2 },
    { labelTr: "Sınıf",   labelEn: "Classroom", value: hall.capacity.classroom },
    { labelTr: "Board",   labelEn: "Board",    value: hall.capacity.boardroom },
    { labelTr: "U Düzeni",labelEn: "U Shape",  value: hall.capacity.uShape },
  ];

  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5`}>

        {/* FOTOĞRAF TARAFI */}
        <div className={`relative overflow-hidden ${!isEven ? "lg:order-2" : ""}`}>
          {hall.photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={tr ? hall.nameTr : hall.nameEn}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${photo === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r from-transparent to-black/30" : "bg-gradient-to-l from-transparent to-black/30"}`} />

          {/* Accent color top bar */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: hall.accent }} />

          {/* Tag */}
          <div className="absolute top-8 left-8">
            <span className="text-[9px] font-black tracking-[0.4em] uppercase px-4 py-2 rounded-full border border-white/20 text-white backdrop-blur-sm bg-black/20">
              {tr ? hall.tagTr : hall.tagEn}
            </span>
          </div>

          {/* Salon adı büyük */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-2">
              {tr ? hall.nameTr : hall.nameEn}
            </h3>
            <p className="text-white/50 text-sm font-semibold mb-5">{hall.sqm} m²  ·  {hall.width} × {hall.length} m  ·  H: {hall.height} m</p>

            {/* Dot navigasyon */}
            <div className="flex items-center gap-2">
              {hall.photos.map((_, i) => (
                <button key={i} onClick={() => setPhoto(i)}
                  className={`transition-all duration-300 rounded-full ${photo === i ? "w-8 h-2 bg-white" : "w-2 h-2 hover:bg-white/70"}`}
                  style={photo === i ? {} : { backgroundColor: "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DETAY TARAFI */}
        <div className={`flex flex-col bg-slate-950 p-8 md:p-10 xl:p-12 gap-8 ${!isEven ? "lg:order-1" : ""}`}>

          {/* Accent çizgi + açıklama */}
          <div className="flex flex-col gap-4">
            <div className="h-0.5 w-12 rounded-full" style={{ backgroundColor: hall.accent }} />
            <p className="text-slate-300 text-base leading-relaxed">
              {tr ? hall.descTr : hall.descEn}
            </p>
          </div>

          {/* Boyutlar */}
          <div>
            <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: hall.accent }}>
              {tr ? "BOYUTLAR" : "DIMENSIONS"}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "m²", value: hall.sqm },
                { label: tr ? "En" : "Width", value: `${hall.width}m` },
                { label: tr ? "Boy" : "Length", value: `${hall.length}m` },
                { label: tr ? "Yük." : "Height", value: `${hall.height}m` },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-2 py-4 border border-white/5">
                  <span className="text-white text-lg font-black tracking-tight">{item.value}</span>
                  <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kapasite */}
          <div className="flex-1">
            <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: hall.accent }}>
              {tr ? "KAPASİTE" : "CAPACITY"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {caps.map((cap, i) => (
                <div key={i} className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-4 border transition-all
                  ${cap.value === "-" ? "border-white/5 bg-white/2 opacity-40" : "border-white/10 bg-white/5"}`}>
                  <span className={`text-xl font-black ${cap.value === "-" ? "text-white/20" : "text-white"}`}>
                    {cap.value}
                  </span>
                  <span className="text-slate-500 text-[9px] font-bold tracking-wide uppercase text-center leading-tight">
                    {tr ? cap.labelTr : cap.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rezervasyon */}
          <a href={`/${tr ? "tr" : "en"}/contact`}
            className="group flex items-center justify-between gap-4 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-5 transition-all duration-300 hover:bg-white/5">
            <div>
              <p className="text-white font-black text-sm uppercase tracking-wide">
                {tr ? "Rezervasyon Yap" : "Make a Reservation"}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                {tr ? "Uygunluk ve fiyat için iletişime geçin" : "Contact us for availability and pricing"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-white/30 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ConferencePage({ params }: Props) {
  const { locale } = use(params);
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/conference-cover.jpg" alt={tr ? "Toplantı & Konferans" : "Meeting & Conference"}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Toplantı &\nKonferans" : "Meeting &\nConference"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr ? "12 kongre salonu, 2 VIP, 1 basın odası ve 4 fuaye ile hizmetinizdeyiz." : "At your service with 12 congress halls, 2 VIP rooms, 1 press room and 4 foyers."}
          </p>
        </div>
      </section>

      {/* İSTATİSTİK BANDI */}
      <section className="bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { value: "12", labelTr: "Kongre Salonu", labelEn: "Congress Halls" },
              { value: "2",  labelTr: "VIP Salon",     labelEn: "VIP Rooms" },
              { value: "1",  labelTr: "Basın Odası",   labelEn: "Press Room" },
              { value: "4",  labelTr: "Fuaye",         labelEn: "Foyer" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-2 md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <span className="text-white text-4xl md:text-5xl font-black tracking-tighter">{s.value}</span>
                <span className="text-slate-400 text-[11px] font-bold tracking-[0.3em] uppercase">{tr ? s.labelTr : s.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALONLAR — koyu arkaplan */}
      <section className="bg-white px-6 md:px-12 py-20 md:py-28 mb-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
            01 — {tr ? "SALONLAR" : "HALLS"}
          </span>
          <div className="flex flex-col gap-8">
            {halls.map((hall, i) => (
              <HallSection key={hall.id} hall={hall} tr={tr} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}