"use server";

import { prisma } from "@/lib/db";

export async function getPublishedPhotos() {
  try {
    const photos = await prisma.photo.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return photos;
  } catch (error) {
    console.error("Fotoğraflar çekilemedi:", error);
    return [];
  }
}

export async function createPhoto(data: {
  titleTr: string;
  titleEn: string;
  url: string;
  isPublished?: boolean;
  order?: number;
}) {
  return await prisma.photo.create({ data });
}

export async function deletePhoto(id: string) {
  return await prisma.photo.delete({ where: { id } });
}