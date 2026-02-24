"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("Response:", res.status, data);

    if (res.ok) {
      window.location.href = "/tr/admin";
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
  } catch (err) {
    console.error(err);
    setError("Bağlantı hatası. Tekrar dene.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050810", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Georgia', serif", position: "relative", overflow: "hidden" }}>

      {/* Arka plan efektleri */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
        {/* Grid çizgiler */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Köşe dekor */}
        <div style={{ position: "absolute", top: 40, left: 40, width: 80, height: 80, borderTop: "1px solid rgba(37,99,235,0.3)", borderLeft: "1px solid rgba(37,99,235,0.3)" }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 80, height: 80, borderBottom: "1px solid rgba(37,99,235,0.3)", borderRight: "1px solid rgba(37,99,235,0.3)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: 420, position: "relative", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>

        {/* Üst etiket */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, transparent, rgba(37,99,235,0.4))" }} />
          <span style={{ color: "rgba(37,99,235,0.7)", fontSize: 9, fontFamily: "'Arial', sans-serif", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase" }}>ANFAŞ CMS — YETKİLİ GİRİŞİ</span>
          <div style={{ height: 1, flex: 1, background: "linear-gradient(to left, transparent, rgba(37,99,235,0.4))" }} />
        </div>

        {/* Logo + Başlık */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <img src="/images/logo.png" alt="Anfaş" style={{ height: 56, objectFit: "contain", marginBottom: 20, filter: "brightness(0) invert(1) opacity(0.9)" }} />
          <h1 style={{ color: "white", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>
            Yönetim Paneli
          </h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'Arial', sans-serif", fontWeight: 400, marginTop: 8 }}>
            Devam etmek için giriş yapın
          </p>
        </div>

        {/* Form kutusu */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 36px", backdropFilter: "blur(20px)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Kullanıcı Adı */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "'Arial', sans-serif", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                placeholder="kullanıcı adınız"
                required
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, color: "white", fontSize: 14, fontFamily: "'Arial', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.6)"}
                onBlur={e => e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}
              />
            </div>

            {/* Şifre */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "'Arial', sans-serif", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Şifre
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  required
                  style={{ width: "100%", padding: "14px 48px 14px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, color: "white", fontSize: 14, fontFamily: "'Arial', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.6)"}
                  onBlur={e => e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0, display: "flex" }}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {/* Hata */}
            {error && (
              <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "12px 16px", color: "rgba(239,68,68,0.9)", fontSize: 13, fontFamily: "'Arial', sans-serif" }}>
                {error}
              </div>
            )}

            {/* Buton */}
            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "15px", background: loading ? "rgba(37,99,235,0.5)" : "linear-gradient(135deg, #2563eb, #1d4ed8)", border: "none", borderRadius: 12, color: "white", fontSize: 12, fontFamily: "'Arial', sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, transition: "opacity 0.2s" }}>
              {loading ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }}/> : null}
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>

          </form>
        </div>

        {/* Alt yazı */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 11, fontFamily: "'Arial', sans-serif", marginTop: 28, letterSpacing: "0.05em" }}>
          © 2025 ANFAŞ Antalya Fuarcılık İşletme ve Yatırım A.Ş.
        </p>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}