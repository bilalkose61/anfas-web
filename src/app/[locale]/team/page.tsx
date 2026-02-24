import { getPublishedTeamMembers } from "@/lib/actions/teamActions";
import { Users } from "lucide-react";

type Props = {
  params: { locale: string };
};

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const tr = locale === "tr";

  const members = await getPublishedTeamMembers();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img
          src="/images/team-cover.jpg"
          alt={tr ? "Ekibimiz" : "Our Team"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.38) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">
              ANFAŞ — Antalya Fuarcılık A.Ş.
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Ekibimiz" : "Our Team"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr
              ? "Anfaş'ı dünyaya taşıyan profesyonel ekibimiz."
              : "The professional team that takes Anfaş to the world."}
          </p>
        </div>
      </section>

      {/* EKİP */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "EKİBİMİZ" : "OUR TEAM"}
        </span>

        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Users size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl uppercase tracking-tight">
                {tr ? "Henüz Ekip Üyesi Yok" : "No Team Members Yet"}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {tr ? "Ekip üyeleri eklendiğinde burada görünecek." : "Team members will appear here when added."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Fotoğraf */}
                <div className="relative w-full aspect-[3/4] bg-slate-100 overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={tr ? member.nameTr : member.nameEn}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
                        <Users size={32} className="text-slate-400" />
                      </div>
                    </div>
                  )}
                  {/* Alt gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* İsim + Unvan */}
                <div className="px-5 py-5 bg-white flex flex-col gap-1.5">
                  <h3 className="text-slate-900 text-base font-black tracking-tight uppercase leading-tight">
                    {tr ? member.nameTr : member.nameEn}
                  </h3>
                  <p className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase">
                    {tr ? member.titleTr : member.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}