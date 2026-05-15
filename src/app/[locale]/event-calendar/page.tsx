import { getPublishedCalendarEvents } from "@/lib/actions/calendarEventActions";
import { Calendar } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

function formatDate(date: Date, locale: string) {
  return new Date(date).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function getDaysLeft(startDate: Date) {
  const diff = Math.ceil((new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default async function EventCalendarPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";
  const events = await getPublishedCalendarEvents();

  const upcoming = events.filter(e => new Date(e.endDate) >= new Date());
  const past = events.filter(e => new Date(e.endDate) < new Date());

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/event-calendar-cover.jpg" alt={tr ? "Etkinlik Takvimi" : "Event Calendar"}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-black text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Etkinlik\nTakvimi" : "Event\nCalendar"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-black mt-6 max-w-md leading-relaxed">
            {tr ? "Yaklaşan etkinlikler ve organizasyonlar" : "Upcoming events and organizations"}
          </p>
        </div>
      </section>

      {/* ETKİNLİKLER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Calendar size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Etkinlik Yok" : "No Events Yet"}
              </p>
              <p className="text-slate-400 text-sm font-black mt-2">
                {tr ? "Etkinlikler eklendiğinde burada görünecek." : "Events will appear here when added."}
              </p> 
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-16">

            {/* YAKLAŞAN ETKİNLİKLER */}
            {upcoming.length > 0 && (
              <div>
                <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-10">
                  01 — {tr ? "YAKLAŞAN ETKİNLİKLER" : "UPCOMING EVENTS"}
                </span>
                <div className="flex flex-col gap-4">
                  {upcoming.map((event) => {
                    const daysLeft = getDaysLeft(event.startDate);
                    return (
                      <div key={event.id}
                        className="group grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300">

                        {/* Fotoğraf veya tarih kutusu */}
                        {event.imageUrl ? (
                          <div className="relative h-48 md:h-auto overflow-hidden bg-slate-100">
                            <img src={event.imageUrl} alt={tr ? event.titleTr : event.titleEn}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 bg-blue-600 rounded-xl px-3 py-2 text-center">
                              <p className="text-white text-xl font-black leading-none">{new Date(event.startDate).getDate()}</p>
                              <p className="text-blue-200 text-[9px] font-black tracking-widest uppercase">
                                {new Date(event.startDate).toLocaleDateString(tr ? "tr-TR" : "en-GB", { month: "short" })}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center bg-blue-600 p-8 min-h-[160px] md:min-h-0">
                            <p className="text-white text-6xl font-black leading-none">{new Date(event.startDate).getDate()}</p>
                            <p className="text-blue-200 text-sm font-black tracking-[0.3em] uppercase mt-1">
                              {new Date(event.startDate).toLocaleDateString(tr ? "tr-TR" : "en-GB", { month: "long" })}
                            </p>
                            <p className="text-blue-300 text-xs font-black mt-0.5">
                              {new Date(event.startDate).getFullYear()}
                            </p>
                          </div>
                        )}

                        {/* İçerik */}
                        <div className="flex flex-col gap-3 p-6 md:p-8 bg-white">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <h3 className="text-slate-900 text-xl font-black tracking-tight uppercase leading-tight">
                              {tr ? event.titleTr : event.titleEn}
                            </h3>
                            {daysLeft > 0 && (
                              <span className="flex-shrink-0 bg-green-50 text-green-600 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-green-100">
                                {daysLeft} {tr ? "gün kaldı" : "days left"}
                              </span>
                            )}
                            {daysLeft === 0 && (
                              <span className="flex-shrink-0 bg-blue-50 text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-blue-100">
                                {tr ? "Bugün!" : "Today!"}
                              </span>
                            )}
                          </div>

                          {(event.descTr || event.descEn) && (
                            <p className="text-slate-500 text-sm font-black leading-relaxed line-clamp-2">
                              {tr ? event.descTr : event.descEn}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 mt-auto pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-slate-400">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                              <span className="text-xs font-black text-slate-500">
                                {formatDate(event.startDate, locale)}
                                {event.startDate !== event.endDate && ` — ${formatDate(event.endDate, locale)}`}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-slate-400">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                                </svg>
                                <span className="text-xs font-black text-slate-500">{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GEÇMİŞ ETKİNLİKLER */}
            {past.length > 0 && (
              <div>
                <span className="text-slate-400 font-black text-[9px] tracking-[0.5em] uppercase block mb-10">
                  02 — {tr ? "GEÇMİŞ ETKİNLİKLER" : "PAST EVENTS"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {past.map((event) => (
                    <div key={event.id}
                      className="group flex flex-col rounded-[2rem] border border-slate-100 overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 hover:shadow-lg">
                      {event.imageUrl && (
                        <div className="relative h-40 overflow-hidden bg-slate-100">
                          <img src={event.imageUrl} alt={tr ? event.titleTr : event.titleEn}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                        </div>
                      )}
                      <div className="flex flex-col gap-2 p-5">
                        <h4 className="text-slate-700 text-sm font-black uppercase tracking-tight leading-snug">
                          {tr ? event.titleTr : event.titleEn}
                        </h4>
                        <p className="text-slate-400 text-xs font-black">
                          {formatDate(event.startDate, locale)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
}