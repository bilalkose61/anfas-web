"use server";

import { prisma } from "@/lib/db";

export async function getPublishedTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return members;
  } catch (error) {
    console.error("Ekip üyeleri çekilemedi:", error);
    return [];
  }
}

export async function createTeamMember(data: {
  nameTr: string;
  nameEn: string;
  titleTr: string;
  titleEn: string;
  photo?: string;
  order?: number;
  isPublished?: boolean;
}) {
  return await prisma.teamMember.create({ data });
}

export async function deleteTeamMember(id: string) {
  return await prisma.teamMember.delete({ where: { id } });
}

export async function updateTeamMember(id: string, data: Partial<{
  nameTr: string;
  nameEn: string;
  titleTr: string;
  titleEn: string;
  photo: string;
  order: number;
  isPublished: boolean;
}>) {
  return await prisma.teamMember.update({ where: { id }, data });
}