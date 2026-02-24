type Props = {
  params: { locale: string };
};

const partners = [
  { no: 1,  name: "NAZIM EREN ÇELEBİ" },
  { no: 2,  name: "GELİŞİM TEKNİK SANAYİ VE TİC.PAZ.A.Ş." },
  { no: 3,  name: "SÜLEYMAN BIDI" },
  { no: 4,  name: "ALİ BIDI" },
  { no: 5,  name: "ANTALYA BÜYÜKŞEHİR BELEDİYE BAŞKANLIĞI" },
  { no: 6,  name: "ANTALYA TİCARET VE SANAYİ ODASI" },
  { no: 7,  name: "İLYAS ZEYBEK" },
  { no: 8,  name: "ADEM SAK" },
  { no: 9,  name: "HÜSEYİN OKUR" },
  { no: 10, name: "MELEK BIDI ERCAN" },
  { no: 11, name: "YÜKSEL TOHUM TARIM SANAYİ VE TİCARET A.Ş." },
  { no: 12, name: "ANTALYA TİCARET BORSASI" },
  { no: 13, name: "AHMET KOCAKUŞAK" },
  { no: 14, name: "NİLSUN TÜMER (KOCAKUŞAK)" },
  { no: 15, name: "ASLI OKUR" },
  { no: 16, name: "ASIM OKUR" },
  { no: 17, name: "ESMA NEVİN OKUR" },
  { no: 18, name: "ZİYA ÖZDEN TEZGEL" },
  { no: 19, name: "ANTALYA ESNAF VE SANATKARLAR ODA.BİR." },
  { no: 20, name: "MELİH DİPOVA" },
  { no: 21, name: "AHMET YETKİN ARMAĞAN" },
  { no: 22, name: "SADIK BADAK" },
  { no: 23, name: "HAYDAR BARUT" },
  { no: 24, name: "FETİ KUYUCU" },
  { no: 25, name: "ESİN VE KNUT BOJUNGA" },
  { no: 26, name: "ÖMER ÖZGÜÇ" },
  { no: 27, name: "HATİCE ÖZ" },
  { no: 28, name: "İBRAHİM NURAY ÖZ" },
  { no: 29, name: "KERİM YÜKSEL" },
  { no: 30, name: "SIDIKA KOCAKUŞAK" },
  { no: 31, name: "NİZAMETTİN ŞEN" },
  { no: 32, name: "BÜLENT BIDI" },
  { no: 33, name: "KAYHAN ÖNDEMİR" },
  { no: 34, name: "HASAN NURAY YILMAZ" },
  { no: 35, name: "HALİL ERDEM" },
  { no: 36, name: "ICA BUILD FUARCILIK A.Ş." },
  { no: 37, name: "MURATPAŞA BELEDİYE BAŞKANLIĞI" },
  { no: 38, name: "10.BÖLGE ANTALYA ECZACILAR ODASI" },
  { no: 39, name: "İSMAİL FETHİ ÖZGEN" },
  { no: 40, name: "OSMAN AKSOY" },
  { no: 41, name: "CENGİZ EREN" },
  { no: 42, name: "ISPARTA TİCARET VE SANAYİ ODASI" },
  { no: 43, name: "FURKAN GÜNEŞ" },
  { no: 44, name: "MUSTAFA ÇALIK" },
  { no: 45, name: "TURSAV" },
  { no: 46, name: "HÜSEYİN ÜVET" },
  { no: 47, name: "ANSİAD ANTALYA SANAYİ VE İŞ ADAMLARI DER." },
  { no: 48, name: "KEPEZ BELEDİYE BAŞKANLIĞI" },
  { no: 49, name: "KANALET PETROL MADEN YAPI END.SAN.TİC.A.Ş." },
  { no: 50, name: "AKDENİZ REKLAM TAN.HİZ.TİC.AŞ." },
  { no: 51, name: "ANTALYA TANITIM VAKFI" },
  { no: 52, name: "KONYAALTI BELEDİYE BAŞKANLIĞI" },
  { no: 53, name: "FATİH KABADAYI" },
  { no: 54, name: "HOLİDAY PLAN TUR.İŞLETMECİLİK VE TİC.A.Ş." },
  { no: 55, name: "EMİNE JALE ÇALIK" },
  { no: 56, name: "FURKAN TANDOĞAN" },
  { no: 57, name: "NACİYE ŞÜLE SÖZEN" },
  { no: 58, name: "ÇİMSA ÇİMENTO SANAYİ VE TİC. A.Ş." },
  { no: 59, name: "TÜYAP TÜM FUARCILIK YAPIM A.Ş." },
  { no: 60, name: "AHMET ÇAYIR" },
  { no: 61, name: "MUSTAFA CENGİZ" },
  { no: 62, name: "HÜSEYİN YAZICI" },
  { no: 63, name: "AKTİF HALKLA İLİŞ. TAN. LTD.ŞTİ." },
  { no: 64, name: "HÜSEYİN ÇALIK" },
];

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/partners-cover.jpg"
          alt={tr ? "Ortaklarımız" : "Our Partners"}
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
            {tr ? "Ortaklık\nListesi" : "Partner\nList"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? `ANFAŞ bünyesinde yer alan ${partners.length} ortak`
              : `${partners.length} partners within ANFAŞ`}
          </p>
        </div>
      </section>

      {/* SAYAÇ BANDI */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-white text-5xl md:text-6xl font-black tracking-tighter">64</span>
            <div>
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase">
                {tr ? "TOPLAM ORTAK" : "TOTAL PARTNERS"}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                {tr ? "1994'ten bu yana" : "Since 1994"}
              </p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs hidden sm:block">
            {tr
              ? "Kamu kurumları, özel sektör ve sivil toplum kuruluşlarından oluşan güçlü ortak yapısı"
              : "A strong partnership structure comprising public institutions, private sector and civil society organizations"}
          </p>
        </div>
      </section>

      {/* ORTAK LİSTESİ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-10">
          01 — {tr ? "ORTAK LİSTESİ" : "PARTNER LIST"}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-100">
          {partners.map((partner, i) => (
            <div
              key={partner.no}
              className="group flex items-center gap-5 bg-white px-6 py-5 hover:bg-blue-50/60 transition-colors duration-200"
            >
              {/* Numara */}
              <span className="text-slate-200 group-hover:text-blue-200 text-xs font-black tracking-widest flex-shrink-0 w-7 transition-colors duration-200">
                {String(partner.no).padStart(2, "0")}
              </span>

              {/* Ayraç */}
              <div className="w-[1px] h-8 bg-slate-100 group-hover:bg-blue-200 flex-shrink-0 transition-colors duration-200" />

              {/* İsim */}
              <span className="text-slate-700 group-hover:text-slate-900 text-[13px] font-semibold leading-snug transition-colors duration-200">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}