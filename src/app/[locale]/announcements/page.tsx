    import { getPublishedAnnouncements } from "@/lib/actions/announcementActions";
import { Calendar, Bell } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AnnouncementsPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const announcements = await getPublishedAnnouncements();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/announcements-cover.jpg"
          alt={tr ? "Duyurular" : "Announcements"}
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
            {tr ? "Duyurular" : "Announcements"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? "Anfaş'tan güncel haberler ve duyurular"
              : "Latest news and announcements from Anfaş"}
          </p>
        </div>
      </section>

      {/* DUYURULAR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">

        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-10">
          01 — {tr ? "TÜM DUYURULAR" : "ALL ANNOUNCEMENTS"}
        </span>

        {announcements.length === 0 ? (
          /* Boş durum */
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Bell size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Duyuru Yok" : "No Announcements Yet"}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {tr
                  ? "Yeni duyurular eklendiğinde burada görünecek."
                  : "New announcements will appear here when added."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="group relative overflow-hidden flex flex-col gap-4 bg-white border border-slate-100 rounded-[2rem] px-8 py-8 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 rounded-l-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tarih */}
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={13} strokeWidth={2} />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                    {new Date(announcement.createdAt).toLocaleDateString(
                      tr ? "tr-TR" : "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                </div>

                {/* Başlık */}
                <h2 className="text-slate-900 text-xl md:text-2xl font-black tracking-tight leading-snug">
                  {tr ? announcement.titleTr : announcement.titleEn}
                </h2>

                {/* İçerik */}
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {tr ? announcement.bodyTr : announcement.bodyEn}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}