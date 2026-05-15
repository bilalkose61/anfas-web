import { getPublishedFairs } from "@/lib/actions/fairActions";
import Link from "next/link";
import { Calendar } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const MONTHS_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDateRange(start: Date, end: Date, locale: string) {
  const s = new Date(start);
  const e = new Date(end);
  const months = locale === "tr" ? MONTHS_TR : MONTHS_EN;
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} - ${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
  }
  return `${s.getDate()} ${months[s.getMonth()]} - ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
}

function getDaysLeft(startDate: Date) {
  return Math.ceil((new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function isOngoing(start: Date, end: Date) {
  const now = Date.now();
  return new Date(start).getTime() <= now && new Date(end).getTime() >= now;
}

export default async function FairCalendarPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";
  const fairs = await getPublishedFairs();
  const months = tr ? MONTHS_TR : MONTHS_EN;

  const startYear = 2026;
  const startMonth = 0;
  const endMonth = 11;

  const activeFairs = fairs.filter(f => new Date(f.endDate) >= new Date());
  const pastFairs = fairs.filter(f => new Date(f.endDate) < new Date());

  const byMonth: Record<string, typeof fairs> = {};
  activeFairs.forEach(fair => {
    const d = new Date(fair.startDate);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(fair);
  });

  const allMonths = [];
  for (let m = startMonth; m <= endMonth; m++) {
    const key = `${startYear}-${m}`;
    allMonths.push({ year: startYear, month: m, fairs: byMonth[key] || [] });
  }

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO — siyah katman kaldırıldı, daha canlı */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/fair-calendar-cover.jpg"
          alt={tr ? "Fuar Takvimi" : "Fair Calendar"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.8)" }}
        />
        {/* Sadece alt kısımda hafif gradient — siyah overlay yok */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-black text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Fuar\nTakvimi" : "Fair\nCalendar"}
          </h1>
          <p className="text-white/50 text-sm md:text-base font-black mt-6 max-w-md leading-relaxed">
            {tr ? `${startYear} yılı fuar programı` : `${startYear} fair program`}
          </p>
        </div>
      </section>

      {/* TAKVİM */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-16">
          01 — {tr ? `${startYear} FUAR TAKVİMİ` : `${startYear} FAIR CALENDAR`}
        </span>

        {fairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Calendar size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Fuar Yok" : "No Fairs Yet"}
              </p>
              <p className="text-slate-400 text-sm font-black mt-2">
                {tr ? "Fuarlar eklendiğinde burada görünecek." : "Fairs will appear here when added."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {allMonths.map(({ year, month, fairs: monthFairs }) => {
              if (monthFairs.length === 0) return null;
              return (
                <div key={`${year}-${month}`} className="flex flex-col md:flex-row gap-0 border-b border-slate-100 last:border-b-0 py-12 first:pt-0">
                  {/* AY BAŞLIĞI */}
                  <div className="md:w-52 flex-shrink-0 flex flex-col gap-1 mb-8 md:mb-0 md:pt-2">
                    <span className="text-slate-900 text-3xl font-black tracking-tighter uppercase">{months[month]}</span>
                    <span className="text-slate-300 text-sm font-black tracking-[0.2em]">{year}</span>
                    <span className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase mt-1">
                      {monthFairs.length} {tr ? "fuar" : "fair"}
                    </span>
                  </div>

                  {/* FUARLAR */}
                  <div className="flex-1 flex flex-col gap-3">
                    {monthFairs.map((fair) => {
                      const daysLeft = getDaysLeft(fair.startDate);
                      const ongoing = isOngoing(fair.startDate, fair.endDate);
                      const isPast = new Date(fair.endDate) < new Date();
                      const soon = !ongoing && !isPast && daysLeft <= 30 && daysLeft > 0;

                      return (
                        <Link
                          key={fair.id}
                          href={`/${locale}/calendar/${fair.slug}`}
                          className="group relative flex flex-col sm:flex-row gap-0 rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white"
                        >
                          {/* Sol renkli çizgi */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${ongoing ? "bg-green-500" : soon ? "bg-orange-400" : "bg-blue-600"}`} />

                          {/* Logo alanı */}
                          <div className="sm:w-36 md:w-44 flex-shrink-0 flex items-center justify-center bg-slate-50 group-hover:bg-blue-50/40 transition-colors duration-300 p-5 border-b sm:border-b-0 sm:border-r border-slate-100 min-h-[110px] ml-1">
                            {fair.logoUrl ? (
                              <img src={fair.logoUrl} alt={tr ? fair.titleTr : fair.titleEn} className="max-h-14 max-w-full object-contain" />
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Calendar size={20} className="text-blue-400" />
                              </div>
                            )}
                          </div>

                          {/* Bilgiler */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 flex-1">
                            <div className="flex flex-col gap-1.5">
                              {(fair.organizerTr || fair.organizerEn) && (
                                <span className="text-blue-600 text-[9px] font-black tracking-[0.3em] uppercase">
                                  {tr ? fair.organizerTr : fair.organizerEn}
                                </span>
                              )}
                              <h3 className="text-slate-900 text-base md:text-lg font-black tracking-tight uppercase leading-tight group-hover:text-blue-600 transition-colors">
                                {tr ? fair.titleTr : fair.titleEn}
                              </h3>
                              {(fair.descTr || fair.descEn) && (
                                <p className="text-slate-400 text-xs font-black leading-relaxed line-clamp-1">
                                  {tr ? fair.descTr : fair.descEn}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-4 mt-1.5">
                                <div className="flex items-center gap-1.5">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-blue-400 flex-shrink-0">
                                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                                  </svg>
                                  <span className="text-slate-600 text-xs font-black">{formatDateRange(fair.startDate, fair.endDate, locale)}</span>
                                </div>
                                {fair.startTime && (
                                  <div className="flex items-center gap-1.5">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-blue-400 flex-shrink-0">
                                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    <span className="text-slate-600 text-xs font-black">{fair.startTime}{fair.endTime ? ` - ${fair.endTime}` : ""}</span>
                                  </div>
                                )}
                                {fair.location && (
                                  <div className="flex items-center gap-1.5">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-blue-400 flex-shrink-0">
                                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <span className="text-slate-600 text-xs font-black">{fair.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Sağ — badge + ok */}
                            <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                              {ongoing && (
                                <span className="bg-green-50 text-green-600 text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                                  {tr ? "Devam Ediyor" : "Ongoing"}
                                </span>
                              )}
                              {soon && (
                                <span className="bg-orange-50 text-orange-500 text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-orange-100 whitespace-nowrap">
                                  {daysLeft} {tr ? "gün kaldı" : "days left"}
                                </span>
                              )}
                              {!ongoing && !soon && !isPast && daysLeft > 30 && (
                                <span className="bg-blue-50 text-blue-600 text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                                  {daysLeft} {tr ? "gün" : "days"}
                                </span>
                              )}
                              <div className="w-9 h-9 rounded-full border-2 border-slate-200 group-hover:border-blue-500 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* GEÇMİŞ FUARLAR */}
      {pastFairs.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 mb-16">
          <span className="text-slate-300 font-black text-[9px] tracking-[0.5em] uppercase block mb-10">
            02 — {tr ? "GEÇMİŞ FUARLAR" : "PAST FAIRS"}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastFairs.map(fair => (
              <Link key={fair.id} href={`/${locale}/calendar/${fair.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 opacity-50 hover:opacity-80">
                {fair.logoUrl ? (
                  <img src={fair.logoUrl} alt="" className="w-12 h-12 object-contain flex-shrink-0 grayscale" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Calendar size={16} className="text-slate-300" />
                  </div>
                )}
                <div>
                  <p className="text-slate-700 text-sm font-black uppercase tracking-tight leading-snug line-clamp-1">
                    {tr ? fair.titleTr : fair.titleEn}
                  </p>
                  <p className="text-slate-400 text-xs font-black mt-0.5">
                    {formatDateRange(fair.startDate, fair.endDate, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}