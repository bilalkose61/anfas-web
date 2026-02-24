type Props = {
  params: { locale: string };
};

const transport = [
  {
    no: "01",
    photo: "/images/transport-car.jpg",
    titleTr: "Kendi Aracınızla",
    titleEn: "By Private Car",
    bodyTr: "Şehrin girişindeki ana arterde yer alan konumu ve çevre yoluna bağlantıları ile ANFAŞ Fuar Merkezine kendi aracınızla rahatlıkla ulaşabilirsiniz. 1400 araçlık otoparkımız hizmetinizdedir.",
    bodyEn: "You can easily reach ANFAŞ Fair Center by private car via the main artery and ring road connections. Our 1,400-vehicle car park is at your service.",
    badge: "1.400 Park",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m-7 12h8m-8 0a2 2 0 01-2-2v-5m10 7a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    no: "02",
    photo: "/images/transport-tram.jpg",
    titleTr: "Tramvay",
    titleEn: "Tram",
    bodyTr: "Şehir merkezinden 15 dakika aralıklarla hareket eden tramvay seferleri, sizi direkt olarak ANFAŞ Fuar Merkezine getirmektedir.",
    bodyEn: "Tram services departing every 15 minutes from the city center bring you directly to ANFAŞ Fair Center.",
    badge: "15 dk",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <rect x="6" y="2" width="12" height="17" rx="2"/><path d="M6 13h12M6 9h12M9 19l-2 3m8-3l2 3M9 2h6"/>
      </svg>
    ),
  },
  {
    no: "03",
    photo: "/images/transport-taxi.jpg",
    titleTr: "Taksi",
    titleEn: "Taxi",
    bodyTr: "ANFAŞ fuar alanının merkezi konumu, şehrin her noktasından taksi ile kolaylıkla ulaşım imkanı sağlamaktadır.",
    bodyEn: "The central location of ANFAŞ fair grounds makes it easily accessible by taxi from anywhere in the city.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m-7 12h8m-8 0a2 2 0 01-2-2v-5m10 7a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    no: "04",
    photo: "/images/transport-bus.jpg",
    titleTr: "Şehir İçi Otobüsler",
    titleEn: "City Buses",
    bodyTr: "Şehrin her noktasından otobüs hatlarını kullanarak ANFAŞ'a kolaylıkla ulaşabilirsiniz. Şehir merkezine uzaklığı 15 km'dir.",
    bodyEn: "You can easily reach ANFAŞ using city bus lines from anywhere. Distance from city center is 15 km.",
    badge: "15 km",
    lines: ["AC03", "AF04", "AF04A", "MK81", "MK80", "519"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M8 6v12M3 12h18M3 6h18v12H3zM8 6V4h8v2"/><circle cx="7" cy="18" r="1"/><circle cx="17" cy="18" r="1"/>
      </svg>
    ),
  },
  {
    no: "05",
    photo: "/images/transport-intercity.jpg",
    titleTr: "Şehirler Arası Otobüs",
    titleEn: "Intercity Bus",
    bodyTr: "Günde 20.000+ yolcuya hizmet veren Antalya Otogarı'na 400+ firma sefer düzenlemektedir. Otogara uzaklık 17 km'dir.",
    bodyEn: "400+ companies serve Antalya Bus Terminal (20,000+ daily passengers). Terminal is 17 km from ANFAŞ.",
    badge: "17 km",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M8 6v12M3 12h18M3 6h18v12H3zM8 6V4h8v2"/><circle cx="7" cy="18" r="1"/><circle cx="17" cy="18" r="1"/>
      </svg>
    ),
  },
  {
    no: "06",
    photo: "/images/transport-airport.jpg",
    titleTr: "Hava Yolu",
    titleEn: "By Air",
    bodyTr: "255 şehirden 61 hava yolu şirketi ile direkt uçuş imkanı sunan Antalya Havalimanı, ANFAŞ'a yalnızca 3 km uzaklıktadır.",
    bodyEn: "Antalya Airport offers direct flights from 255 cities by 61 airlines and is only 3 km from ANFAŞ.",
    badge: "3 km",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
];

export default async function HowToGetPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/how-to-get-cover.jpg"
          alt={tr ? "Nasıl Giderim" : "How to Get There"}
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
            {tr ? "Nasıl\nGiderim?" : "How To\nGet There?"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr ? "ANFAŞ Fuar Merkezi'ne ulaşım seçenekleri" : "Transportation options to ANFAŞ Fair Center"}
          </p>
        </div>
      </section>

      {/* ULAŞIM KARTLARI */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "ULAŞIM SEÇENEKLERİ" : "TRANSPORTATION OPTIONS"}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {transport.map((item) => (
            <div
              key={item.no}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Fotoğraf */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.photo}
                  alt={tr ? item.titleTr : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Numara + badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-white/60 text-xs font-black tracking-widest">{item.no}</span>
                  {item.badge && (
                    <span className="bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* İkon */}
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                  {item.icon}
                </div>
              </div>

              {/* İçerik */}
              <div className="flex flex-col gap-3 p-6 bg-white flex-1">
                <h3 className="text-slate-900 text-lg font-black tracking-tight uppercase">
                  {tr ? item.titleTr : item.titleEn}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {tr ? item.bodyTr : item.bodyEn}
                </p>

                {/* Hat bilgisi */}
                {"lines" in item && item.lines && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                      {tr ? "Hatlar" : "Lines"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.lines.map((line: string) => (
                        <span key={line} className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HARİTA — footer üstü */}
      <section className="mb-16 mx-6 md:mx-12 max-w-7xl xl:mx-auto">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-8">
          02 — {tr ? "KONUM" : "LOCATION"}
        </span>

        <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl">
          {/* Harita */}
          <div className="h-[500px] md:h-[560px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.9150382480857!2d30.81384777640929!3d36.940197459794426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38159cb6c04a1%3A0x56b250da71e326d7!2sANFA%C5%9E%20Antalya%20Expo%20Center!5e0!3m2!1str!2str!4v1771571998865!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ANFAŞ Fuar Merkezi"
            />
          </div>

          {/* Adres kartı üstünde */}
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-2xl px-7 py-6 max-w-sm">
            <p className="text-blue-600 text-[9px] font-bold tracking-[0.4em] uppercase mb-3">
              ANFAŞ Antalya Expo Center
            </p>
            <p className="text-slate-800 text-sm font-semibold leading-relaxed mb-4">
              Soğucaksu Mah. 25001 Sokak No:1/4<br />Aksu / Antalya
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-medium mb-4">
              <span>📞 +90 (242) 462 20 00</span>
              <span>✉️ info@anfas.com.tr</span>
            </div>
            <a
              href="https://maps.google.com/?q=ANFAS+Antalya+Expo+Center"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              {tr ? "Yol Tarifi Al" : "Get Directions"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}