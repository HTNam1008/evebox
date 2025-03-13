/*
  Warnings:

  - The `seatId` column on the `PayOSInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PayOSInfo" ADD COLUMN     "quantity" INTEGER,
DROP COLUMN "seatId",
ADD COLUMN     "seatId" INTEGER[];
