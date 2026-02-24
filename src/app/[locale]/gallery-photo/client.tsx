"use client";

import { useState } from "react";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = { id: string; titleTr: string; titleEn: string; url: string; order: number };

function Lightbox({ photos, index, onClose, locale }: { photos: Photo[]; index: number; onClose: () => void; locale: string }) {
  const [current, setCurrent] = useState(index);
  const tr = locale === "tr";

  const prev = () => setCurrent(c => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent(c => (c + 1) % photos.length);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
        <X size={18}/>
      </button>
      <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
        <ChevronLeft size={22}/>
      </button>
      <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
        <ChevronRight size={22}/>
      </button>
      <div className="flex flex-col items-center gap-4 px-20" onClick={e => e.stopPropagation()}>
        <img src={photos[current].url} alt={tr ? photos[current].titleTr : photos[current].titleEn}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"/>
        <p className="text-white/70 text-sm font-black uppercase tracking-widest">
          {tr ? photos[current].titleTr : photos[current].titleEn}
        </p>
        <p className="text-white/30 text-xs font-black">{current + 1} / {photos.length}</p>
      </div>
    </div>
  );
}

function GalleryClient({ photos, locale }: { photos: Photo[]; locale: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tr = locale === "tr";

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} locale={locale}/>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <div key={photo.id} onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-500 cursor-zoom-in aspect-[4/3]">
            <img src={photo.url} alt={tr ? photo.titleTr : photo.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
              <div className="w-full px-4 py-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-black uppercase tracking-tight">
                  {tr ? photo.titleTr : photo.titleEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function PhotoGalleryPageClient({ photos, locale }: { photos: Photo[]; locale: string }) {
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/photo-gallery-cover.jpg" alt={tr ? "Fotoğraf Galerisi" : "Photo Gallery"}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.7)" }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20"/>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500"/>
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">ANFAŞ — {tr ? "Medya" : "Media"}</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Fotoğraf\nGalerisi" : "Photo\nGallery"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr ? "Anfaş fuarlarından kareler." : "Moments from Anfaş fairs."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "TÜM FOTOĞRAFLAR" : "ALL PHOTOS"}
        </span>
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <ImageIcon size={32} className="text-slate-300"/>
            </div>
            <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
              {tr ? "Henüz Fotoğraf Yok" : "No Photos Yet"}
            </p>
          </div>
        ) : (
          <GalleryClient photos={photos} locale={locale}/>
        )}
      </section>
    </div>
  );
}