"use server";

import { prisma } from "@/lib/db";

export async function getPublishedPressNews() {
  try {
    const news = await prisma.pressNews.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return news;
  } catch (error) {
    console.error("Basın haberleri çekilemedi:", error);
    return [];
  }
}

export async function createPressNews(data: {
  titleTr: string;
  titleEn: string;
  sourceTr: string;
  sourceEn: string;
  url?: string;
  imageUrl?: string;
  isPublished?: boolean;
  publishedAt?: Date;
}) {
  return await prisma.pressNews.create({ data });
}

export async function deletePressNews(id: string) {
  return await prisma.pressNews.delete({ where: { id } });
}