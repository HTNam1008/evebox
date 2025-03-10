-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PAYOS');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "buyerAddress" VARCHAR(255),
ADD COLUMN     "buyerEmail" VARCHAR(255),
ADD COLUMN     "buyerName" VARCHAR(255),
ADD COLUMN     "buyerPhone" VARCHAR(10),
ADD COLUMN     "paymentId" INTEGER;

-- CreateTable
CREATE TABLE "PayOSInfo" (
    "bin" VARCHAR(20),
    "accountNumber" VARCHAR(50),
    "accountName" VARCHAR(100),
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(100),
    "orderCode" INTEGER NOT NULL,
    "currency" VARCHAR(10),
    "paymentLinkId" VARCHAR(50),
    "status" VARCHAR(20),
    "checkoutUrl" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" SERIAL NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "paymentCode" INTEGER NOT NULL,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayOSInfo_orderCode_key" ON "PayOSInfo"("orderCode");

-- CreateIndex
CREATE INDEX "Ticket_paymentId_idx" ON "Ticket"("paymentId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
