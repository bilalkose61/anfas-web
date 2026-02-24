"use server";

import { prisma } from "@/lib/db";

export async function getPublishedAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return announcements;
  } catch (error) {
    console.error("Duyurular çekilemedi:", error);
    return [];
  }
}

export async function createAnnouncement(data: {
  titleTr: string;
  titleEn: string;
  bodyTr: string;
  bodyEn: string;
  isPublished?: boolean;
}) {
  return await prisma.announcement.create({
    data: {
      titleTr: data.titleTr,
      titleEn: data.titleEn,
      bodyTr: data.bodyTr,
      bodyEn: data.bodyEn,
      isPublished: data.isPublished ?? false,
    },
  });
}

export async function deleteAnnouncement(id: string) {
  return await prisma.announcement.delete({ where: { id } });
}

export async function toggleAnnouncement(id: string, isPublished: boolean) {
  return await prisma.announcement.update({
    where: { id },
    data: { isPublished },
  });
}