"use server";

import { prisma } from "@/lib/db";

export async function getPublishedCalendarEvents() {
  try {
    const events = await prisma.calendarEvent.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    });
    return events;
  } catch (error) {
    console.error("Etkinlikler çekilemedi:", error);
    return [];
  }
}

export async function createCalendarEvent(data: {
  titleTr: string;
  titleEn: string;
  descTr?: string;
  descEn?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  imageUrl?: string;
  isPublished?: boolean;
}) {
  return await prisma.calendarEvent.create({ data });
}

export async function deleteCalendarEvent(id: string) {
  return await prisma.calendarEvent.delete({ where: { id } });
}

export async function toggleCalendarEvent(id: string, isPublished: boolean) {
  return await prisma.calendarEvent.update({ where: { id }, data: { isPublished } });
}