/*
  Warnings:

  - A unique constraint covering the columns `[requestToken]` on the table `otps` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "otps_email_requestToken_key";

-- CreateIndex
CREATE UNIQUE INDEX "otps_requestToken_key" ON "otps"("requestToken");
