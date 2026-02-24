import { getPublishedVideos } from "@/lib/actions/videoActions";
import { Video } from "lucide-react";

type Props = {
  params: { locale: string };
};

export default async function VideoGalleryPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const videos = await getPublishedVideos();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/video-gallery-cover.jpg"
          alt={tr ? "Video Galerisi" : "Video Gallery"}
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
            {tr ? "Video\nGalerisi" : "Video\nGallery"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr ? "Anfaş fuarlarından öne çıkan anlar." : "Highlights from Anfaş fairs."}
          </p>
        </div>
      </section>

      {/* VİDEOLAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "TÜM VİDEOLAR" : "ALL VIDEOS"}
        </span>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Video size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Video Yok" : "No Videos Yet"}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {tr ? "Videolar eklendiğinde burada görünecek." : "Videos will appear here when added."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group flex flex-col gap-0 rounded-[1.5rem] overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-500">

                {/* YouTube Embed */}
                <div className="relative w-full aspect-video bg-slate-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={tr ? video.titleTr : video.titleEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Başlık */}
                <div className="px-5 py-4 bg-white">
                  <h3 className="text-slate-900 text-base font-black tracking-tight leading-snug">
                    {tr ? video.titleTr : video.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}