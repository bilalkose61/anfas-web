import { getPublishedPressNews } from "@/lib/actions/pressActions";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const news = await getPublishedPressNews();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/press-cover.jpg"
          alt={tr ? "Basında Anfaş" : "Anfaş in the Press"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.38) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">
              ANFAŞ — {tr ? "Medya" : "Media"}
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Basında\nAnfaş" : "Anfaş in\nthe Press"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? "Medyada Anfaş hakkında çıkan haberler."
              : "News coverage about Anfaş in the media."}
          </p>
        </div>
      </section>

      {/* HABERLER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "TÜM HABERLER" : "ALL NEWS"}
        </span>

        {news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Newspaper size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Haber Yok" : "No News Yet"}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {tr ? "Haberler eklendiğinde burada görünecek." : "News will appear here when added."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.url ?? "#"}
                target={item.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-500 hover:-translate-y-1 bg-white"
              >
                {/* Görsel */}
                <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={tr ? item.titleTr : item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Newspaper size={40} className="text-slate-300" />
                    </div>
                  )}
                  {/* Link ikonu */}
                  {item.url && (
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ExternalLink size={14} className="text-blue-600" />
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className="flex flex-col gap-3 px-6 py-6">
                  {/* Kaynak + Tarih */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase">
                      {tr ? item.sourceTr : item.sourceEn}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={11} />
                      <span className="text-[11px] font-semibold">
                        {new Date(item.publishedAt).toLocaleDateString(
                          tr ? "tr-TR" : "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Başlık */}
                  <h3 className="text-slate-900 text-base font-black tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-300">
                    {tr ? item.titleTr : item.titleEn}
                  </h3>

                  {/* Devamını oku */}
                  {item.url && (
                    <div className="flex items-center gap-2 text-blue-600 text-[11px] font-black tracking-[0.2em] uppercase mt-1">
                      <span>{tr ? "Habere Git" : "Read More"}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}