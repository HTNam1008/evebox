/*
  Warnings:

  - You are about to drop the column `userId` on the `images` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_userId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "userId",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "images_userEmail_idx" ON "images"("userEmail");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
