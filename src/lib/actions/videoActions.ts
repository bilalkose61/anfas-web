"use server";

import { prisma } from "@/lib/db";

export async function getPublishedVideos() {
  try {
    const videos = await prisma.video.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return videos;
  } catch (error) {
    console.error("Videolar çekilemedi:", error);
    return [];
  }
}

export async function createVideo(data: {
  titleTr: string;
  titleEn: string;
  youtubeId: string;
  isPublished?: boolean;
  order?: number;
}) {
  return await prisma.video.create({ data });
}

export async function deleteVideo(id: string) {
  return await prisma.video.delete({ where: { id } });
}