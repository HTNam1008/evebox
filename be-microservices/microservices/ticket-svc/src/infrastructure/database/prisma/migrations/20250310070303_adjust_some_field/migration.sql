/*
  Warnings:

  - Added the required column `userId` to the `FormResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showingId` to the `PayOSInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PayOSInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormResponse" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PayOSInfo" ADD COLUMN     "seatId" INTEGER,
ADD COLUMN     "showingId" TEXT NOT NULL,
ADD COLUMN     "ticketTypeId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "userId" SET DATA TYPE TEXT;
