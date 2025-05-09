-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'VALUE');

-- CreateEnum
CREATE TYPE "CreatorRole" AS ENUM ('ADMIN', 'ORG');

-- AlterTable
ALTER TABLE "OrderInfo" ADD COLUMN     "voucherCodeId" TEXT;

-- CreateTable
CREATE TABLE "VoucherCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "creatorRole" "CreatorRole" NOT NULL,
    "organizerId" TEXT,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoucherCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherCode" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "maxUsage" INTEGER NOT NULL DEFAULT 0,
    "maxUsagePerUser" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VoucherCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherTargetUser" (
    "id" TEXT NOT NULL,
    "voucherCodeId" TEXT NOT NULL,
    "userId" VARCHAR(255) NOT NULL,

    CONSTRAINT "VoucherTargetUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_voucherCodeId_fkey" FOREIGN KEY ("voucherCodeId") REFERENCES "VoucherCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherCode" ADD CONSTRAINT "VoucherCode_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "VoucherCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherTargetUser" ADD CONSTRAINT "VoucherTargetUser_voucherCodeId_fkey" FOREIGN KEY ("voucherCodeId") REFERENCES "VoucherCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
