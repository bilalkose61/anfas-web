// src/actions/ticketActions.ts
"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// ─────────────────────────────────────────
// YARDIMCI: QR kod oluştur
// ─────────────────────────────────────────
function generateQRCode(eventId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `ANFAS-${eventId.slice(-4).toUpperCase()}-${timestamp}-${random}`
}

// ─────────────────────────────────────────
// PUBLIC: Davetiye kayıt
// ─────────────────────────────────────────
export async function createTicket(formData: FormData) {
  const eventId = formData.get("eventId") as string

  // Fuar var mı ve yayında mı kontrol et
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true, isPublished: true }
  })

  if (!event || !event.isPublished) {
    return { error: "Fuar bulunamadı." }
  }

  // Aynı email ile zaten kayıt var mı?
  const existing = await prisma.ticket.findFirst({
    where: {
      eventId,
      customerEmail: formData.get("customerEmail") as string
    }
  })

  if (existing) {
    return { error: "Bu e-posta adresiyle zaten kayıt yapılmış." }
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        customerName:    formData.get("customerName") as string,
        customerEmail:   formData.get("customerEmail") as string,
        customerPhone:   formData.get("customerPhone") as string || null,
        customerCompany: formData.get("customerCompany") as string || null,
        qrCode:          generateQRCode(eventId),
        isPaid:          false,
      }
    })

    revalidatePath("/admin")
    return { success: true, ticketCode: ticket.qrCode }

  } catch (error) {
    console.error("Hata:", error)
    return { error: "Davetiye oluşturulurken bir hata oluştu." }
  }
}

// ─────────────────────────────────────────
// PUBLIC: Email ile bilet sorgula
// ─────────────────────────────────────────
export async function getTicketByEmail(email: string, eventId: string) {
  return await prisma.ticket.findFirst({
    where: { customerEmail: email, eventId },
    include: { event: { select: { titleTr: true, titleEn: true, startDate: true, endDate: true, location: true } } }
  })
}

// ─────────────────────────────────────────
// ADMIN: QR kodu okut — bileti kullanıldı işaretle
// ─────────────────────────────────────────
export async function useTicket(qrCode: string) {
  const ticket = await prisma.ticket.findUnique({ where: { qrCode } })

  if (!ticket) return { error: "Bilet bulunamadı." }
  if (ticket.isUsed) return { error: "Bu bilet zaten kullanılmış.", usedAt: ticket.usedAt }

  const updated = await prisma.ticket.update({
    where: { qrCode },
    data: { isUsed: true, usedAt: new Date() },
    include: { event: { select: { titleTr: true, titleEn: true } } }
  })

  return { success: true, ticket: updated }
}

// ─────────────────────────────────────────
// ADMIN: Fuarın tüm biletlerini getir
// ─────────────────────────────────────────
export async function getTicketsByEvent(eventId: string) {
  return await prisma.ticket.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" }
  })
}

// ─────────────────────────────────────────
// ADMIN: Bilet sil
// ─────────────────────────────────────────
export async function deleteTicket(id: string) {
  try {
    await prisma.ticket.delete({ where: { id } })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Hata:", error)
    return { error: "Bilet silinirken bir hata oluştu." }
  }
}