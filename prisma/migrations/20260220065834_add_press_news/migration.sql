-- CreateTable
CREATE TABLE "press_news" (
    "id" TEXT NOT NULL,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "sourceTr" TEXT NOT NULL,
    "sourceEn" TEXT NOT NULL,
    "url" TEXT,
    "imageUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "press_news_pkey" PRIMARY KEY ("id")
);
