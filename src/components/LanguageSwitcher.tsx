// src/components/LanguageSwitcher.tsx
"use client";

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale, transparent = false }: { currentLocale: string; transparent?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all duration-300 ${
      transparent
        ? "border-white/30 bg-white/10 backdrop-blur-sm"
        : "border-slate-200 bg-white shadow-sm"
    }`}>
      <button 
        onClick={() => switchLanguage('tr')}
        className={`transition-colors ${
          currentLocale === 'tr'
            ? transparent ? 'text-white' : 'text-blue-600'
            : transparent ? 'text-white/50 hover:text-white' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        TR
      </button>
      <div className={`w-px h-4 ${transparent ? 'bg-white/30' : 'bg-slate-200'}`} />
      <button 
        onClick={() => switchLanguage('en')}
        className={`transition-colors ${
          currentLocale === 'en'
            ? transparent ? 'text-white' : 'text-blue-600'
            : transparent ? 'text-white/50 hover:text-white' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        EN
      </button>
    </div>
  );
}