-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "isReservingSeat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 2;
