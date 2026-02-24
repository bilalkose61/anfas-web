import PartnerLogo from "@/components/PartnerLogo";

type Props = {
  params: { locale: string };
};

const partners = [
  {
    id: "ant-fuar",
    logo: "/images/partners/ant-fuar-catering.png",
    category: { tr: "Catering Hizmeti", en: "Catering Service" },
    name: "ANT FUAR CATERING",
    contacts: [
      { type: "phone", value: "0533 419 4424" },
      { type: "phone", value: "0536 282 8636" },
      { type: "email", value: "antfuarcatering7@gmail.com" },
    ],
  },
  {
    id: "digitrend",
    logo: "/images/partners/digitrend.png",
    category: { tr: "Dijital Baskı", en: "Digital Printing" },
    name: "DIGITREND PLUS",
    contacts: [
      { type: "phone", value: "0531 782 4853" },
      { type: "email", value: "digitrendplus@gmail.com" },
    ],
  },
  {
    id: "isko",
    logo: "/images/partners/isko-hali.png",
    category: { tr: "Zemin Yer Döşeme Hizmeti", en: "Flooring Service" },
    name: "İSKO HALI",
    contacts: [
      { type: "phone", value: "0542 427 4092" },
      { type: "email", value: "iskohali@hotmail.com" },
    ],
  },
  {
    id: "nova",
    logo: "/images/partners/nova-stand.png",
    category: { tr: "Stand Hizmetleri", en: "Stand Services" },
    name: "NOVA STAND",
    contacts: [
      { type: "phone", value: "0541 976 9007" },
      { type: "email", value: "emre@standnova.com" },
    ],
  },
  {
    id: "rv",
    logo: "/images/partners/rv-temizlik.png",
    category: { tr: "Temizlik Hizmeti", en: "Cleaning Service" },
    name: "RV TEMİZLİK",
    contacts: [
      { type: "phone", value: "0542 656 6875" },
    ],
  },
  {
    id: "schenker",
    logo: "/images/partners/schenker.png",
    category: { tr: "Nakliyat ve Ticaret", en: "Logistics & Trade" },
    name: "SCHENKER ARKAS",
    contacts: [
      { type: "web",   value: "www.dbschenkerarkas.com.tr", href: "https://www.dbschenkerarkas.com.tr/tr-tr" },
      { type: "phone", value: "0533 504 6813" },
      { type: "phone", value: "0212 336 0036" },
      { type: "email", value: "tr.sm.ist.sales@dbschenkerarkas.com.tr" },
    ],
  },
  {
    id: "turker",
    logo: "/images/partners/turker-guvenlik.png",
    category: { tr: "Özel Güvenlik", en: "Private Security" },
    name: "TÜRKER ÖZEL GÜVENLİK",
    person: "Ümit Kaçtan",
    contacts: [
      { type: "phone", value: "0535 797 5482" },
      { type: "email", value: "umtkactan@hotmail.com" },
    ],
  },
  {
    id: "weblikya",
    logo: "/images/partners/weblikya.png",
    category: { tr: "Yazılım ve Teknoloji", en: "Software & Technology" },
    name: "WEBLİKYA YAZILIM",
    contacts: [
      { type: "web",   value: "www.weblikya.com", href: "https://www.weblikya.com/" },
      { type: "phone", value: "0531 962 9720" },
      { type: "phone", value: "0850 840 0712" },
      { type: "email", value: "bilgi@weblikya.com" },
    ],
  },
];

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

export default async function SolutionPartnersPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/solution-partners-cover.jpg"
          alt={tr ? "Çözüm Ortaklarımız" : "Solution Partners"}
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
            {tr ? "Çözüm\nOrtaklarımız" : "Solution\nPartners"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? "Fuarlarımızda hizmet veren güvenilir iş ortaklarımız"
              : "Our trusted business partners serving at our fairs"}
          </p>
        </div>
      </section>

      {/* KARTLAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "ORTAKLARIMIZ" : "OUR PARTNERS"}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col rounded-[2rem] border border-slate-100 bg-white hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Logo */}
              <div className="flex items-center justify-center h-36 bg-slate-50 group-hover:bg-blue-50/40 transition-colors duration-300 px-8 border-b border-slate-100">
                <PartnerLogo src={partner.logo} alt={partner.name} />
              </div>

              {/* İçerik */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                <div>
                  <span className="text-blue-600 text-[9px] font-bold tracking-[0.3em] uppercase block mb-1.5">
                    {tr ? partner.category.tr : partner.category.en}
                  </span>
                  <h3 className="text-slate-900 text-base font-black tracking-tight uppercase leading-tight">
                    {partner.name}
                  </h3>
                  {"person" in partner && partner.person && (
                    <p className="text-slate-400 text-xs font-semibold mt-1">{partner.person}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  {partner.contacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-400">
                      {c.type === "phone" && <PhoneIcon />}
                      {c.type === "email" && <MailIcon />}
                      {c.type === "web"   && <WebIcon />}
                      {c.type === "email" ? (
                        <a href={`mailto:${c.value}`} className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors truncate">
                          {c.value}
                        </a>
                      ) : c.type === "web" ? (
                        <a href={(c as any).href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors truncate">
                          {c.value}
                        </a>
                      ) : (
                        <a href={`tel:${c.value.replace(/\s/g, "")}`} className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                          {c.value}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}