/*
  Warnings:

  - Added the required column `attempts` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otps" ADD COLUMN     "attempts" INTEGER NOT NULL;
