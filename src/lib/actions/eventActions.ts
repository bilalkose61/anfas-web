// src/actions/eventActions.ts
"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// ─────────────────────────────────────────
// YARDIMCI: Slug oluştur
// ─────────────────────────────────────────
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ─────────────────────────────────────────
// PUBLIC: Tüm yayınlanmış fuarları getir
// ─────────────────────────────────────────
export async function getPublishedEvents() {
  return await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { startDate: "asc" },
    select: {
      id: true,
      slug: true,
      titleTr: true,
      titleEn: true,
      categoryTr: true,
      categoryEn: true,
      startDate: true,
      endDate: true,
      logoUrl: true,
      image: true,
      contentTr: true,
      contentEn: true,
    }
  })
}

// ─────────────────────────────────────────
// PUBLIC: Tek fuar detayı (slug ile)
// ─────────────────────────────────────────
export async function getEventBySlug(slug: string) {
  return await prisma.event.findUnique({
    where: { slug },
    include: {
      gallery: { orderBy: { order: "asc" } },
      announcements: { where: { isPublished: true } },
    }
  })
}

// ─────────────────────────────────────────
// ADMIN: Fuar oluştur
// ─────────────────────────────────────────
export async function createEvent(formData: FormData) {
  try {
    const titleTr = formData.get("titleTr") as string

    await prisma.event.create({
      data: {
        slug:       createSlug(titleTr),
        titleTr,
        titleEn:    formData.get("titleEn") as string,
        contentTr:  formData.get("contentTr") as string,
        contentEn:  formData.get("contentEn") as string,
        categoryTr: formData.get("categoryTr") as string || "GENEL",
        categoryEn: formData.get("categoryEn") as string || "GENERAL",
        startDate:  new Date(formData.get("startDate") as string),
        endDate:    new Date(formData.get("endDate") as string),
        location:   formData.get("location") as string || "Anfaş Expo Center",
        logoUrl:    formData.get("logoUrl") as string || null,
        image:      formData.get("image") as string || null,
        isPublished: formData.get("isPublished") === "true",
        isFeatured:  formData.get("isFeatured") === "true",
      },
    })
  } catch (error) {
    console.error("Hata:", error)
    return { error: "Fuar kaydedilirken bir hata oluştu." }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  redirect("/admin")
}

// ─────────────────────────────────────────
// ADMIN: Fuar güncelle
// ─────────────────────────────────────────
export async function updateEvent(id: string, formData: FormData) {
  try {
    await prisma.event.update({
      where: { id },
      data: {
        titleTr:    formData.get("titleTr") as string,
        titleEn:    formData.get("titleEn") as string,
        contentTr:  formData.get("contentTr") as string,
        contentEn:  formData.get("contentEn") as string,
        categoryTr: formData.get("categoryTr") as string,
        categoryEn: formData.get("categoryEn") as string,
        startDate:  new Date(formData.get("startDate") as string),
        endDate:    new Date(formData.get("endDate") as string),
        location:   formData.get("location") as string,
        logoUrl:    formData.get("logoUrl") as string || null,
        image:      formData.get("image") as string || null,
        isPublished: formData.get("isPublished") === "true",
        isFeatured:  formData.get("isFeatured") === "true",
      },
    })
  } catch (error) {
    console.error("Hata:", error)
    return { error: "Fuar güncellenirken bir hata oluştu." }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  redirect("/admin")
}

// ─────────────────────────────────────────
// ADMIN: Fuar sil
// ─────────────────────────────────────────
export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } })
  } catch (error) {
    console.error("Hata:", error)
    return { error: "Fuar silinirken bir hata oluştu." }
  }

  revalidatePath("/admin")
  revalidatePath("/")
}