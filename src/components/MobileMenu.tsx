"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

type MenuGroup = {
  title: string;
  links: { n: string; e: string; href: string }[];
};

export default function MobileMenu({ locale, menuItems }: { locale: string; menuItems: MenuGroup[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => { setIsOpen(false); setOpenGroup(null); };

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-all">
        <Menu size={20} className="text-slate-900" />
      </button>

      {isOpen && (
        <>
          <div onClick={close} className="fixed inset-0 bg-black/40 z-[60]" />

          <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: "85vw", maxWidth: "360px", backgroundColor: "white", zIndex: 70, display: "flex", flexDirection: "column", boxShadow: "0 0 60px rgba(0,0,0,0.2)" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
              <div>
                <p style={{ fontWeight: 900, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#0f172a" }}>ANFAŞ</p>
                <p style={{ fontWeight: 700, fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginTop: 2 }}>Antalya Expo Center</p>
              </div>
              <button onClick={close} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                <X size={16} color="#475569" />
              </button>
            </div>

            {/* Nav - scrollable */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {menuItems.map((group, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <button onClick={() => setOpenGroup(openGroup === i ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 16, border: "none", cursor: "pointer", backgroundColor: openGroup === i ? "#2563eb" : "transparent", color: openGroup === i ? "white" : "#0f172a", textAlign: "left" }}>
                    <span style={{ fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{group.title}</span>
                    <ChevronDown size={14} style={{ transform: openGroup === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", color: openGroup === i ? "white" : "#94a3b8" }} />
                  </button>

                  {openGroup === i && (
                    <div style={{ backgroundColor: "#f8fafc", borderRadius: 16, padding: "8px", marginTop: 4, marginBottom: 4 }}>
                      {group.links.map((link, j) => (
                        <Link key={j} href={`/${locale}${link.href}`} onClick={close}
                          style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: link.href === "/ticket" ? "#2563eb" : "#475569", textDecoration: "none" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#cbd5e1", flexShrink: 0 }} />
                          {locale === "tr" ? link.n : link.e}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href={`/${locale}/contact`} onClick={close}
                style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: 16, color: "#0f172a", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>
                {locale === "tr" ? "İletişim" : "Contact"}
              </Link>
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 16px 32px", borderTop: "1px solid #f1f5f9", flexShrink: 0 }}>
              <Link href={`/${locale}/ticket`} onClick={close}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2563eb", color: "white", padding: "14px", borderRadius: 16, fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, textDecoration: "none", marginBottom: 12 }}>
                {locale === "tr" ? "Online Davetiye Al" : "Get Invitation"}
              </Link>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <a href="https://tr-tr.facebook.com/AntalyaExpoCenter/" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/anfas_aec/" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.youtube.com/channel/UC9kypu34wFMVsIJ1NZ-MI1g" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                </a>
                <a href="https://tr.linkedin.com/company/antalya-expo-center---anfas-fair-management-and-investment-co." target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}