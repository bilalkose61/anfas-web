"use server";

import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function createInvitation(data: {
  fairId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  city?: string;
  gender: string;
  kvkk: boolean;
  consent: boolean;
}) {
  const uuid = uuidv4();
  const invitation = await prisma.invitation.create({
    data: { ...data, uuid },
  });
  return invitation;
}

export async function getInvitationByUuid(uuid: string) {
  return await prisma.invitation.findUnique({ where: { uuid } });
}

export async function getPublishedFairsForInvitation() {
  try {
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    const fairs = await prisma.fair.findMany({
      where: {
        isPublished: true,
        startDate: { lte: sixMonthsLater },
        endDate: { gte: new Date() },
      },
      orderBy: { startDate: "asc" },
    });
    return fairs;
  } catch {
    return [];
  }
}