type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HRPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const sections = tr ? [
    {
      no: "01",
      title: "İK Politikamız",
      body: "ANFAŞ ailesine katıldığınız zaman değişimle iç içe, farklı olmanın hissedildiği, sektöründe \"lider olarak\" sürekli büyüyen, öncü ve başarılı bir kuruluşta kariyerinize başlamış olursunuz."
    },
    {
      no: "02",
      title: "Önceliklerimiz",
      body: "Yeni yetenekleri şirket bünyesine kazandırmak, çalışanlarımızın gelişimlerini sürekli kılmak, potansiyellerinin açığa çıkmasına yardımcı olmak ve değişen rekabet ortamlarında, etkin performans göstermelerini ve insiyatif almalarını desteklemek. Şirket içi takım çalışmalarını güçlendirmek, ekip ruhu içinde ortak hedeflere birlikte ulaşılması ve bu ortak başarılarının birlikte kutlanmasını teşvik etmek."
    },
    {
      no: "03",
      title: "Değerlendirme",
      body: "Anfaş için tasarlanan performans süreci, kurumsal kimliği pekiştirip kurum içi iletişimi artırmayı hedeflemektedir. Dinamik, kendini sürekli kontrol eden ve yenileyen, kurumun hedeflerine ulaşmasını sağlayan, çalışanın gelişmesi gereken yanlarını ortaya çıkaran, kişiyi motive eden, adil, şeffaf bir süreçtir."
    },
    {
      no: "04",
      title: "Eğitim",
      body: "ANFAŞ hem kurumsal iletişimi pekiştirmek hem de personel vizyonunu artırmak amacıyla dönem dönem yönetici ve çalışanlarına eğitim olanakları sunmaktadır."
    },
  ] : [
    {
      no: "01",
      title: "Our HR Policy",
      body: "When you join the ANFAŞ family, you begin your career at a pioneering and successful organization that is constantly growing as a \"leader\" in its sector, where you are immersed in change and where being different is felt."
    },
    {
      no: "02",
      title: "Our Priorities",
      body: "To bring new talents into the company, to ensure the continuous development of our employees, to help them realize their potential, and to support them in performing effectively and taking initiative in changing competitive environments. To strengthen intra-company teamwork, to encourage reaching common goals together in a team spirit and celebrating these shared successes together."
    },
    {
      no: "03",
      title: "Evaluation",
      body: "The performance process designed for Anfaş aims to reinforce corporate identity and increase internal communication. It is a dynamic, fair, and transparent process that continuously controls and renews itself, enables the organization to reach its goals, reveals the areas where the employee needs to develop, and motivates the individual."
    },
    {
      no: "04",
      title: "Training",
      body: "ANFAŞ periodically provides training opportunities to its managers and employees in order to both reinforce corporate communication and increase personnel vision."
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/hr-cover.jpg"
          alt="İnsan Kaynakları"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
            ANFAŞ — Antalya Fuarcılık A.Ş.
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
            {tr ? "İnsan\nKaynakları" : "Human\nResources"}
          </h1>
        </div>
      </section>

      {/* METİN BLOKLARI */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-0">
        {sections.map((s, i) => (
          <div key={i} className="border-b border-slate-100 pb-14 mb-14 last:border-none last:mb-0 last:pb-0">
            <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
              {s.no} — {s.title.toUpperCase()}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase mb-6">
              {s.title}
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-[1.9]">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      {/* AÇIK POZİSYONLAR */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-32">
        <div className="relative overflow-hidden bg-slate-900 rounded-[2rem]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase block mb-4">
                05 — {tr ? "AÇIK POZİSYONLAR" : "OPEN POSITIONS"}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-4">
                {tr ? "İş Başvurusu" : "Job Application"}
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
                {tr
                  ? "İş başvurularınız için özgeçmişinizi aşağıdaki e-posta adresine gönderebilirsiniz."
                  : "You can send your CV to the e-mail address below for job applications."}
              </p>
            </div>
            <a
              href="mailto:ik@anfas.com.tr"
              className="flex-shrink-0 flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              ik@anfas.com.tr
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}