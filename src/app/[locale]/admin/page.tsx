"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Calendar, Megaphone, Users, Image, Video, Ticket, Newspaper, ChevronRight, Plus, Trash2, Eye, EyeOff, ExternalLink, X, Check, Loader2, Menu, MessageSquare, Mail, Phone, CheckCheck, Pencil } from "lucide-react";

type Section = "dashboard" | "fairs" | "events" | "announcements" | "team" | "photos" | "videos" | "invitations" | "press" | "messages";

async function api(action: string, body?: any) {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...body }),
  });
  return res.json();
}

const navItems = [
  { id: "dashboard",     icon: LayoutDashboard, label: "Dashboard" },
  { id: "fairs",         icon: Calendar,        label: "Fuarlar" },
  { id: "events",        icon: Calendar,        label: "Etkinlikler" },
  { id: "announcements", icon: Megaphone,       label: "Duyurular" },
  { id: "team",          icon: Users,           label: "Ekip" },
  { id: "photos",        icon: Image,           label: "Fotoğraf Galerisi" },
  { id: "videos",        icon: Video,           label: "Video Galerisi" },
  { id: "invitations",   icon: Ticket,          label: "Davetiyeler" },
  { id: "press",         icon: Newspaper,       label: "Basında Anfaş" },
  { id: "messages",      icon: MessageSquare,   label: "Mesajlar" },
];

function Field({ label, name, type = "text", placeholder, required, textarea, defaultValue }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-slate-500 text-[10px] font-black tracking-widest uppercase">{label} {required && <span className="text-blue-500">*</span>}</label>
      {textarea
        ? <textarea name={name} placeholder={placeholder} rows={3} required={required} defaultValue={defaultValue} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
        : <input name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-400" />}
    </div>
  );
}

function ItemRow({ title, subtitle, published, onToggle, onDelete, onEdit }: any) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 text-sm font-black truncate">{title}</p>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {published !== undefined && (
          <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full border ${published ? "bg-green-50 text-green-600 border-green-200" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
            {published ? "Yayında" : "Gizli"}
          </span>
        )}
        {onEdit && <button onClick={onEdit} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-center text-slate-400 transition-all"><Pencil size={13}/></button>}
        {onToggle && <button onClick={onToggle} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-400 transition-all">{published ? <EyeOff size={14}/> : <Eye size={14}/>}</button>}
        <button onClick={onDelete} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 transition-all"><Trash2 size={14}/></button>
      </div>
    </div>
  );
}

function FormCard({ title, children, onSubmit, loading, onCancel }: any) {
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6">
      <h3 className="text-slate-900 font-black text-sm uppercase tracking-tight mb-5 flex items-center gap-2">
        <Plus size={16} className="text-blue-600"/>{title}
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
        <div className="flex gap-3 mt-1">
          {onCancel && (
            <button type="button" onClick={onCancel} className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-black text-sm uppercase transition-all">
              <X size={15}/> İptal
            </button>
          )}
          <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-4 rounded-xl font-black text-sm uppercase transition-all">
            {loading ? <Loader2 size={15} className="animate-spin"/> : <Check size={15}/>}
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}

function useItems(getAction: string) {
  const [items, setItems] = useState<any[]>([]);
  const reload = () => api(getAction).then(r => setItems(r.data || []));
  useEffect(() => { reload(); }, []);
  return { items, reload };
}

function Dashboard({ data }: { data: any }) {
  const stats = [
    { label: "Fuar", value: data?.fairs || 0 },
    { label: "Etkinlik", value: data?.events || 0 },
    { label: "Duyuru", value: data?.announcements || 0 },
    { label: "Ekip Üyesi", value: data?.team || 0 },
    { label: "Fotoğraf", value: data?.photos || 0 },
    { label: "Video", value: data?.videos || 0 },
    { label: "Davetiye", value: data?.invitations || 0 },
    { label: "Basın Haberi", value: data?.press || 0 },
    { label: "Mesaj", value: data?.messages || 0 },
    { label: "Okunmamış", value: data?.unread || 0 },
  ];
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white border rounded-2xl p-5 ${s.label === "Okunmamış" && s.value > 0 ? "border-blue-200 bg-blue-50" : "border-slate-100"}`}>
            <p className={`text-3xl font-black ${s.label === "Okunmamış" && s.value > 0 ? "text-blue-600" : "text-slate-900"}`}>{s.value}</p>
            <p className="text-slate-400 text-xs font-black tracking-widest uppercase mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 rounded-[2rem] p-8 flex items-center justify-between gap-4">
        <p className="text-white text-lg font-black">Hoş geldin! Soldan bölüm seç, içerik ekle.</p>
        <a href="/tr" target="_blank" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full font-black text-xs uppercase transition-all whitespace-nowrap">
          Siteyi Gör <ExternalLink size={14}/>
        </a>
      </div>
    </div>
  );
}

function FairsSection() {
  const { items, reload } = useItems("getFairs");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), descTr: fd.get("descTr"), descEn: fd.get("descEn"), organizerTr: fd.get("organizerTr"), organizerEn: fd.get("organizerEn"), startDate: new Date(fd.get("startDate") as string), endDate: new Date(fd.get("endDate") as string), startTime: fd.get("startTime"), endTime: fd.get("endTime"), location: fd.get("location"), website: fd.get("website"), email: fd.get("email"), logoUrl: fd.get("logoUrl"), coverUrl: fd.get("coverUrl"), slug: fd.get("slug"), isPublished: true };
    if (editing) await api("updateFair", { id: editing.id, data: d });
    else await api("createFair", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  const fields = (item?: any) => <>
    <Field label="Başlık (TR)" name="titleTr" placeholder="Fuar Adı" required defaultValue={item?.titleTr}/>
    <Field label="Başlık (EN)" name="titleEn" placeholder="Fair Name" required defaultValue={item?.titleEn}/>
    <Field label="Açıklama (TR)" name="descTr" textarea placeholder="Kısa açıklama..." defaultValue={item?.descTr}/>
    <Field label="Açıklama (EN)" name="descEn" textarea placeholder="Short description..." defaultValue={item?.descEn}/>
    <Field label="Organizatör (TR)" name="organizerTr" placeholder="Organizatör" defaultValue={item?.organizerTr}/>
    <Field label="Organizatör (EN)" name="organizerEn" placeholder="Organizer" defaultValue={item?.organizerEn}/>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Başlangıç" name="startDate" type="date" required defaultValue={item?.startDate?.split("T")[0]}/>
      <Field label="Bitiş" name="endDate" type="date" required defaultValue={item?.endDate?.split("T")[0]}/>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Açılış Saati" name="startTime" placeholder="10:00" defaultValue={item?.startTime}/>
      <Field label="Kapanış Saati" name="endTime" placeholder="19:00" defaultValue={item?.endTime}/>
    </div>
    <Field label="Konum" name="location" placeholder="Anfaş Expo Center" defaultValue={item?.location}/>
    <Field label="Website" name="website" placeholder="https://..." defaultValue={item?.website}/>
    <Field label="E-posta" name="email" type="email" placeholder="info@fuar.com" defaultValue={item?.email}/>
    <Field label="Logo URL" name="logoUrl" placeholder="/images/fairs/logo.jpg" defaultValue={item?.logoUrl}/>
    <Field label="Cover Görseli URL" name="coverUrl" placeholder="/images/fairs/cover.jpg" defaultValue={item?.coverUrl}/>
    <Field label="Slug (URL)" name="slug" placeholder="fuar-adi-2026" required defaultValue={item?.slug}/>
  </>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Fuarlar</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Fuarı Düzenle" : "Yeni Fuar Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          {fields(editing || undefined)}
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Fuar</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={`${new Date(item.startDate).toLocaleDateString("tr-TR")} — ${item.slug}`} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("toggleFair", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deleteFair", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz fuar yok</p>}
        </div>
      </div>
    </div>
  );
}

function EventsSection() {
  const { items, reload } = useItems("getEvents");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), descTr: fd.get("descTr"), descEn: fd.get("descEn"), startDate: new Date(fd.get("startDate") as string), endDate: new Date(fd.get("endDate") as string), location: fd.get("location"), imageUrl: fd.get("imageUrl"), isPublished: true };
    if (editing) await api("updateEvent", { id: editing.id, data: d });
    else await api("createEvent", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Etkinlikler</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Başlık (TR)" name="titleTr" required placeholder="Etkinlik Adı" defaultValue={editing?.titleTr}/>
          <Field label="Başlık (EN)" name="titleEn" required placeholder="Event Name" defaultValue={editing?.titleEn}/>
          <Field label="Açıklama (TR)" name="descTr" textarea placeholder="Açıklama..." defaultValue={editing?.descTr}/>
          <Field label="Açıklama (EN)" name="descEn" textarea placeholder="Description..." defaultValue={editing?.descEn}/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Başlangıç" name="startDate" type="date" required defaultValue={editing?.startDate?.split("T")[0]}/>
            <Field label="Bitiş" name="endDate" type="date" required defaultValue={editing?.endDate?.split("T")[0]}/>
          </div>
          <Field label="Konum" name="location" placeholder="Konum" defaultValue={editing?.location}/>
          <Field label="Görsel URL" name="imageUrl" placeholder="/images/event.jpg" defaultValue={editing?.imageUrl}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Etkinlik</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={new Date(item.startDate).toLocaleDateString("tr-TR")} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("toggleEvent", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deleteEvent", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz etkinlik yok</p>}
        </div>
      </div>
    </div>
  );
}

function AnnouncementsSection() {
  const { items, reload } = useItems("getAnnouncements");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), contentTr: fd.get("contentTr"), contentEn: fd.get("contentEn") };
    if (editing) await api("updateAnnouncement", { id: editing.id, data: d });
    else await api("createAnnouncement", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Duyurular</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Başlık (TR)" name="titleTr" required placeholder="Duyuru Başlığı" defaultValue={editing?.titleTr}/>
          <Field label="Başlık (EN)" name="titleEn" required placeholder="Announcement Title" defaultValue={editing?.titleEn}/>
          <Field label="İçerik (TR)" name="contentTr" textarea placeholder="Duyuru içeriği..." defaultValue={editing?.bodyTr}/>
          <Field label="İçerik (EN)" name="contentEn" textarea placeholder="Content..." defaultValue={editing?.bodyEn}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Duyuru</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={new Date(item.createdAt).toLocaleDateString("tr-TR")} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("toggleAnnouncement", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deleteAnnouncement", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz duyuru yok</p>}
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const { items, reload } = useItems("getTeam");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { nameTr: fd.get("nameTr"), nameEn: fd.get("nameEn"), titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), photo: fd.get("photo"), order: Number(fd.get("order")) || 0, isPublished: true };
    if (editing) await api("updateTeamMember", { id: editing.id, data: d });
    else await api("createTeamMember", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Ekip</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Üyeyi Düzenle" : "Ekip Üyesi Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Ad Soyad (TR)" name="nameTr" required placeholder="Ad Soyad" defaultValue={editing?.nameTr}/>
          <Field label="Ad Soyad (EN)" name="nameEn" required placeholder="Full Name" defaultValue={editing?.nameEn}/>
          <Field label="Ünvan (TR)" name="titleTr" required placeholder="Genel Müdür" defaultValue={editing?.titleTr}/>
          <Field label="Ünvan (EN)" name="titleEn" required placeholder="General Manager" defaultValue={editing?.titleEn}/>
          <Field label="Fotoğraf URL" name="photo" placeholder="/images/team/isim.jpg" defaultValue={editing?.photo}/>
          <Field label="Sıra" name="order" type="number" placeholder="1" defaultValue={editing?.order}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Üye</p>
          {items.map(item => <ItemRow key={item.id} title={item.nameTr} subtitle={item.titleTr} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("toggleTeamMember", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deleteTeamMember", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz üye yok</p>}
        </div>
      </div>
    </div>
  );
}

function PhotosSection() {
  const { items, reload } = useItems("getPhotos");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), url: fd.get("url"), order: Number(fd.get("order")) || 0, isPublished: true };
    if (editing) await api("updatePhoto", { id: editing.id, data: d });
    else await api("createPhoto", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Fotoğraf Galerisi</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Fotoğrafı Düzenle" : "Fotoğraf Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Başlık (TR)" name="titleTr" required placeholder="Fotoğraf başlığı" defaultValue={editing?.titleTr}/>
          <Field label="Başlık (EN)" name="titleEn" required placeholder="Photo title" defaultValue={editing?.titleEn}/>
          <Field label="Görsel URL" name="url" required placeholder="/images/gallery/foto.jpg" defaultValue={editing?.url}/>
          <Field label="Sıra" name="order" type="number" placeholder="1" defaultValue={editing?.order}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Fotoğraf</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={item.url} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("togglePhoto", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deletePhoto", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz fotoğraf yok</p>}
        </div>
      </div>
    </div>
  );
}

function VideosSection() {
  const { items, reload } = useItems("getVideos");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), youtubeId: fd.get("youtubeId"), order: Number(fd.get("order")) || 0, isPublished: true };
    if (editing) await api("updateVideo", { id: editing.id, data: d });
    else await api("createVideo", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Video Galerisi</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Videoyu Düzenle" : "Video Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Başlık (TR)" name="titleTr" required placeholder="Video başlığı" defaultValue={editing?.titleTr}/>
          <Field label="Başlık (EN)" name="titleEn" required placeholder="Video title" defaultValue={editing?.titleEn}/>
          <Field label="YouTube ID" name="youtubeId" required placeholder="dQw4w9WgXcQ" defaultValue={editing?.youtubeId}/>
          <Field label="Sıra" name="order" type="number" placeholder="1" defaultValue={editing?.order}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Video</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={`youtube.com/watch?v=${item.youtubeId}`} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("toggleVideo", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deleteVideo", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz video yok</p>}
        </div>
      </div>
    </div>
  );
}

function PressSection() {
  const { items, reload } = useItems("getPress");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.target);
    const d = { titleTr: fd.get("titleTr"), titleEn: fd.get("titleEn"), sourceTr: fd.get("sourceTr"), sourceEn: fd.get("sourceEn"), url: fd.get("url"), imageUrl: fd.get("imageUrl"), publishedAt: new Date(fd.get("publishedAt") as string), isPublished: true };
    if (editing) await api("updatePress", { id: editing.id, data: d });
    else await api("createPress", { data: d });
    e.target.reset(); setLoading(false); setEditing(null); reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Basında Anfaş</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormCard title={editing ? "Haberi Düzenle" : "Haber Ekle"} onSubmit={submit} loading={loading} onCancel={editing ? () => setEditing(null) : undefined}>
          <Field label="Başlık (TR)" name="titleTr" required placeholder="Haber başlığı" defaultValue={editing?.titleTr}/>
          <Field label="Başlık (EN)" name="titleEn" required placeholder="News title" defaultValue={editing?.titleEn}/>
          <Field label="Kaynak (TR)" name="sourceTr" required placeholder="Hürriyet, Sabah..." defaultValue={editing?.sourceTr}/>
          <Field label="Kaynak (EN)" name="sourceEn" required placeholder="Hurriyet, Sabah..." defaultValue={editing?.sourceEn}/>
          <Field label="Haber URL" name="url" placeholder="https://..." defaultValue={editing?.url}/>
          <Field label="Görsel URL" name="imageUrl" placeholder="/images/press/haber.jpg" defaultValue={editing?.imageUrl}/>
          <Field label="Yayın Tarihi" name="publishedAt" type="date" required defaultValue={editing?.publishedAt?.split("T")[0]}/>
        </FormCard>
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Haber</p>
          {items.map(item => <ItemRow key={item.id} title={item.titleTr} subtitle={item.sourceTr} published={item.isPublished}
            onEdit={() => setEditing(item)}
            onToggle={() => api("togglePress", { id: item.id, isPublished: !item.isPublished }).then(reload)}
            onDelete={() => { if(confirm("Silinsin mi?")) api("deletePress", { id: item.id }).then(reload); }}/>)}
          {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz haber yok</p>}
        </div>
      </div>
    </div>
  );
}

function InvitationsSection() {
  const { items } = useItems("getInvitations");
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Davetiyeler</h2>
      <p className="text-slate-400 text-xs font-black tracking-widest uppercase">{items.length} Davetiye</p>
      {items.map(item => (
        <div key={item.id} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div><p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">Ad Soyad</p><p className="text-slate-900 text-sm font-black">{item.firstName} {item.lastName}</p></div>
          <div><p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">E-posta</p><p className="text-slate-700 text-sm font-black truncate">{item.email}</p></div>
          <div><p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">Telefon</p><p className="text-slate-700 text-sm font-black">{item.phone}</p></div>
          <div><p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">Tarih</p><p className="text-slate-700 text-sm font-black">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</p></div>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz davetiye yok</p>}
    </div>
  );
}

function MessagesSection() {
  const { items, reload } = useItems("getMessages");
  const unread = items.filter(m => !m.isRead).length;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-tight">Mesajlar</h2>
        {unread > 0 && <span className="bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-full">{unread} okunmamış</span>}
      </div>
      {items.map(msg => (
        <div key={msg.id} className={`bg-white border rounded-[2rem] p-6 transition-all ${!msg.isRead ? "border-blue-200 shadow-sm shadow-blue-100" : "border-slate-100"}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {!msg.isRead && <div className="w-2 h-2 rounded-full bg-blue-600"/>}
                <p className="text-slate-900 font-black text-base">{msg.name}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-blue-600 hover:underline text-sm font-black"><Mail size={13}/>{msg.email}</a>
                {msg.phone && <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 text-slate-500 text-sm font-black"><Phone size={13}/>{msg.phone}</a>}
              </div>
              {msg.subject && <p className="text-slate-500 text-xs font-black mt-1">Konu: {msg.subject}</p>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <p className="text-slate-400 text-xs font-black">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</p>
              {!msg.isRead && <button onClick={() => api("markAsRead", { id: msg.id }).then(reload)} className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1.5 rounded-full text-xs font-black transition-all"><CheckCheck size={13}/> Okundu</button>}
              <button onClick={() => { if(confirm("Silinsin mi?")) api("deleteMessage", { id: msg.id }).then(reload); }} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 transition-all"><Trash2 size={14}/></button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">{msg.message}</p>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-300 text-sm text-center py-10">Henüz mesaj yok</p>}
    </div>
  );
}

export default function AdminPage() {
  const [section, setSection] = useState<Section>("dashboard");
  const [dashData, setDashData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { api("getDashboard").then(r => setDashData(r.data)); }, []);

  const renderSection = () => {
    switch (section) {
      case "dashboard":     return <Dashboard data={dashData}/>;
      case "fairs":         return <FairsSection/>;
      case "events":        return <EventsSection/>;
      case "announcements": return <AnnouncementsSection/>;
      case "team":          return <TeamSection/>;
      case "photos":        return <PhotosSection/>;
      case "videos":        return <VideosSection/>;
      case "invitations":   return <InvitationsSection/>;
      case "press":         return <PressSection/>;
      case "messages":      return <MessagesSection/>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-slate-950 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-5 py-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-white font-black text-base tracking-tight">ANFAŞ CMS</p>
            <p className="text-slate-500 text-[9px] font-black tracking-widest uppercase mt-0.5">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white"><X size={16}/></button>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setSection(item.id as Section); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm transition-all ${section === item.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon size={15}/>
              {item.label}
              {section === item.id && <ChevronRight size={13} className="ml-auto"/>}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <a href="/tr" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-black text-sm">
            <ExternalLink size={15}/> Siteyi Gör
          </a>
        </div>
      </aside>
      <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900"><Menu size={20}/></button>
            <h1 className="text-slate-900 font-black text-base uppercase tracking-tight">{navItems.find(n => n.id === section)?.label}</h1>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-black text-sm">Admin</div>
        </header>
        <div className="flex-1 p-6 md:p-10">{renderSection()}</div>
      </main>
    </div>
  );
}