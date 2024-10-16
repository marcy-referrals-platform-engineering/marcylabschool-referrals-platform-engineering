/*
  Warnings:

  - You are about to drop the `AuthorizedEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AuthorizedEmail";

-- CreateTable
CREATE TABLE "AuthorizedEmails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorizedEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedEmails_email_key" ON "AuthorizedEmails"("email");
