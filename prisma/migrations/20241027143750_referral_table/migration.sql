-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resume" TEXT,
    "gender" TEXT,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_email_fkey" FOREIGN KEY ("email") REFERENCES "AuthorizedEmails"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
