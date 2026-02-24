import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { locale: string; slug: string };
};

const events: Record<string, {
  titleTr: string; titleEn: string;
  categoryTr: string; categoryEn: string;
  descTr: string; descEn: string;
  detailTr: string; detailEn: string;
  date: string;
  location: string;
  logo: string;
  image: string;
  website: string;
  websiteName: string;
  stats: { labelTr: string; labelEn: string; value: string }[];
}> = {
  "otel-ekipmanlari": {
    titleTr: "Otel Ekipmanları",
    titleEn: "Hotel Equipment",
    categoryTr: "KONAKLAMA",
    categoryEn: "HOSPITALITY",
    descTr: "Konaklama sektörünün en prestijli buluşması. ANFAŞ Hotel Equipment, 36 yıllık köklü geçmişiyle sektörün nabzını Antalya'dan dünyaya taşıyor.",
    descEn: "The most prestigious gathering of the hospitality sector. ANFAŞ Hotel Equipment, with its 36-year heritage, carries the pulse of the industry from Antalya to the world.",
    detailTr: "06-09 Ocak 2026 tarihleri arasında Anfaş Uluslararası Fuar ve Kongre Merkezi'nde kapılarını açacak olan 36. Anfaş Hotel Equipment; otel ekipmanları, mutfak teknolojileri, tekstil, yazılım ve daha onlarca kategoride 200'den fazla seçkin katılımcıyı buluşturuyor. Yurt içinden 70 farklı il ve 20'yi aşkın ülkeden gelecek 25.000'in üzerinde profesyonel ziyaretçiyle sektörün en önemli platformunda yerinizi alın. En yeni teknolojileri keşfedin, güçlü iş birlikleri kurun ve sektörün öncü isimleriyle yüz yüze görüşün.",
    detailEn: "The 36th Anfaş Hotel Equipment, opening its doors on January 6-9, 2026 at Anfaş International Fair and Congress Center, brings together over 200 distinguished exhibitors across dozens of categories. Take your place at the sector's most important platform alongside over 25,000 professional visitors from 70 provinces and more than 20 countries. Discover the latest technologies, build powerful partnerships, and meet face-to-face with the industry's leading figures.",
    date: "06.01 - 09.01.2026",
    location: "Antalya Anfaş Expo Center",
    logo: "/images/otel-logo.png",
    image: "/images/otel-cover.jpg",
    website: "https://www.anfashotelequipment.com/",
    websiteName: "anfashotelequipment.com",
    stats: [
      { labelTr: "Katılımcı", labelEn: "Exhibitors", value: "200+" },
      { labelTr: "Profesyonel Ziyaretçi", labelEn: "Professional Visitors", value: "25.000+" },
      { labelTr: "Ülke", labelEn: "Countries", value: "20+" },
    ],
  },
  "food-product": {
    titleTr: "Food Product",
    titleEn: "Food Product",
    categoryTr: "GIDA VE İÇECEK",
    categoryEn: "FOOD & BEVERAGE",
    descTr: "Gıda ve içecek sektörünün 32 yıllık dev buluşması. Anfaş FoodProduct, Antalya'dan dünya pazarlarına uzanan köprüyü her yıl daha güçlü kuruyor.",
    descEn: "The 32-year-old grand gathering of the food and beverage industry. Anfaş FoodProduct builds an ever-stronger bridge from Antalya to world markets every year.",
    detailTr: "06-09 Ocak 2026 tarihinde 32. kez kapılarını açacak olan Anfaş FoodProduct; 300'nin üzerinde katılımcıyı, yurt içinde 70 il ve yurt dışında 50'den fazla ülkeden gelen 35.000'i aşkın profesyonel ziyaretçiyle buluşturuyor. Çeyrek asrı aşkın fuarcılık tecrübesiyle şekillenen bu dev organizasyon; yeni ürün lansmanları, alıcı-satıcı görüşmeleri ve sektör buluşmalarıyla her yıl tarihe geçiyor. Hedeflerinize ulaştıracak tüm fırsatlar tek çatı altında sizi bekliyor.",
    detailEn: "Anfaş FoodProduct opens its doors for the 32nd time on January 6-9, 2026, bringing together over 300 exhibitors with more than 35,000 professional visitors from 70 provinces in Turkey and over 50 countries abroad. Shaped by over a quarter century of experience, this massive organization makes history every year with new product launches, buyer-seller meetings, and industry gatherings.",
    date: "06.01 - 09.01.2026",
    location: "Antalya Anfaş Expo Center",
    logo: "/images/food-logo.png",
    image: "/images/food-cover.jpg",
    website: "https://www.anfasfoodproduct.com/",
    websiteName: "anfasfoodproduct.com",
    stats: [
      { labelTr: "Katılımcı", labelEn: "Exhibitors", value: "300+" },
      { labelTr: "Profesyonel Ziyaretçi", labelEn: "Professional Visitors", value: "35.000+" },
      { labelTr: "Ülke", labelEn: "Countries", value: "50+" },
    ],
  },
  "fresh-antalya": {
    titleTr: "Fresh Antalya",
    titleEn: "Fresh Antalya",
    categoryTr: "TARIM",
    categoryEn: "AGRICULTURE",
    descTr: "Taze meyve ve sebze dünyasının en kapsamlı B2B platformu. Fresh Antalya, üretimden ihracata tüm değer zincirini Akdeniz'in kalbinde bir araya getiriyor.",
    descEn: "The most comprehensive B2B platform of the fresh fruit and vegetable world. Fresh Antalya brings together the entire value chain from production to export at the heart of the Mediterranean.",
    detailTr: "Antalya'nın stratejik konumunu küresel ticarete taşıyan Fresh Antalya; çiftçiler, ihracatçılar, alıcılar, lojistik firmaları ve teknoloji üreticilerini aynı platformda buluşturuyor. Taze meyve ve sebzelerden paketleme çözümlerine, soğuk zincir teknolojilerinden hasat sonrası yeniliklere kadar geniş bir yelpazeyi kapsayan fuar; konferanslar, paneller ve B2B eşleştirme programlarıyla sektörde sürdürülebilir büyümeyi destekliyor.",
    detailEn: "Fresh Antalya carries the strategic position of Antalya to global trade, bringing together farmers, exporters, buyers, logistics companies and technology producers on the same platform. Covering a wide spectrum from fresh produce to packaging solutions and cold chain technologies, the fair supports sustainable growth through conferences, panels and B2B matchmaking programs.",
    date: "05.02 - 08.02.2026",
    location: "Antalya Anfaş Expo Center",
    logo: "/images/fresh-logo.png",
    image: "/images/fresh-cover.jpg",
    website: "hhttps://www.anfasfreshantalya.com/",
    websiteName: "anfasfreshantalya.com",
    stats: [
      { labelTr: "Katılımcı", labelEn: "Exhibitors", value: "150+" },
      { labelTr: "Profesyonel Ziyaretçi", labelEn: "Professional Visitors", value: "20.000+" },
      { labelTr: "Ülke", labelEn: "Countries", value: "30+" },
    ],
  },
};

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const tr = locale === "tr";
  const event = events[slug];
  if (!event) notFound();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* 1. HERO */}
      <section className="relative h-[65vh] min-h-[480px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src={event.image}
          alt={tr ? event.titleTr : event.titleEn}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.8)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <Link
          href={`/${locale}`}
          className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold tracking-[0.3em] uppercase"
        >
          <ArrowLeft size={15} strokeWidth={2.5} />
          {tr ? "Ana Sayfa" : "Home"}
        </Link>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-2xl flex items-center justify-center p-3 flex-shrink-0 shadow-2xl">
            <img
              src={event.logo}
              alt={tr ? event.titleTr : event.titleEn}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.45em] uppercase block mb-2">
              {tr ? event.categoryTr : event.categoryEn}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-4">
              {tr ? event.titleTr : event.titleEn}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-semibold">
                <Calendar size={13} />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-semibold">
                <MapPin size={13} />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HAKKINDA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <span className="text-blue-600 font-bold text-[9px] tracking-[0.45em] uppercase block mb-4">
              {tr ? "HAKKINDA" : "ABOUT"}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight mb-6">
              {tr ? event.titleTr : event.titleEn}
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
              {tr ? event.descTr : event.descEn}
            </p>
          </div>
          <div className="lg:pt-14">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {tr ? event.detailTr : event.detailEn}
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOTOĞRAF */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="w-full h-[280px] sm:h-[400px] md:h-[520px] xl:h-[600px] rounded-[2rem] overflow-hidden">
          <img
            src={event.image}
            alt={tr ? event.titleTr : event.titleEn}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 4. İSTATİSTİK + WEB SİTE KUTUSU */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem]">

          {/* Dekoratif arka plan efekti */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          {/* İstatistikler */}
          <div className="relative z-10 grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
            {event.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 md:px-10 py-10 md:py-14">
                <span className="text-white text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-slate-400 text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase mt-3">
                  {tr ? stat.labelTr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Web sitesi */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-16 py-8 md:py-10">
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-[9px] font-bold tracking-[0.4em] uppercase mb-1">
                {tr ? "RESMİ WEB SİTESİ" : "OFFICIAL WEBSITE"}
              </p>
              <p className="text-white/60 text-sm font-mono tracking-wide">
                {event.websiteName}
              </p>
            </div>
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white pl-7 pr-3 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] whitespace-nowrap"
            >
              {tr ? "Siteyi Ziyaret Et" : "Visit Website"}
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}