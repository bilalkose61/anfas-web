"use client";

export default function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-h-24 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `<span class="text-slate-900 text-sm font-black tracking-tight uppercase text-center leading-tight">${alt}</span>`;
        }
      }}
    />
  );
}