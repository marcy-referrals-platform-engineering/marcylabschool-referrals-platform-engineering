/*
  Warnings:

  - Made the column `referrerName` on table `Referral` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Referral" ALTER COLUMN "referrerName" SET NOT NULL;
