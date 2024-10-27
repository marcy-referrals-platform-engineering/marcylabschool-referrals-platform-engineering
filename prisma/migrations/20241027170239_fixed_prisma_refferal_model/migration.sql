/*
  Warnings:

  - Added the required column `referrerEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_email_fkey";

-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "referrerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerEmail_fkey" FOREIGN KEY ("referrerEmail") REFERENCES "AuthorizedEmails"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
