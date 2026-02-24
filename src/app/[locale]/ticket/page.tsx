"use client";

import { use, useState, useEffect } from "react";
import { createInvitation, getPublishedFairsForInvitation } from "@/lib/actions/invitationActions";
import { CheckCircle2, AlertCircle, Loader2, Shield } from "lucide-react";
import QRCode from "qrcode";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_fb951vj";
const TEMPLATE_ID_USER  = "template_5e5rykb";  // kullanıcıya giden mail
const PUBLIC_KEY  = "ZzpUwmG24lpq6t_BU";

const kvkkText = `6698 SAYILI KİŞİSEL VERİLERİN KORUNMASI KANUNU GEREĞİNCE BİLGİLENDİRME

1- Veri sorumlusunun ve varsa temsilcisinin kimliği;
Bu bilgilendirme, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, Veri Sorumlusu sıfatıyla, "Anfaş Antalya Fuarcılık İşletme ve Yatırım A.Ş." (Mersis No: 0069001279700012); ortaklarına, fuar katılımcılarına, fuar ziyaretçilerine, iletişimde bulunduğu gerçek ya da tüzel kişilere bilgilendirme yükümlülüğünü yerine getirmek amacıyla yapılmaktadır.

2- Kişisel verilerin ne amaçla işleneceği;
Kişisel verileriniz; ürün ve hizmetlerimizi iyileştirmek, fuarlarımızda katılımcı ve ziyaretçi faydasını arttırmak, fuar kapsamlarının planlanması ve etkinliğinin izlenmesi, bilinirliğin arttırılması ve ticari faaliyetlerin yürütülmesi, çalışan verilerinin yönetimi, kalite ve standart denetimleri ile yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenebilmektedir.

3- İşlenen kişisel verilerin kimlere ve hangi amaçla aktarılabileceği;
İşlenen kişisel verileriniz; iş ortaklarımıza, tedarikçilerimize, denetim firmalarına, hissedarlarımıza ve yetkili kamu kurum ve kuruluşlarına aktarılabilecektir.

4- Kişisel veri toplamanın yöntemi ve hukuki sebebi;
Kişisel verileriniz; internet sitesi, sözleşmeler, formlar, anketler ve elektronik kanallar aracılığıyla açık rızanız ile toplanmaktadır.

5- Veri Sahibinin Hakları;
KVKK kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini isteme, silinmesini talep etme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.

Başvurularınızı "ANFAŞ ANTALYA FUARCILIK A.Ş. SOĞUCAKSU MAH. 25001 SOKAK NO:1/4 AKSU - ANTALYA / TÜRKİYE" adresine veya kvkk@anfas.com.tr adresine iletebilirsiniz.`;

type Fair = { id: string; titleTr: string; titleEn: string; startDate: Date; endDate: Date };

const CITIES_TR = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","İçel","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function TicketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tr = locale === "tr";

  const [fairs, setFairs] = useState<Fair[]>([]);
  const [form, setForm] = useState({
    fairId: "", firstName: "", lastName: "", email: "",
    phone: "", company: "", jobTitle: "", city: "", gender: "",
    kvkk: false, consent: false, captchaInput: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showKvkk, setShowKvkk] = useState(false);
  const [invitationUuid, setInvitationUuid] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
    getPublishedFairsForInvitation().then(setFairs as any);
  }, []);

  const set = (key: string, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fairId) e.fairId = tr ? "Fuar seçiniz" : "Please select a fair";
    if (!form.firstName.trim()) e.firstName = tr ? "Ad zorunludur" : "First name required";
    else if (/\d/.test(form.firstName)) e.firstName = tr ? "Ad rakam içeremez" : "No numbers in name";
    if (!form.lastName.trim()) e.lastName = tr ? "Soyad zorunludur" : "Last name required";
    else if (/\d/.test(form.lastName)) e.lastName = tr ? "Soyad rakam içeremez" : "No numbers in last name";
    if (!form.email.trim()) e.email = tr ? "E-posta zorunludur" : "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = tr ? "Geçerli e-posta girin" : "Enter valid email";
    if (!form.phone.trim()) e.phone = tr ? "Telefon zorunludur" : "Phone required";
    else if (!/^5\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = tr ? "5 ile başlayan 10 haneli numara" : "10 digit number starting with 5";
    if (!form.gender) e.gender = tr ? "Cinsiyet seçiniz" : "Select gender";
    if (!form.city) e.city = tr ? "Şehir seçiniz" : "Select city";
    if (!form.captchaInput.trim()) e.captchaInput = tr ? "Güvenlik kodunu giriniz" : "Enter security code";
    else if (form.captchaInput.toUpperCase() !== captcha) e.captchaInput = tr ? "Güvenlik kodu yanlış" : "Wrong security code";
    if (!form.kvkk) e.kvkk = tr ? "KVKK metnini onaylamanız zorunludur" : "KVKK approval required";
    if (!form.consent) e.consent = tr ? "Açık rıza onayı zorunludur" : "Consent required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const invitation = await createInvitation({
        fairId: form.fairId,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        company: form.company || undefined,
        jobTitle: form.jobTitle || undefined,
        city: form.city || undefined,
        gender: form.gender,
        kvkk: form.kvkk,
        consent: form.consent,
      });

      setInvitationUuid(invitation.uuid);

      // QR kod oluştur
      const qrUrl = `${window.location.origin}/${locale}/ticket/verify/${invitation.uuid}`;
      const qrDataURL = await QRCode.toDataURL(qrUrl, {
        width: 300, margin: 2,
        color: { dark: "#020617", light: "#ffffff" }
      });
      setQrDataUrl(qrDataURL);

      const selectedFair = fairs.find(f => f.id === form.fairId);

      // Kullanıcıya mail gönder
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, {
        name: `${form.firstName} ${form.lastName}`,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        company: form.company || "-",
        jobTitle: form.jobTitle || "-",
        city: form.city,
        gender: form.gender,
        fairName: tr ? selectedFair?.titleTr : selectedFair?.titleEn,
        uuid: invitation.uuid,
        qrUrl,
        message: `Online davetiyeniz hazır! QR kodunuz: ${qrUrl}`,
      }, PUBLIC_KEY);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrors({ submit: tr ? "Bir hata oluştu, tekrar deneyin." : "An error occurred, please try again." });
    } finally {
      setLoading(false);
    }
  };

  const selectedFair = fairs.find(f => f.id === form.fairId);

  if (submitted) {
    return (
      <div className="bg-white min-h-screen font-sans flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center flex flex-col items-center gap-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase mb-3">
              {tr ? "Davetiyeniz Hazır!" : "Invitation Ready!"}
            </h2>
            <p className="text-slate-500 text-base font-black leading-relaxed">
              {tr
                ? `${form.firstName} ${form.lastName}, davetiyeniz e-posta adresinize gönderildi. Fuara gelirken QR kodunuzu göstermeniz yeterli.`
                : `${form.firstName} ${form.lastName}, your invitation has been sent to your email. Just show your QR code at the fair.`}
            </p>
          </div>

          {qrDataUrl && (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white border-4 border-slate-900 rounded-3xl p-4 shadow-2xl">
                <img src={qrDataUrl} alt="QR Code" className="w-56 h-56" />
              </div>
              <p className="text-slate-400 text-xs font-black tracking-[0.2em] uppercase">
                {tr ? "Fuara Giriş QR Kodunuz" : "Your Fair Entry QR Code"}
              </p>
              <a href={qrDataUrl} download={`anfas-davetiye-${invitationUuid.slice(0,8)}.png`}
                className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300">
                {tr ? "QR Kodu İndir" : "Download QR Code"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>
          )}

          <p className="text-slate-300 text-xs font-black">
            {tr ? `Referans No: ${invitationUuid.slice(0, 8).toUpperCase()}` : `Reference: ${invitationUuid.slice(0, 8).toUpperCase()}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/ticket-cover.jpg" alt={tr ? "Online Davetiye" : "Online Invitation"}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-black text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "Online\nDavetiye" : "Online\nInvitation"}
          </h1>
          <p className="text-white/40 text-sm font-black mt-5 max-w-md">
            {tr ? "Fuara ücretsiz giriş için formunuzu doldurun, QR kodunuz anında hazır." : "Fill out the form for free fair entry, your QR code is ready instantly."}
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <span className="text-blue-600 font-black text-[9px] tracking-[0.5em] uppercase block mb-12">
          01 — {tr ? "DAVETİYE FORMU" : "INVITATION FORM"}
        </span>

        {fairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Shield size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-900 font-black text-lg uppercase tracking-tight">
              {tr ? "Aktif Fuar Bulunamadı" : "No Active Fairs"}
            </p>
            <p className="text-slate-400 text-sm font-black max-w-sm">
              {tr ? "Şu an davetiye alınabilecek aktif fuar bulunmamaktadır. Fuarlar başlamadan 6 ay önce aktif olur." : "There are no active fairs available for invitation. Fairs become active 6 months before they start."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

            {/* FUAR SEÇİMİ */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                {tr ? "Fuar Seçiniz" : "Select Fair"} <span className="text-blue-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fairs.map(fair => (
                  <button key={fair.id} type="button" onClick={() => set("fairId", fair.id)}
                    className={`flex flex-col gap-1 p-4 rounded-2xl border-2 text-left transition-all duration-200
                      ${form.fairId === fair.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
                    <span className={`text-sm font-black uppercase tracking-tight ${form.fairId === fair.id ? "text-blue-600" : "text-slate-900"}`}>
                      {tr ? fair.titleTr : fair.titleEn}
                    </span>
                    <span className="text-slate-400 text-xs font-black">
                      {new Date(fair.startDate).toLocaleDateString(tr ? "tr-TR" : "en-GB")} — {new Date(fair.endDate).toLocaleDateString(tr ? "tr-TR" : "en-GB")}
                    </span>
                  </button>
                ))}
              </div>
              {errors.fairId && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors.fairId}</span>}
            </div>

            {/* KİŞİSEL BİLGİLER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "firstName", label: tr ? "Ad" : "First Name", ph: tr ? "Adınız" : "Your first name" },
                { id: "lastName",  label: tr ? "Soyad" : "Last Name", ph: tr ? "Soyadınız" : "Your last name" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                    {f.label} <span className="text-blue-600">*</span>
                  </label>
                  <input type="text" placeholder={f.ph} value={(form as any)[f.id]} onChange={e => set(f.id, e.target.value)}
                    className={`w-full px-5 py-4 rounded-xl border text-[15px] font-black outline-none transition-all
                      ${errors[f.id] ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                  {errors[f.id] && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors[f.id]}</span>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "email", label: tr ? "E-posta" : "Email", type: "email", ph: "ornek@email.com" },
                { id: "phone", label: tr ? "Telefon" : "Phone",  type: "tel",   ph: "5XX XXX XX XX" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                    {f.label} <span className="text-blue-600">*</span>
                  </label>
                  <input type={f.type} placeholder={f.ph} value={(form as any)[f.id]} onChange={e => set(f.id, e.target.value)}
                    className={`w-full px-5 py-4 rounded-xl border text-[15px] font-black outline-none transition-all
                      ${errors[f.id] ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                  {errors[f.id] && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors[f.id]}</span>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "company",  label: tr ? "Şirket" : "Company",   ph: tr ? "Şirket adı" : "Company name" },
                { id: "jobTitle", label: tr ? "Ünvan" : "Job Title",   ph: tr ? "Göreviniz" : "Your title" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">{f.label}</label>
                  <input type="text" placeholder={f.ph} value={(form as any)[f.id]} onChange={e => set(f.id, e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[15px] font-black outline-none transition-all" />
                </div>
              ))}
            </div>

            {/* CİNSİYET + ŞEHİR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                  {tr ? "Cinsiyet" : "Gender"} <span className="text-blue-600">*</span>
                </label>
                <div className="flex gap-5">
                  {[
                    { val: "male",   trLabel: "Erkek",  enLabel: "Male" },
                    { val: "female", trLabel: "Kadın",  enLabel: "Female" },
                    { val: "other",  trLabel: "Diğer",  enLabel: "Other" },
                  ].map(g => (
                    <label key={g.val} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gender" value={g.val} checked={form.gender === g.val} onChange={() => set("gender", g.val)} className="w-5 h-5 accent-blue-600" />
                      <span className="text-slate-700 text-sm font-black">{tr ? g.trLabel : g.enLabel}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors.gender}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                  {tr ? "Şehir" : "City"} <span className="text-blue-600">*</span>
                </label>
                <select value={form.city} onChange={e => set("city", e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl border text-[15px] font-black outline-none transition-all bg-white
                    ${errors.city ? "border-red-400" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}>
                  <option value="">{tr ? "Şehir seçiniz" : "Select city"}</option>
                  {CITIES_TR.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                {errors.city && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors.city}</span>}
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="flex flex-col gap-3">
              <label className="text-slate-700 text-[11px] font-black tracking-[0.2em] uppercase">
                {tr ? "Güvenlik Kodu" : "Security Code"} <span className="text-blue-600">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-slate-900 rounded-xl px-6 py-3 select-none min-w-[140px]">
                  <span className="text-white text-xl font-black tracking-[0.4em] font-mono"
                    style={{ textDecoration: "line-through", letterSpacing: "0.4em" }}>
                    {captcha}
                  </span>
                </div>
                <button type="button" onClick={() => { setCaptcha(generateCaptcha()); set("captchaInput", ""); }}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:border-blue-400 flex items-center justify-center transition-all hover:bg-blue-50 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                  </svg>
                </button>
                <input type="text" placeholder={tr ? "Kodu giriniz" : "Enter code"} value={form.captchaInput}
                  onChange={e => set("captchaInput", e.target.value.toUpperCase())} maxLength={6}
                  className={`flex-1 px-5 py-4 rounded-xl border text-[15px] font-black outline-none transition-all tracking-[0.3em] uppercase
                    ${errors.captchaInput ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
              </div>
              {errors.captchaInput && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black"><AlertCircle size={12}/>{errors.captchaInput}</span>}
            </div>

            {/* KVKK */}
            <div className="flex flex-col gap-5 pt-6 border-t border-slate-100">
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.kvkk} onChange={e => set("kvkk", e.target.checked)} className="w-5 h-5 mt-0.5 accent-blue-600 flex-shrink-0" />
                  <span className="text-slate-600 text-[15px] font-black leading-relaxed">
                    {tr ? (<>
                      <button type="button" onClick={() => setShowKvkk(v => !v)} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                        6698 Sayılı KVKK Aydınlatma Metni
                      </button>'ni okudum ve anladım.
                    </>) : (<>
                      I have read and understood the{" "}
                      <button type="button" onClick={() => setShowKvkk(v => !v)} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                        KVKK Clarification Text
                      </button>.
                    </>)}
                  </span>
                </label>
                {errors.kvkk && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black ml-8"><AlertCircle size={12}/>{errors.kvkk}</span>}
              </div>

              {showKvkk && (
                <div className="ml-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-64 overflow-y-auto">
                  <pre className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-sans font-black">{kvkkText}</pre>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)} className="w-5 h-5 mt-0.5 accent-blue-600 flex-shrink-0" />
                  <span className="text-slate-600 text-[15px] font-black leading-relaxed">
                    {tr
                      ? "ANFAŞ Fuarcılık A.Ş. tarafından yazılı ya da elektronik ortamda toplanan kişisel verilerimin, fuar hakkında bilgilendirilmem amacıyla e-posta ve SMS gönderimlerinde kullanılmak üzere 6698 Sayılı KVKK kapsamında işlenmesini açık rızamla onaylıyorum."
                      : "I hereby give my explicit consent for my personal data collected by ANFAŞ Fuarcılık A.Ş. to be processed within the scope of KVKK No. 6698 for the purpose of informing me about fairs via e-mail and SMS."}
                  </span>
                </label>
                {errors.consent && <span className="flex items-center gap-1.5 text-red-500 text-xs font-black ml-8"><AlertCircle size={12}/>{errors.consent}</span>}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm font-black">
                {errors.submit}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full sm:w-auto sm:self-end flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-12 py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)]">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? (tr ? "Gönderiliyor..." : "Sending...") : (tr ? "Davetiye Al" : "Get Invitation")}
              {!loading && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
            </button>

          </form>
        )}
      </section>
    </div>
  );
}