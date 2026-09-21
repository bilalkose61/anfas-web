import { getFairBySlug } from "@/lib/actions/fairActions";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: Promise<{ locale: string; slug: string }> };

const MONTHS_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDateRange(start: Date, end: Date, locale: string) {
  const s = new Date(start);
  const e = new Date(end);
  const months = locale === "tr" ? MONTHS_TR : MONTHS_EN;
  if (s.getMonth() === e.getMonth()) {
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

export default async function FairDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const tr = locale === "tr";
  const fair = await getFairBySlug(slug);
  if (!fair || !fair.isPublished) notFound();

  const daysLeft = getDaysLeft(fair.startDate);
  const ongoing = isOngoing(fair.startDate, fair.endDate);
  const isPast = new Date(fair.endDate) < new Date();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-end overflow-hidden bg-[#020617]">
        
        {/* Cover görseli varsa göster, yoksa logo blur efekti */}
        {fair.coverUrl ? (
          <img src={fair.coverUrl} alt={tr ? fair.titleTr : fair.titleEn} className="absolute inset-0 w-full h-full object-cover" />
        ) : fair.logoUrl ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={fair.logoUrl} alt="" className="max-h-48 max-w-sm object-contain opacity-10 blur-sm scale-150" />
          </div>
        ) : (
          // İkisi de yoksa güzel gradient
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(37,99,235,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(99,102,241,0.1) 0%, transparent 50%)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <Link href={`/${locale}/calendar`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="font-black text-[9px] tracking-[0.5em] uppercase">{tr ? "Fuar Takvimi" : "Fair Calendar"}</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 justify-between">
            <div>
              {(fair.organizerTr || fair.organizerEn) && (
                <p className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase mb-3">
                  {tr ? fair.organizerTr : fair.organizerEn}
                </p>
              )}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                {tr ? fair.titleTr : fair.titleEn}
              </h1>
            </div>

            {fair.logoUrl && (
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <img src={fair.logoUrl} alt="" className="h-16 w-auto object-contain" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BİLGİ BANDI */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-400">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase">{tr ? "TARİH" : "DATE"}</p>
                <p className="text-white text-sm font-black">{formatDateRange(fair.startDate, fair.endDate, locale)}</p>
              </div>
            </div>

            {fair.startTime && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-400">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase">{tr ? "SAAT" : "TIME"}</p>
                  <p className="text-white text-sm font-black">{fair.startTime}{fair.endTime ? ` - ${fair.endTime}` : ""}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase">{tr ? "KONUM" : "LOCATION"}</p>
                <p className="text-white text-sm font-black">{fair.location || "Anfaş Uluslararası Fuar ve Kongre Merkezi"}</p>
              </div>
            </div>

            <div className="ml-auto">
              {ongoing && <span className="bg-green-500 text-white text-[10px] font-black tracking-[0.3em] uppercase px-4 py-2 rounded-full">{tr ? "DEVAM EDİYOR" : "ONGOING"}</span>}
              {!ongoing && !isPast && daysLeft > 0 && <span className="bg-blue-600 text-white text-[10px] font-black tracking-[0.3em] uppercase px-4 py-2 rounded-full">{daysLeft} {tr ? "GÜN KALDI" : "DAYS LEFT"}</span>}
              {isPast && <span className="bg-slate-700 text-slate-300 text-[10px] font-black tracking-[0.3em] uppercase px-4 py-2 rounded-full">{tr ? "TAMAMLANDI" : "COMPLETED"}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <div className="flex flex-col gap-8">
            <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase">01 — {tr ? "FUAR HAKKINDA" : "ABOUT THE FAIR"}</span>
            {(fair.descTr || fair.descEn) ? (
              <div className="flex flex-col gap-4">
                {(tr ? fair.descTr : fair.descEn)?.split("\n").filter(Boolean).map((para: string, i: number) => (
                  <p key={i} className="text-slate-600 text-base font-semibold leading-relaxed">{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-lg font-black leading-relaxed">
                {tr ? "Bu fuar hakkında detaylı bilgi için organizatörle iletişime geçebilirsiniz." : "For detailed information about this fair, please contact the organizer."}
              </p>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="text-blue-600 text-[9px] font-black tracking-[0.4em] uppercase mb-2">{tr ? "ÜCRETSİZ GİRİŞ" : "FREE ENTRY"}</p>
                <p className="text-slate-900 text-base font-black uppercase">{tr ? "Online Davetiye Al" : "Get Online Invitation"}</p>
                <p className="text-slate-500 text-sm font-black mt-1">{tr ? "Fuara ücretsiz giriş için online davetiyenizi alın." : "Get your free online invitation for the fair."}</p>
              </div>
              <Link href={`/${locale}/ticket`} className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 whitespace-nowrap">
                {tr ? "Davetiye Al" : "Get Invitation"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase">02 — {tr ? "ORGANİZATÖR" : "ORGANIZER"}</span>
            <div className="bg-slate-900 rounded-[2rem] overflow-hidden">
              {fair.logoUrl && (
                <div className="flex items-center justify-center bg-white/5 px-8 py-8 border-b border-white/5">
                  <img src={fair.logoUrl} alt="" className="max-h-20 max-w-full object-contain" />
                </div>
              )}
              <div className="p-7 flex flex-col gap-5">
                {(fair.organizerTr || fair.organizerEn) && (
                  <div>
                    <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase mb-1">{tr ? "ORGANİZATÖR" : "ORGANIZER"}</p>
                    <p className="text-white text-sm font-black">{tr ? fair.organizerTr : fair.organizerEn}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase mb-1">{tr ? "KONUM" : "LOCATION"}</p>
                  <p className="text-white text-sm font-black">{fair.location || "Anfaş Uluslararası Fuar ve Kongre Merkezi"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase mb-1">{tr ? "TARİH" : "DATE"}</p>
                  <p className="text-white text-sm font-black">{formatDateRange(fair.startDate, fair.endDate, locale)}</p>
                </div>
                {fair.startTime && (
                  <div>
                    <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase mb-1">{tr ? "ÇALIŞMA SAATLERİ" : "WORKING HOURS"}</p>
                    <p className="text-white text-sm font-black">{fair.startTime}{fair.endTime ? ` - ${fair.endTime}` : ""}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {fair.website && (
                <a href={fair.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl px-5 py-4 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500 group-hover:text-blue-600">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm font-black group-hover:text-blue-600 transition-colors">{tr ? "Fuar Web Sitesi" : "Fair Website"}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              )}
              {fair.email && (
                <a href={`mailto:${fair.email}`} className="flex items-center justify-between gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl px-5 py-4 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500 group-hover:text-blue-600">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm font-black group-hover:text-blue-600 transition-colors">{tr ? "E-Posta Gönder" : "Send E-Mail"}</span>
                  </div>
                  <span className="text-slate-400 text-xs font-black truncate max-w-[140px]">{fair.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GERİ DÖN */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 mb-16">
        <Link href={`/${locale}/calendar`} className="inline-flex items-center gap-3 border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 px-7 py-4 rounded-full font-black text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {tr ? "Tüm Fuarlar" : "All Fairs"}
        </Link>
      </section>

    </div>
  );
}