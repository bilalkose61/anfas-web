import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

// X (Twitter) Logosu
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);

export default function Footer({ locale }: { locale: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-32 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ÜST KISIM: LOGO VE SOSYAL MEDYA BAĞLANTILARI */}
        <div className="flex flex-col items-center gap-14 mb-24">
          <Link href={`/${locale}`} className="hover:opacity-100 transition-all duration-500 transform hover:scale-105">
            <img 
              src="/images/logo.png" 
              alt="Anfaş Logo" 
              className="h-20 w-auto object-contain" 
            />
          </Link>
          
          <div className="flex items-center gap-10">
            <Link href="https://www.instagram.com/anfas_aec/" target="_blank" className="text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2">
              <Instagram size={24} strokeWidth={2} />
            </Link>
            <Link href="https://x.com/anfasfuarcilik" target="_blank" className="text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2">
              <XIcon size={20} />
            </Link>
            <Link href="https://www.youtube.com/channel/UC9kypu34wFMVsIJ1NZ-MI1g" target="_blank" className="text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2">
              <Youtube size={26} strokeWidth={2} />
            </Link>
            <Link href="https://tr-tr.facebook.com/AntalyaExpoCenter/" target="_blank" className="text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2">
              <Facebook size={24} strokeWidth={2} />
            </Link>
            <Link href="https://tr.linkedin.com/company/antalya-expo-center---anfas-fair-management-and-investment-co." target="_blank" className="text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2">
              <Linkedin size={24} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* ORTA KISIM: İLETİŞİM ALANI + ZARİF KISA ÇİZGİLER */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 mb-24 text-[12px] font-bold tracking-[0.15em] uppercase text-slate-400 items-center">
            
            {/* KONUM */}
            <div className="flex flex-col items-center text-center gap-5 group px-8">
              <div className="p-4 rounded-3xl bg-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-lg">
                <MapPin size={24} strokeWidth={2} className="text-white" />
              </div>
              <p className="leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-300">
                Soğucaksu Mah. 25001 Sokak <br />
                No:1/4, 07112 Aksu / Antalya
              </p>
            </div>

            {/* TELEFON + ZARİF DİKEY ÇİZGİLER (h-16 sınırlamasıyla) */}
            <div className="relative flex flex-col items-center text-center gap-5 group px-8 py-12 md:py-0">
              {/* Sol Çizgi */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/10" />
              
              <div className="p-4 rounded-3xl bg-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-lg">
                <Phone size={24} strokeWidth={2} className="text-white" />
              </div>
              <Link href="tel:+902424622000" className="text-lg font-black tracking-tighter text-white hover:text-blue-400 transition-all">
                +90 242 462 20 00
              </Link>

              {/* Sağ Çizgi */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/10" />
            </div>

            {/* MAIL - Tıklanabilirliği Güçlendirildi */}
            <div className="flex flex-col items-center text-center gap-5 group px-8">
              <div className="p-4 rounded-3xl bg-white/10 group-hover:bg-blue-600 transition-all duration-500 shadow-lg">
                <Mail size={24} strokeWidth={2} className="text-white" />
              </div>
              <Link 
                href="mailto:info@anfas.com.tr" 
                className="text-slate-300 group-hover:text-white transition-all lowercase tracking-normal text-sm font-bold"
              >
                info@anfas.com.tr
              </Link>
            </div>
        </div>

        {/* ALT KISIM: İSİM VE TELİF */}
        <div className="flex flex-col items-center gap-8 w-full pt-16 border-t border-white/5">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[24px] font-black tracking-[1em] text-white/5 uppercase ml-[1em] select-none">ANFAŞ</span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-slate-600 uppercase">Antalya Anfaş Expo Center</span>
          </div>
          
          <div className="text-[10px] font-medium tracking-widest text-slate-500 uppercase flex flex-col md:flex-row items-center gap-4">
            <span>© {currentYear} ANFAŞ</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>{locale === 'tr' ? 'Tüm Hakları Saklıdır' : 'All Rights Reserved'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}