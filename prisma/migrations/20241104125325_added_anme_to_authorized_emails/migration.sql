/*
  Warnings:

  - A unique constraint covering the columns `[email,name]` on the table `AuthorizedEmails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referrerEmail_fkey";

-- AlterTable
ALTER TABLE "AuthorizedEmails" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "referrerName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedEmails_email_name_key" ON "AuthorizedEmails"("email", "name");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerEmail_referrerName_fkey" FOREIGN KEY ("referrerEmail", "referrerName") REFERENCES "AuthorizedEmails"("email", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
