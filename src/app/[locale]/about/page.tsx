import { Building2, Globe, Award, MapPin } from "lucide-react";

type Props = {
  params: { locale: string };
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/about-cover.jpg"
          alt="Anfaş Expo Center"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — Antalya Fuarcılık A.Ş.
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "Hakkımızda" : "About Us"}
          </h1>
          <p className="text-white/50 text-sm md:text-base font-medium mt-6 max-w-xl leading-relaxed">
            {tr
              ? "1994'ten bu yana Antalya'yı dünya fuarcılığının merkezine taşıyoruz."
              : "Since 1994, placing Antalya at the center of world exhibitions."}
          </p>
        </div>
      </section>

      {/* METİN — kitap gibi dümdüz */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {tr ? (
          <div className="flex flex-col gap-8 text-slate-700 text-base md:text-lg leading-[1.9]">
            <p>
              Antalya'yı fuarlar ve kongreler kenti yapma hedefleriyle 1994 yılında 71 ortakla kurulmuştur. Hayata geçirdiği uluslararası fuarlarla ülke ve kent ekonomisinin büyümesinde kaldıraç olan ANFAŞ, dünya fuarcılığında marka olma yolunda hızla ilerleyen bir fuar organizasyon firmasıdır.
            </p>
            <p>
              ANFAŞ ortakları arasında; Antalya Büyükşehir Belediyesi, Antalya Ticaret Borsası (ATB), Antalya Ticaret ve Sanayi Odası (ATSO), Antalya Sanayici ve İş İnsanları Derneği (ANSİAD), Antalya Tanıtım Vakfı (ATAV) ve çok sayıda önemli kamu ve özel sektör iştirakleri yer almaktadır.
            </p>
            <p>
              ANFAŞ Fuarcılık, turizm başta olmak üzere kentin zenginliklerini harmanlayarak düzenlediği organizasyonlarla, yerel ve küresel ölçekteki sektör temsilcilerini yılın her mevsiminde Antalya'da buluşturarak kent ekonomisini canlandırmaktadır. ANFAŞ fuarlarıyla Antalya ve Türkiye'nin tanıtımını uluslararası platformlarda organize ederek kentin marka alt yapısına önemli katkılar sağlamaktadır.
            </p>
            <p>
              Yenilenen ve daha da güçlenen yapısıyla kentin çözüm odaklı isimlerini bir arada buluşturan ANFAŞ, uluslararası iş birlikteliklerini arttıracak yurt dışı tanıtım çalışmalarına ağırlık vermiştir. Çalışmalar kapsamında; Batı Akdeniz İhracatçılar Birliği'nin (BAİB) katkıları ve Ticaret Bakanlığı'nın destekleriyle, Bulgaristan, Filistin, Tunus, Kosova ve Umman olmak üzere 4 ülkeden Batı Akdeniz Kalkınma Ajansı (BAKA) iş birliği ile Ortadoğu ve Kuzey Afrika (MENA) ve Arap Yarımadası bölgesine ait, Birleşik Arap Emirlikleri, Katar, Kuveyt, Suudi Arabistan, Yemen ve Kazakistan olmak üzere 6 ülkeden, ANFAŞ'ın yurt dışındaki acente iş birlikleriyle Almanya, Brezilya, Bulgaristan, Çin, Hindistan, Kosova, Sırbistan, Tunus ve Yunanistan'dan alım heyetleri ve profesyonel ziyaretçiler fuarlara getirilmektedir.
            </p>
            <p>
              Bununla birlikte yurt içi çalışmaları kapsamında fuarlara Ticaret Bakanlığı, Kültür ve Turizm Bakanlığı, Bilim Sanayi ve Teknoloji Bakanlığı, Gıda Tarım ve Hayvancılık Bakanlığı, Türkiye Odalar ve Borsalar Birliği (TOBB), Türkiye Esnaf ve Sanatkârları Konfederasyonu (TESK), Ticaret Borsaları, Ticaret ve Sanayi Odaları, Türkiye Otelciler Federasyonu (TÜROFED), Türkiye Aşçılar Federasyonu (TAFED), Türkiye Lokantacılar ve Pastacılar Federasyonu ve çok sayıda sivil toplum kuruluşu iş birliğiyle 81 ilden profesyonel ziyaretçi getirilmektedir.
            </p>
            <p>
              Antalya'nın sembol yapıları arasında yer alan Anfaş Uluslararası Fuar ve Kongre Merkezi; 40.000 metrekare kapalı, 20.000 metrekare açık olmak üzere toplam 60.000 metrekarelik alanı ve 15 adet kongre, konferans ve seminer salonlarıyla eşsiz organizasyonlara ev sahipliği yapmaktadır.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 text-slate-700 text-base md:text-lg leading-[1.9]">
            <p>
              Founded in 1994 with 71 partners with the goal of making Antalya a city of fairs and congresses, ANFAŞ is a fair organization company that acts as a lever in the growth of the national and city economy through the international fairs it realizes, rapidly advancing toward becoming a brand in world exhibitions.
            </p>
            <p>
              Among ANFAŞ's partners are Antalya Metropolitan Municipality, Antalya Commodity Exchange (ATB), Antalya Chamber of Commerce and Industry (ATSO), Antalya Industrialists and Businessmen Association (ANSİAD), Antalya Promotion Foundation (ATAV), and many important public and private sector affiliates.
            </p>
            <p>
              ANFAŞ blends the city's riches, especially tourism, and through the organizations it arranges, brings together local and global industry representatives in Antalya throughout all seasons of the year, revitalizing the city economy. It makes important contributions to the city's brand infrastructure by organizing the promotion of Antalya and Turkey on international platforms.
            </p>
            <p>
              With its renewed and strengthened structure, ANFAŞ has focused on international promotion activities that will increase international partnerships. Within this scope, with the contributions of the Western Mediterranean Exporters' Association (BAİB) and the support of the Ministry of Trade, buyer delegations and professional visitors are brought from 4 countries including Bulgaria, Palestine, Tunisia, Kosovo and Oman through BAKA cooperation, from 6 countries in the MENA region including UAE, Qatar, Kuwait, Saudi Arabia, Yemen and Kazakhstan, and through ANFAŞ's overseas agency partnerships from Germany, Brazil, Bulgaria, China, India, Kosovo, Serbia, Tunisia and Greece.
            </p>
            <p>
              In addition, within the scope of domestic activities, professional visitors are brought from all 81 provinces in cooperation with the Ministry of Trade, Ministry of Culture and Tourism, Ministry of Science Industry and Technology, Ministry of Food Agriculture and Livestock, TOBB, TESK, Commodity Exchanges, Chambers of Commerce and Industry, TÜROFED, TAFED, the Turkish Restaurateurs and Pastry Chefs Federation and many civil society organizations.
            </p>
            <p>
              Anfaş International Fair and Congress Center, one of Antalya's landmark structures, hosts unique organizations with a total area of 60,000 square meters — 40,000 square meters indoor and 20,000 square meters outdoor — and 15 congress, conference and seminar halls.
            </p>
          </div>
        )}
      </section>

      {/* FOTOĞRAF */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="w-full h-[260px] sm:h-[380px] md:h-[500px] rounded-[2rem] overflow-hidden bg-slate-100">
          <img
            src="/images/about-interior.jpg"
            alt="Anfaş Expo Center"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* İSTATİSTİK — mb-32 ile footer'dan ayrı */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-b border-white/10">
            {[
              { icon: Building2, value: "40.000 m²", labelTr: "Kapalı Alan", labelEn: "Indoor Space" },
              { icon: Globe, value: "20.000 m²", labelTr: "Açık Alan", labelEn: "Outdoor Space" },
              { icon: Award, value: "15", labelTr: "Kongre & Seminer Salonu", labelEn: "Congress & Seminar Halls" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-8 py-14">
                <item.icon size={32} className="text-blue-500 mb-5" />
                <span className="text-white text-4xl md:text-5xl font-black tracking-tighter">{item.value}</span>
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.35em] uppercase mt-3">
                  {tr ? item.labelTr : item.labelEn}
                </span>
              </div>
            ))}
          </div>

          <div className="relative z-10 px-8 md:px-14 py-10 flex items-start gap-3">
            <MapPin size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-sm leading-relaxed">
              {tr
                ? "Antalya'nın sembol yapıları arasında yer alan Anfaş Uluslararası Fuar ve Kongre Merkezi; 40.000 m² kapalı, 20.000 m² açık olmak üzere toplam 60.000 m² alanı ve 15 adet kongre, konferans ve seminer salonlarıyla eşsiz organizasyonlara ev sahipliği yapmaktadır."
                : "Anfaş International Fair and Congress Center, one of Antalya's landmark structures, hosts unique organizations with a total area of 60,000 m² — 40,000 m² indoor and 20,000 m² outdoor — and 15 congress, conference and seminar halls."}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}