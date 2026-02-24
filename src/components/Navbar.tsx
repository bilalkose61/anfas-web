"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import Link from 'next/link';
import LanguageSwitcher from "@/components/LanguageSwitcher"; 
import MobileMenu from "@/components/MobileMenu";
import { ChevronDown } from "lucide-react";

export default function Navbar({ locale }: { locale: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const menuItems = [
    {
      title: locale === 'tr' ? 'Kurumsal' : 'Corporate',
      links: [
        { n: 'Hakkımızda',      e: 'About Us',             href: '/about' },
        { n: 'Misyon & Vizyon', e: 'Mission & Vision',      href: '/vision' },
        { n: 'Ekibimiz',        e: 'Our Team',              href: '/team' },
        { n: 'Bilgi Toplumu',   e: 'Information Society',   href: '/info' },
        { n: 'Ortaklarımız',    e: 'Partners',              href: '/partners' },
        { n: 'İnsan Kaynakları',e: 'HR',                    href: '/hr' },
        { n: 'Duyurular',       e: 'Announcements',         href: '/announcements' },
      ]
    },
    {
      title: locale === 'tr' ? 'Anfaş Fuar & Kongre' : 'Anfas Center',
      links: [
        { n: 'Online Davetiye Al',  e: 'Get Online Invitation', href: '/ticket' },
        { n: 'Fuar Takvimi',        e: 'Exhibition Calendar',   href: '/calendar' },
        { n: 'Etkinlik Takvimi',    e: 'Event Calendar',        href: '/event-calendar' },
        { n: 'Fuar Alanı',          e: 'Venue',                 href: '/venue' },
        { n: 'Toplantı & Konferans',e: 'Meeting & Conference',  href: '/conference' },
        { n: 'Reklam Alanları',     e: 'Ad Spaces',             href: '/ads' },
        { n: 'Sponsorluk',          e: 'Sponsorship',           href: '/sponsorship' },
        { n: 'Çözüm Ortaklarımız',  e: 'Solution Partners',     href: '/solution-partners' },
        { n: 'Nasıl Giderim?',      e: 'How to Get There',      href: '/how-to-get' },
      ]
    },
    {
      title: locale === 'tr' ? 'Medya' : 'Media',
      links: [
        { n: 'Basında Anfaş',     e: 'Press',          href: '/press' },
        { n: 'Fotoğraf Galerisi', e: 'Photo Gallery',  href: '/gallery-photo' },
        { n: 'Video Galerisi',    e: 'Video Gallery',  href: '/gallery-video' },
        { n: 'Medya Materyalleri',e: 'Media Assets',   href: '/assets' },
        { n: 'Sosyal Medya',      e: 'Social Media',   href: '/social' },
      ]
    }
  ];

  const textColorClass = !isScrolled && isHomePage 
    ? "text-white drop-shadow-md hover:text-blue-200" 
    : "text-slate-900 hover:text-blue-600";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-4 px-4 sm:px-8 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" 
        : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href={`/${locale}`} className="group active:scale-95 transition-all">
            <img 
              src="/images/logo.png" 
              alt="Anfaş Logo" 
              className="h-10 sm:h-12 md:h-14 xl:h-16 w-auto object-contain transition-all duration-700" 
            />
          </Link>
        </div>

        {/* ANA MENÜ — sadece xl+ */}
        <div className="hidden xl:flex items-center gap-14">
          {menuItems.map((group, i) => (
            <div key={i} className="relative group/menu py-2">
              <button className={`flex items-center gap-2.5 text-[16.5px] font-bold tracking-tight transition-all duration-300 ${textColorClass}`}>
                {group.title} 
                <ChevronDown size={15} strokeWidth={2.8} className="opacity-50 group-hover/menu:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full -left-4 w-72 bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] rounded-[2.5rem] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 translate-y-4 group-hover/menu:translate-y-1 p-5 grid gap-1 z-[60]">
                {group.links.map((link, j) => (
                  <Link 
                    key={j} 
                    href={`/${locale}${link.href}`}
                    className={`text-[14px] font-semibold p-3.5 rounded-2xl transition-all ${
                      link.href === '/ticket' 
                        ? "text-blue-600 bg-blue-50/70 hover:bg-blue-100/70" 
                        : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                    }`}
                  >
                    {locale === "tr" ? link.n : link.e}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <Link 
            href={`/${locale}/contact`} 
            className={`text-[16.5px] font-bold tracking-tight transition-colors duration-300 ${textColorClass}`}
          >
            {locale === "tr" ? "İletişim" : "Contact"}
          </Link>
        </div>

        {/* SAĞ TARAF */}
        <div className="flex items-center gap-3 sm:gap-5 xl:gap-8">
          <LanguageSwitcher currentLocale={locale} transparent={!isScrolled && isHomePage} />
          <div className="xl:hidden">
            <MobileMenu locale={locale} menuItems={menuItems} />
          </div>
        </div>

      </div>
    </nav>
  );
}