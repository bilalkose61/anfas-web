type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MissionPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/mission-cover.jpg"
          alt="Anfaş Misyon Vizyon"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — Antalya Fuarcılık A.Ş.
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "Misyon &\nVizyon" : "Mission &\nVision"}
          </h1>
        </div>
      </section>

      {/* MİSYON + VİZYON */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-0">

        {/* Misyon */}
        <div className="border-b border-slate-100 pb-16 mb-16">
          <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-5">
            01 — {tr ? "MİSYONUMUZ" : "OUR MISSION"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-8">
            {tr ? "Misyonumuz" : "Mission"}
          </h2>
          <p className="text-slate-700 text-base md:text-xl leading-[1.9]">
            {tr
              ? "Türkiye ve bölge ihracatını arttıracak sektörlerde fuar ve kongreler organize ederek, ülke ekonomisine artı değer sağlamak, Antalya'yı fuarlar ve kongreler kenti haline getirmek."
              : "To organize fairs and congresses in sectors that will increase Turkey's and the region's exports, to add value to the national economy, and to make Antalya a city of fairs and congresses."}
          </p>
        </div>

        {/* Vizyon */}
        <div>
          <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-5">
            02 — {tr ? "VİZYONUMUZ" : "OUR VISION"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-8">
            {tr ? "Vizyonumuz" : "Vision"}
          </h2>
          <p className="text-slate-700 text-base md:text-xl leading-[1.9]">
            {tr
              ? "Ulusal ve uluslararası platformda fuar organizasyonlarına imza atarak, 10 yıl içinde dünyanın lider fuar merkezleri arasında yer almak."
              : "To take part among the world's leading fair centers within 10 years by organizing fair events on national and international platforms."}
          </p>
        </div>

      </section>

      {/* FOTOĞRAF */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="w-full h-[260px] sm:h-[380px] md:h-[500px] rounded-[2rem] overflow-hidden bg-slate-100">
          <img
            src="/images/mission-interior.jpg"
            alt="Anfaş"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

    </div>
  );
}