import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, data, id, isPublished } = body;

  try {
    switch (action) {

      // DASHBOARD
      case "getDashboard": {
        const [fairs, events, announcements, team, photos, videos, invitations, press, messages, unread] = await Promise.all([
          prisma.fair.count(),
          prisma.calendarEvent.count(),
          prisma.announcement.count(),
          prisma.teamMember.count(),
          prisma.photo.count(),
          prisma.video.count(),
          prisma.invitation.count(),
          prisma.pressNews.count(),
          prisma.contactMessage.count(),
          prisma.contactMessage.count({ where: { isRead: false } }),
        ]);
        return NextResponse.json({ data: { fairs, events, announcements, team, photos, videos, invitations, press, messages, unread } });
      }

      // FUARLAR
      case "getFairs":
        return NextResponse.json({ data: await prisma.fair.findMany({ orderBy: { startDate: "asc" } }) });
      case "createFair":
        return NextResponse.json({ data: await prisma.fair.create({ data }) });
      case "deleteFair":
        return NextResponse.json({ data: await prisma.fair.delete({ where: { id } }) });
      case "toggleFair":
        return NextResponse.json({ data: await prisma.fair.update({ where: { id }, data: { isPublished } }) });

      // ETKİNLİKLER
      case "getEvents":
        return NextResponse.json({ data: await prisma.calendarEvent.findMany({ orderBy: { startDate: "asc" } }) });
      case "createEvent":
        return NextResponse.json({ data: await prisma.calendarEvent.create({ data }) });
      case "deleteEvent":
        return NextResponse.json({ data: await prisma.calendarEvent.delete({ where: { id } }) });
      case "toggleEvent":
        return NextResponse.json({ data: await prisma.calendarEvent.update({ where: { id }, data: { isPublished } }) });

      // DUYURULAR
      case "getAnnouncements":
        return NextResponse.json({ data: await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }) });
      case "createAnnouncement": {
        const ann = { titleTr: data.titleTr, titleEn: data.titleEn, bodyTr: data.contentTr || data.bodyTr || "", bodyEn: data.contentEn || data.bodyEn || "", isPublished: true };
        return NextResponse.json({ data: await prisma.announcement.create({ data: ann }) });
      }
      case "deleteAnnouncement":
        return NextResponse.json({ data: await prisma.announcement.delete({ where: { id } }) });
      case "toggleAnnouncement":
        return NextResponse.json({ data: await prisma.announcement.update({ where: { id }, data: { isPublished } }) });

      // EKİP
      case "getTeam":
        return NextResponse.json({ data: await prisma.teamMember.findMany({ orderBy: { order: "asc" } }) });
      case "createTeamMember":
        return NextResponse.json({ data: await prisma.teamMember.create({ data }) });
      case "deleteTeamMember":
        return NextResponse.json({ data: await prisma.teamMember.delete({ where: { id } }) });
      case "toggleTeamMember":
        return NextResponse.json({ data: await prisma.teamMember.update({ where: { id }, data: { isPublished } }) });

      // FOTOĞRAFLAR
      case "getPhotos":
        return NextResponse.json({ data: await prisma.photo.findMany({ orderBy: { order: "asc" } }) });
      case "createPhoto":
        return NextResponse.json({ data: await prisma.photo.create({ data }) });
      case "deletePhoto":
        return NextResponse.json({ data: await prisma.photo.delete({ where: { id } }) });
      case "togglePhoto":
        return NextResponse.json({ data: await prisma.photo.update({ where: { id }, data: { isPublished } }) });

      // VİDEOLAR
      case "getVideos":
        return NextResponse.json({ data: await prisma.video.findMany({ orderBy: { order: "asc" } }) });
      case "createVideo":
        return NextResponse.json({ data: await prisma.video.create({ data }) });
      case "deleteVideo":
        return NextResponse.json({ data: await prisma.video.delete({ where: { id } }) });
      case "toggleVideo":
        return NextResponse.json({ data: await prisma.video.update({ where: { id }, data: { isPublished } }) });

      // DAVETİYELER
      case "getInvitations":
        return NextResponse.json({ data: await prisma.invitation.findMany({ orderBy: { createdAt: "desc" } }) });

      // BASIN
      case "getPress":
        return NextResponse.json({ data: await prisma.pressNews.findMany({ orderBy: { publishedAt: "desc" } }) });
      case "createPress":
        return NextResponse.json({ data: await prisma.pressNews.create({ data }) });
      case "deletePress":
        return NextResponse.json({ data: await prisma.pressNews.delete({ where: { id } }) });
      case "togglePress":
        return NextResponse.json({ data: await prisma.pressNews.update({ where: { id }, data: { isPublished } }) });


      // UPDATE İŞLEMLERİ
      case "updateFair":
        return NextResponse.json({ data: await prisma.fair.update({ where: { id }, data }) });
      case "updateEvent":
        return NextResponse.json({ data: await prisma.calendarEvent.update({ where: { id }, data }) });
      case "updateAnnouncement": {
        const annUpdate = { titleTr: data.titleTr, titleEn: data.titleEn, bodyTr: data.contentTr || data.bodyTr || "", bodyEn: data.contentEn || data.bodyEn || "" };
        return NextResponse.json({ data: await prisma.announcement.update({ where: { id }, data: annUpdate }) });
      }
      case "updateTeamMember":
        return NextResponse.json({ data: await prisma.teamMember.update({ where: { id }, data }) });
      case "updatePhoto":
        return NextResponse.json({ data: await prisma.photo.update({ where: { id }, data }) });
      case "updateVideo":
        return NextResponse.json({ data: await prisma.video.update({ where: { id }, data }) });
      case "updatePress":
        return NextResponse.json({ data: await prisma.pressNews.update({ where: { id }, data }) });

      // MESAJ KAYDET (iletişim formu)
      case "saveMessage":
        return NextResponse.json({ data: await prisma.contactMessage.create({ data }) });

      // MESAJLAR
      case "getMessages":
        return NextResponse.json({ data: await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }) });
      case "markAsRead":
        return NextResponse.json({ data: await prisma.contactMessage.update({ where: { id }, data: { isRead: true } }) });
      case "deleteMessage":
        return NextResponse.json({ data: await prisma.contactMessage.delete({ where: { id } }) });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}