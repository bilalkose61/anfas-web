import { Download, FileImage, FileType } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const assets = [
  {
    id: 1,
    previewSrc: "/images/anfas-logo-preview.jpg",
    nameTr: "Anfaş Logo",
    nameEn: "Anfaş Logo",
    descTr: "Kurumsal kullanım için Anfaş resmi logosu",
    descEn: "Official Anfaş logo for corporate use",
    files: [
      { label: "JPG", type: "image", href: "/downloads/anfas-logo.jpg" },
      { label: "PNG", type: "image", href: "/downloads/anfas-logo.png" },
      { label: "PDF", type: "pdf",   href: "/downloads/anfas-logo.pdf" },
    ],
  },
  {
    id: 2,
    previewSrc: "/images/aec-logo-preview.jpg",
    nameTr: "AEC Logo",
    nameEn: "AEC Logo",
    descTr: "Kurumsal kullanım için AEC resmi logosu",
    descEn: "Official AEC logo for corporate use",
    files: [
      { label: "PDF", type: "pdf", href: "/downloads/aec-logo.pdf" },
    ],
  },
];

export default async function MediaAssetsPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/media-cover.jpg"
          alt="Medya Materyalleri"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — {tr ? "Medya" : "Media"}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "Medya\nMateryalleri" : "Media\nAssets"}
          </h1>
          <p className="text-white/50 text-sm md:text-base font-medium mt-6 max-w-xl leading-relaxed">
            {tr
              ? "Kurumsal kullanım için logo ve materyalleri indirebilirsiniz."
              : "Download logos and materials for corporate use."}
          </p>
        </div>
      </section>

      {/* MATERYALLER */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">

        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-10">
          01 — {tr ? "LOGO & BANNER" : "LOGO & BANNER"}
        </span>

        <div className="flex flex-col gap-5">
          {assets.map((asset, idx) => (
            <div
              key={asset.id}
              className="relative overflow-hidden grid grid-cols-1 md:grid-cols-[220px_1fr] rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-500 group"
            >
              {/* Sol — logo kutusu */}
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-10 min-h-[180px] border-b md:border-b-0 md:border-r border-slate-100">
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/3 transition-colors duration-500" />
                <img
                  src={asset.previewSrc}
                  alt={tr ? asset.nameTr : asset.nameEn}
                  className="relative z-10 max-w-full max-h-20 object-contain drop-shadow-sm"
                />
              </div>

              {/* Sağ — içerik */}
              <div className="flex flex-col justify-center gap-5 px-8 py-8 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-blue-600 font-bold text-[9px] tracking-[0.4em] uppercase mb-2">
                      {tr ? "LOGO" : "LOGO"} — {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-slate-900 text-2xl font-black tracking-tight uppercase">
                      {tr ? asset.nameTr : asset.nameEn}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                      {tr ? asset.descTr : asset.descEn}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {asset.files.map((file, i) => (
                    <a
                      key={i}
                      href={file.href}
                      download
                      className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)]"
                    >
                      {file.type === "pdf"
                        ? <FileType size={13} strokeWidth={2.5} />
                        : <FileImage size={13} strokeWidth={2.5} />
                      }
                      {file.label}
                      <Download size={11} strokeWidth={2.5} className="opacity-70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}