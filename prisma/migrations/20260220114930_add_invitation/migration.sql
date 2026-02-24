-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "fairId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "jobTitle" TEXT,
    "city" TEXT,
    "gender" TEXT NOT NULL,
    "kvkk" BOOLEAN NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_uuid_key" ON "invitations"("uuid");
