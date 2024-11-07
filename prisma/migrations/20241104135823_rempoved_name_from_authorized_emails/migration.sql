/*
  Warnings:

  - You are about to drop the column `name` on the `AuthorizedEmails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AuthorizedEmails_email_name_key";

-- AlterTable
ALTER TABLE "AuthorizedEmails" DROP COLUMN "name";
