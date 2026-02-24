"use server";

import { prisma } from "@/lib/db";

export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return await prisma.contactMessage.create({ data });
}

export async function getContactMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markAsRead(id: string) {
  return await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function deleteContactMessage(id: string) {
  return await prisma.contactMessage.delete({ where: { id } });
}