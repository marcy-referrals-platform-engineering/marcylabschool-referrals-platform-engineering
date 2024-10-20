-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "AuthorizedEmails" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "AuthorizationRequests" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizationRequests_email_key" ON "AuthorizationRequests"("email");
