type Props = {
  params: { locale: string };
};

export default async function BilgiToplumuPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const companyInfo = tr ? [
    { label: "Şirket Türü", value: "A.Ş." },
    { label: "MERSIS", value: "0069001279700012" },
    { label: "Ticaret Sicil Memurluğu", value: "ANTALYA" },
    { label: "Ticaret Unvanı", value: "ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM ANONİM ŞİRKETİ" },
    { label: "Adres", value: "SOĞUCAKSU MAH. 25001 SOKAK NO:1/4 AKSU / ANTALYA" },
    { label: "Kayıtlı Sermaye Tavanı", value: "110.000.000 TL — Yüz On Milyon TL" },
    { label: "Şirket Tescil Tarihi", value: "25.10.1994" },
    { label: "Vergi Dairesi", value: "ANTALYA" },
    { label: "Vergi Numarası", value: "0690012797" },
    { label: "Sektör", value: "Reklamcılık, fuar ve organizasyon hizmetleri, televizyon ve radyoculuk faaliyetleri" },
  ] : [
    { label: "Company Type", value: "A.Ş. (Joint Stock Company)" },
    { label: "MERSIS", value: "0069001279700012" },
    { label: "Trade Registry Office", value: "ANTALYA" },
    { label: "Trade Name", value: "ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM ANONİM ŞİRKETİ" },
    { label: "Address", value: "SOĞUCAKSU MAH. 25001 SOKAK NO:1/4 AKSU / ANTALYA" },
    { label: "Registered Capital Ceiling", value: "110,000,000 TL — One Hundred Ten Million TL" },
    { label: "Company Registration Date", value: "25.10.1994" },
    { label: "Tax Office", value: "ANTALYA" },
    { label: "Tax Number", value: "0690012797" },
    { label: "Sector", value: "Advertising, fair and organization services, television and radio broadcasting activities" },
  ];

  const contactInfo = [
    { label: tr ? "Telefon" : "Phone", value: "+90 (242) 462 20 00" },
    { label: "Fax", value: "+90 (242) 462 19 85" },
    { label: "Website", value: "www.anfas.com.tr" },
  ];

  const boardMembers = [
    { label: tr ? "Yönetim Kurulu Başkanı" : "Chairman", value: "Ali BIDI" },
    { label: tr ? "Yönetim Kurulu Başkan Vekili" : "Vice Chairman", value: tr ? "Cem OĞUZ — Antalya Büyükşehir Belediyesi Temsili" : "Cem OĞUZ — Representative of Antalya Metropolitan Municipality" },
  ];

  const members = [
    "Ziya Özden TEZGEL",
    "Melek BIDI ERCAN",
    "Nazım Eren ÇELEBİ",
    tr ? "Özgür ERDOĞAN — Antalya Büyükşehir Belediyesi Temsili" : "Özgür ERDOĞAN — Representative of Antalya Metropolitan Municipality",
    "İlyas ZEYBEK",
  ];

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/bilgi-toplumu-cover.jpg"
          alt="Bilgi Toplumu"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — Antalya Fuarcılık A.Ş.
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "Bilgi\nToplumu" : "Corporate\nInfo"}
          </h1>
        </div>
      </section>

      {/* YASAL UYARI BANDI */}
      <div className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-5">
          <p className="text-blue-800 text-xs md:text-sm leading-relaxed font-medium">
            {tr
              ? "6102 sayılı Türk Ticaret Kanunu'nun ilgili maddeleri (397 ve 1524) ile 31 Mayıs 2013 tarih ve 28663 sayılı Resmi Gazete'de yayımlanan Sermaye Şirketlerinin Açacakları İnternet Sitelerine Dair Yönetmelik uyarınca öngörülen içeriğe bu bölümde yer verilmektedir."
              : "The content required pursuant to the relevant articles (397 and 1524) of the Turkish Commercial Code No. 6102 and the Regulation on Internet Sites to be Opened by Capital Companies published in the Official Gazette dated May 31, 2013 and numbered 28663 is provided in this section."}
          </p>
        </div>
      </div>

      {/* ŞİRKET BİLGİLERİ */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-8">
          01 — {tr ? "ŞİRKET BİLGİLERİ" : "COMPANY INFORMATION"}
        </span>
        <div className="rounded-[1.5rem] border border-slate-100 overflow-hidden">
          {companyInfo.map((item, i) => (
            <div key={i} className={`grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 px-6 py-5 ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"}`}>
              <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase self-start pt-0.5">{item.label}</span>
              <span className="text-slate-800 text-sm md:text-[15px] font-semibold leading-snug">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-8">
          02 — {tr ? "İLETİŞİM BİLGİLERİ" : "CONTACT INFORMATION"}
        </span>
        <div className="rounded-[1.5rem] border border-slate-100 overflow-hidden">
          {contactInfo.map((item, i) => (
            <div key={i} className={`grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 px-6 py-5 ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"}`}>
              <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase self-start pt-0.5">{item.label}</span>
              <span className="text-slate-800 text-sm md:text-[15px] font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* YÖNETİM KURULU */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-32">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-8">
          03 — {tr ? "YÖNETİM KURULU" : "BOARD OF DIRECTORS"}
        </span>
        <div className="rounded-[1.5rem] border border-slate-100 overflow-hidden">
          {boardMembers.map((item, i) => (
            <div key={i} className={`grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 px-6 py-5 ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"}`}>
              <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase self-start pt-0.5">{item.label}</span>
              <span className="text-slate-800 text-sm md:text-[15px] font-semibold">{item.value}</span>
            </div>
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 px-6 py-5 bg-slate-50/60">
            <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase self-start pt-0.5">
              {tr ? "Yönetim Kurulu Üyeleri" : "Board Members"}
            </span>
            <div className="flex flex-col gap-2">
              {members.map((name, i) => (
                <span key={i} className="text-slate-800 text-sm md:text-[15px] font-semibold border-b border-slate-100 pb-2 last:border-none last:pb-0">{name}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 px-6 py-5 bg-white">
            <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase self-start pt-0.5">
              {tr ? "Denetçi" : "Auditor"}
            </span>
            <span className="text-slate-800 text-sm md:text-[15px] font-semibold">—</span>
          </div>
        </div>
      </section>

    </div>
  );
}