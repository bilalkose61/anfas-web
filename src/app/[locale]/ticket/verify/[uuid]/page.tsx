import { getInvitationByUuid } from "@/lib/actions/invitationActions";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = { params: Promise<{ locale: string; uuid: string }> };

const MONTHS_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

export default async function TicketVerifyPage({ params }: Props) {
  const { locale, uuid } = await params;
  const tr = locale === "tr";
  const invitation = await getInvitationByUuid(uuid);

  if (!invitation) notFound();

  const createdAt = new Date(invitation.createdAt);

  return (
    <div className="bg-white min-h-screen font-sans flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full flex flex-col items-center gap-8">

        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>

        <div className="text-center">
          <p className="text-green-600 text-[10px] font-black tracking-[0.4em] uppercase mb-2">
            {tr ? "DAVETİYE GEÇERLİ" : "INVITATION VALID"}
          </p>
          <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase mb-2">
            {invitation.firstName} {invitation.lastName}
          </h2>
          <p className="text-slate-400 text-sm font-black">
            {tr ? "Hoş geldiniz!" : "Welcome!"}
          </p>
        </div>

        <div className="w-full bg-slate-900 rounded-[2rem] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10">
            <p className="text-blue-400 text-[9px] font-black tracking-[0.4em] uppercase mb-4">
              {tr ? "DAVETİYE BİLGİLERİ" : "INVITATION DETAILS"}
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: tr ? "AD SOYAD" : "FULL NAME", value: `${invitation.firstName} ${invitation.lastName}` },
                { label: tr ? "E-POSTA" : "EMAIL", value: invitation.email },
                { label: tr ? "TELEFON" : "PHONE", value: invitation.phone },
                { label: tr ? "ŞEHİR" : "CITY", value: invitation.city || "-" },
                { label: tr ? "ŞİRKET" : "COMPANY", value: invitation.company || "-" },
                { label: tr ? "REFERANS" : "REFERENCE", value: uuid.slice(0, 8).toUpperCase() },
                { label: tr ? "KAYIT TARİHİ" : "REGISTRATION DATE", value: `${createdAt.getDate()} ${MONTHS_TR[createdAt.getMonth()]} ${createdAt.getFullYear()}` },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 text-[9px] font-black tracking-[0.2em] uppercase flex-shrink-0">{item.label}</span>
                  <span className="text-white text-xs font-black text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-8 py-5 flex items-center gap-3">
            <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-xs font-black">
              {tr ? "Bu davetiye ANFAŞ sistemlerinde kayıtlı ve geçerlidir." : "This invitation is registered and valid in ANFAŞ systems."}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}