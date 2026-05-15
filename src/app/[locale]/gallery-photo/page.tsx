import { getPublishedPhotos } from "@/lib/actions/photoActions";
import PhotoGalleryPageClient from "./client";

type Props = { params: Promise<{ locale: string }> };

export default async function PhotoGalleryPage({ params }: Props) {
  const { locale } = await params;
  const photos = await getPublishedPhotos();
  return <PhotoGalleryPageClient photos={photos} locale={locale} />;
}