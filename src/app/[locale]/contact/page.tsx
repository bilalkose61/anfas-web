"use client";

import { use, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const kvkkTr = `ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM A.Ş.
MÜŞTERİ AYDINLATMA METNİ

1- Veri Sorumlusu
ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM A.Ş. olarak kişisel verilerinizi, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili sair mevzuat kapsamında, veri sorumlusu sıfatıyla işleriz.

2- Kişisel Verilerin Hangi Amaçla İşleneceği ve Hukuki Sebepleri
Kişisel verileriniz; Mal/Hizmet Satış Süreçlerinin Yürütülmesi, Müşteri İlişkileri Yönetimi, Organizasyon Ve Etkinlik Yönetimi, Sözleşme Süreçlerinin Yürütülmesi, İletişim Faaliyetlerinin Yürütülmesi, Müşteri Memnuniyetine Yönelik Aktivitelerin Yürütülmesi, Saklama Ve Arşiv Faaliyetleri, Finans Ve Muhasebe İşleri ve Reklam/Kampanya/Promosyon Süreçleri kapsamında işlenmektedir.

3- Kişisel Verilerin Toplama Yöntemi
Kişisel verileriniz, yukarıdaki amaçların yerine getirilebilmesi için otomatik ve otomatik olmayan yolla toplanır.

4- İşlenen Kişisel Verilerin Kimlere Aktarılabileceği
Kişisel verileriniz; reklam/kampanya/promosyon süreçleri, faaliyetin mevzuata uygun yürütülmesi, finans ve muhasebe işleri ile hukuk işlerinin takibi amaçları ile yurt içindeki tedarikçiler ve yetkili kamu kurum ve kuruluşlarına aktarılır.

5- KVKK'nın 11. Maddesi Kapsamındaki Haklarınız
Taleplerinizi "SOĞUCAKSU MAH. 25001 SOKAK NO:1/4 Aksu/ANTALYA" adresine bizzat gelerek, noter aracılığı ile veya kvkk@anfas.com.tr adresine e-posta göndererek iletebilirsiniz.

6- Kişisel Verilerin Saklanma Süresi
Şirket, kişisel verilerin işleme amacının ortadan kalkması ve yasal saklama sürelerinin dolmasıyla birlikte kişisel verileri siler, yok eder veya anonim hale getirir.

7- Değişiklik ve Güncellemeler
Bu aydınlatma metni, 6698 sayılı KVKK ve ilgili mevzuat kapsamında hazırlanmış olup gerekli değişiklikler yapılabilir.`;

const kvkkEn = `ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM A.Ş.
CUSTOMER CLARIFICATION TEXT

1- Data Controller
As ANFAŞ ANTALYA FUARCILIK İŞLETME VE YATIRIM A.Ş., we process your personal data as a data controller within the scope of the Personal Data Protection Law No. 6698 ("KVKK") and related legislation.

2- Purpose and Legal Basis
Your personal data is processed for Sales Process Management, Customer Relationship Management, Organization and Event Management, Contract Management, Communication Activities, Customer Satisfaction Activities, Storage and Archiving, Finance and Accounting, and Marketing Processes.

3- Collection Method
Your personal data is collected automatically and non-automatically to fulfill the above purposes.

4- Data Transfer
Your personal data may be transferred to domestic suppliers and authorized public institutions for advertising, legal compliance, and accounting purposes.

5- Your Rights under Article 11
You may submit requests by visiting "SOĞUCAKSU MAH. 25001 SOKAK NO:1/4 Aksu/ANTALYA" in person, by notary, or by sending an e-mail to kvkk@anfas.com.tr.

6- Data Retention
The Company deletes, destroys, or anonymizes personal data when the processing purpose ceases and legal retention periods expire.

7- Updates
This text has been prepared within the scope of KVKK No. 6698 and may be updated as necessary.`;

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const tr = locale === "tr";

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", company: "", gender: "", message: "",
    kvkk: false, consent: false,
  });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [sendError, setSendError] = useState(false);
  const [showKvkk, setShowKvkk]   = useState(false);

  const set = (key: string, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = tr ? "Ad zorunludur" : "First name is required";
    else if (/\d/.test(form.firstName)) e.firstName = tr ? "Ad rakam içeremez" : "First name cannot contain numbers";
    if (!form.lastName.trim()) e.lastName = tr ? "Soyad zorunludur" : "Last name is required";
    else if (/\d/.test(form.lastName)) e.lastName = tr ? "Soyad rakam içeremez" : "Last name cannot contain numbers";
    if (!form.email.trim()) e.email = tr ? "E-posta zorunludur" : "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = tr ? "Geçerli bir e-posta girin" : "Enter a valid email";
    if (!form.phone.trim()) e.phone = tr ? "Telefon zorunludur" : "Phone is required";
    else if (!/^5\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = tr ? "Telefon 5 ile başlamalı ve 10 hane olmalı" : "Phone must start with 5 and be 10 digits";
    if (!form.company.trim()) e.company = tr ? "Şirket unvanı zorunludur" : "Company name is required";
    if (!form.gender) e.gender = tr ? "Cinsiyet seçiniz" : "Please select gender";
    if (!form.message.trim()) e.message = tr ? "Mesaj zorunludur" : "Message is required";
    if (!form.kvkk) e.kvkk = tr ? "KVKK metnini onaylamanız zorunludur" : "You must confirm the KVKK text";
    if (!form.consent) e.consent = tr ? "Açık rıza onayı zorunludur" : "Explicit consent is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSendError(false);

    try {
      // 1. DB'ye kaydet
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveMessage",
          data: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            subject: form.company,
            message: form.message,
          },
        }),
      });

      // 2. EmailJS ile mail gönder
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone,
        company:   form.company,
        gender:    form.gender,
        message:   form.message,
        name:      `${form.firstName} ${form.lastName}`,
      }, PUBLIC_KEY);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white min-h-screen font-sans flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase mb-5">
            {tr ? "Teşekkürler!" : "Thank You!"}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {tr
              ? "Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz."
              : "Your form has been successfully submitted. We will get back to you as soon as possible."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden bg-[#020617]">
        <img src="/images/contact-cover.jpg" alt={tr ? "İletişim" : "Contact"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.38) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent z-20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-blue-500" />
            <span className="text-blue-400 font-bold text-[9px] tracking-[0.5em] uppercase">ANFAŞ — Antalya Fuarcılık A.Ş.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {tr ? "İletişim" : "Contact"}
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium mt-6 max-w-md leading-relaxed">
            {tr ? "Bizimle iletişime geçin." : "Get in touch with us."}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 items-start">

          {/* SOL — FORM */}
          <div>
            <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-12">
              01 — {tr ? "İLETİŞİM FORMU" : "CONTACT FORM"}
            </span>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "firstName", label: tr ? "Ad" : "First Name", ph: tr ? "Adınız" : "Your first name" },
                  { id: "lastName",  label: tr ? "Soyad" : "Last Name", ph: tr ? "Soyadınız" : "Your last name" },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase">
                      {f.label} <span className="text-blue-600">*</span>
                    </label>
                    <input type="text" placeholder={f.ph} value={(form as any)[f.id]}
                      onChange={e => set(f.id, e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border text-[15px] font-medium outline-none transition-all bg-white
                        ${errors[f.id] ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                    {errors[f.id] && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold"><AlertCircle size={12}/>{errors[f.id]}</span>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "email", label: tr ? "E-posta" : "Email", type: "email", ph: "ornek@email.com" },
                  { id: "phone", label: tr ? "Telefon" : "Phone", type: "tel",   ph: "5XX XXX XX XX" },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase">
                      {f.label} <span className="text-blue-600">*</span>
                    </label>
                    <input type={f.type} placeholder={f.ph} value={(form as any)[f.id]}
                      onChange={e => set(f.id, e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border text-[15px] font-medium outline-none transition-all bg-white
                        ${errors[f.id] ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                    {errors[f.id] && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold"><AlertCircle size={12}/>{errors[f.id]}</span>}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase">
                  {tr ? "Şirket Unvanı" : "Company Name"} <span className="text-blue-600">*</span>
                </label>
                <input type="text" placeholder={tr ? "Şirketinizin adı" : "Your company name"} value={form.company}
                  onChange={e => set("company", e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl border text-[15px] font-medium outline-none transition-all bg-white
                    ${errors.company ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                {errors.company && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold"><AlertCircle size={12}/>{errors.company}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase">
                  {tr ? "Mesajınız" : "Your Message"} <span className="text-blue-600">*</span>
                </label>
                <textarea rows={5} placeholder={tr ? "Mesajınızı buraya yazın..." : "Write your message here..."}
                  value={form.message} onChange={e => set("message", e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl border text-[15px] font-medium outline-none transition-all bg-white resize-none
                    ${errors.message ? "border-red-400 bg-red-50/30" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`} />
                {errors.message && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold"><AlertCircle size={12}/>{errors.message}</span>}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase">
                  {tr ? "Cinsiyet" : "Gender"} <span className="text-blue-600">*</span>
                </label>
                <div className="flex flex-wrap gap-6">
                  {[
                    { val: "male",   labelTr: "Erkek",  labelEn: "Male" },
                    { val: "female", labelTr: "Kadın",  labelEn: "Female" },
                    { val: "other",  labelTr: "Diğer",  labelEn: "Other" },
                  ].map(g => (
                    <label key={g.val} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="gender" value={g.val} checked={form.gender === g.val}
                        onChange={() => set("gender", g.val)} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                      <span className="text-slate-700 text-base font-semibold">{tr ? g.labelTr : g.labelEn}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold"><AlertCircle size={12}/>{errors.gender}</span>}
              </div>

              {/* KVKK */}
              <div className="flex flex-col gap-5 pt-5 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.kvkk} onChange={e => set("kvkk", e.target.checked)}
                      className="w-5 h-5 mt-0.5 accent-blue-600 cursor-pointer flex-shrink-0" />
                    <span className="text-slate-600 text-[15px] leading-relaxed">
                      {tr ? (<>Kişisel Verilerin korunması ile ilgili{" "}
                        <button type="button" onClick={() => setShowKvkk(v => !v)} className="text-blue-600 font-bold underline underline-offset-2 hover:text-blue-800">
                          Müşteri Aydınlatma Metni
                        </button>'ni Okudum ve Anladım.</>) : (<>I have read and understood the{" "}
                        <button type="button" onClick={() => setShowKvkk(v => !v)} className="text-blue-600 font-bold underline underline-offset-2 hover:text-blue-800">
                          Customer Clarification Text
                        </button>{" "}regarding the Protection of Personal Data.</>)}
                    </span>
                  </label>
                  {errors.kvkk && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold ml-8"><AlertCircle size={12}/>{errors.kvkk}</span>}
                </div>

                {showKvkk && (
                  <div className="ml-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-56 overflow-y-auto">
                    <pre className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-sans">{tr ? kvkkTr : kvkkEn}</pre>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)}
                      className="w-5 h-5 mt-0.5 accent-blue-600 cursor-pointer flex-shrink-0" />
                    <span className="text-slate-600 text-[15px] leading-relaxed">
                      {tr
                        ? "ANFAŞ Fuarcılık A.Ş. tarafından yazılı ya da elektronik ortamda toplanan kişisel verilerimin, fuar hakkında bilgilendirilmem amaçlı; e-posta bülten gönderimlerinde ve SMS gönderimlerinde kullanmak üzere 6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenmesini açık rızam ile onaylıyorum."
                        : "I hereby give my explicit consent for my personal data collected by ANFAŞ Fuarcılık A.Ş. to be processed within the scope of the Personal Data Protection Law No. 6698 for the purpose of informing me about the fair, to be used in e-mail newsletters and SMS notifications."}
                    </span>
                  </label>
                  {errors.consent && <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold ml-8"><AlertCircle size={12}/>{errors.consent}</span>}
                </div>
              </div>

              {sendError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm font-semibold">
                  {tr ? "Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin." : "An error occurred while sending. Please try again."}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full sm:w-auto sm:self-end flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-12 py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] mt-2">
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? (tr ? "Gönderiliyor..." : "Sending...") : (tr ? "Formu Gönder" : "Submit Form")}
                {!loading && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </button>

            </form>
          </div>

          {/* SAĞ — BİLGİLER */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-5">
            <span className="text-blue-600 font-bold text-[9px] tracking-[0.5em] uppercase block mb-2">
              02 — {tr ? "BİLGİLER" : "INFO"}
            </span>
            <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 flex flex-col gap-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              {[
                { icon: <Phone size={18} className="text-blue-400"/>, labelTr: "Telefon",          labelEn: "Phone",         value: "+90 (242) 462 20 00" },
                { icon: <Phone size={18} className="text-blue-400"/>, labelTr: "Faks",             labelEn: "Fax",           value: "+90 (242) 462 19 85" },
                { icon: <Mail  size={18} className="text-blue-400"/>, labelTr: "E-posta",          labelEn: "Email",         value: "info@anfas.com.tr" },
                { icon: <MapPin size={18} className="text-blue-400"/>,labelTr: "Adres",            labelEn: "Address",       value: "Soğucaksu Mah. 25001 Sokak No:1/4 Aksu / Antalya" },
                { icon: <Clock  size={18} className="text-blue-400"/>,labelTr: "Çalışma Saatleri", labelEn: "Working Hours", value: tr ? "Pazartesi – Cuma: 08:30 – 17:30" : "Monday – Friday: 08:30 – 17:30" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">{tr ? item.labelTr : item.labelEn}</p>
                    <p className="text-white text-sm font-semibold leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}