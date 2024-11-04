-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referrerEmail_referrerName_fkey";

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerEmail_fkey" FOREIGN KEY ("referrerEmail") REFERENCES "AuthorizedEmails"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
