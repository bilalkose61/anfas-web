"use server";

import { prisma } from "@/lib/db";

export async function getPublishedFairs() {
  try {
    const fairs = await prisma.fair.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    });
    return fairs;
  } catch (error) {
    console.error("Fuarlar çekilemedi:", error);
    return [];
  }
}

export async function getFairBySlug(slug: string) {
  try {
    return await prisma.fair.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Fuar çekilemedi:", error);
    return null;
  }
}

export async function createFair(data: {
  titleTr: string; titleEn: string;
  descTr?: string; descEn?: string;
  organizerTr?: string; organizerEn?: string;
  startDate: Date; endDate: Date;
  startTime?: string; endTime?: string;
  location?: string; website?: string;
  email?: string; logoUrl?: string;
  slug: string; isPublished?: boolean;
}) {
  return await prisma.fair.create({ data });
}

export async function deleteFair(id: string) {
  return await prisma.fair.delete({ where: { id } });
}

export async function toggleFair(id: string, isPublished: boolean) {
  return await prisma.fair.update({ where: { id }, data: { isPublished } });
}