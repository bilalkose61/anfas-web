import { Calendar, ArrowRight, Building2, Users, ArrowUpRight, Award, MapPin, Phone, Mail, Globe2, Headphones } from "lucide-react";
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = locale === 'tr';

  const exhibitionList = [
    { 
      id: 1, 
      title: tr ? "Otel Ekipmanları" : "Hotel Equipment",
      date: "15.01 - 18.01.2026", 
      category: tr ? "KONAKLAMA" : "HOSPITALITY",
      slug: "otel-ekipmanlari", 
      image: "/images/otel-logo.png",
      desc: tr ? "Sektörün en yeni teknolojilerini yakından inceleyebilir, güçlü iş birliklerine imza atabilirsiniz." : "Explore the latest industry technologies and forge powerful business partnerships."
    },
    { 
      id: 2, 
      title: "Food Product",
      date: "21.01 - 24.01.2026", 
      category: tr ? "GIDA VE İÇECEK" : "FOOD & BEVERAGE",
      slug: "food-product", 
      image: "/images/food-logo.png",
      desc: tr ? "32. kez kapılarını açan bu dev buluşmada sektörün lider isimleriyle birebir görüşme fırsatı yakalayın." : "Now in its 32nd edition, meet the industry's leading names face to face at this massive gathering."
    },
    { 
      id: 3, 
      title: "Fresh Antalya",
      date: "05.02 - 08.02.2026", 
      category: tr ? "TARIM" : "AGRICULTURE",
      slug: "fresh-antalya", 
      image: "/images/fresh-logo.png",
      desc: tr ? "Üretimden ihracata tüm değer zincirini tek çatı altında buluşturan uluslararası ticaret fuarı." : "An international trade fair uniting the entire value chain from production to export under one roof."
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.75) contrast(1.05) saturate(0.85)" }}>
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent z-[10]" />
        <div className="absolute inset-0 bg-black/45 z-[1]" />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-16">
          <h1 className="leading-[0.9] drop-shadow-2xl">
            <span className="block text-[13vw] sm:text-[11vw] md:text-[8rem] xl:text-[9rem] 2xl:text-[10rem] font-black tracking-tighter text-white mb-2">
              {tr ? "TİCARİ GÜÇ" : "TRADE POWER"}
            </span>
            <span className="block text-[13vw] sm:text-[11vw] md:text-[8rem] xl:text-[9rem] 2xl:text-[10rem] font-black tracking-tighter text-white">
              {tr ? "TEK MERKEZ" : "ONE CENTER"}
            </span>
          </h1>
          <div className="mt-8 flex flex-col items-center">
            <p className="text-white font-medium tracking-[0.4em] uppercase text-sm md:text-xl drop-shadow-lg opacity-90">
              Antalya Anfaş Expo Center
            </p>
            <div className="h-[2px] w-16 bg-blue-500 mt-6 shadow-[0_0_15px_#3b82f6]" />
          </div>
          <Link href={`/${locale}/calendar`}
            className="group relative mt-16 inline-flex items-center gap-5 bg-white/90 backdrop-blur-sm text-slate-900 pl-8 pr-2 py-2.5 rounded-full transition-all duration-500 hover:bg-white hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-white/50">
            <span className="font-black text-base md:text-lg tracking-[0.15em] uppercase pl-2 text-slate-800 group-hover:text-black transition-colors whitespace-nowrap">
              {tr ? "FUARLARI KEŞFET" : "EXPLORE FAIRS"}
            </span>
            <div className="w-12 h-12 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-slate-900 transition-colors duration-500">
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" strokeWidth={3} />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. FUAR LİSTESİ */}
      <main className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col justify-center items-center text-center mb-24">
          <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-xs mb-6 px-4 py-2 bg-blue-50 rounded-full">
            {tr ? "GELECEĞİN TİCARET TAKVİMİ" : "FUTURE TRADE CALENDAR"}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-[-0.03em] uppercase leading-tight">
            {tr ? "ANFAŞ FUARLARI" : "ANFAŞ FAIRS"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {exhibitionList.map((fuar) => (
            <Link href={`/${locale}/events/${fuar.slug}`} key={fuar.id}
              className="group bg-white rounded-[2rem] overflow-hidden border-2 border-slate-100 hover:border-blue-600 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] max-w-[380px] w-full transform hover:-translate-y-2">
              <div className="relative h-64 w-full bg-slate-50/50 overflow-hidden flex items-center justify-center p-8 border-b border-slate-100">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={fuar.image} alt={fuar.title}
                  className={`w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700 drop-shadow-sm ${fuar.id === 3 ? '' : 'p-10'}`}/>
                <div className="absolute top-4 right-4 bg-white border border-slate-100 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-md text-blue-600">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                    <Calendar size={12} className="text-blue-600 group-hover:text-white" />
                    <span className="text-blue-800 font-bold text-[10px] tracking-wider uppercase group-hover:text-white transition-colors">{fuar.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 font-bold text-[9px] tracking-[0.2em] uppercase block mb-2">{fuar.category}</span>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase">{fuar.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">{fuar.desc}</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center text-slate-900 font-bold text-[10px] tracking-[0.2em] uppercase group-hover:text-blue-600 transition-colors">
                  {tr ? "İNCELE" : "VIEW"} <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 3. NEDEN ANFAŞ — MAVİ TON ARTIRILDI & SATIR ARASI AÇILDI */}
      <section className="bg-blue-50/50 py-28 px-6 border-y border-blue-100/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1">
              <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-6">
                {tr ? "NEDEN ANFAŞ?" : "WHY ANFAŞ?"}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1] mb-8">
                {tr ? "Akdeniz'in En Büyük Fuar Merkezi" : "The Largest Fair Center of the Mediterranean"}
              </h2>
              <p className="text-slate-500 text-base font-medium leading-loose mb-10 max-w-lg">
                {tr
                  ? "Antalya Anfaş Expo Center, 25 yılı aşkın tecrübesi ve 40.000 m² kapalı alanıyla Akdeniz havzasının en prestijli fuar ve kongre merkezi olma özelliğini korumaktadır."
                  : "Antalya Anfaş Expo Center, with over 25 years of experience and 40,000 m² of indoor space, maintains its status as the most prestigious fair and congress center in the Mediterranean basin."}
              </p>
              <Link href={`/${locale}/about`}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:scale-105">
                {tr ? "Hakkımızda" : "About Us"}
                <ArrowUpRight size={16}/>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Building2 className="text-blue-600" size={32} />, title: tr ? "Modern Altyapı" : "Modern Infrastructure", desc: tr ? "En son teknolojiyle donatılmış 12 farklı salon" : "12 halls equipped with latest technology" },
                { icon: <Globe2 className="text-blue-600" size={32} />, title: tr ? "Uluslararası Ağ" : "International Network", desc: tr ? "60+ ülkeden katılımcı ve ziyaretçi" : "Participants and visitors from 60+ countries" },
                { icon: <Headphones className="text-blue-600" size={32} />, title: tr ? "Tam Destek" : "Full Support", desc: tr ? "Organizasyon, lojistik ve teknik destek" : "Organization, logistics and technical support" },
                { icon: <MapPin className="text-blue-600" size={32} />, title: tr ? "Merkezi Konum" : "Central Location", desc: tr ? "Havalimanına 15 dakika, şehir merkezine 5 dakika" : "15 min to airport, 5 min to city center" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-blue-100/50 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <span className="block mb-3 transform group-hover:scale-110 transition-transform">{item.icon}</span>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-2">{item.title}</p>
                  <p className="text-slate-500 text-xs font-medium leading-loose">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. İSTATİSTİKLER */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-slate-900 p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-2xl hover:scale-105 transition-transform duration-500 border-b-[6px] border-blue-600">
            <Building2 size={48} className="text-blue-500 mb-6" />
            <h4 className="text-white text-5xl font-black tracking-tighter uppercase italic leading-none">40.000 m²</h4>
            <p className="text-slate-400 font-black text-[10px] mt-4 uppercase tracking-[0.4em]">
              {tr ? "KAPALI ALAN GÜCÜ" : "INDOOR SPACE"}
            </p>
          </div>
          <div className="bg-blue-600 p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-600/30 scale-110 z-10 border-b-[6px] border-white/30">
            <Award size={56} className="text-white mb-6 animate-bounce" />
            <h4 className="text-white text-5xl font-black tracking-tighter uppercase italic leading-none">
              {tr ? "25 YILI" : "25 YEARS"}
            </h4>
            <p className="text-blue-100 font-black text-[10px] mt-4 uppercase tracking-[0.4em]">
              {tr ? "AŞKIN TECRÜBE" : "OF EXPERIENCE"}
            </p>
          </div>
          <div className="bg-slate-900 p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-2xl hover:scale-105 transition-transform duration-500 border-b-[6px] border-blue-600">
            <Users size={48} className="text-blue-500 mb-6" />
            <h4 className="text-white text-5xl font-black tracking-tighter uppercase italic leading-none">1M+</h4>
            <p className="text-slate-400 font-black text-[10px] mt-4 uppercase tracking-[0.4em]">
              {tr ? "YILLIK ETKİLEŞİM" : "ANNUAL VISITORS"}
            </p>  
          </div>
        </div>
      </section>

    </div>
  );
}