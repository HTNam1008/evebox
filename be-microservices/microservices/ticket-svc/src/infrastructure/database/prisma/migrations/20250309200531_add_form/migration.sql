/*
  Warnings:

  - You are about to drop the column `buyerAddress` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyerEmail` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyerName` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyerPhone` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Showing" ADD COLUMN     "formId" INTEGER;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "buyerAddress",
DROP COLUMN "buyerEmail",
DROP COLUMN "buyerName",
DROP COLUMN "buyerPhone",
ADD COLUMN     "formResponseId" INTEGER;

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormInput" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "fieldName" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FormInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormAnswer" (
    "id" SERIAL NOT NULL,
    "formResponseId" INTEGER NOT NULL,
    "formInputId" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Showing" ADD CONSTRAINT "Showing_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormInput" ADD CONSTRAINT "FormInput_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_formInputId_fkey" FOREIGN KEY ("formInputId") REFERENCES "FormInput"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
