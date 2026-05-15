type Props = {
  params: Promise<{ locale: string }>;
};

const platforms = [
  {
    name: "Facebook",
    handle: "@AntalyaExpoCenter",
    href: "https://tr-tr.facebook.com/AntalyaExpoCenter/",
    color: "#1877F2",
    lightColor: "#EBF3FE",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@anfas_aec",
    href: "https://www.instagram.com/anfas_aec/",
    color: "#E1306C",
    lightColor: "#FDE8F0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "X",
    handle: "@anfasfuarcilik",
    href: "https://twitter.com/anfasfuarcilik",
    color: "#000000",
    lightColor: "#F0F0F0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "Anfaş Fuarcılık",
    href: "https://www.youtube.com/channel/UC9kypu34wFMVsIJ1NZ-MI1g",
    color: "#FF0000",
    lightColor: "#FEEAEA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Antalya Expo Center",
    href: "https://tr.linkedin.com/company/antalya-expo-center---anfas-fair-management-and-investment-co.",
    color: "#0A66C2",
    lightColor: "#E8F0FA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default async function SocialMediaPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/social-cover.jpg"
          alt="Sosyal Medya"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — {tr ? "Medya" : "Media"}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "Sosyal\nMedya" : "Social\nMedia"}
          </h1>
          <p className="text-white/50 text-sm md:text-base font-medium mt-6 max-w-xl leading-relaxed">
            {tr
              ? "Bizi sosyal medyada takip edin, gelişmelerden ilk siz haberdar olun."
              : "Follow us on social media and be the first to hear about the latest news."}
          </p>
        </div>
      </section>

      {/* PLATFORMLAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "PLATFORMLAR" : "PLATFORMS"}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-8 p-8 rounded-[2rem] border border-slate-100 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Arka plan renk efekti hover'da */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                style={{ backgroundColor: platform.lightColor }}
              />

              {/* İkon */}
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: platform.color }}
              >
                {platform.icon}
              </div>

              {/* İsim + handle */}
              <div className="relative z-10 flex flex-col gap-1 flex-1">
                <h3 className="text-slate-900 text-lg font-black tracking-tight uppercase leading-tight">
                  {platform.name}
                </h3>
                <p className="text-slate-400 text-xs font-semibold leading-snug">
                  {platform.handle}
                </p>
              </div>

              {/* Alt ok */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-slate-900"
                  style={{ color: platform.color }}>
                  {tr ? "Takip Et" : "Follow"}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: platform.color }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}